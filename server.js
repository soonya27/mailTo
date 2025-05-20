const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_ID,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

app.post("/send-email", (req, res) => {
  const { subject, message } = req.body;

  const mailOptions = {
    from: process.env.GOOGLE_ID,
    to: process.env.GOOGLE_ID, // 받는 사람 이메일 주소
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "메일 전송 실패" });
    } else {
      res.status(200).json({ message: "메일이 성공적으로 전송되었습니다!" });
    }
  });
});

app.listen(3000, () => console.log("서버가 3000번 포트에서 실행 중입니다."));
