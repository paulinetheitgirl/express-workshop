var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');
var mustacheExpress = require('mustache-express');

var app = express();
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

/*app.get('/', function (req, res) {
  res.send('Yay Node Girls!')
});

app.get("/chocolate", function (req, res) {
    res.send("Mm chocolate :O");
});*/

app.use(express.static("public"));

app.use(formidable());

app.get('/get-posts', function (req, res) {
  	//__dirname is a Node global object that gives you a path to current working directory
	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		if(!error) {
			//console.log(file.toString());
		    var parsedFile = JSON.parse(file);
		    res.send(parsedFile);
		}	    
	});
});

app.post("/create-post", function (req, res) {
	//console.log('/create-post');
    console.log(req.fields);
    var parsedFile;
	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		if(!error) {
			//console.log(file.toString());
		    parsedFile = JSON.parse(file);
		    parsedFile["" + Date.now()] = req.fields.blogpost;
		    fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), function (error) {
			    if(!error) {
				    //var parsedFile = JSON.parse(file);
				    res.send(parsedFile);
				}
			});	    	
		}	    
	});
	
});

app.get('/posts/:postId', function (req, res) {
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		if(!error) {
			//console.log(file.toString());
		    var parsedFile = JSON.parse(file);
		    //res.send(parsedFile["" + req.params.postId]);
		    res.render('post', { post: parsedFile["" + req.params.postId]});
		}	    
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
