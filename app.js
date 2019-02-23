const http = require('http');
const routes = require('./routes');

const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/add-product', (req, res, next) => {
    console.log('Middleware yang product');
    res.send('<h1>Halaman "add product"</h1>');
});

app.use('/', (req, res, next) => {
    console.log('Ini middleware yang lain!');
    res.send('<h1>bego lu</h1>');
});

// console.log(routes.tulisan)
app.listen(3000);