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
import styles from "./Registrar.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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

export default function Registrar() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
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
    año: "",

  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://servidor-escolar.onrender.com/crearAlumno",
        info
      );
      const responseData = response.data;
      console.log("Respuesta del servidor:", responseData);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error( error);
    }
  };

 

  return (
    <>
      <div>
  
    
   
          <Box sx={style}>
            <form onSubmit={handleSubmit} className={styles.InputContainer}>
              <div className={styles.GridInputs}>
                <div className={styles.postInput}>
                  <label htmlFor="">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={info.nombre}
                    onChange={(e) =>
                      setInfo({ ...info, nombre: e.target.value })
                    }
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
                  onChange={(e) =>
                    setInfo({ ...info, telefono: e.target.value })
                  }
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
                    onChange={(e) =>
                      setInfo({ ...info, estado_civil: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.postInput}>
                  <label htmlFor="">Ubicación laboral</label>

                  <input
                    type="text"
                    name="ubicacion_laboral"
                    value={info.ubicacion_laboral}
                    onChange={(e) =>
                      setInfo({ ...info, ubicacion_laboral: e.target.value })
                    }
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
                    onChange={(e) =>
                      setInfo({ ...info, trabajo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.postInput}>
                  <label htmlFor="">Puesto</label>

                  <input
                    type="text"
                    name="puesto"
                    value={info.puesto}
                    onChange={(e) =>
                      setInfo({ ...info, puesto: e.target.value })
                    }
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
                    onChange={(e) =>
                      setInfo({ ...info, correo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.postInput}>
                  <label htmlFor="">Año</label>

                  <select
                    name="estado"
                    onChange={(e) =>
                      setInfo({ ...info, año: e.target.value })
                    }
                  >
                    <option value="">Seleccionar el año</option>
                    <option value="1er">1er</option>
                    <option value="2do">2do</option>
                    <option value="3er">3er</option>
                  </select>

        
                </div>

                <div className={styles.postInput}>
                  <label htmlFor="">Estado</label>

                  <select
                    name="estado"
                    onChange={(e) =>
                      setInfo({ ...info, estado: e.target.value })
                    }
                  >
                    <option value="">Seleccionar el estado</option>
                    <option value="activo">Activo</option>
                    <option value="concluyo">Concluyo</option>
                  </select>

        
                </div>
              </div>
              <Button type="submit" variant="contained">
                Registrar
              </Button>
            </form>
          </Box>

      </div>
    </>
  );
}
