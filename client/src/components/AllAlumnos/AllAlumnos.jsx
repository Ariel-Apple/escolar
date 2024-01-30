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
import styles from "./AllAlumnos.module.css";
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


export default function AllAlumnos() {
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

  return (
    <>
      <div>
       

    
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
