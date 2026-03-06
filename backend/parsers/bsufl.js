const axios = require('axios')

const URL = 'https://bsufl.by/entrant/admission/prokhodnye-bally/text-passing-marks-2025.php'

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

function extractNumbers(raw) {
  const nums = raw.match(/\d+/g)
  if (!nums) return null
  return nums
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

    const specialty = cells[0]
    if (!specialty || specialty.length < 5) continue
    if (specialty.toLowerCase().includes('специальность') && specialty.length < 30) continue
    if (/^[А-ЯЁ\s]+$/.test(specialty) && specialty.length < 60 && !specialty.includes('«')) continue

    const rawScore1 = cells[1] || ''
    const rawScore2 = cells[2] || ''

    let score = '—'

    const nums1 = extractNumbers(rawScore1)
    const nums2 = extractNumbers(rawScore2)

    if (nums1 && nums2) {
      score = `${nums1[0]}/${nums2[0]}`
    } else if (nums1) {
      score = nums1.length >= 2 ? `${nums1[0]}/${nums1[1]}` : nums1[0]
    } else if (rawScore1 === '-' || rawScore1 === '–' || rawScore1 === '—') {
      score = '—'
    }

    results.push({ specialty, score })
  }

  return results
}

async function parseBsufl() {
  const response = await axios.get(URL)
  const data = parseTable(response.data)

  return {
    university: 'БГУИЯ',
    url: URL,
    data
  }
}

module.exports = { parseBsufl }
