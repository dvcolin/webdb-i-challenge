const express = require('express');

const router = express.Router();

const db = require('../data/dbConfig.js');

// GET /accounts

router.get('/', (req, res) => {
    db('accounts').select()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', validateAccountId, (req, res) => {
    const { id } = req.params;
    db('accounts').where('id', id).first().select()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



function validateAccountId (req, res, next) {
    const accountBody = req.body;
    const { id } = req.params;

    db('accounts').where('id', id).first().select()
    .then(response => {
        if (response) {
            req.account = accountBody;
            next();
        } else {
            res.status(404).json({ message: 'An account with that ID could not be found.' });
        }
    })
}




module.exports = router;