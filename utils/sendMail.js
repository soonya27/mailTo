const nodemailer = require("nodemailer");

// 공통 로직
async function sendMail({ subject, message, email }) {
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
        text: `${email}님이 보낸 메일입니다.\n\n${message}`,
      },
      (err, info) => {
        if (err) reject(err);
        else resolve(info);
      }
    );
  });
}

module.exports = sendMail;
