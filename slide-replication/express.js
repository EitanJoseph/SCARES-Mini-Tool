var test = require('./test')
var express = require('express');

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

let str = "";

// query the DB directly using client.query
client.query("SELECT * FROM maintable limit 5", (err, res) => {
       	
       	test.logItUpBB(res.rows);      	
	
	 for (var i = 0; i < res.rows.length; i++){
		 str += JSON.stringify(res.rows[i]);
                //console.log(res.rows[i]);
        }	
	
})


var app = express();
app.get('/', function(req, res){
  res.send("<a href='http://www.foyausa.org'>" + str +  "</a>"); //replace with your data here
});

app.listen(8000);
