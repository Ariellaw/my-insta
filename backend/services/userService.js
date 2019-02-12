const mongoService = require('./mongo-services');
const userDb = 'user';
const ObjectId = require('mongodb').ObjectId;


function getById(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db =>
            db.collection(userDb).findOne({ "_id": _id })
        )
}

//find out w

function addFollowers(followeeId, followerId) {
    console.log(Date.now(),"addFollowers - start");

    var prms = [];
    prms.push(_getListProperty(followeeId, 'followers').then(followerIds => {
        if (followerIds.findIndex(id => id === followerId) === -1) {
            followerIds.push(followerId);
        }
        return mongoService.connect()
            .then(db => {
                const collection = db.collection(userDb);
                const newLocal = collection.findOneAndUpdate({ "_id": ObjectId(followeeId) },
                    { $set: { 'followers': followerIds } }, { returnOriginal: false });
                return newLocal;

            })
    }))
    prms.push(_getListProperty(followerId, 'followees').then(followeeIds => {

        if (followeeIds.findIndex(id => id === followeeId) === -1) {
            followeeIds.push(followeeId);

        }
        return mongoService.connect()
            .then(db => {
                const collection = db.collection(userDb);
                const newLocal = collection.findOneAndUpdate({ "_id": ObjectId(followerId) },
                    { $set: { 'followees': followeeIds } }, { returnOriginal: false });
                return newLocal;

            })
    }))
    return Promise.all(prms);
}
function removeFollowers(followeeId, followerId) {
    var prms = [];
    prms.push(_getListProperty(followeeId, 'followers').then(followerIds => {
        var idx = followerIds.findIndex(id=>  {
            return id === followerId});

        if (idx !== -1) {
            followerIds.splice(idx, 1);
        }

        return mongoService.connect()
            .then(db => {
                const collection = db.collection(userDb);
                const newLocal = collection.findOneAndUpdate({ "_id": ObjectId(followeeId) },
                    { $set: { 'followers': followerIds } }, { returnOriginal: false });
                return newLocal;

            })
    }))
    prms.push(_getListProperty(followerId, 'followees').then(followeeIds => {

        var idx = followeeIds.findIndex(id => {
            return id === followeeId} );

        if (idx !== -1) {
            followeeIds.splice(idx, 1);

        }
        return mongoService.connect()
            .then(db => {
                const collection = db.collection(userDb);
                const newLocal = collection.findOneAndUpdate({ "_id": ObjectId(followerId) },
                    { $set: { 'followees': followeeIds } }, { returnOriginal: false });
                return newLocal;

            })
    }))
    return Promise.all(prms);
}

function _getListProperty(userId, listName) {
    return getById(userId).then(user => {
        return user[listName];
    })
        .then(res => { return res; })
}


module.exports = {
    getById,
    removeFollowers,
    addFollowers

}