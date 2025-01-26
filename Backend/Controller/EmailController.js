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
  const { to } = req.body;

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
    subject: 'Profile Upgrade to Pro Version', // Subject of the email
    text: `Dear user, 
           You have successfully upgraded your profile to the Pro version. 
           Enjoy the enhanced features and benefits! 
           Thank you for using our service.`,
    html: `<p>Dear user,</p>
           <p>You have successfully upgraded your profile to the <strong>Pro version</strong>.</p>
           <p>Enjoy the enhanced features and benefits!</p>
           <p>Thank you for using our service.</p>`, 
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
