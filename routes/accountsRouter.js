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

// GET /accounts/id

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


// POST /accounts

router.post('/', validateAccount, (req, res) => {
    const account = req.body;

    db('accounts').insert(account)
    .then(added => {
        res.status(201).json(added[0]);
    })
    .catch(err => {
        res.status(500).json(err);
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

function validateAccount (req, res, next) {
    const accountBody = req.body;

    if (!Object.keys(accountBody).length) {
        res.status(400).json({ message: 'Account fields cannot be empty.' })
    } else if (!accountBody.name || !accountBody.budget) {
        res.status(400).json({ message: 'Name and budget fields cannot be empty.' })
    } else {
        next();
    }

}




module.exports = router;