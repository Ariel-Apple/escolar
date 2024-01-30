import Button1er from './components/Button1er/Button1er';
import Alumnos1er from './components/Alumnos-1er/Alumnos1er';

import Panel from './components/Panel/Panel'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Materias1er from './components/Materias-1er/Materias1er';
import DetailsAlumno from './components/DetailsAlumnos/DetailsAlumnos';
import Test from './components/test';
import Login from './components/Login/Login';
import AllAlumnos from './components/AllAlumnos/AllAlumnos';

function App() {
  return (
    <Router>


    <Routes>



      <Route path="/" element={<Panel />}>
        <Route index element={<Button1er />} />
        <Route path="alumnos-1er" element={<Alumnos1er />} />
        <Route path="alumnos-1er/:alumnoId" element={<DetailsAlumno />} />
        <Route path="materias-1er/:alumnoId/:materiaId" element={<DetailsAlumno />} />
        <Route path="alumnos" element={<AllAlumnos />} />





        <Route path="materias-1er" element={<Materias1er />} />

     
      </Route>
      <Route path="/test" element={<Test />}/>


    </Routes>
  </Router>
  );
}

export default App;
