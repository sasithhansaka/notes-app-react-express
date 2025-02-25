// import nodemailer from "nodemailer";

// const sendEmail = async (req, res, next) => {
//   const { to } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: to,
//     subject: "",
//     text: ``,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);

//     res.status(200).json({
//       message: "gmail sent successfully!",
//     });
//   } catch (err) {
//     next(err);
//   }
// };



// export { sendEmail };

import nodemailer from 'nodemailer';

const sendEmail = async (req, res, next) => {
  const { to ,noteTitle,noteContent } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to, 
    subject: 'New Note Added Successfully!', 
    text: `Dear user, 
           You have successfully added a new note titled: "${noteTitle}". 
           Content: ${noteContent}
           Keep organizing your thoughts and ideas!`,
    html: `<p>Dear user,</p>
           <p>You have successfully added a new note titled: <strong>${noteTitle}</strong>.</p>
           <p>Content:</p>
           <blockquote>${noteContent}</blockquote>
           <p>Keep organizing your thoughts and ideas!</p>`, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({
      message: 'Email sent successfully!',
    });
  } catch (err) {
    console.error('Error sending email:', err);
    next(err);
  }
};

export { sendEmail };