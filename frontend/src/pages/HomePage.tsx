import { useEffect, useState } from 'react'
import { Container, Typography, TextField, Box, CircularProgress, Alert } from '@mui/material'
import { useUniversitiesStore } from '@entities/universitiesAPI'
import UniversityCard from '@components/UniversityCard'

const HomePage = () => {
  const { universities, loading, error, fetchUniversities } = useUniversitiesStore()
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUniversities()
  }, [fetchUniversities])

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>Проходные баллы вузов Минска</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Актуальные данные с официальных сайтов трёх учебных заведений.
      </Typography>

      <TextField
        label="Поиск по специальности"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading && <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}

      {universities.map((uni) => (
        <UniversityCard key={uni.university} university={uni} searchQuery={search} />
      ))}
    </Container>
  )
}

export default HomePage
