const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.GMAIL,
            pass:process.env.GPASS
        }
    });
    
    await transporter.sendMail({
        from: process.env.GMAIL,
        to:email,
        subject: 'Your OTP Code',
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4CAF50;">Your OTP Code</h2>
            <p>Dear User,</p>
            <p>Your OTP for <strong>Style Craft</strong> is:</p>
            <h1 style="color: #FF5733; text-align: center;">${otp}</h1>
            <p>This code is valid for <strong>10 minutes</strong>.</p>
            <p>If you did not request this code, please ignore this email.</p>
            <br />
            <p>Thanks,</p>
            <p><strong>Style Craft Team</strong></p>
        </div>
    `
    })
};

module.exports = sendOtp;