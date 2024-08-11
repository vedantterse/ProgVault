const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = '231041957605'; // Set your desired password here
const UNDER_CONSTRUCTION_FILE = path.join(__dirname, 'under-construction.flag');

// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000 } // Session expiration in milliseconds (5 minutes)
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Check if under-construction mode is enabled
const isUnderConstruction = () => fs.existsSync(UNDER_CONSTRUCTION_FILE);

// Serve under construction page if needed
app.get('*', (req, res) => {
    if (isUnderConstruction()) {
        res.sendFile(path.join(__dirname, 'public', 'under-construction.html'));
    } else {
        // Serve the login page
        if (req.path === '/') {
            if (req.session.authenticated) {
                // Redirect to PDF view page if already authenticated
                res.redirect('/pdfview');
            } else {
                res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust to your HTML file
            }
        } else {
            // Handle other routes
            if (req.session.authenticated || req.path === '/login') {
                res.sendFile(path.join(__dirname, 'public', 'index.html'));
            } else {
                res.redirect('/');
            }
        }
    }
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        req.session.authenticated = true; // Set session as authenticated
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Incorrect Password' });
    }
});

// Serve the PDF view page
app.get('/pdfview', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'view.html')); // Adjust to your PDF view page
    } else {
        res.redirect('/'); // Redirect to login page if not authenticated
    }
});

// Toggle under construction mode
app.post('/toggle-construction', (req, res) => {
    if (isUnderConstruction()) {
        fs.unlinkSync(UNDER_CONSTRUCTION_FILE); // Remove file to exit under-construction mode
        res.send('Site is now live.');
    } else {
        fs.writeFileSync(UNDER_CONSTRUCTION_FILE, ''); // Create file to enter under-construction mode
        res.send('Site is now under construction.');
    }
});

app.get('/debug', (req, res) => {
    res.send(`UNDER_CONSTRUCTION is set to ${isUnderConstruction()}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
