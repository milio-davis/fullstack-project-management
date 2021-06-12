const router = require('express').Router();
const mongodb = require('mongodb');

// Get
router.get('/', async (req, res) => {
    console.info(`GET Request`)
    const proyectos = await cargarColeccionProyectos();
    res.send(await proyectos.find({}).toArray());
})

// Add
router.post('/', async (req, res) => {
    console.info(`POST Request`)
    const proyectos = await cargarColeccionProyectos();
    await proyectos.insertOne(req.body)
    res.status(201).send(JSON.stringify(req.body));
})

// tasks collection db connection
async function cargarColeccionProyectos() {
    const connectionString = 'mongodb+srv://admin:admin@tasksdb.shsak.mongodb.net/tasks?retryWrites=true&w=majority'
    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true
    })

    return client.db('tasksDb').collection('proyectos')
}

module.exports = router;