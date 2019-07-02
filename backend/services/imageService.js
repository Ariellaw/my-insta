const mongoService = require("./mongo-services");
const imagesDb = "post";
const ObjectId = require("mongodb").ObjectId;

function getImagesByUserId(userId) {
  const _id = new ObjectId(userId);
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find({ ownerId: _id })
      .sort({ timePosted: -1 })
      .toArray()
  );
}
function getImageById(imageId) {
  const _id = new ObjectId(imageId);
  return mongoService
    .connect()
    .then(db => db.collection(imagesDb).findOne({ _id: _id }));
}
function addComments(imageId, newComment, writerId) {
  const _id = new ObjectId(imageId);
  return getImageById(imageId).then(image => {
    var comments = image.comments;
    var hashtags = image.hashtags;
    var commentObj = createCommentObj(writerId, newComment);
    comments.push(commentObj);

    var tags = _getTags(newComment, hashtags);
    return mongoService
      .connect()
      .then(db =>
        db
          .collection(imagesDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { comments: comments, hashtags: tags } },
            { returnOriginal: false }
          )
      );
  });
}

function editComment(imageId, commentId, newComment) {
  const _id = new ObjectId(imageId);
  return getImageById(imageId).then(image => {
    var comments = image.comments;
    var idx = comments.findIndex(comment => comment.id === commentId);
    if (idx > -1) {
      var commentToUpdate = comments[idx];
      commentToUpdate.comment = newComment;
      commentToUpdate.timeStamp = Date.now();
      comments.splice(idx, 1, commentToUpdate);
    }
    return mongoService
      .connect()
      .then(db =>
        db
          .collection(imagesDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { comments: comments} },
            { returnOriginal: false }
          )
      );
  });
}
function addUserLike(imageId, userId) {
  const _id = new ObjectId(imageId);
  return getImageById(imageId).then(image => {
    var likes = image.likes;
    if (likes.findIndex(id => id === userId) === -1) {
      likes.push(userId);
    }

    return mongoService
      .connect()
      .then(db =>
        db
          .collection(imagesDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { likes: likes } },
            { returnOriginal: false }
          )
      );
  });
}
function removeUserLike(imageId, userId) {
  const _id = new ObjectId(imageId);
  return getImageById(imageId).then(image => {
    var likes = image.likes;
    var idx = likes.findIndex(id => id === userId);
    if (idx !== -1) {
      likes.splice(idx, 1);
    }
    return mongoService
      .connect()
      .then(db =>
        db
          .collection(imagesDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { likes: likes } },
            { returnOriginal: false }
          )
      );
  });
}

function addNewImage(imgDetails, image) {
  var tags = _getTags(imgDetails.text, []);
  var imgObj = _createImgObj(imgDetails, image, tags);
  return mongoService
    .connect()
    .then(db => db.collection(imagesDb).insertOne(imgObj));
}
function getInitalFeedImages() {
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find()
      .limit(5)
      .sort({ _id: -1 })
      .toArray()
  );
}
function getAdditionalFeedImages(startingPoint, currFeedImages) {
  var last_id = new ObjectId(startingPoint);
  // var ids = _getIds(currFeedImages);
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find({ _id: { $lt: last_id } })
      .limit(2)
      .sort({ _id: -1 })
      .toArray()
  );
}
function additionalUserImages(startingPoint, userId) {
  var last_id = new ObjectId(startingPoint);
  var userId = new ObjectId(userId);

  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find({ _id: { $lt: last_id }, ownerId: userId })
      .limit(4)
      .sort({ _id: -1 })
      .toArray()
  );
}
function getImagesByUserId(userId) {
  const _id = new ObjectId(userId);
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find({ ownerId: _id })
      .limit(24)
      .sort({ _id: -1 })
      .toArray()
  );
}
function getImagesByLocation(location) {
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find({ location: { $regex: `^${location}$`, $options: "i" } })
      .limit(100)
      .sort({ timePosted: -1 })
      .toArray()
  );
}

function getImagesByHashtag(hashtag) {

  hashtag = "#" + hashtag.toLowerCase();
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb)
      .find({ hashtags: hashtag })
      .limit(100)
      .sort({ timePosted: -1 })
      .toArray()
  );
}
function deleteComment(imageId, commentId) {
  var _id = new ObjectId(imageId);
  return getImageById(imageId).then(image => {
    var comments = image.comments;
    var idx = comments.findIndex(comment => comment.id === commentId);
    if (idx > -1) {
      comments.splice(idx, 1);
    }

    return mongoService
      .connect()
      .then(db =>
        db
          .collection(imagesDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { comments: comments } },
            { returnOriginal: false }
          )
      );
  });
}

function deleteImage(imgId){
  var _id = new ObjectId(imgId);
  return mongoService.connect().then(db =>
    db
      .collection(imagesDb).findOneAndDelete({ _id: _id })
  )

}
module.exports = {
  deleteImage,
  getImagesByUserId,
  getImageById,
  addComments,
  addUserLike,
  removeUserLike,
  addNewImage,
  getInitalFeedImages,
  getAdditionalFeedImages,
  getImagesByLocation,
  getImagesByHashtag,
  createCommentObj,
  additionalUserImages,
  deleteComment,
  editComment
};

function _getTags(newComment, hashtags) {
  var regex = /\r?\n|\r/;

  if (!newComment) {
    return hashtags;
  }
  newComment = newComment.split(" ");
  var newHashtags = newComment.filter(hashtag => hashtag[0] === "#");

  newHashtags.forEach(hashtag => {
    hashtag = hashtag.toLowerCase();
    hashtag = hashtag.replace(regex, "");
    if (hashtags.findIndex(fhashtag => fhashtag === hashtag) === -1) {
      hashtags.push(hashtag);
    }
  });
  return hashtags;
}
function _createImgObj(imgDetails, image, tags) {
  var comment = createCommentObj(imgDetails.ownerId, imgDetails.text);
  //TODO - change word text to comment
  var comments = [];
  var timeStamp = Date.now();
  comments.push(comment);

  var imgObj = {
    image: image,
    ownerId: ObjectId(imgDetails.ownerId),
    comments: comments,
    hashtags:tags,
    likes: [],
    timePosted: timeStamp,
    location: imgDetails.location
  };
  return imgObj;
}
function createCommentObj(writerId, comment) {
  var id = _makeId((length = 10));
  var timeStamp = Date.now();
  var comment = { writerId, comment, timeStamp, id };
  return comment;
}

function _makeId(length = 10) {
  var id = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}
