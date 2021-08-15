const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'monica.conn84@ethereal.email',
      pass: 'GFTjM8gjUTc1cdQ8EB',
    },
  });

  let info = await transporter.sendMail({
    from: '"CODING ADDICT" <codingaddict@mail.com>',
    to: 'bar@example',
    subject: 'Hello ',
    html: '<h2>Sending Emails with Node.js</h2>',
  });

  res.json(info);
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'learncode@mail.com', // Change to your recipient
    from: 'learncodetutorial@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = sendEmail;
