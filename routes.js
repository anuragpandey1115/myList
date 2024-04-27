const express = require('express');
let router = express.Router();

let myListroutes = require('./myList/index.');

router.use('/myList', myListroutes)

module.exports = router;