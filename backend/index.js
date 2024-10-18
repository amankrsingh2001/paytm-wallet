const express = require("express");
const mainRouter = require('./router/index')
const app = express()

const cors = require('cors');
const { DbConnect } = require("./db");

DbConnect()
app.use(cors());
app.use(express.json());


app.use('/api/v1', mainRouter);

app.listen(3000)