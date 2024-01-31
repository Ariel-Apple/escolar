const { Router }= require('express')
const router = Router();
const {Alumnos}= require('../controllers/Alumnos')
const {crearAlumno}= require('../controllers/crearAlumno')
const {crearMateria}= require('../controllers/crearMateria');
const {detailsAlumnos}= require('../controllers/detailAlumno');
const {UpdateAlumno}= require('../controllers/UpdateAlumno');
const {Materias} = require('../controllers/Materias');
const {DeleteAlumno} = require('../controllers/DeleteAlumno');












router.get('/alumnos', Alumnos);
router.get('/materias', Materias);

router.get('/alumnos/:alumnoId', detailsAlumnos);
router.put('/alumnos/:alumnoId', UpdateAlumno);
router.delete('/deleteAlumnos/:alumnoId', DeleteAlumno);


 router.post('/crearAlumno', crearAlumno); 
 router.post('/crearMaterias', crearMateria); 
 





 




module.exports = router 