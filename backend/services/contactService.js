const nodemailer = require('nodemailer');
const senderMail = "contactform333@yahoo.com";
const password = "ykocmkdhfczbodai";

 function sendMessage (mailReceivers, subject, html) {
    // send an email]
    console.log("the sendmessage function is working",  subject, html)
  return emailTransporter.sendMail(
      getMailOptions(mailReceivers, subject, html)
    //   function (error, info) {
    //     if (error) {
    //         console.log("error", error)
    //       return Promise.resolve(error);
    //     } else {
    //       console.log("info.response", info.response);
    //     //   return Promise.resolve(info.response);
    //     }
    //   }
    )
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


// function sendMessage(){

// var transporter = nodemailer.createTransport({
//     service: 'Yahoo',
//     auth: {
//       user: 'contactform333@yahoo.com',
//       pass: 'contactform'
//     }
//   });
//   var emailOptions = {
//     from: 'Please make it work <contactform333@yahoo.com>',
//     to: 'Ariellaw@gmail.com',
//     subject: 'Node Mailer Test',
//     text: "This is a message :)"
//   };

//   transporter.sendMail(emailOptions, (err, info) => {
//     if (error) {
//       console.log(error);
//     //   res.redirect('/contact_send');
//     } else {
//       console.log('Message Sent: ' + info.response);
//       console.log('Email Message: ' + emailMessage);
//     //   res.redirect('/contact_error');
//     }
//   });

// module.exports = {
//   sendHtmlMail: function (mailReceivers, subject, html) {
//     // send an email
//     emailTransporter.sendMail(
//       getMailOptions(mailReceivers, subject, html),
//       function (error, info) {
//         if (error) {
//           throw error
//         } else {
//           console.log(info.response)
//         }
//       }
//     )
//   }
// }
//Source: https://nodemailer.com/about/