var express = require('express');
var app = express();
var port = process.env.PORT || 8080;



app.set('views', './app/views');
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('./public'));



 app.get('/', function (req, res) {
        res.render('main');
    });



app.listen(port);
console.log('The magic happens on port ' + port);
