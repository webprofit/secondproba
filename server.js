var express = require('express');
var app = express();
app.use(express.static(__dirname))  // встановлення каталогу для статичного контенту
var fs = require('fs');    //модуль для роботи з файлом
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',function(req,res){
	// res.sendFile(__dirname + "/index.html");
	res.send("Test!")
});

app.get('/form',function(req,res){
	res.sendFile(__dirname + "/form.html");	
});

app.get('/list',function(req,res){
	res.sendFile(__dirname + "/data.json");
});

app.get('/formget',function(req,res){
	// console.log(req.query);	
	var file = require('./data.json');  //крапка з цього каталогу
	// console.log(file);
	file.push(req.query);
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json',str);
	res.send("Дані збережено на сервері");

});

// app.get('/formset',function(req,res){
// 	var id = req.query;
// 	id = id.id;
// 	var file = require('./data.json');
// 	file.splice(id, 1);
// 	var str = JSON.stringify(file);
// 	fs.writeFileSync('data.json',str);
// 	res.send(file);

	
// });

app.post('/formsendpost',function(req,res){
	var id = req.body;
	console.log(id);
	id = id.id;
	var file = require('./data.json');
	file.splice(id, 1);
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json',str);
	res.send(file);

	
});


app.post('/postsend',function(req,res){
	console.log(req.body);
	res.send(req.body.myinput);
} );


app.get('/myget',function(req,res){
	console.log(req.query);
	res.send('success!');


});
app.post('/myget',function(req,res){
	console.log(req.body);
	res.send('success!');
	

});




// app.listen(8080);
app.listen(process.env.PORT || 8080);

console.log('Server is running');