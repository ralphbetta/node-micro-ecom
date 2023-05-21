const nodemailer = require('nodemailer');


class EmailService{

    static async sendEmail(mailOptions){

        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
              user: process.env.SENDGRID_USERNAME,
              pass: process.env.SENDGRID_PASSWORD,
            },
          }); 
                    
        //   const mailOptions = {
        //     from: 'info@bitminingoptions.com',
        //     to: 'gxaviprank@gmail.com',
        //     subject: 'Node Test Email',
        //     html: '<p>This is the node test email.</p>',
        //   };
    
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Email sent successfully!');
            }
          });
    }
}


module.exports = EmailService;