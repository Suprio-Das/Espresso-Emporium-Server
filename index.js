const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Creating Express App
const app = express();

// Using middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hot Coffee Server is Boiling!!!');
})

app.listen(PORT);