import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

export default function CourseCard({ course }) {
  const {
    Curso: title,
    Horas: horas,
    Images: img,
    id,
    Etiquetas: category,
    Moodle_url: url,
  } = course
  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt="Carátula curso"
      />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
      >
        <CardContent>
          <Stack spacing={2}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Número de horas: {horas}
            </Typography>
            <Box
              sx={{
                marginTop: '20px',
              }}
            >
              <Chip
                color="primary"
                label={category}
                style={{ minWidth: '100px', maxWidth:'150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', direction: 'rtl', textAlign: 'left' }}
              />
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Link
              to={`courses/${id}`}
              style={{ textDecoration: 'none', marginRight: '20px' }}
            >
              <Button size="small">Ver más</Button>
            </Link>
            <Button target="_blank" href={url} size="small">
              Acceder
            </Button>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  )
}
