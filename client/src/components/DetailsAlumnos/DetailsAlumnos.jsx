import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './DetailsAlumnos.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DetailsAlumnos() {
  const { alumnoId, materiaId } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
console.log(data);
  const [info, setInfo] = React.useState({
    nota1: "",
    nota2: "",
    nota3: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://servidor-escolar.onrender.com/alumnos/${alumnoId}`);
        const fetchedData = response.data;
        setData(fetchedData); // Asegúrate de manejar el caso en el que Materia sea undefined o nulo
      } catch (error) {
        console.error('Error al capturar la data:', error);
      }
    };

    fetchData();
  }, [alumnoId]);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://servidor-escolar.onrender.com/alumnos/${data.id}/${materiaId}`,
        info
      );
      const res = response.data;
      console.log("Respuesta del servidor:", res);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div>
      <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información de {data.name} </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre completo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.nombre} </dd>
          </div>
      
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Correo electrónico</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.correo}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Telefóno</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.telefono}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Generación</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.generación}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estado civil</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.estado_civil}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Lugar de nacimiento </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.lugar_de_nacimiento}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Trabajo </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.trabajo}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Puesto </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.puesto}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estado</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.estado}</dd>
          </div>
       
 
        </dl>
      </div>
    </div>
      <div className={styles.boletin_container}>
        <table className={styles.boletin_table}>
          <thead>
            <tr>
              <th>Materia</th>
              <th>1er</th>
              <th>2er</th>
              <th>3er</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.Materia && data.Materia.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.nota1}</td>
                <td>{row.nota2}</td>
                <td>{row.nota3}</td>
                <td>
                  <Link to= {`/materias-1er/${data.id}/${row.id}`}>
                  <button onClick={handleOpen}>
                    Editar
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>{data.name}</h1>
          <form onSubmit={handleSubmitUpdate} className={styles.InputContainer}>
            <div className={styles.postInput}>
              <label htmlFor="">1er</label>
              <input
                type="text"
                name="nota1"
                value={info.nota1}
                onChange={(e) => setInfo({...info, nota1: e.target.value})}
              />
            </div>
            <div className={styles.postInput}>
              <label htmlFor="">2do</label>
              <input
                type="text"
                name="nota2"
                value={info.nota2}
                onChange={(e) => setInfo({...info, nota2: e.target.value})}
              />
            </div>
            <div className={styles.postInput}>
              <label htmlFor="">3er</label>
              <input
                type="text"
                name="nota3"
                value={info.nota3}
                onChange={(e) => setInfo({...info, nota3: e.target.value})}
              />
            </div>
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
