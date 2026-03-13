import { useState } from 'react'
import {
  Box, FormControl, InputLabel, Select, MenuItem, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import type { University } from '@shared/types'

const CompareByUniversity = ({ universities }: { universities: University[] }) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const val = e.target.value
    if (Array.isArray(val) && val.length <= 3) setSelected(val)
  }

  const selectedUnis = universities.filter((u) => selected.includes(u.university))
  const allSpecialties = [...new Set(selectedUnis.flatMap((u) => u.data.map((d) => d.specialty)))]

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 3, maxWidth: { sm: 500 } }}>
        <InputLabel>Выберите вузы</InputLabel>
        <Select multiple value={selected} onChange={handleChange} label="Выберите вузы">
          {universities.map((u) => (
            <MenuItem key={u.university} value={u.university}>{u.university}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedUnis.length === 0 && (
        <Typography color="text.secondary">Выберите вузы для сравнения</Typography>
      )}

      {selectedUnis.length > 0 && (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Специальность</strong></TableCell>
                {selectedUnis.map((u) => (
                  <TableCell key={u.university}><strong>{u.university}</strong></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allSpecialties.map((spec) => (
                <TableRow key={spec}>
                  <TableCell>{spec}</TableCell>
                  {selectedUnis.map((u) => (
                    <TableCell key={u.university}>
                      {u.data.find((d) => d.specialty === spec)?.score ?? '—'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default CompareByUniversity
