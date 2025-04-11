/**
 * Rutas
 */
const express = require('express');
const router = express.Router()
const { ping, inicio } = require('../controllers/pingController');
const { login } = require('../controllers/loginController')
/**
 * ('/RUTA', Parametro)
 */
router.get('/ping', ping);

router.get('/', inicio);

router.post('/login', login)

/**
 * Exportar el objeto router
 */
module.exports = router