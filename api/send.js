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

  transporter.sendMail(
    {
      from: process.env.GOOGLE_ID,
      to: process.env.GOOGLE_ID,
      subject,
      text: message,
    },
    (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "이메일 전송 실패" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "이메일이 성공적으로 전송되었습니다." });
      }
    }
  );
});

module.exports = router;
