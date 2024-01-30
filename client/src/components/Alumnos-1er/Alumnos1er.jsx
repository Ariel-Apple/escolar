import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./Alumnos1er.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Matematicas() {
  const [data, setData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [info, setInfo] = React.useState({
    nombre: "",
    generación: "",
    estado_civil: "",
    lugar_de_nacimiento: "",
    trabajo: "",
    puesto: "",
    telefono: "",
    correo: "",
    estado: "",

  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://servidor-escolar.onrender.com/alumnos");

        const data = await response.data;
        setData(data);
      } catch (error) {
        console.error("Error al capturar la data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://servidor-escolar.onrender.com/crearAlumno",
        info
      );
      const data = response.data;
      console.log("Respuesta del servidor:", data);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
      <div>
        <Button onClick={handleOpen}>+Agregar alumno</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit} className={styles.InputContainer}>
            <div className={styles.GridInputs}>
             
              <div className={styles.postInput}>
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={info.nombre}
                  onChange={(e) => setInfo({ ...info, nombre: e.target.value })}
                  required
                />
              </div>
              <div className={styles.postInput}>
                <label htmlFor="">Generación</label>

                <input
                  type="text"
                  name="generación"
                  value={info.generación}
                  onChange={(e) =>
                    setInfo({ ...info, generación: e.target.value })
                  }
                  required
                />
              </div>
              </div>

              <div className={styles.postInput}>
                <label htmlFor="">Telefono</label>

                <input
                  type="text"
                  name="telefono"
                  value={info.telefono}
                  onChange={(e) => setInfo({ ...info, telefono: e.target.value })}
                  required
                />
              </div>
              <div className={styles.GridInputs}>

              <div className={styles.postInput}>
                <label htmlFor="">Estado civil</label>

                <input
                  type="text"
                  name="estado_civil"
                  value={info.estado_civil}
                  onChange={(e) => setInfo({ ...info, estado_civil: e.target.value })}
                  required
                />
              </div>
              <div className={styles.postInput}>
                <label htmlFor="">Lugar de nacimiento</label>

                <input
                  type="text"
                  name="lugar_de_nacimiento"
                  value={info.lugar_de_nacimiento}
                  onChange={(e) => setInfo({ ...info, lugar_de_nacimiento: e.target.value })}
                  required
                />
              </div>
              </div>

              <div className={styles.GridInputs}>

              <div className={styles.postInput}>
                <label htmlFor="">Trabajo</label>

                <input
                  type="text"
                  name="trabajo"
                  value={info.trabajo}
                  onChange={(e) => setInfo({ ...info, trabajo: e.target.value })}
                  required
                />
              </div>

              <div className={styles.postInput}>
                <label htmlFor="">Puesto</label>

                <input
                  type="text"
                  name="puesto"
                  value={info.puesto}
                  onChange={(e) => setInfo({ ...info, puesto: e.target.value })}
                  required
                />
              </div>
              </div>

           


              <div className={styles.GridInputs}>

            

              <div className={styles.postInput}>
                <label htmlFor="">Correo electrónico</label>

                <input
                  type="email"
                  name="correo"
                  value={info.correo}
                  onChange={(e) => setInfo({ ...info, correo: e.target.value })}
                  required
                />
              </div>

              <div className={styles.postInput}>
                <label htmlFor="">Estado</label>

                <select  name="estado" onChange={(e) => setInfo({ ...info, estado: e.target.value })}>
                  <option value="">Seleccionar el estado</option>
                  <option value="activo">Activo</option>
                  <option value="concluyo">Concluyo</option>

                </select>

            {/*     <input
                  type="email"
                  name="correo"
                  value={info.correo}
                  onChange={(e) => setInfo({ ...info, correo: e.target.value })}
                  required
                /> */}
              </div>
              </div>
              <Button type="submit" variant="contained">
                Registrar
              </Button>
            </form>
          </Box>
        </Modal>

    
        {info ? (
        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((row) => (
                
                <tr key={row.id}>
                  
                  <td><Link className={styles.decoration_Link} to={`/alumnos-1er/${row.id}`}>{row.nombre}</Link></td>
                
                  <td>{row.correo}</td>
                  <td>{row.telefono}</td>
                  <td>{row.estado}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
  
    </div>

   
    </>
  );
}
