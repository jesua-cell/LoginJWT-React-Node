/**
 * Funciones de cada ruta:
 */

const connection = require('../models/conexionDB');

module.exports.ping = (req, res) => {
    const consult = 'SELECT * FROM login';

    try {
        connection.query(consult, (err, result) => {
            console.log(result);
            res.json(result)
        })
    } catch (error) {

    }
}

module.exports.inicio = (req, res) => {
    res.send("Mondongo")
}