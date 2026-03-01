const axios = require('axios')

const URL = 'https://bsufl.by/entrant/admission/prokhodnye-bally/text-passing-marks-2025.php'

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

async function parseBsufl() {
  const response = await axios.get(URL)
  const data = parseTable(response.data)

  return {
    university: 'БГУФК',
    url: URL,
    data
  }
}

module.exports = { parseBsufl }
