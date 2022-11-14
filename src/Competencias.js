import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function Competencias() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleInputChange = (_, value) =>
    setSearchText(removeDiacritics(value).toLowerCase())

  return (
    <>
      <Button onClick={handleOpen}>Ver competencias</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img src="/images/competencias.jpg" style={{ maxWidth: '100%' }} />
        </Box>
      </Modal>
    </>
  )
}
