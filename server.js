const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;
const PASSWORD = '231041957605'; // Set your desired password here

// Configure session middleware
app.use(session({
    secret: '231041957605', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 60 * 1000 } // Session expiration in milliseconds (1 minutes)
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page
app.get('/', (req, res) => {
    if (req.session.authenticated) {
        // Redirect to PDF view page if already authenticated
        res.redirect('/pdfview');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html')); 
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
        res.sendFile(path.join(__dirname, 'public', 'view.html'));
    } else {
        res.redirect('/'); // Redirect to login page if not authenticated
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
