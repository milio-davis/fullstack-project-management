const router = require('express').Router();
const mongodb = require('mongodb');

// Get
router.get('/', async (req, res) => {
    console.info(`GET Request`)
    const categorias = await cargarColeccionCategorias();
    res.send(await categorias.find({}).toArray());
})

// Add
router.post('/', async (req, res) => {
    console.info(`POST Request`)
    const categorias = await cargarColeccionCategorias();
    await categorias.insertOne(req.body)
    res.status(201).send(JSON.stringify(req.body));
})

// Update
router.put('/:id', async (req, res) => {
    console.info(`UPDATE Request`)
    const categorias = await cargarColeccionCategorias();
    
    // logic
})

// Delete
router.delete('/:id', async (req, res) => {
    console.info(`DELETE Request`)
    const categorias = await cargarColeccionCategorias();
    const {id} = req.params;
    await categorias.deleteOne({id})
    res.status(200).send(`Eliminado ${id}`)
})

// tasks collection db connection
async function cargarColeccionCategorias() {
    const connectionString = 'mongodb+srv://admin:admin@tasksdb.shsak.mongodb.net/tasks?retryWrites=true&w=majority'
    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true
    })

    return client.db('tasksDb').collection('categorias')
}

module.exports = router;