const nodemailer = require("nodemailer");
const dot = require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
