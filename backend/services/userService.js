const mongoService = require('./mongo-services')
const userDb = 'user';
const ObjectId = require('mongodb').ObjectId;


function getById(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db =>
            db.collection(userDb).findOne({ "_id": _id })
        )
}
module.exports = {
    getById
}
