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
    cookie: { maxAge: 3 * 60 * 1000 } // Session expiration in milliseconds (2 minutes)
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page
app.get('/', (req, res) => {
    if (req.session.authenticated) {
        // Redirect to catalog page if already authenticated
        res.redirect('/catalog');
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

// Serve the catalog page
app.get('/catalog', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
    } else {
        res.redirect('/');
    }
});

// Serve individual PDF views
app.get('/python-notes', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'view1.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/DBMS', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'view2.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/Operating-Systems', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'view3.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/Computer-Networks', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'view4.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/System-Design', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'public', 'view5.html'));
    } else {
        res.redirect('/');
    }
});
// Handle logout (optional, if you want a logout functionality)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
