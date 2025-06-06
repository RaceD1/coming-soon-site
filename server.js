const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

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
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    const entry = `${new Date().toISOString()} - Name: ${name}, Email: ${email}\n`;

    fs.appendFile('submissions.txt', entry, (err) => {
        if (err) {
            console.error('Error saving submission:', err);
            res.status(500).send('Error saving your data.');
        } else {
            res.redirect('/thanks.html');
        }
    });
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
