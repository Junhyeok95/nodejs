const express = require('express');
const app = express(), testJson = require('./test/test.json');

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    // res.send("Hello NodeJS");
    res.render('index', {name:'장준혁'});
});

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email; // req.body, req.query
    testJson.urlQuery = req.query.urlQuery;
    res.json(testJson);
});

const server = app.listen(5000, function(){
    console.log("Express's started on port 5000");
});