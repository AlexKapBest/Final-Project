import { Box, Typography, Divider, Container } from '@mui/material'
import { UNIVERSITIES_CONFIG, SOCIAL_LINKS } from '@shared/config/universities'
import style from './footer.module.css'

const Footer = () => (
  <Box component="footer" className={style.footer}>
    <Container maxWidth="lg">
      <Box className={style.content}>

        <Box>
          <Typography className={style.heading}>Учебные заведения</Typography>
          {UNIVERSITIES_CONFIG.map((u) => (
            <a key={u.name} href={u.url} target="_blank" rel="noreferrer" className={style.link}>
              {u.name}
            </a>
          ))}
        </Box>

        <Box>
          <Typography className={style.heading}>Мы в соцсетях</Typography>
          <Box className={style.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a 
                key={s.label} 
                href={s.href}
                className={style.socialLink}
              >
                <img 
                  src={s.icon} 
                  alt={s.label} 
                  className={style.socialIcon}
                />
                <span className={style.socialLabel}>{s.label}</span>
              </a>
            ))}
          </Box>
        </Box>

      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" align="center" color="text.secondary">
        МинскПоступление
      </Typography>
    </Container>
  </Box>
)

export default Footer
