import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Link, Divider } from '@mui/material'
import type { University } from '@shared/types'
import { useFavoritesStore } from '@entities/favoritesAPI'

type Props = {
  university: University
  searchQuery: string
}

const UniversityCard = ({ university, searchQuery }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  const filtered = (university.data ?? []).filter((item) =>
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
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {university.university}
          </Typography>
          <Link href={university.url} target="_blank" rel="noreferrer" variant="body2" sx={{ wordBreak: 'break-all', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {university.url}
          </Link>
        </Box>

        {filtered.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>Ничего не найдено</Typography>
        )}

        {/* Мобильный вид — карточки */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {filtered.map((item, index) => {
            const fav = isFavorite(item.specialty, university.university)
            return (
              <Box key={item.id}>
                {index > 0 && <Divider />}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 1.5, gap: 1 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ wordBreak: 'break-word', mb: 0.5 }}>
                      {item.specialty}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {item.score}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant={fav ? 'contained' : 'outlined'}
                    color={fav ? 'warning' : 'primary'}
                    onClick={() => toggleFavorite(item.specialty, item.score)}
                    sx={{ flexShrink: 0, whiteSpace: 'nowrap', mt: 0.25 }}
                  >
                    {fav ? 'Удалить' : 'Добавить'}
                  </Button>
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Десктопный вид — таблица */}
        <TableContainer component={Paper} variant="outlined" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Специальность</strong></TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}><strong>Балл</strong></TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}><strong>Избранное</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ wordBreak: 'break-word' }}>{item.specialty}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.score}</TableCell>
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
