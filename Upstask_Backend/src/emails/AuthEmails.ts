import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: "upTask <admin@uptask.com>",
            to: user.email,
            subject: "Confirm your account",
            text: `Please confirm your account by clicking the following link: ${process.env.FRONTEND_URL}/confirm/${user.token}
            <p><a href="${process.env.FRONTEND_URL}/auth/confirm-account">Click here to confirm your account</a></p>
            <p>this token expires in 10 minutes</p>
            <p>If you did not create this account, please ignore this email.</p>`,
        })
        console.log("Message sent: %s", info.messageId);
    }
    static sendPasswordResetToken = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: "upTask <admin@uptask.com>",
            to: user.email,
            subject: "Reset your password",
            text: `Please reset your password by clicking the following link: ${process.env.FRONTEND_URL}/reset-password/${user.token}
            <p><a href="${process.env.FRONTEND_URL}/auth/new-password">Click here to reset your password</a></p>
            <p>this token expires in 10 minutes</p>
            <p>If you did not create this account, please ignore this email.</p>`,
        })
        console.log("Message sent: %s", info.messageId);
    }
}

