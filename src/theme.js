import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#5ec877',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          color: 'white',
        },
      },
    },
  },
})

export default theme
