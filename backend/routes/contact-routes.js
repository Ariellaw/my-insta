const contactService = require('../services/contactService')
const BASE = '/contact'
const connectEnsureLogin = require('connect-ensure-login')

function addContactRoutes (app) {
  console.log('ROUTES IS WORKING')
  app.post(`${BASE}`, (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const subject = req.body.subject
    const message = req.body.message
    const myEmail = 'Ariellaw@gmail.com'
    var emailTemplate = createHTMLMailTemplate(name, email, mobile, message)
    contactService
      .sendMessage(myEmail, subject, emailTemplate)
      .then(mailResult => {
        console.log('mailResult', mailResult)
        return res.json(mailResult)
      })
      .catch(err => {
        console.log('mailResult err', err)
        return res.json(err)
      })
  })
}

function createHTMLMailTemplate (name, email, mobile, message) {
  return `<div><p>Name:${name}</p> <p>Email:${email}</p><p>Number:${mobile}</p><p>Message:${message}</p></div>`
}

module.exports = addContactRoutes
