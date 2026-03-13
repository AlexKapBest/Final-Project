import { useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import style from './header.module.css'

const NAV_LINKS = [
  { label: 'Главная', to: '/' },
  { label: 'Сравнение', to: '/compare' },
  { label: 'Избранное', to: '/favorites' },
  { label: 'О проекте', to: '/about' },
]

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (to: string) => {
    navigate(to)
    setDrawerOpen(false)
  }

  return (
    <AppBar position="static">
      <Toolbar className={style.toolbar}>
        <Link to="/">
          <img src="/img/logo.png" alt="Логотип" className={style.logo} />
        </Link>

        <Box className={style.nav}>
          {NAV_LINKS.map((link) => (
            <Button key={link.to} color="inherit" component={Link} to={link.to}>
              {link.label}
            </Button>
          ))}
        </Box>

        <IconButton
          color="inherit"
          className={style.hamburger}
          onClick={() => setDrawerOpen(true)}
          aria-label="открыть меню"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }} role="presentation">
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton onClick={() => handleNavClick(link.to)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header
