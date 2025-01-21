import nodemailer from "nodemailer";

const verificationCodes = {};
const codeExpiryTime = 5 * 60 * 1000;

const sendEmail = async (req, res, next) => {
  const { to } = req.body;

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  verificationCodes[to] = { code: verificationCode, createdAt: Date.now() };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "Your Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({
      message: "Verification code sent successfully!",
      code: verificationCode,
    });
  } catch (err) {
    next(err);
  }
};

const verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email]) {
    const { code: storedCode, createdAt } = verificationCodes[email];

    if (Date.now() - createdAt > codeExpiryTime) {
      delete verificationCodes[email];
      return res
        .status(400)
        .json({ message: "Verification code has expired." });
    }

    if (storedCode === code) {
      delete verificationCodes[email];
      return res.status(200).json({ message: "Verification successful!" });
    } else {
      return res.status(400).json({ message: "Invalid verification code." });
    }
  } else {
    return res
      .status(400)
      .json({ message: "No verification code sent for this email." });
  }
};

export { sendEmail, verifyCode };
