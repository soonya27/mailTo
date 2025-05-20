// api/send.js
const sendMail = require("../utils/sendMail");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subject, message } = req.body;

  try {
    const info = await sendMail({ subject, message });
    return res.status(200).json({ message: "이메일 전송 성공", info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "이메일 전송 실패", error: err.toString() });
  }
};
