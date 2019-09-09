const express = require('express');

const router = express.Router();

const db = require('../data/dbConfig.js');


router.get('/', (req, res) => {
    db('accounts').select()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


module.exports = router;