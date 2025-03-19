// create web server
// use express
const express = require('express');
const app = express();
const port = 3000;

// use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// use mysql
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});
db.connect();

// get all comments
app.get('/comments', (req, res) => {
    db.query('SELECT * FROM comments', (error, results) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

// add a comment
app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    db.query('INSERT INTO comments (comment) VALUES (?)', [comment], (error, results) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.json({ message: 'Comment added' });
        }
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));