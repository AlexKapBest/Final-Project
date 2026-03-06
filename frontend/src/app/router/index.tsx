import { Route, Routes } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import ComparePage from '@pages/ComparePage'
import FavoritesPage from '@pages/FavoritesPage'
import AboutPage from '@pages/AboutPage'

const Router = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="compare" element={<ComparePage />} />
    <Route path="favorites" element={<FavoritesPage />} />
    <Route path="about" element={<AboutPage />} />
  </Routes>
)

export default Router
