import { str } from './module.js';
console.log(str);
/*
const { Client } = require('pg')

// socket connection credentials
client = new Client({
  host: '/var/run/postgresql',
  user: 'eitanjoseph',
  password: '',
  database: 'hejp'
})

// attempt to connect to server
client.connect(err => {
	if (err) {
		console.error('connection error', err.stack)
	} else {
		console.log('connected')
	}
}) 

// query the DB directly using client.query
client.query("SELECT * FROM maintable limit 5", (err, res) => {
	for (var i = 0; i < res.rows.length; i++){
		console.log(res.rows[i]);
	}
	//console.log((err) ? err : '', res.rows[0])
	client.end()
})



    
/*
client.query('SELECT 6;', (err, res) => {
  console.log(err, res)
  client.end()
})*/
