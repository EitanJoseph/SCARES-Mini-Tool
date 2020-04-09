export { str }
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
	for (var i = 0; i < res.rows.length; i++){
                str += res.rows[i];
		//console.log(res.rows[i]);
        }
        //console.log((err) ? err : '', res.rows[0])
        client.end()
})
