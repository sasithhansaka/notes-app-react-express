import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
    const { to } = req.body; 

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

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
        subject: 'Your Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ 
            message: 'Verification code sent successfully!', 
            code: verificationCode 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            message: 'Failed to send verification code', 
            error 
        });
    }
};
