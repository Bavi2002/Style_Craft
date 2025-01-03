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
        <div style="font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 10px;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
        <!-- Header -->
        <h2 style="color: #4CAF50; font-size: 24px; text-align: center; margin-bottom: 10px;">Your OTP Code</h2>
        
        <!-- Greeting -->
        <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">Dear User,</p>

        <!-- OTP Message -->
        <p style="font-size: 18px; color: #555; text-align: center; margin-bottom: 20px;">
            Your OTP for <strong style="color: #4CAF50;">Style Craft</strong> is:
        </p>

        <!-- OTP -->
        <h1 style="color: #FF5733; text-align: center; font-size: 36px; font-weight: bold; margin: 20px 0; padding: 10px; background-color: #fff3e0; border-radius: 5px;">
            ${otp}
        </h1>

        <!-- Validity Information -->
        <p style="font-size: 16px; color: #777; text-align: center; margin-bottom: 20px;">
            This code is valid for <strong>10 minutes</strong>.
        </p>

        <!-- Disclaimer -->
        <p style="font-size: 16px; color: #777; text-align: center; margin-bottom: 30px;">
            If you did not request this code, please ignore this email.
        </p>

        <!-- Footer -->
        <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 10px;">Thanks,</p>
        <p style="font-size: 16px; color: #333; text-align: center; font-weight: bold;">Style Craft Team</p>
    </div>
</div>
    `
    })
};

module.exports = sendOtp;