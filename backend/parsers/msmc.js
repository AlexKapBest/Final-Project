const axios = require('axios')

const URL = 'https://msmc.by/абитуриентам/проходные-баллы'

function cleanText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#171;/g, '«')
    .replace(/&#187;/g, '»')
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&mdash;/g, '—')
    .trim()
    .replace(/\s+/g, ' ')
}

const SKIP_PATTERNS = [
  /^№/,
  /^Специальность$/i,
  /^Балл$/i,
  /^г\.\s*Минск$/i,
  /^РНПЦ$/i,
  /^Наименование/i,
  /^Организации/i,
  /^Условия/i,
  /^\s*$/,
]

function isGarbage(text) {
  return SKIP_PATTERNS.some(p => p.test(text.trim()))
}

function parseTable(html) {
  const results = []
  const seen = new Set()

  const rowRegex = /<tr[\s\S]*?<\/tr>/gi
  const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi

  let row
  while ((row = rowRegex.exec(html)) !== null) {
    const cells = []
    let cell
    while ((cell = cellRegex.exec(row[0])) !== null) {
      cells.push(cleanText(cell[1]))
    }

    if (cells.length < 2) continue

    let specialty = ''
    let score = '—'

    if (cells.length >= 3) {
      if (isGarbage(cells[0])) continue
      specialty = cells[1]
      score = cells[2] || '—'
    } else {
      specialty = cells[0]
      score = cells[1] || '—'
    }

    if (!specialty || specialty.length < 3) continue
    if (isGarbage(specialty)) continue
    if (seen.has(specialty)) continue

    seen.add(specialty)
    results.push({ specialty, score })
  }

  return results
}

async function parseMsmc() {
  const response = await axios.get(URL)
  const data = parseTable(response.data)

  return {
    university: 'МГМК',
    url: URL,
    data
  }
}

module.exports = { parseMsmc }
