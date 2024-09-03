const nodemailer = require('nodemailer');
module.exports.sendMail=async(email,subject,html)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'huy01652768373@gmail.com',
          pass: 'xeydposkjctmvsai'
        }
      });
      
      const mailOptions = {
        from: 'huy01652768373@gmail.com',
        to: email,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}