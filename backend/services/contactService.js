const nodemailer = require('nodemailer')
const senderMail = 'contactform333@yahoo.com'
const password = 'ykocmkdhfczbodai'

function sendMessage (mailReceivers, subject, html) {
  return emailTransporter.sendMail(getMailOptions(mailReceivers, subject, html))
}

const emailTransporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  service: 'yahoo',
  secure: false,
  auth: {
    user: senderMail,
    pass: password
  },
  debug: false,
  logger: true
})

function getMailOptions (mailReceivers, subj, content) {
  // set the options and return them
  return {
    from: senderMail,
    to: mailReceivers,
    subject: subj,
    html: content
  }
}

module.exports = {
  sendMessage
}
