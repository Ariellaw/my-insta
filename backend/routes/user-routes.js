const express = require('express')
const userService = require('../services/userService.js')
const BASE = '/user'
const app = express()

function addUserRoutes(app) {
    app.get(`${BASE}/:userId`, (req, res) => {
        const userId = req.params.userId;
        userService.getById(userId)
            .then(user => {
                return res.json(user);
            })
    })
}

module.exports = addUserRoutes;