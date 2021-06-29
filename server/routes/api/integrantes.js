const router = require('express').Router();
const mongodb = require('mongodb');

// Get
router.get('/', async (req, res) => {
    console.info(`GET Request`)
    const integrantes = await cargarColeccionIntegrantes();
    res.send(await integrantes.find({}).toArray());
})

// Add
router.post('/', async (req, res) => {
    console.info(`POST Request`)
    const integrantes = await cargarColeccionIntegrantes();
    await integrantes.insertOne(req.body)
    res.status(201).send(JSON.stringify(req.body));
})

// Update
router.put('/:id', async (req, res) => {
    console.info(`UPDATE Request`)
    const integrantes = await cargarColeccionIntegrantes();
    
    // logic
})

// Delete
router.delete('/:id', async (req, res) => {
    console.info(`DELETE Request`)
    const integrantes = await cargarColeccionIntegrantes();
    const {id} = req.params;
    await integrantes.deleteOne({id})
    res.status(200).send(`Eliminado ${id}`)
})

// tasks collection db connection
async function cargarColeccionIntegrantes() {
    const connectionString = 'mongodb+srv://admin:admin@tasksdb.shsak.mongodb.net/tasks?retryWrites=true&w=majority'
    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true
    })

    return client.db('tasksDb').collection('integrantes')
}

module.exports = router;