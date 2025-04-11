const express = require('express');
const cors = require('cors')
const { PUERTO } = require('./src/variablesEntorno');
const routes = require('./src/api/endPoint')

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
}))

/**
 * Delegar eñ manejo de rutas
 */
app.use('/', routes);

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`);
});

