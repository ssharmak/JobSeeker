const nodemailer= require('nodemailer');

const sendEmail= async(to,subject,htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
         port:587,
         secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            //pass:"ccrf cdqy zuhi kjlp"
             pass:process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html:htmlContent,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;