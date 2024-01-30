const { Router }= require('express')
const router = Router();
const {Alumnos}= require('../controllers/Alumnos')
const {crearAlumno}= require('../controllers/crearAlumno')
const {crearMateria}= require('../controllers/crearMateria');
const {detailsAlumnos}= require('../controllers/detailAlumno');
const {notasAlumnos}= require('../controllers/notasAlumnos');
const {Materias} = require('../controllers/Materias');











router.get('/alumnos', Alumnos);
router.get('/materias', Materias);

router.get('/alumnos/:alumnoId', detailsAlumnos);
router.put('/alumnos/:alumnoId/:materiaId', notasAlumnos);

 router.post('/crearAlumno', crearAlumno); 
 router.post('/crearMaterias', crearMateria); 
 





 




module.exports = router 