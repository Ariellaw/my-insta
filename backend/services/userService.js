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
function updateFollowers(followeeId, followerId) {
    var prms = [];
    var followers = getUpdateFollowers(followeeId, followerId, "followers");
    var followees = getUpdateFollowers(followerId, followeeId, "followees");


    return mongoService.connect()
        .then(db => {
            const collection = db.collection(userDb);
            prms.push(collection.findOneAndUpdate({ "_id": ObjectId(followeeId) },
                { $set: { 'followers': followers } },
                { returnOriginal: false }))
            prms.push(collection.findOneAndUpdate({ "_id": ObjectId(followerId) },
                { $set: { 'followees': followees } },
                { returnOriginal: false }))
                return Promise.all(prms)
        })
        .then(results => {
            return results;
        })
}

function getFollowers()

// function getUpdateFollowers(user1Id, user2Id, listToCheck) {

//      getById(user1Id).then(user1 => {

//         if (user1[listToCheck].includes(user2Id)) {
//             var idx = user1[listToCheck].findIndex(user => user._id === user2Id);
//             user1[listToCheck].splice(idx, 1);

//         } else {
//             user1[listToCheck].push(user2Id);
//         }
//          user1[listToCheck];
        
//     })

// }
module.exports = {
    getById,
    updateFollowers,
    getUpdateFollowers

}
