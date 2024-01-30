
const { Router }= require('express');
const router = Router();
const routerAlumnos_1er_router =  require('./alumnos1er_router')

router.use('/', routerAlumnos_1er_router )

module.exports = router