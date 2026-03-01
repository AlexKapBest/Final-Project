const axios = require('axios')

const URL = 'https://guo-mpk.by/prohodnye-bally-po-speczialnosti/'

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').trim()
}

function parseTable(html) {
  const results = []
  const rowRegex = /<tr[\s\S]*?<\/tr>/gi
  const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi

  let row
  while ((row = rowRegex.exec(html)) !== null) {
    const cells = []
    let cell
    while ((cell = cellRegex.exec(row[0])) !== null) {
      cells.push(stripTags(cell[1]))
    }
    if (cells.length >= 2 && cells[0] && cells[1]) {
      results.push({ specialty: cells[0], score: cells[1] })
    }
  }

  return results
}

async function parseMpk() {
  const response = await axios.get(URL)
  const data = parseTable(response.data)

  return {
    university: 'МПК',
    url: URL,
    data
  }
}

module.exports = { parseMpk }
