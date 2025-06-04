import nodemailer from "nodemailer";

const config = () => {
    return {
        host: process.env.SMTP_HOST || "smtp.mailtrap.io",
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 2525,
        auth: {
            user: process.env.SMTP_USER || "48b4e488de4228",
            pass: process.env.SMTP_PASSWORD || "1d2759bff455ea"
        }
    }
}

export const transporter = nodemailer.createTransport(config());