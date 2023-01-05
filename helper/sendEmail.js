const nodemailer = require("nodemailer");
require('dotenv').config()


 function sendEmail(email, message, subject) {
  
    const transport = nodemailer.createTransport({
      host:"smtp.mailtrap.io",
      port:2525,
      secure: false,
      auth: {
        user: '0c3804aa601ee5',
        pass:'b1e5ef36b5ef91'
      }
    });
    

  return transport.sendMail({
    from: 'BUSA', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text:'test', // plain text body
    html: message, // html body
    // attachments:[
    //   {
    //     filename:'QRcode.png',
    //     path:'./QRcode.png'
    //   }
    // ]
  });


}




 function sendQr(email,message,subject) {
  
    const transport = nodemailer.createTransport({
      host:"smtp.mailtrap.io",
      port:2525,
      secure: false,
      auth: {
        user: '0c3804aa601ee5',
        pass:'b1e5ef36b5ef91'
      }
    });
    

  return  transport.sendMail({
    from: '"Busa" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text:'test', // plain text body
    html:message, // html body
    attachments:[
      {
        filename:'QRcode.png',
        path:'./QRcode.png'
      }
    ]
  });

 
  
}



  module.exports = {sendEmail, sendQr};