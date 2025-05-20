// utils/sendMail.js
const nodemailer = require("nodemailer");

async function sendMail({ subject, message }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_ID,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    transporter.sendMail(
      {
        from: process.env.GOOGLE_ID,
        to: process.env.GOOGLE_ID,
        subject,
        text: message,
      },
      (err, info) => {
        if (err) reject(err);
        else resolve(info);
      }
    );
  });
}

module.exports = sendMail;
