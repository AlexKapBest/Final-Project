const axios = require('axios')
const crypto = require('crypto')

const URL = 'https://guo-mpk.by/prohodnye-bally-po-speczialnosti/'
const YEAR = '2025'

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
    .replace(/&mdash;/g, '—')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .trim()
    .replace(/\s+/g, ' ')
}

const EDU_TYPES = ['ОСО', 'ОБО', 'ОПО', 'ПТО', 'ССО']

function isEduType(text) {
  return EDU_TYPES.includes(text.trim())
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
      cells.push(cleanText(cell[1]))
    }

    if (cells.length < 2) continue

    const first = cells[0]

    if (isEduType(first)) continue
    if (!first || first.length < 5) continue
    if (first.toLowerCase().includes('специальность')) continue
    if (first.toLowerCase().includes('квалификация')) continue
    if (first.toLowerCase().includes('проходной')) continue
    if (first.toLowerCase().includes('сведения')) continue

    if (!first.match(/^5-\d{2}/)) continue

    let score = '—'
    for (let i = cells.length - 1; i >= 1; i--) {
      const val = cells[i]
      if (val && val !== '-' && val !== '–' && val !== '—' && /\d/.test(val)) {
        score = val
        break
      }
    }

    const id = crypto.createHash('md5').update(`МПК|${first}|${YEAR}`).digest('hex').slice(0, 12)
    results.push({ id, year: YEAR, specialty: first, score })
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
