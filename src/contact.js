import nodemailer from "nodemailer";
import dotenv from "dotenv";



dotenv.config({path: "./src/.env"});

async function sendEmail(){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    try{
        await transporter.verify();
        console.log("SMTP is successfully connected");

        await transporter.sendMail({
            from: process.env.EMAIL,
            to:"svs4raju@gmail.com",
            subject: "Test",
            text: "Test"
        }).then(() => {console.log("Email sent successfully")}).catch((error) => console.error("Error sending email:", error));
    }
    catch(error){
        console.error("SMTP connection failed:", error);
    }
}

sendEmail();