const contactService = require('../services/contactService')
const BASE = '/contact'

function addContactRoutes (app) {
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
        return res.json(mailResult.response)
      })
      .catch(err => {
        return res.json(err)
      })
  })
}

function createHTMLMailTemplate (name, email, mobile, message) {
  return `<div><p>Name:${name}</p> <p>Email:${email}</p><p>Number:${mobile}</p><p>Message:${message}</p></div>`
}

module.exports = addContactRoutes
