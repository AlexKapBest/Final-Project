import { Container, Typography, Box, Link, Divider, List, ListItem, ListItemText } from '@mui/material'
import { UNIVERSITIES_CONFIG } from '@shared/config/universities'
import SuggestForm from '@components/SuggestForm'

const AboutPage = () => (
  <Container maxWidth="md">
    <Typography variant="h4" gutterBottom>О проекте</Typography>
    <Typography sx={{ mb: 1 }}>
      Приложение для просмотра и сравнения проходных баллов вузов Минска.
    </Typography>

    <Divider sx={{ my: 3 }} />

    <Typography variant="h6" gutterBottom>Поддерживаемые вузы</Typography>
    <List dense>
      {UNIVERSITIES_CONFIG.map((u) => (
        <ListItem key={u.name} disablePadding sx={{ mb: 1 }}>
          <ListItemText
            primary={u.name}
            secondary={<Link href={u.url} target="_blank" rel="noreferrer">{u.url}</Link>}
          />
        </ListItem>
      ))}
    </List>

    <Divider sx={{ my: 3 }} />

    <Box><SuggestForm /></Box>
  </Container>
)

export default AboutPage
