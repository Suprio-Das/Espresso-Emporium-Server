const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // Read Coffees
        app.get('/coffees', async (req, res) => {
            const data = await coffeesCollection.find().toArray();
            res.send(data);
        })

        // Read Single Coffee
        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await coffeesCollection.findOne(filter);
            console.log(result);
            res.send(result);
        })

        // Create Coffees
        app.post('/coffees', async (req, res) => {
            const data = req.body;
            const result = await coffeesCollection.insertOne(data);
            res.send(result);
        });

        // Update Coffee
        app.put('/coffees/:id', (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedCoffee = {
                $set: {
                    name: data.name,
                    chef: data.chef,
                    category: data.category,
                    supplier: data.supplier,
                    taste: data.taste,
                    details: data.details,
                    photo: data.photo,
                    price: data.price
                }
            }
            const result = coffeesCollection.updateOne(filter, updatedCoffee, options);
            res.send(result);
        })

        // Delete a Coffee
        app.delete('/coffees/:id', (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = coffeesCollection.deleteOne(filter);
            res.send(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(PORT);