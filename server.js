require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection established'));

app.use(express.json());

const cheatsheetsRouter = require('./routes/cheatsheets');
app.use('/cheatsheets', cheatsheetsRouter);

app.listen(3000, () => console.log('Server started'));