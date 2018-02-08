const express = require('express')
const app = express()
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./test.db');

console.log('app listening on port 80');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/view', function (req, res) {
  res.render('index', { title: 'Express' });
})

 app.get('/add', function (req, res) {
	 if(req.query.id !=null && req.query.name!=null){
		let id = req.query.id;
		let name = req.query.name;
		//let query = 'INSERT INTO names (pos,name) VALUES (id, name)'

	  db.run(`INSERT INTO names (pos,name) VALUES (?, ?)`, [id,name], function(err) {
		if (err) {
		  return console.log(err.message);
		}
		// get the last insert id
		console.log(`A row has been inserted with rowid ${this.lastID}`);
		res.send(`A row has been inserted with rowid ${this.lastID}`);
	  });


	 }else{
		
	}
})

 app.get('/rename', function (req, res) {
	 if(req.query.id !=null && req.query.name!=null){
		let id = req.query.id;
		let name = req.query.name;
		//let query = 'INSERT INTO names (pos,name) VALUES (id, name)'

	  db.run(`UPDATE names SET name = ? WHERE pos = ?`, [name,id], function(err) {
		if (err) {
		  return console.log(err.message);
		}
		// get the last insert id
		console.log(`A row has been updated with rowid ${this.lastID}`);
		res.send(`A row has been updated with rowid ${this.lastID}`);
	  });


	 }else{
		
	}
})

 app.get('/list', function (req, res) {
	let sql = `SELECT * FROM names ORDER BY id`;

		db.all(sql, [], (err, rows) => {
		  if (err) {
			throw err;
		  }
		  rows.forEach((row) => {
			console.log(row.name);
		  });
			res.send(rows);
		});
  
})

app.get('/record',function (req,res){
	if(req.query.arr){
		var arr = JSON.parse(req.query.arr);
		console.log(arr[1]);
		let tim = Date.now();
		
		db.run(`INSERT INTO records (time,person1,person2,person3,person4,person5,person6,person7,person8,person9,person10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [tim,arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10]], function(err) {
		if (err) {
		  return console.log(err.message);
		}else{
			// get the last insert id
			console.log(this);
			console.log(`A row has been inserted with rowid ${this.lastID}`);
			res.send(this);
		}
		});
		
		
	}else{
		console.log("parameter missing");
	}
	});
	
app.get('/attendance', function(req,res){
		let sql = `SELECT * FROM records ORDER BY records_id`;

		db.all(sql, [], (err, rows) => {
		  if (err) {
			throw err;
		  }
		  rows.forEach((row) => {
			console.log(row.time);
		  });
			res.send(rows);
		});
	
	});

app.listen(80);
