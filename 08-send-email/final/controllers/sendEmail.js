const nodemailer = require('nodemailer');

const sendEmail = async (req,res)=>{
   let testAccount = await nodemailer.createTestAccount();

 const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'esperanza.schoen@ethereal.email',
        pass: '2CJhNpZPFrFuRq4sJu'
    }
});

let info = await transporter.sendMail({
    from: '"Peter Smith" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

 

res.json({info})
}


module.exports = 
 sendEmail
