const express = require('express')
const cors = require('cors')

const { parseBsufl } = require('./parsers/bsufl')
const { parseMsmc } = require('./parsers/msmc')
const { parseMpk } = require('./parsers/mpk')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/universities', async (req, res) => {
  try {
    const results = await Promise.allSettled([
      parseBsufl(),
      parseMsmc(),
      parseMpk()
    ])

    const universities = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value)

    results
      .filter(r => r.status === 'rejected')
      .forEach(r => console.error('Ошибка парсера:', r.reason.message))

    res.send(JSON.stringify(universities))
  } catch (error) {
    res.status(500).send(error.message)
  }
})