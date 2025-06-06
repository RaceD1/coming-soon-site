const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { sendUserConfirmationEmail, sendAdminNotificationEmail } = require('./helpers/mailer');

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Form submission route
app.post('/submit', async (req, res) => {
    const { name, email } = req.body;

    try {
        const { data, error } = await supabase
            .from('submissions')
            .insert([
                { 
                    name: name, 
                    email: email,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;

        // Send confirmation email to user
        await sendUserConfirmationEmail({ to: email, name });

        // Send notification email to admin
        await sendAdminNotificationEmail({ name, email });

        res.redirect('/thanks.html');
    } catch (error) {
        console.error('Error saving submission or sending email:', error);
        res.status(500).send('Error saving your data.');
    }
});

// Catch-all route for debugging
app.use((req, res) => {
    console.log('404 Not Found:', req.url);
    res.status(404).send('File not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
