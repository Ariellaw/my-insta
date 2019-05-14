const imageService = require("../services/imageService.js");
const BASE = "/image";
const connectEnsureLogin = require("connect-ensure-login");

function addImageRoutes(app) {
  app.get(
    `${BASE}/images/:userId`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const userId = req.params.userId;
      imageService.getImagesByUserId(userId).then(images => {
        return res.json({ images});
      });
    }
  );
  app.get(
    `${BASE}/image/:imageId`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imageId = req.params.imageId;
      imageService.getImageById(imageId).then(image => {
        return res.json({ image});
      });
    }
  );
  app.put(
    `${BASE}/:imageId/:commentId/edit`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imageId = req.params.imageId;
      const commentId = req.params.commentId;
      const newComment = req.body.newComment;
      imageService.editComment(imageId, commentId, newComment).then(image => {
        return res.json({image,  loggedInUser: req.user});
      });
    }
  );
  app.put(
    `${BASE}/:imageId/comment`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const newComment = req.body.comment;
      const imageId = req.body.imageId;
      const writerId = req.body.writerId;

      imageService.addComments(imageId, newComment, writerId).then(image => {
        return res.json({image,  loggedInUser: req.user});
      });
    }
  );
  app.put(
    `${BASE}/:imageId/:commentId/deleteComment`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      imageId = req.params.imageId;
      commentId = req.params.commentId;
      imageService.deleteComment(imageId, commentId).then(image => {
        return res.json({image,  loggedInUser: req.user});
      });
    }
  );

  app.put(
    `${BASE}/:imageId/likes`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imageId = req.body.imageId;
      const userId = req.body.userId;
      imageService.addUserLike(imageId, userId).then(image => {
        return res.json({image,  loggedInUser: req.user});
      });
    }
  );
  app.delete(
    `${BASE}/:imageId/:userId/likes`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imageId = req.params.imageId;
      const userId = req.params.userId;

      imageService.removeUserLike(imageId, userId).then(image => {
        return res.json({image,  loggedInUser: req.user});
      });
    }
  );

  app.post(
    `${BASE}/newImage`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imgDetails = req.body.imgDetails;
      const image = req.body.image;
      imageService.addNewImage(imgDetails, image).then(image => {
        return res.json({image,  loggedInUser: req.user});
      });
    }
  );

  app.get(
    `${BASE}/initalFeedImages`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      imageService.getInitalFeedImages().then(images => {
        return res.json({images,  loggedInUser: req.user});
      });
    }
  );
  app.post(
    `${BASE}/:startingPoint/additionalFeedImages`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const startingPoint = req.params.startingPoint;
      const currFeedImages = req.body.currFeedImages;
      imageService
        .getAdditionalFeedImages(startingPoint, currFeedImages)
        .then(images => {
          return res.json({images,  loggedInUser: req.user});
        });
    }
  );
  app.get(
    `${BASE}/:startingPoint/:userId/additionalUserImages`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const startingPoint = req.params.startingPoint;
      const userId = req.params.userId;

      imageService.additionalUserImages(startingPoint, userId).then(images => {
        return res.json({images,  loggedInUser: req.user});
      });
    }
  );
  app.get(
    `${BASE}/:location/explore`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const location = req.params.location;
      imageService.getImagesByLocation(location).then(images => {
        return res.json({images,  loggedInUser: req.user});
      });
    }
  );
  app.get(
    `${BASE}/:hashtag/search`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const hashtag = req.params.hashtag;

      imageService.getImagesByHashtag(hashtag).then(images => {
        return res.json({images,  loggedInUser: req.user});
      });
    }
  );
}

module.exports = addImageRoutes;
