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
    const _id = new ObjectId(imageId);
    return mongoService.connect()
        .then(db =>
            db.collection(imagesDb).findOne({ "_id": _id })
        )
}
function addComments(imageId, userComment){
    const _id = new ObjectId(imageId);
    return getImageById(imageId).then(image =>{
        var comments = image.comments;
        comments.push(userComment);
   return mongoService.connect()
    .then(db =>
            db.collection(imagesDb).findOneAndUpdate({ "_id": _id },
            { $set: { 'comments': comments } }, { returnOriginal: false }))

        })
}
module.exports = {
    getImagesByUserId,
    getImageById,
    addComments
}
