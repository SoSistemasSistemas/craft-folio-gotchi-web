// require('newrelic');
const path = require( 'path' );
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const { API_PORT } = process.env;

app.use(morgan('combined'));
app.use(cors()); // Used to cheat 'Same Origem Policy' from browsers

app.get('/', (req, res) => {
  res.sendFile(path.join( __dirname, './index.html'));
});

app.listen(parseInt(API_PORT, 10), () => {
  // eslint-disable-next-line
  console.log(`CraftFolioGotchi up and running... :)`);
});
