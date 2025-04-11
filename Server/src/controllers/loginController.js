const connection = require('../models/conexionDB');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {

    /**
     * Obtiene los datos del Frontd
     */
    const { username, password } = req.body
    /**
     * Valida si los datos coinciden con la BD
     */
    const consult = "SELECT * FROM login WHERE username = ? AND password = ?";

    try {
        /**
         * Ejecuta la consulta MySql
         */
        connection.query(consult, [username, password], (err, result) => {
            if (err) { res.send(err) };

            if (result.length > 0) {

                const token = jwt.sign({username}, "Stack", {
                    expiresIn: '3m'
                });
                res.send({token});
            } else { 
                message: "Usuario no existe";
                console.log("Usuario no existe");
                res.send("Usuario no existe");
            }
        })
    } catch (error) {

    }

}

