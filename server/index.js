const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const tasks = require('./routes/api/proyectos');
app.use('/api/proyectos', tasks)

if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))