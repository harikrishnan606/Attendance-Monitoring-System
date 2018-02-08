const express = require('express')
const app = express()
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./test.db');

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

app.listen(80);
