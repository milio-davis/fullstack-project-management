const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const proyectos = require('./routes/api/proyectos');
app.use('/api/proyectos', proyectos)

const categorias = require('./routes/api/categorias');
app.use('/api/categorias', categorias)

const integrantes = require('./routes/api/integrantes');
app.use('/api/integrantes', integrantes)


if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))