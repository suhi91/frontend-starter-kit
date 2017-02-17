var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    return res.render('home');
});

app.get('/route2', function(req, res){
    return res.render('route2');
});

app.listen(8888, function () {
    console.log("webserver runs at http://localhost:8888/");
});