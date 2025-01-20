const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GPASS,
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `
       <div style="font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 10px;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
        <h2 style="color: #4CAF50; font-size: 24px; text-align: center; margin-bottom: 10px;">Your OTP Code</h2>
        <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">Dear User,</p>
        <p style="font-size: 18px; color: #555; text-align: center; margin-bottom: 20px;">
            Your OTP for <strong style="color: #4CAF50;">Style Craft</strong> is:
        </p>
        <h1 style="color: #FF5733; text-align: center; font-size: 36px; font-weight: bold; margin: 20px 0; padding: 10px; background-color: #fff3e0; border-radius: 5px;">
            ${otp}
        </h1>
        <p style="font-size: 16px; color: #777; text-align: center; margin-bottom: 20px;">
            This code is valid for <strong>10 minutes</strong>.
        </p>
        <p style="font-size: 16px; color: #777; text-align: center; margin-bottom: 30px;">
            If you did not request this code, please ignore this email.
        </p>
        <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 10px;">Thanks,</p>
        <p style="font-size: 16px; color: #333; text-align: center; font-weight: bold;">Style Craft Team</p>
    </div>
    `,
  });
};

const sendSubcription = async (email) => {
  await transporter.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject: "Welcome To Style Craft",
    html: `
        <div style="font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 10px;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
                <h2 style="color: #4CAF50; font-size: 24px; text-align: center; margin-bottom: 10px;">Welcome to Style Craft!</h2>
                <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">Dear User,</p>
                <p style="font-size: 18px; color: #555; text-align: center; margin-bottom: 20px;">
                    Thank you for subscribing to our newsletter. You will receive updates, news, and exclusive offers directly in your inbox.
                </p>
                <p style="font-size: 16px; color: #777; text-align: center; margin-bottom: 30px;">
                    We're excited to have you on board!
                </p>
                <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 10px;">Thanks,</p>
                <p style="font-size: 16px; color: #333; text-align: center; font-weight: bold;">Style Craft Team</p>
            </div>
        </div>
        `,
  });
};

const sendContact = async (email, name) => {
  await transporter.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject: "Thank You for Contacting Us",
    html: `
        <div style="font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 10px;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
                <h2 style="color: #4CAF50; font-size: 24px; text-align: center; margin-bottom: 10px;">Thank You for Reaching Out!</h2>
                <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">Dear ${name},</p>
                <p style="font-size: 18px; color: #555; text-align: center; margin-bottom: 20px;">
                    We have received your message and appreciate you taking the time to contact us.
                </p>
                <p style="font-size: 16px; color: #777; text-align: center; margin-bottom: 30px;">
                    Our team will review your query and get back to you as soon as possible. In the meantime, feel free to browse through our website or reach out directly at ${process.env.GMAIL}.
                </p>
                <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 10px;">Best Regards,</p>
                <p style="font-size: 16px; color: #333; text-align: center; font-weight: bold;">Style Craft Team</p>
            </div>
        </div>
    `,
  });
};

