const mongoService = require("./mongo-services");
const userDb = "user";
const imagesDb = "post";
const ObjectId = require("mongodb").ObjectId;
const ImageService = require("./imageService");

function getUserNamesById(ids) {
  for (var i = 0; i < ids.length; i++) {
    ids[i] = new ObjectId(ids[i]);
  }
  return mongoService.connect().then(db =>
    db
      .collection(userDb)
      .find({ _id: { $in: ids } })
      .toArray()
  );
}

function createNewUser(newUser) {
  return getUserByUsername(newUser.userName).then(user => {
   if(user){
     return Promise.resolve({success:false, msg: "This username already exists in our system"});
   }
   else{
    var newUserObj = _createUserObj(newUser.userName, newUser.password, newUser.email, newUser.firstName, newUser.lastName)
     return mongoService.connect()
     .then(db => db.collection(userDb).insertOne(newUserObj));
   }
  })
}
function getById(userId) {
  const _id = new ObjectId(userId);
  return mongoService.connect().then(db => {
    return db.collection(userDb).findOne({ _id: _id });
  });
}

function getUserByUsername(userName) {
  if (userName[0] === "@") {
    userName = userName.slice(1);
  }
  return mongoService.connect().then(db => {
    return db
      .collection(userDb)
      .findOne({ userName: { $regex: `^${userName}$`, $options: "i" } });

    // return db.collection(userDb).findOne({ userName });
  });
}

function addFollowers(followeeId, followerId) {
  var prms = [];
  prms.push(
    _getListProperty(followeeId, "followers").then(followerIds => {
      if (followerIds.findIndex(id => id === followerId) === -1) {
        followerIds.push(followerId);
      }
      return mongoService.connect().then(db => {
        const collection = db.collection(userDb);
        const newLocal = collection.findOneAndUpdate(
          { _id: ObjectId(followeeId) },
          { $set: { followers: followerIds } },
          { returnOriginal: false }
        );
        return newLocal;
      });
    })
  );
  prms.push(
    _getListProperty(followerId, "followees").then(followeeIds => {
      if (followeeIds.findIndex(id => id === followeeId) === -1) {
        followeeIds.push(followeeId);
      }
      return mongoService.connect().then(db => {
        const collection = db.collection(userDb);
        const newLocal = collection.findOneAndUpdate(
          { _id: ObjectId(followerId) },
          { $set: { followees: followeeIds } },
          { returnOriginal: false }
        );
        return newLocal;
      });
    })
  );
  return Promise.all(prms);
}
function removeFollowers(followeeId, followerId) {
  var prms = [];
  prms.push(
    _getListProperty(followeeId, "followers").then(followerIds => {
      var idx = followerIds.findIndex(id => {
        return id === followerId;
      });

      if (idx !== -1) {
        followerIds.splice(idx, 1);
      }

      return mongoService.connect().then(db => {
        const collection = db.collection(userDb);
        const newLocal = collection.findOneAndUpdate(
          { _id: ObjectId(followeeId) },
          { $set: { followers: followerIds } },
          { returnOriginal: false }
        );
        return newLocal;
      });
    })
  );

  prms.push(
    _getListProperty(followerId, "followees").then(followeeIds => {
      var idx = followeeIds.findIndex(id => {
        return id === followeeId;
      });

      if (idx !== -1) {
        followeeIds.splice(idx, 1);
      }
      return mongoService.connect().then(db => {
        const collection = db.collection(userDb);
        const newLocal = collection.findOneAndUpdate(
          { _id: ObjectId(followerId) },
          { $set: { followees: followeeIds } },
          { returnOriginal: false }
        );
        return newLocal;
      });
    })
  );
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
    return mongoService
      .connect()
      .then(db =>
        db
          .collection(userDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { favorites: favoriteIds } },
            { returnOriginal: false }
          )
      );
  });
}

function addToUserFavorites(imageId, loggedInUserId) {
  const _id = new ObjectId(loggedInUserId);

  return getById(loggedInUserId).then(user => {
    var favoriteIds = user.favorites;
    var idx = favoriteIds.findIndex(id => id === imageId);

    if (idx === -1) {
      favoriteIds.push(imageId);
    }
    return mongoService
      .connect()
      .then(db =>
        db
          .collection(userDb)
          .findOneAndUpdate(
            { _id: _id },
            { $set: { favorites: favoriteIds } },
            { returnOriginal: false }
          )
      );
  });
}
function _getListProperty(userId, listName) {
  return getById(userId)
    .then(user => {
      return user[listName];
    })
    .then(res => {
      return res;
    });
}
function getImagesByImageId(userId) {
  return getById(userId).then(user => {
    var favorites = user.favorites;
    for (var i = 0; i < favorites.length; i++) {
      favorites[i] = new ObjectId(favorites[i]);
    }
    return mongoService.connect().then(db =>
      db
        .collection(imagesDb)
        .find({ _id: { $in: favorites } })
        .sort({ timePosted: -1 })
        .toArray()
    );
  });
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
    var bio = userDetails.bio||user.bio;

    return mongoService.connect().then(db =>
      db.collection(userDb).findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            profilePic: profilePic,
            bio:bio
          }
        },
        { returnOriginal: false }
      )
    );
  });
}

function findRelevantUsers(keyword) {
  return mongoService.connect().then(db =>
    db
      .collection(userDb)
      .find({
        $or: [
          { bio: { $regex: `.*${keyword}.*`, $options: "i" } },
          { userName: { $regex: `.*${keyword}.*`, $options: "i" } }
          // { hashtags: { $regex: `.*${keyword}.*`, $options: "i" } }
        ]
      })
      .limit(100)
      .sort({ userName: 1 })
      .toArray()
  );

  // .then(db =>
  //     db.collection(userDb).find({ $text: { $search: keyword, $caseSensitive: false } })
  //     .limit(100).sort({userName: 1}).toArray()
  // )
}

module.exports = {
  getById,
  removeFollowers,
  addFollowers,
  removeFromUserFavorites,
  addToUserFavorites,
  getImagesByImageId,
  updateUserDetails,
  findRelevantUsers,
  getUserByUsername,
  getUserNamesById,
  createNewUser
};

function _createUserObj(userName, password, email, firstName, lastName) {
  var user = {
    firstName,
    lastName,
    userName: userName,
    password: password,
    followees: [],
    followers: [],
    favorites: [],
    profilePic: "https://www.rd.com/wp-content/uploads/2017/10/203_The-Dogist-Puppies-760x506.jpg",
    backgroundPic: "",
    email: email,
    bio: ""
  };
  return user;
}
