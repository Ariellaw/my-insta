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
}

module.exports = addImageRoutes;