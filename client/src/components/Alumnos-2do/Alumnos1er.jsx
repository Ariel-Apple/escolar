import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./Alumnos2do.module.css";
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

export default function Alumnos2do() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [info, setInfo] = React.useState({
    nombre: "",
    generación: "",
    estado_civil: "",
    ubicacion_laboral: "",
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
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error al capturar la data:", error);
      }
    };

    fetchData();
  }, []);



  const pdfContent = (
    <div className={styles.boletin_container_pdf}>
      <table className={styles.boletin_table}>
        <thead>
          <tr>
          <th>Generación</th>

<th>Nombre</th>
<th>Email</th>
<th>Teléfono</th>
<th>Estado civíl</th>
<th>Trabajo</th>
<th>Puesto</th>
<th> Ubicación laboral</th>



<th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (row) =>
              row.estado === "activo" && row.año === "2do" ? (
                <tr key={row.id}>
                <td>{row.generación}</td>

                <td>{row.nombre}</td>
                <td>{row.correo}</td>
                <td>{row.telefono}</td>
                <td>{row.estado_civil}</td>
                <td>{row.trabajo}</td>
                <td>{row.puesto}</td>
                <td>{row.ubicacion_laboral}</td>




                <td>{row.estado}</td>
              </tr>
              ): null
          )}
        </tbody>
      </table>
    </div>
  );

  const generatePdf = async (e) => {
    e.preventDefault();

    setLoading(true);

    const contentDiv = document.createElement("div");
    contentDiv.id = "pdfContent";
    contentDiv.innerHTML = ReactDOMServer.renderToString(pdfContent);

    try {
      const pdfOutput = await html2pdf(contentDiv, {
        margin: 10,
        filename: "formulario.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
      });

      pdfOutput.save("formulario.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className={styles.search}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Buscar por nombre..."
          />
        </div>
        <Box sx={{ display: "flex", gap: "2em" }}>
        
          <Button variant="contained" onClick={generatePdf} disabled={loading}>
            {loading ? "Generando PDF..." : "Descargar"}
          </Button>
        </Box>
       

        {data.length > 0 ? (
          <div className={styles.boletin_container}>
            <table className={styles.boletin_table}>
              <thead>
                <tr>
                <th>Generación</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter(
                    (row) =>
                      row.estado === "activo" &&
                      row.nombre
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) && 
                        row.año === "2do"

                  )
                  .map(
                    (row) =>
                      row.estado === "activo" && (
                        <tr key={row.id}>
                          <td>{row.generación}</td>

                          <td>
                            <Link
                              className={styles.decoration_Link}
                              to={`/alumnos/${row.id}`}
                            >
                              {row.nombre}
                            </Link>
                          </td>
                          <td>{row.correo}</td>
                          <td>{row.telefono}</td>
                          <td>{row.estado}</td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}
