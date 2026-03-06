import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import style from './header.module.css'

const Header = () => (
  <AppBar position="static">
    <Toolbar className={style.toolbar}>
      <Link to="/">
        <img src="/img/logo.png" alt="Логотип" className={style.logo} />
      </Link>
      <Box className={style.nav}>
        <Button color="inherit" component={Link} to="/">Главная</Button>
        <Button color="inherit" component={Link} to="/compare">Сравнение</Button>
        <Button color="inherit" component={Link} to="/favorites">Избранное</Button>
        <Button color="inherit" component={Link} to="/about">О проекте</Button>
      </Box>
    </Toolbar>
  </AppBar>
)

export default Header
