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
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import TextField from "@mui/material/TextField";



export default function AllAlumnos() {
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [generationSearchTerm, setGenerationSearchTerm] = React.useState("");
  
  
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
        {data && data.map((row) => (
          
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
        ))}
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
       <Box sx={{display: 'flex', justifyContent: 'center', gap: '2em'}}>

      <div className={styles.search}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Buscar por nombre..."
          />
        </div>
        <div className={styles.search}>
          <TextField
            value={generationSearchTerm}
            onChange={(e) => setGenerationSearchTerm(e.target.value)}
            label="Buscar por generación..."
          />
        </div>
       </Box>

  
          <Button variant="contained" onClick={generatePdf} disabled={loading}>
            {loading ? "Generando PDF..." : "Descargar"}
          </Button>
    
        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Generación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {data && data.filter(
                (row) =>
                row.nombre
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) &&
                row.generación
                  .toLowerCase()
                  .includes(generationSearchTerm.toLowerCase())
            )
                  .map(
                    (row) =>
                <tr key={row.id}>
                  
                  <td><Link className={styles.decoration_Link} to={`/alumnos/${row.id}`}>{row.nombre}</Link></td>
                
                  <td>{row.correo}</td>
                  <td>{row.telefono}</td>
                  <td>{row.generación}</td>

                  <td>{row.estado}</td>

                </tr>
              )}
            </tbody>
          </table>
        </div>
  
    </div>

    </>
  );
}
