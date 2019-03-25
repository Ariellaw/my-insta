const express = require('express')
const userService = require('../services/userService.js')
const BASE = '/user'
const BASE_REDIRECT_URL = 'http://192.168.43.54:8080'

// const app = express()

function addUserRoutes(app, passport) {
    // app.post(`${BASE}/login`, (req, res) => {
    //     var credentials = req.body.credentials;
    //     console.log("testing login", credentials);
    //     return res.json(credentials);
    // })
    app.post(`${BASE}/userNameById`, (req,res) =>{
        const ids = req.body.ids;

        userService.getUserNamesById(ids)
            .then(users =>{
                // console.log("reslt of get by Id", users)
                return res.json(users);
            })
    })
    app.get(`${BASE}/:userId`, (req, res) => {
        const userId = req.params.userId;

        userService.getById(userId)
            .then(user => {
                return res.json(user);
            })
    })

    app.get(`${BASE}/:userName/nickname`,
        // passport.authenticate('local'),
        (req, res) => {
            const userName = req.params.userName;

            userService.getUserByUsername(userName)
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
    app.delete(`${BASE}/:imageId/:loggedInUserId/favorites`, (req, res) =>{
        const imageId = req.params.imageId;
        const loggedInUserId = req.params.loggedInUserId;

        userService.removeFromUserFavorites(imageId, loggedInUserId)
            .then(user =>{
                return res.json(user);
            })
    })
    app.put(`${BASE}/:imageId/favorites`, (req, res) =>{
        const imageId = req.body.imageId;
        const loggedInUserId = req.body.loggedInUserId;

        userService.addToUserFavorites(imageId, loggedInUserId)
            .then(user =>{
                return res.json(user);
            })
    })
    app.get(`${BASE}/:userId/images`, (req,res)=>{
        const userId = req.params.userId;

        userService.getImagesByImageId(userId)
            .then(images =>{
                return res.json(images);
            })

    })

    app.put(`${BASE}/:userId/userDetails`, (req,res)=>{
        const userDetails = req.body.userDetails;
        userService.updateUserDetails(userDetails)
            .then(user =>{
                return res.json(user);
            })
    })

    app.get(`${BASE}/searchResults/users/:keyword`, (req, res) =>{
        const keyword = req.params.keyword;
        userService.findRelevantUsers(keyword)
            .then(users => {

                return res.json(users)
            } )
    })

}

module.exports = addUserRoutes;