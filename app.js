const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});