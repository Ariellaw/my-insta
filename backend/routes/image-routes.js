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
                console.log("routes",image)
                return res.json(image);
            })
    })
}

module.exports = addImageRoutes;