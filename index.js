const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Creating Express App
const app = express();

// Using middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hot Coffee Server is Boiling!!!');
})

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63zdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // Creating Database
        const coffeesCollection = client.db('EspressoEmporium').collection('coffees');

        // Create Coffees
        app.post('/coffees', async (req, res) => {
            const data = req.body;
            console.log(data);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(PORT);