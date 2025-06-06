// mailer.js
// Handles sending emails using Nodemailer

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
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
        subject: 'Welcome to Race D1wan! You are In The Garage Now.',
        text: `Welcome to the team, ${name}!\n\nWe are building a motorsport ecosystem for the ones who never had a path.\n\nFor the mechanics building in silence.\nThe racers without sponsors.\nThe ones who knew there had to be more — but couldn't find it.\n\nThis is the beginning of something big. A space to train, to connect, to belong.\n\nAnd because you're early, you'll get first access to the platform before it opens to the public — with early-member advantages we're designing just for you.\n\nThank you for trusting us.\nThank you for believing in this movement — before the world sees it.\n\nYou're in the garage now.\n\nFollow the Build: www.raced1.com\nInstagram: @raced1official\nContact: team@raced1.com`,
        html: `
            <html>
              <head>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
                <style>
                  .orbitron-title {
                    font-family: 'Orbitron', Arial, sans-serif !important;
                    font-weight: 900;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                  }
                </style>
              </head>
              <body style="margin:0;padding:0;background:#181818;">
                <div style="font-family: 'Orbitron', Arial, sans-serif; background: #181818; color: #fff; padding: 32px 0; text-align: center;">
                  <div style="max-width: 600px; margin: 0 auto; background: #222; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); padding: 32px 24px;">
                    <h1 class="orbitron-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">RACE D1WAN</h1>
                    <div style="font-size: 1.1rem; color: #c4a777; margin-bottom: 2rem;">Garage to Grid. Built for the ones who never had a map.</div>
                    <div style="text-align: left; margin: 0 auto 2rem auto; max-width: 480px; font-size: 1.05rem; line-height: 1.7;">
                      <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem;">Welcome to the team, <span style='color:#c4a777;'>${name}</span></h2>
                      <div style="font-size: 1.1rem; margin-bottom: 2rem;">You just stepped into something different.</div>
                      <p>We're building a motorsport ecosystem for the ones who never had a path.</p>
                      <p>For the mechanics building in silence.<br>For the racers without sponsors.<br>For the ones who knew there had to be more — but couldn't find it.</p>
                      <p>This is the beginning of something big.<br>A space to train, to connect, to belong.</p>
                      <p>And because you're early, you'll get first access to the platform before it opens to the public — with early-member advantages we're designing just for you.</p>
                      <p>Thank you for trusting us.<br>Thank you for believing in this movement — before the world sees it.</p>
                      <p style="font-weight: bold; color: #c4a777;">🛠 You're in the garage now.</p>
                    </div>
                    <div style="text-align: center;">
                      <div style="margin: 2rem 0 1.5rem 0;">
                          <a href="https://instagram.com/raced1official" style="margin: 0 10px; color: #fff; text-decoration: none; font-size: 1.5rem;">
                              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" width="28" style="vertical-align: middle; filter: invert(1);"/>
                          </a>
                          <a href="#" style="margin: 0 10px; color: #fff; text-decoration: none; font-size: 1.5rem;">
                              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" width="28" style="vertical-align: middle; filter: invert(1);"/>
                          </a>
                          <a href="#" style="margin: 0 10px; color: #fff; text-decoration: none; font-size: 1.5rem;">
                              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" alt="YouTube" width="28" style="vertical-align: middle; filter: invert(1);"/>
                          </a>
                          <a href="#" style="margin: 0 10px; color: #fff; text-decoration: none; font-size: 1.5rem;">
                              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg" alt="TikTok" width="28" style="vertical-align: middle; filter: invert(1);"/>
                          </a>
                      </div>
                    </div>
                    <div style="border-top: 1px solid #444; margin-top: 2rem; padding-top: 1.5rem; font-size: 0.95rem; color: #bbb; text-align: center;">
                        Race D1wan<br>
                        <a href="https://www.raced1.com" style="color: #c4a777; text-decoration: none;">www.raced1.com</a><br>
                        Instagram @raced1official<br>
                        Contact: <a href="mailto:team@raced1.com" style="color: #c4a777; text-decoration: none;">team@raced1.com</a>
                    </div>
                    <div style="text-align: center; margin-top: 1.5rem;">
                        <a href="https://www.raced1.com/unsubscribe?email=${encodeURIComponent(to)}" style="color: #bbb; text-decoration: underline; font-size: 0.95rem;">Unsubscribe</a>
                    </div>
                  </div>
                </div>
              </body>
            </html>
        `
    });
}

async function sendAdminNotificationEmail({ name, email }) {
    return transporter.sendMail({
        from: `"Race D1wan" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Submission Received',
        text: `New submission:\nName: ${name}\nEmail: ${email}`
    });
}

module.exports = {
    sendUserConfirmationEmail,
    sendAdminNotificationEmail
}; 