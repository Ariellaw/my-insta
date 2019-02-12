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

    app.put(`${BASE}/:followeeId/followers`, (req,res) =>{
        const followeeId = req.body.followeeId;
        const followerId = req.body.followerId;
            userService.addFollowers(followeeId, followerId)
                .then(users => {
                    return res.json(users);
                })
    })
    app.delete(`${BASE}/:followeeId/:followerId/followers`, (req,res) =>{
        const followeeId = req.params.followeeId;
        const followerId = req.params.followerId;

            userService.removeFollowers(followeeId, followerId)
                .then(users => {
                    return res.json(users);
                })
    })
    
}

module.exports = addUserRoutes;