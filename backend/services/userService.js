const mongoService = require('./mongo-services');
const userDb = 'user';
const imagesDb = 'post';
const ObjectId = require('mongodb').ObjectId;
const ImageService = require('./imageService')


function getById(userId) {
    // if(userId === "undefined") {
    //     console.log("undifed user")
    //     return null}
    // console.log("dsad", userId)
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => {
            return db.collection(userDb).findOne({ "_id": _id })
        })
}
function getByUserName(username){
    return mongoService.connect()
        .then(db => {
            return db.collection(userDb).findOne({"userName": username})
        })
}

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

    return getById(userId).then(user => {
        var favorites = user.favorites;
        for (var i = 0; i < favorites.length; i++) {
            favorites[i] = new ObjectId(favorites[i]);
        }
            return mongoService.connect()
                .then(db =>
                    db.collection(imagesDb).find({ "_id": { "$in": favorites } }).sort({timePosted:-1}).toArray()
                )
   

    })
}
    function updateUserDetails(userDetails) {
        var userId = userDetails._id;
        const _id = new ObjectId(userId);

        return getById(userId).then(user => {
            var firstName = userDetails.firstName || user.firstName;
            var lastName = userDetails.lastName || user.lastName;
            var email = userDetails.email || user.email;
            var userName = userDetails.userName || user.userName;
            var profilePic = userDetails.profilePic || user.profilePic;


            return mongoService.connect()
                .then(db =>
                    db.collection(userDb).findOneAndUpdate({ "_id": _id },
                        { $set: { 'firstName': firstName, 'lastName': lastName, 'email': email, 'userName': userName, 'profilePic': profilePic } }, { returnOriginal: false })

                )
        })
    }

    function findRelevantUsers(keyword){
        return mongoService.connect()
            .then(db => 
                db.collection(userDb).find({ $text: { $search:  "\"lorem\"" } }, {$caseSensitive: false})
                .limit(100).sort({userName: -1}).toArray()
            )
    }
   

    module.exports = {
        getById,
        removeFollowers,
        addFollowers,
        removeFromUserFavorites,
        addToUserFavorites,
        getImagesByImageId,
        updateUserDetails,
        getByUserName,
        findRelevantUsers

    }