const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const PASSWORD = '1234'; // Set your desired password here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust to your HTML file
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        res.redirect('/pdfview'); // Redirect to the PDF view page
    } else {
        res.send('Incorrect Password');
    }
});

// Serve the PDF view page
app.get('/pdfview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html')); // Adjust to your PDF view page
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
