import { useState } from 'react'
import {
  Box, FormControl, InputLabel, Select, MenuItem, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import type { University } from '@shared/types'

const YEARS = ['2023', '2024', '2025']

const CompareByYear = ({ universities }: { universities: University[] }) => {
  const [uniName, setUniName] = useState('')
  const [specialty, setSpecialty] = useState('')

  const university = universities.find((u) => u.university === uniName)
  const score = university?.data.find((d) => d.specialty === specialty)?.score

  const handleUniChange = (e: SelectChangeEvent) => {
    setUniName(e.target.value)
    setSpecialty('')
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Вуз</InputLabel>
          <Select value={uniName} onChange={handleUniChange} label="Вуз">
            {universities.map((u) => (
              <MenuItem key={u.university} value={u.university}>{u.university}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 300 }} disabled={!university}>
          <InputLabel>Специальность</InputLabel>
          <Select value={specialty} onChange={(e) => setSpecialty(e.target.value)} label="Специальность">
            {university?.data.map((d) => (
              <MenuItem key={d.specialty} value={d.specialty}>{d.specialty}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {!specialty && (
        <Typography color="text.secondary">Выберите вуз и специальность</Typography>
      )}

      {specialty && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Год</strong></TableCell>
                <TableCell><strong>Проходной балл</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {YEARS.map((year) => (
                <TableRow key={year}>
                  <TableCell>{year}</TableCell>
                  <TableCell>{year === '2025' && score ? score : 'нет данных'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default CompareByYear
