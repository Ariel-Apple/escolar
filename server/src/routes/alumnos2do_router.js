const { Router }= require('express')
const router = Router();
const {Alumnos}= require('../controllers/2do/Alumnos')
const {crearAlumno}= require('../controllers/2do/crearAlumno')
const {crearMateria}= require('../controllers/2do/crearMateria');
const {detailsAlumnos}= require('../controllers/2do/detailAlumno');
const {UpdateAlumno}= require('../controllers/2do/UpdateAlumno');
const {Materias} = require('../controllers/2do/Materias');
const {DeleteAlumno} = require('../controllers/2do/DeleteAlumno');












router.get('/alumnos2do', Alumnos);
router.get('/materias', Materias);

router.get('/alumnos2do/:alumnoId', detailsAlumnos);
router.put('/alumnos2do/:alumnoId', UpdateAlumno);
router.delete('/alumnos2do/:alumnoId', DeleteAlumno);


 router.post('/crearAlumno2do', crearAlumno); 
 router.post('/crearMaterias2do', crearMateria); 
 





 




module.exports = router 