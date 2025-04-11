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

            /**
             * Validaciones de la consulta del Server:
             * 1° Si hay errores en el servidor
             * 2° Verifica si el Usuario existe
             * 3° Verifica si la contraseña coincide con la almacenada en la BD
             * 4° Si existe el Usuario le genera un token
             */
            if(err){
                return res.status(500).json({error: "Error en el servidor"});
            }
            
            if (result.length === 0) {
                return res.status(401).json({ message: "Usuario no existe" });
            }
            
            if (result[0].password !== password) {
                return res.status(401).json({ error: "Error contraseña incorrecta" });
            }
            
            if (result.length > 0) {
                const token = jwt.sign({ username }, "Stack", {
                    expiresIn: '3m'
                });
                res.send({ token });
            };

        })
    } catch (error) {

    }

}

