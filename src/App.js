import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Header from './Header'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { RouterProvider } from 'react-router-dom'
import router from 'Routes'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://catedu.es/">
        CATEDU, Gobierno de Aragón
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ my: 4 }}>
          <RouterProvider router={router} />
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
