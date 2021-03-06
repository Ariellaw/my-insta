const userService = require('../services/userService.js')
const connectEnsureLogin = require('connect-ensure-login')
const BASE = '/user'

function addUserRoutes (app, passport) {
  app.get(
    `${BASE}/loggedInUser`,
    (req, res, next)=>{
      next()
      return connectEnsureLogin.ensureLoggedIn()
    },
    (req, res) => {
      return res.json({ loggedInUser: req.user })
    }
  )
  app.post(`${BASE}/newUser`, (req, res) => {
    const newUser = req.body.user
    userService.createNewUser(newUser).then(mongoRes => {
      if (mongoRes.success === false) {
        return res.json({ message: mongoRes.msg })
      } else return res.json({ message: 'success' })
    })
  })

  app.post(
    `${BASE}/userNameById`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const ids = req.body.ids

      userService.getUserNamesById(ids).then(users => {
        return res.json({ users, loggedInUser: req.user })
      })
    }
  )
  app.get(
    `${BASE}/:userId`,
    (req, res) => {
      const userId = req.params.userId

      userService.getById(userId).then(user => {
        return res.json({ user })
      })
    }
  )

  app.get(
    `${BASE}/:userName/nickname`,
    // connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const userName = req.params.userName
      userService.getUserByUsername(userName).then(user => {
        return res.json({ user })
      })
    }
  )
  app.put(
    `${BASE}/:followeeId/followers`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const followeeId = req.body.followeeId
      const followerId = req.body.followerId
      userService.addFollowers(followeeId, followerId).then(users => {
        return res.json({ users, loggedInUser: req.user })
      })
    }
  )
  app.delete(
    `${BASE}/:followeeId/:followerId/followers`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const followeeId = req.params.followeeId
      const followerId = req.params.followerId

      userService.removeFollowers(followeeId, followerId).then(users => {
        return res.json({ users, loggedInUser: req.user })
      })
    }
  )
  app.delete(
    `${BASE}/:imageId/:loggedInUserId/favorites`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imageId = req.params.imageId
      const loggedInUserId = req.params.loggedInUserId

      userService
        .removeFromUserFavorites(imageId, loggedInUserId)
        .then(user => {
          return res.json({ user, loggedInUser: req.user })
        })
    }
  )
  app.put(
    `${BASE}/:imageId/favorites`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const imageId = req.body.imageId
      const loggedInUserId = req.body.loggedInUserId

      userService.addToUserFavorites(imageId, loggedInUserId).then(user => {
        return res.json({ user, loggedInUser: req.user })
      })
    }
  )
  app.get(
    `${BASE}/:userId/images`,
    (req, res) => {
      const userId = req.params.userId

      userService.getImagesByImageId(userId).then(images => {
        return res.json({ images })
      })
    }
  )

  app.put(
    `${BASE}/:userId/userDetails`,
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
      const userDetails = req.body.userDetails
      userService.updateUserDetails(userDetails).then(user => {
        return res.json({ user })
      })
    }
  )

  app.get(
    `${BASE}/searchResults/users/:keyword`,
    (req, res) => {
      const keyword = req.params.keyword
      userService.findRelevantUsers(keyword).then(users => {
        return res.json({ users, loggedInUser: req.user })
      })
    }
  )
}

module.exports = addUserRoutes
