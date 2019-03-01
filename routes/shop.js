const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Ini middleware yang lain!');
    res.send('<h1>bego lu</h1>');
});

module.exports = router;