const express = require('express');
const app = express();
const routes = require('./routes');
app.use(express.json());
const db = require('./db');
app.use('/', routes);

app.listen(3333, ()=>{
    console.log('SERVIDOR RODANDO')
})