const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", async (req, res) => {
  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_ID,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_ID,
      to: process.env.GOOGLE_ID,
      subject,
      text: message,
    });

    res.json({ message: "이메일이 성공적으로 전송되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "이메일 전송 실패" });
  }
});

module.exports = router;
