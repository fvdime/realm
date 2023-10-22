import nodemailer from 'nodemailer';

const sendMail = async ({
    email,
    subject,
    text,
    html,
}: {
    email: string;
    subject: string;
    text?: string | null;
    html?: string | null;
}) => {
    try {
        const transporter = nodemailer.createTransport({
            //@ts-ignore
            host: process.env.MAIL_HOST,
            service: process.env.MAIL_SERVICE,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const result = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text || '',
            html: html || '',
        });

        return true;
    } catch (error) {
        return false;
    }
};

export default sendMail;
