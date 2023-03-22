import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import ListItemText from '@mui/material/ListItemText'
import CourseCard from './CourseCard'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import removeDiacritics from '../data/removeDiacritics'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Competencias from 'Competencias'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const AREA_LEVEL_SEPARATOR = '-'

import {
  categories,
  areasAndLevels,
  titles,
  levels,
  coursesData,
} from 'data/coursesData'

export default function CoursesView() {
  const [courses, setCourses] = useState(coursesData)
  const [category, setCategory] = React.useState('')
  const [areas, setAreas] = React.useState([])
  const [searchText, setSearchText] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleInputChange = (_, value) =>
    setSearchText(removeDiacritics(value).toLowerCase())

  const handleAreas = (event) => {
    const {
      target: { value },
    } = event
    // On autofill we get a stringified value.
    const areasToArray = typeof value === 'string' ? value.split(',') : value

    // if removing areas, nothing to do
    if (areasToArray.length < areas.length) setAreas(areasToArray)
    else {
      const [newArea, newLevel] = areasToArray
        .filter((x) => !areas.includes(x))[0]
        .split(AREA_LEVEL_SEPARATOR)
      const filterAreas = areasToArray.filter((item) => {
        const [area, level] = item.split(AREA_LEVEL_SEPARATOR)
        return !(area === newArea && level !== newLevel)
      })
      setAreas(filterAreas)
    }
  }

  const handleCategoryChange = (_, value) => setCategory(value)

  const visibleCourses = courses
    .filter((course) => category === '' || course.Etiquetas === category)
    .filter(
      (course) => searchText === '' || course.title.indexOf(searchText) !== -1
    )
    .filter(
      (course) =>
        areas.length === 0 ||
        areas.every((item) => {
          const [area, level] = item
            .split(AREA_LEVEL_SEPARATOR)
            .map((item) => item.trim())
            .map((item) => item.split(' ')[1])
          console.log(
            area,
            course[area],
            level,
            levels.indexOf(course[area]),
            levels.indexOf(level)
          )
          return levels.indexOf(course[area]) >= levels.indexOf(level)
        })
    )

  const numCursos = visibleCourses.length
  const displayContador =
    numCursos > 1 ? (
      <p>Se han encontrado {numCursos} cursos</p>
    ) : numCursos === 0 ? (
      <p>No se ha encontrado ningún curso</p>
    ) : (
      <p>Se ha encontrado un curso</p>
    )

  return (
    <>
      <Box sx={{ maxWidth: '600px' }}>
        <Stack spacing={2}>
          <Autocomplete
            id="free-solo-demo"
            // onChange={handleChange}
            onInputChange={handleInputChange}
            freeSolo
            options={titles}
            renderInput={(params) => (
              <TextField {...params} label="Título del curso" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            onInputChange={handleCategoryChange}
            noOptionsText="No se han encontrado categorías"
            renderInput={(params) => (
              <TextField {...params} label="Categoría" />
            )}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">
              Áreas y niveles
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={areas}
              onChange={handleAreas}
              input={<OutlinedInput label="Áreas y niveles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {areasAndLevels.map((areaAndLevel) => (
                <MenuItem
                  disabled={
                    // areaAndLevel.indexOf('Nivel B2') !== -1 ||
                    areaAndLevel.indexOf('Nivel C1') !== -1 ||
                    areaAndLevel.indexOf('Nivel C2') !== -1
                  }
                  key={areaAndLevel}
                  value={areaAndLevel}
                >
                  <Checkbox checked={areas.indexOf(areaAndLevel) > -1} />
                  <ListItemText primary={areaAndLevel} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Competencias />
        </Stack>{' '}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {displayContador}
        <Grid container spacing={2}>
          {visibleCourses.map((course) => (
            <Grid key={course.id} xs={12} sm={4} md={3}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
