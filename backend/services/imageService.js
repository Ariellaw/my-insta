const mongoService = require('./mongo-services')
const imagesDb = 'post';
const ObjectId = require('mongodb').ObjectId;



function getImagesByUserId(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).find({ "ownerId": _id }).sort({timePosted:-1}).toArray()
        )
}
function getImageById(imageId) {
    console.log("backend", imageId)
    const _id = new ObjectId(imageId);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).findOne({ "_id": _id })
        )
}
module.exports = {
    getImagesByUserId,
    getImageById
}
