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
import styles from "./Materias1er.module.css";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

export default function Materias1er() {
  const [data, setData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [info, setInfo] = React.useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://servidor-escolar.onrender.com/materias");

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
        "https://servidor-escolar.onrender.com/crearMaterias",
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
        <Button onClick={handleOpen}>+Agregar materias</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit} className={styles.InputContainer}>
              <div className={styles.postInput}>
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  required
                />
              </div>
             
              <Button type="submit" variant="contained">
                Registrar
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      {info ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Materias</StyledTableCell>
         
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name} 
                      </StyledTableCell>
  
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
