import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './DetailsAlumnos.module.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


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

export default function DetailsAlumnos() {
  const { alumnoId } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


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

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(
      `https://servidor-escolar.onrender.com/alumnos/${data.id}`,
      info
    );
    const responseData = response.data;
    console.log("Respuesta del servidor:", responseData);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }

}

const handleDelete = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    const response = await axios.delete(
      `https://servidor-escolar.onrender.com/deleteAlumnos/${data.id}`,
      info
    );
    const responseData = response.data;
    console.log("Respuesta del servidor:", responseData);
  setLoading(false)

    navigate('/');
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }

}


  return (
    <div>
      <div>
      <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleUpdate} className={styles.InputContainer}>
              <div className={styles.GridInputs}>
                <div className={styles.postInput}>
                  <label htmlFor="">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={info.nombre || data.nombre ||""}
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
                    value={info.generación || data.generación ||""}
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
                  value={info.telefono || data.telefono ||""}
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
                    value={info.estado_civil || data.estado_civil ||""}
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
                    value={info.ubicacion_laboral || data.ubicacion_laboral ||""}
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
                    value={info.trabajo || data.trabajo ||""}
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
                    value={info.puesto || data.puesto ||""}
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
                    value={info.correo || data.correo ||""}
                    onChange={(e) =>
                      setInfo({ ...info, correo: e.target.value })
                    }
                    required
                  />
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
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información de {data.nombre} </h3>
      </div>
      <Button variant="contained" onClick={() => setOpen(true)}>
            Actualizar
          </Button>

          <Button variant="error" onClick={handleDelete}>
            {loading ? "Eliminando" : "Eliminar"}
          </Button>
          
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
            <dt className="text-sm font-medium leading-6 text-gray-900">Trabajo </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.trabajo}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Puesto </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.puesto}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Ubicación laboral </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.ubicacion_laboral}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estado</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.estado}</dd>
          </div>
       
 
        </dl>
      </div>
    </div>
 

    </div>
  );
}
