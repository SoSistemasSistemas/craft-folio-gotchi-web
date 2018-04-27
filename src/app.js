const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const { API_PORT } = process.env;

app.use(morgan('combined'));
app.use(cors()); // Used to cheat 'Same Origem Policy' from browsers

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(parseInt(API_PORT, 10), () => {
  console.log(`CraftFolioGotchi up and running at 0.0.0.0:${API_PORT}... :)`);
});
