const sendMail = require("../utils/sendMail");

//vercel 용 api
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subject, message, email } = req.body;

  try {
    const info = await sendMail({ subject, message, email });
    return res.status(200).json({ message: "이메일 전송 성공", info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "이메일 전송 실패", error: err.toString() });
  }
};
