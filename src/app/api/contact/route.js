import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const { EMAIL, PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    await transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Verification Error:", error);
      } else {
        console.log("SMTP Server is ready to send emails.");
      }
    });

    const { email, name, message } = await request.json();

    const mailOptions = {
      from: EMAIL,
      to: EMAIL,
      subject: `Portfolio: Message from ${name}`,
      text: `
                You have received a new message from your portfolio website contact form.\n\n
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Message sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while sending the message",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
