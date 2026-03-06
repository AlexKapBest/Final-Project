import {Card, CardContent, Typography, Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, Button, Box, Link,} from '@mui/material'
import type { University } from '@shared/types'
import { useFavoritesStore } from '@entities/favoritesAPI'

type Props = {
  university: University
  searchQuery: string
}

const UniversityCard = ({ university, searchQuery }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  const filtered = university.data.filter((item) =>
    item.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFavorite = (specialty: string, score: string) => {
    if (isFavorite(specialty, university.university)) {
      removeFavorite(specialty, university.university)
    } else {
      addFavorite({ universityName: university.university, specialty, score })
    }
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">{university.university}</Typography>
            <Link href={university.url} target="_blank" rel="noreferrer" variant="body2">
              {university.url}
            </Link>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small" sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '60%' }}><strong>Специальность</strong></TableCell>
                <TableCell sx={{ width: '20%' }}><strong>Балл</strong></TableCell>
                <TableCell sx={{ width: '20%' }}><strong>Избранное</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">Ничего не найдено</TableCell>
                </TableRow>
              )}
              {filtered.map((item) => (
                <TableRow key={item.specialty}>
                  <TableCell sx={{ wordBreak: 'break-word' }}>{item.specialty}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant={isFavorite(item.specialty, university.university) ? 'contained' : 'outlined'}
                      color={isFavorite(item.specialty, university.university) ? 'warning' : 'primary'}
                      onClick={() => toggleFavorite(item.specialty, item.score)}
                    >
                      {isFavorite(item.specialty, university.university) ? 'Удалить' : 'Добавить'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default UniversityCard
