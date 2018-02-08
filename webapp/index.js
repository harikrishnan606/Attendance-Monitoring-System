var express = require('express')
var app = express()
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/view', function (req, res) {
  res.render('index', { title: 'Express' });
})
 
app.listen(80);
