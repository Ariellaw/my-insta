const mongoService = require('./mongo-services');
const userDb = 'user';
const imagesDb = 'post';
const ObjectId = require('mongodb').ObjectId;
const ImageService = require('./imageService')


function getById(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db =>{
            return db.collection(userDb).findOne({ "_id": _id })
        })
}

//find out w

function addFollowers(followeeId, followerId) {

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
        var idx = followerIds.findIndex(id => {
            return id === followerId
        });

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
            return id === followeeId
        });

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
function removeFromUserFavorites(imageId, loggedInUserId) {

    const _id = new ObjectId(loggedInUserId);

    return getById(loggedInUserId).then(user => {
        var favoriteIds = user.favorites;
        var idx = favoriteIds.findIndex(id => id === imageId);
        if (idx !== -1) {
            favoriteIds.splice(idx, 1);
        }
        return mongoService.connect()
            .then(db =>
                db.collection(userDb).findOneAndUpdate({ "_id": _id }, { $set: { 'favorites': favoriteIds } }, { returnOriginal: false })

            )
    })
}


function addToUserFavorites(imageId, loggedInUserId) {

    const _id = new ObjectId(loggedInUserId);

    return getById(loggedInUserId).then(user => {
        var favoriteIds = user.favorites;
        var idx = favoriteIds.findIndex(id => id === imageId);

        if (idx === -1) {
            favoriteIds.push(imageId);

        }
        return mongoService.connect()
            .then(db =>
                db.collection(userDb).findOneAndUpdate({ "_id": _id }, { $set: { 'favorites': favoriteIds } }, { returnOriginal: false })

            )
    })
}
function _getListProperty(userId, listName) {
    return getById(userId).then(user => {
        return user[listName];
    })
        .then(res => { return res; })
}
function getImagesByImageId(userId) {
    var prms = [];


    return getById(userId).then(user => {
        var favorites = user.favorites;
        // for (var i = 0; i < favorites.length; i++) {
            var imageId = favorites[0];
            var _id = new ObjectId(imageId);
         mongoService.connect()
                .then(db =>
                    db.collection(imagesDb).findOne({ '_id': _id })
                )
        // }
        return Promise.all(prms)
    })
    .then(results => {
        return results;
    })
}

module.exports = {
    getById,
    removeFollowers,
    addFollowers,
    removeFromUserFavorites,
    addToUserFavorites,
    getImagesByImageId

}