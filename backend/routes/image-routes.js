const imageService = require("../services/imageService.js");
const BASE = "/image";

function addImageRoutes(app) {
  app.get(`${BASE}/images/:userId`, (req, res) => {
    const userId = req.params.userId;
    imageService.getImagesByUserId(userId).then(images => {
      return res.json(images);
    });
  });
  app.get(`${BASE}/image/:imageId`, (req, res) => {
    const imageId = req.params.imageId;
    imageService.getImageById(imageId).then(image => {
      return res.json(image);
    });
  });
  app.put(`${BASE}/:imageId/:commentId/edit`, (req, res) => {
    const imageId = req.params.imageId;
    const commentId = req.params.commentId;
    const newComment = req.body.newComment;
    imageService.editComment(imageId, commentId, newComment).then(image => {
      return res.json(image);
    });
  });
  app.put(`${BASE}/:imageId/comment`, (req, res) => {
    const newComment = req.body.comment;
    const imageId = req.body.imageId;
    const writerId = req.body.writerId;

    imageService.addComments(imageId, newComment, writerId).then(image => {
      return res.json(image);
    });
  });
  app.put(`${BASE}/:imageId/:commentId/deleteComment`, (req, res) => {
    imageId = req.params.imageId;
    commentId = req.params.commentId;
    imageService.deleteComment(imageId, commentId).then(image => {
      return res.json(image);
    });
  });

  app.put(`${BASE}/:imageId/likes`, (req, res) => {
    const imageId = req.body.imageId;
    const userId = req.body.userId;
    imageService.addUserLike(imageId, userId).then(image => {
      return res.json(image);
    });
  });
  app.delete(`${BASE}/:imageId/:userId/likes`, (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.params.userId;

    imageService.removeUserLike(imageId, userId).then(image => {
      return res.json(image);
    });
  });

  app.post(`${BASE}/newImage`, (req, res) => {
    const imgDetails = req.body.imgDetails;
    const image = req.body.image;
    imageService.addNewImage(imgDetails, image).then(image => {
      return res.json(image);
    });
  });

  app.get(`${BASE}/initalFeedImages`, (req, res) => {
    imageService.getInitalFeedImages().then(images => {
      return res.json(images);
    });
  });
  app.post(`${BASE}/:startingPoint/additionalFeedImages`, (req, res) => {
    const startingPoint = req.params.startingPoint;
    const currFeedImages = req.body.currFeedImages;
    imageService
      .getAdditionalFeedImages(startingPoint, currFeedImages)
      .then(images => {
        return res.json(images);
      });
  });
  app.get(`${BASE}/:startingPoint/:userId/additionalUserImages`, (req, res) => {
    const startingPoint = req.params.startingPoint;
    const userId = req.params.userId;

    imageService.additionalUserImages(startingPoint, userId).then(images => {
      return res.json(images);
    });
  });
  app.get(`${BASE}/:location/explore`, (req, res) => {
    const location = req.params.location;
    imageService.getImagesByLocation(location).then(images => {
      return res.json(images);
    });
  });
  app.get(`${BASE}/:hashtag/search`, (req, res) => {
    const hashtag = req.params.hashtag;

    imageService.getImagesByHashtag(hashtag).then(images => {
      return res.json(images);
    });
  });
}

module.exports = addImageRoutes;
