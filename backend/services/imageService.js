const mongoService = require('./mongo-services')
const imagesDb = 'post';
const ObjectId = require('mongodb').ObjectId;



function getImagesByUserId(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).find({ "ownerId": _id }).sort({ timePosted: -1 }).toArray()
        )
}
function getImageById(imageId) {
    const _id = new ObjectId(imageId);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).findOne({ "_id": _id })
        )
}
function addComments(imageId, comment, newHashtags) {
    const _id = new ObjectId(imageId);
    return getImageById(imageId).then(image => {
        var comments = image.comments;
        comments.push(comment);
        var hashtags = image.hashtags;
        hashtags = hashtags.concat(newHashtags)

        return mongoService.connect()
            .then(db =>
                db.collection(imagesDb).findOneAndUpdate({ "_id": _id },
                    { $set: { 'comments': comments, 'hashtags':hashtags } }, { returnOriginal: false }))

    })
}
function addUserLike(imageId, userId) {
    const _id = new ObjectId(imageId);
    return getImageById(imageId).then(image => {
        var likes = image.likes;
        if (likes.findIndex(id => id === userId) === -1) {
            likes.push(userId);
        }

        return mongoService.connect()
            .then(db =>
                db.collection(imagesDb).findOneAndUpdate({ "_id": _id },
                    { $set: { 'likes': likes } }, { returnOriginal: false }))

    })
}
function removeUserLike(imageId, userId) {

    const _id = new ObjectId(imageId);
    return getImageById(imageId).then(image => {
        var likes = image.likes;
        var idx = likes.findIndex(id => id === userId)
        if (idx !== -1) {
            likes.splice(idx, 1);
        }
        return mongoService.connect()
            .then(db =>
                db.collection(imagesDb).findOneAndUpdate({ "_id": _id },
                    { $set: { 'likes': likes } }, { returnOriginal: false }))

    })
}

function addNewImage(imgObj) {
    var id = imgObj.ownerId;
    imgObj.ownerId = ObjectId(id);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).insert(imgObj)
        )
}
function getInitalFeedImages() {
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).find().limit(2).sort({ timePosted: -1 }).toArray()
        )

}
function getAdditionalFeedImages(startingPoint) {

    var last_id = new ObjectId(startingPoint);

    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).find({ '_id': { '$lt': last_id } }).limit(2).sort({ timePosted: -1 }).toArray()
        )

}
function getImagesByLocation(location) {
    var upperCaseLocation = location.charAt(0).toUpperCase() + location.slice(1);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).find({ $or:[{location:location},{location:upperCaseLocation}]}).limit(100).sort({ timePosted: -1 }).toArray())
}

function getImagesByHashtag(hashtag) {
    hashtag = "#" + hashtag;
    console.log("backened", hashtag, typeof hashtag)
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).find({ hashtags: hashtag  }).limit(100).sort({ timePosted: -1 }).toArray())
}
module.exports = {
    getImagesByUserId,
    getImageById,
    addComments,
    addUserLike,
    removeUserLike,
    addNewImage,
    getInitalFeedImages,
    getAdditionalFeedImages,
    getImagesByLocation,
    getImagesByHashtag
}
