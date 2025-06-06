// mailer.js
// Handles sending emails using Nodemailer

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendUserConfirmationEmail({ to, name }) {
    return transporter.sendMail({
        from: `"Race D1wan" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Thank you for joining Race D1wan!',
        text: `Hi ${name},\n\nThank you for signing up! We'll keep you updated.\n\nBest,\nRace D1wan Team`
    });
}

async function sendAdminNotificationEmail({ name, email }) {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Submission Received',
        text: `New submission:\nName: ${name}\nEmail: ${email}`
    });
}

module.exports = {
    sendUserConfirmationEmail,
    sendAdminNotificationEmail
}; 