const sendOrderConfirmation = async (
  user,
  cartItems,
  deliveryAddress,
  paymentMethod,
  totalWithVAT
) => {
  await transporter.sendMail({
    from: process.env.GMAIL,
    to: user.email,
    subject: "Order Confirmation - Style Craft",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #2D3748; background-color: #F7FAFC; padding: 40px 20px; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #FFFFFF; padding: 40px; border-radius: 20px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);">
        <!-- Enhanced Header Section -->
        <div style="text-align: center; margin-bottom: 48px; padding: 24px; background: linear-gradient(145deg, #f8fafb, #ffffff); border-radius: 16px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);">
            <h2 style="color: #38A169; font-size: 36px; font-weight: 800; margin: 0 0 12px 0; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">Order Confirmed! 🎉</h2>
            <p style="color: #718096; font-size: 18px; margin: 0; font-weight: 500;">Thank you for shopping with us, ${
              user.name
            }</p>
        </div>

        <!-- Enhanced Order Summary Box -->
        <div style="background: linear-gradient(145deg, #f1f5f9, #f8fafc); border-radius: 20px; padding: 35px; margin-bottom: 32px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);">
            <h3 style="color: #2D3748; font-size: 24px; margin: 0 0 30px 0; border-bottom: 3px solid #38A169; padding-bottom: 12px; font-weight: 700;">Order Summary</h3>
            
            <!-- Enhanced Items List -->
            <div style="margin-bottom: 30px;">
                ${cartItems
                  .map(
                    (item) => `
                    <div style="display: flex; align-items: flex-start; padding: 24px; background-color: #FFFFFF; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); transition: transform 0.2s ease;">
                        <!-- Enhanced Product Image -->
                        <div style="flex-shrink: 0; margin-right: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
                            <img src="${item.productId.image[0]}" alt="${
                      item.productId.name
                    }" style="width: 120px; height: 120px; object-fit: cover; display: block;">
                        </div>

                        <!-- Enhanced Product Details -->
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 14px;">
                            <h4 style="margin: 0; font-size: 18px; color: #1A202C; font-weight: 600; line-height: 1.4;">${
                              item.productId.name
                            }</h4>

                            <div style="display: flex; flex-direction: column; gap: 10px; background-color: #F8FAFC; padding: 12px; border-radius: 8px;">
                                <span style="font-size: 14px; color: #4A5568; display: flex; align-items: center;">
                                    <span style="min-width: 70px; color: #718096;">Quantity:</span>
                                    <span style="font-weight: 500;">${
                                      item.quantity
                                    }</span>
                                </span>
                                
                                ${
                                  item.size
                                    ? `
                                    <span style="font-size: 14px; color: #4A5568; display: flex; align-items: center;">
                                        <span style="min-width: 70px; color: #718096;">Size:</span>
                                        <span style="font-weight: 500;">${item.size}</span>
                                    </span>
                                `
                                    : ""
                                }

                                ${
                                  item.color
                                    ? `
                                    <div style="display: flex; align-items: center;">
                                        <span style="min-width: 70px; font-size: 14px; color: #718096;">Color:</span>
                                        <div style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid #E2E8F0; background-color: ${item.color}; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);"></div>
                                    </div>
                                `
                                    : ""
                                }
                            </div>

                            <span style="font-size: 16px; font-weight: 600; color: #38A169; margin-top: 4px;">Rs. ${item.productId.price.toFixed(
                              2
                            )}</span>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>

            <!-- Enhanced Order Details -->
            <div style="background-color: #FFFFFF; border-radius: 12px; padding: 24px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                <div style="margin-bottom: 16px;">
                    <span style="color: #718096; font-size: 14px; display: block; margin-bottom: 4px;">Delivery Address</span>
                    <span style="color: #2D3748; font-size: 15px; font-weight: 500;">${deliveryAddress}</span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="color: #718096; font-size: 14px; display: block; margin-bottom: 4px;">Payment Method</span>
                    <span style="color: #2D3748; font-size: 15px; font-weight: 500;">${paymentMethod}</span>
                </div>
                <div style="padding-top: 16px; border-top: 2px solid #F7FAFC;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 600; color: #2D3748; font-size: 16px;">Total Amount</span>
                        <span style="font-weight: 700; color: #38A169; font-size: 20px;">Rs.${totalWithVAT.toFixed(
                          2
                        )}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enhanced Footer -->
        <div style="text-align: center; padding-top: 32px; border-top: 2px solid #F7FAFC;">
            <p style="color: #718096; font-size: 16px; margin-bottom: 20px; font-weight: 500;">Need help? Contact our support team</p>
            <div style="margin-bottom: 28px; display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
                <a href="#" style="color: #38A169; text-decoration: none; font-weight: 500; padding: 8px 16px; background-color: #F7FAFC; border-radius: 8px; transition: all 0.2s ease;">Help Center</a>
                <a href="#" style="color: #38A169; text-decoration: none; font-weight: 500; padding: 8px 16px; background-color: #F7FAFC; border-radius: 8px; transition: all 0.2s ease;">Track Order</a>
                <a href="#" style="color: #38A169; text-decoration: none; font-weight: 500; padding: 8px 16px; background-color: #F7FAFC; border-radius: 8px; transition: all 0.2s ease;">Return Policy</a>
            </div>
            <p style="color: #2D3748; font-weight: 600; font-size: 16px; margin: 0;">Style Craft Team</p>
        </div>
    </div>
</div>
      `,
  });
};

module.exports = {
  sendOtp,
  sendSubcription,
  sendContact,
  sendOrderConfirmation,
};
