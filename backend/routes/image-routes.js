const express = require('express');
const userService = require('../services/userService.js');
const imageService = require('../services/imageService.js');
const BASE = '/image';
const app = express();

function addImageRoutes(app) {
    app.get(`${BASE}/images/:userId`, (req, res) => {
        const userId = req.params.userId;
        imageService.getImagesByUserId(userId)
            .then(images => {
                return res.json(images);
            })
    })
    app.get(`${BASE}/image/:imageId`, (req, res) => {
        const imageId = req.params.imageId;
        imageService.getImageById(imageId)
            .then(image => {
                return res.json(image);
            })
    })
    app.put(`${BASE}/:imageId/comment`, (req,res) =>{
        const imageId = req.body.imageId;
        const userComment = req.body.userComment;
        imageService.addComments(imageId, userComment)
            .then(commentThread =>{
                return res.json(commentThread)
            })
    })
    app.put(`${BASE}/:imageId/likes`, (req,res)=>{
        const imageId = req.body.imageId;
        const userId = req.body.userId;
        imageService.addUserLike(imageId, userId)
        .then(image =>{
            return res.json(image)
        })
    })
    app.delete(`${BASE}/:imageId/:userId/likes`, (req,res) =>{
        const imageId = req.params.imageId;
        const userId = req.params.userId;

        imageService.removeUserLike(imageId, userId)
        .then(image =>{
            return res.json(image)
        })
    })

    app.post(`${BASE}/newImage`, (req, res)=>{
        const imgObj = req.body.imgObj;

        imageService.addNewImage(imgObj)
        .then(image =>{
            return res.json(image)
        })
    })
}

module.exports = addImageRoutes;