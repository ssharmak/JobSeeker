const nodemailer= require('nodemailer');

const sendEmail= async(to,subject,text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
         port:587,
         secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:"ccrf cdqy zuhi kjlp",
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;