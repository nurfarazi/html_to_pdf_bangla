var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Cat = mongoose.model('Cat', { name: String });
var bodyParser = require('body-parser');

app.use(bodyParser());

app.set('views', './app/views');
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('./public'));



 app.get('/', function (req, res) {


    //  var Cat = mongoose.model('Cat', { name: String });
     //
    //  var kitty = new Cat({ name: 'Zildjian' });
    //  kitty.save(function (err) {
    //      if (err) {
    //          console.log(err);
    //      } else {
    //          console.log('meow');
    //      }
    //  });

     res.render('main');
    });


function delayedMessge(docDefinition,callback,res) {
    var fonts = {
        SourceSansPro: {
            normal: './fonts/Roboto-Regular.ttf',
            bold: './fonts/Roboto-Medium.ttf',
            italics: './fonts/Roboto-Italic.ttf',
            bolditalics: './fonts/Roboto-Italic.ttf'
        },
        SolaimanLipi: {
            normal: './fonts/SolaimanLipi.ttf'
        },
        Siyamrupali: {
            normal: './fonts/Siyamrupali.ttf'
        },
        kalpurush: {
            normal: './fonts/kalpurush.ttf'
        },
        Shonar: {
            normal: './fonts/Shonar.ttf'
        },
        AdorshoLipi: {
            normal: './fonts/AdorshoLipi.ttf'
        },
    };
    var PdfPrinter = require('pdfmake/src/printer');//
    var printer = new PdfPrinter(fonts);//kalpurush

    // var meteor_root = Npm.require('fs').realpathSync( process.cwd() + '/../' );
    // var application_root = Npm.require('fs').realpathSync( meteor_root + '/../' );
    // var assets_folder = meteor_root + '/server/assets/' + Npm.require('path').basename( application_root );

    var doc = printer.createPdfKitDocument(docDefinition);
    var chunks = [];
    var result;

    doc.on('data', function(chunk) {
        chunks.push(chunk);
    });

    doc.on('end', function() {
        result = Buffer.concat(chunks);
        res.write(result.toString('base64'));
        res.end();
    });

    doc.end();
}
app.post('/nirjhar',function (req,res) {

    Cat.find(function (err, kittens) {
        if (err) return console.error(err);

        var docDef = {
            content: req.body.mytext,
            defaultStyle : {
                font : 'AdorshoLipi'
            }
        };
        delayedMessge(docDef,null,res);
    })
});




app.listen(port);
console.log('The magic happens on port ' + port);
