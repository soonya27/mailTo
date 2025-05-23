//local용 서버 띄우기
// node server.js -> localhost:3000 -> api호출시 sendMail.js
const express = require("express");
const bodyParser = require("body-parser");
const sendMail = require("./utils/sendMail");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // index.html 등 서빙

app.post("/api/send", async (req, res) => {
  const { subject, message, email } = req.body;

  try {
    const info = await sendMail({ subject, message, email });
    res.status(200).json({ message: "이메일 전송 성공", info });
  } catch (err) {
    res.status(500).json({ message: "이메일 전송 실패", error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`로컬 서버 실행 중 → http://localhost:${PORT}`);
});
