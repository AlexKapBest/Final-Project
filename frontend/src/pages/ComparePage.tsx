import { useState } from 'react'
import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import { useUniversitiesStore } from '@entities/universitiesAPI'
import CompareByUniversity from '@components/CompareByUniversity'
import CompareByYear from '@components/CompareByYear'

const ComparePage = () => {
  const { universities } = useUniversitiesStore()
  const [tab, setTab] = useState(0)

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Сравнение</Typography>
      <Tabs value={tab} onChange={(_e, v: number) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="По вузам" />
        <Tab label="По годам" />
      </Tabs>
      <Box>
        {tab === 0 && <CompareByUniversity universities={universities} />}
        {tab === 1 && <CompareByYear universities={universities} />}
      </Box>
    </Container>
  )
}

export default ComparePage
