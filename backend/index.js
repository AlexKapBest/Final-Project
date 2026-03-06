const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const { parseBsufl } = require('./parsers/bsufl')
const { parseMsmc } = require('./parsers/msmc')
const { parseMpk } = require('./parsers/mpk')
const { error } = require('console')

const app = express()
app.use(express.json())
app.use(cors())

const dataDir = path.join(__dirname, 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)

app.get('/api/universities', async (req, res) => {
  try {
    const results = await Promise.allSettled([parseBsufl(), parseMsmc(), parseMpk()])

    const universities = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value)

    results
      .filter(r => r.status === 'rejected')
      .forEach(r => console.error(error))

    fs.writeFileSync(path.join(dataDir, 'universities.json'), JSON.stringify(universities, null, 2))
    res.json(universities)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/api/suggest', (req, res) => {
  const { name, url, email } = req.body
  const filePath = path.join(dataDir, 'suggestions.json')

  let suggestions = []
  if (fs.existsSync(filePath)) {
    suggestions = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }

  fs.writeFileSync(filePath, JSON.stringify(suggestions, null, 2))
  res.json({ success: true })
})

app.listen(3001, () => console.log('Backend запущен'))
