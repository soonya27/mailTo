require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "허용되지 않은 요청 방식입니다." });
  }

  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_ID,
    to: process.env.GOOGLE_ID,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "메일이 성공적으로 전송되었습니다!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "메일 전송 실패" });
  }
};
