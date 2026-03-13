import { useState } from 'react'
import {Box, FormControl, InputLabel, Select, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import type { University } from '@shared/types'

const CompareByYear = ({ universities }: { universities: University[] }) => {
  const [uniName, setUniName] = useState('')
  const [specialty, setSpecialty] = useState('')

  const university = universities.find((u) => u.university === uniName)

  const matchingEntries = (university?.data ?? []).filter((d) => d.specialty === specialty)
  const years = [...new Set(matchingEntries.map((d) => d.year))].sort()

  const handleUniChange = (e: SelectChangeEvent) => {
    setUniName(e.target.value)
    setSpecialty('')
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
        <FormControl sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
          <InputLabel>Вуз</InputLabel>
          <Select value={uniName} onChange={handleUniChange} label="Вуз">
            {universities.map((u) => (
              <MenuItem key={u.university} value={u.university}>{u.university}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 300, width: { xs: '100%', sm: 'auto' } }} disabled={!university}>
          <InputLabel>Специальность</InputLabel>
          <Select value={specialty} onChange={(e) => setSpecialty(e.target.value)} label="Специальность">
            {[...new Set((university?.data ?? []).map((d) => d.specialty))].map((spec) => (
              <MenuItem key={spec} value={spec}>{spec}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {!specialty && (
        <Typography color="text.secondary">Выберите вуз и специальность</Typography>
      )}

      {specialty && years.length > 0 && (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Год</strong></TableCell>
                <TableCell><strong>Проходной балл</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {years.map((year) => {
                const entry = matchingEntries.find((d) => d.year === year)
                return (
                  <TableRow key={year}>
                    <TableCell>{year}</TableCell>
                    <TableCell>{entry?.score ?? '—'}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default CompareByYear
