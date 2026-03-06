import { Container, Typography, Box, Card, CardContent, IconButton, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFavoritesStore } from '@entities/favoritesAPI'

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavoritesStore()

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Избранное</Typography>

      {favorites.length === 0 && (
        <Typography color="text.secondary">
          Пока пусто
        </Typography>
      )}

      <Grid container spacing={2}>
        {favorites.map((item) => (
          <Grid key={`${item.universityName}-${item.specialty}`} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">{item.universityName}</Typography>
                    <Typography variant="body1">{item.specialty}</Typography>
                    <Typography variant="h6" color="primary">{item.score}</Typography>
                  </Box>
                  <IconButton color="error" onClick={() => removeFavorite(item.specialty, item.universityName)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default FavoritesPage
