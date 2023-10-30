const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = "Naman Ajmera <hello@naman.io>";
  }
};

const sendEmail = async (options) => {
  //  1. Create the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: "Naman Ajmera <hello@naman.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Send the email
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
