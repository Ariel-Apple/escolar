import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Button1er() {
  return (
    <Stack spacing={2} direction="row">
        <Link to='alumnos-1er'>
      <Button variant="contained"> Alumnos</Button>
        </Link>
        <Link to='materias-1er'>

      <Button variant="outlined"> Materias</Button>
      </Link>

    </Stack>
  );
}