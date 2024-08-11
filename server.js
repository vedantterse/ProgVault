const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = '231041957605'; // Set your desired password here
const UNDER_CONSTRUCTION = process.env.UNDER_CONSTRUCTION === 'true'; // Read environment variable

// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000 } // Session expiration in milliseconds (5 minutes)
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve under construction page if needed
if (UNDER_CONSTRUCTION) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'under-construction.html'));
    });
} else {
    // Serve the login page
    app.get('/', (req, res) => {
        if (req.session.authenticated) {
            // Redirect to PDF view page if already authenticated
            res.redirect('/pdfview');
        } else {
            res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust to your HTML file
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
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
