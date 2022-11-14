import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { coursesData as courses } from 'data/coursesData'
import Competencias from 'Competencias'
import { areas } from 'data/coursesData'

export default function CoursesView() {
  let { id } = useParams()

  const course = courses.filter((course) => course.id === id)[0]

  const {
    Curso: title,
    Descripción: desc,
    Objetivos: obj,
    Equiquetas: category,
    Libros: book,
    Horas: hours,
    Moodle_url: url,
  } = course

  const Desc = desc && (
    <>
      <h2>Descripción</h2>
      <ReactMarkdown>{desc}</ReactMarkdown>
    </>
  )
  const Obj = obj && (
    <>
      <h2>Objetivos</h2>
      <ReactMarkdown>{obj}</ReactMarkdown>
    </>
  )
  return (
    <>
      <h1>{title}</h1>
      <h3>Número de horas: {hours}</h3>
      {Desc}
      {Obj}
      <h2>Competencias</h2>
      <Competencias />
      <Box
        sx={{
          marginTop: '20px',
          marginBottom: '30px',
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {areas.map((area) => (
                  <TableCell key={area}>{area}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {areas.map((area) => (
                  <TableCell key={area} component="th" scope="row">
                    {course[area] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button variant="contained" target="_blank" href={url}>
        Acceder al curso
      </Button>
    </>
  )
}
