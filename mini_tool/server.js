// This is the main file that sends data to the client and accesses the postgres database on turing

var express = require("express");
const { Client } = require("pg");

// The client will be used to query the hejp postgres DB on turing using an environmental variable USERFLAG we can
// run the program with the credentials of chami, ruth, or eitan
client = new Client({
  host: "/var/run/postgresql",
  user: process.env.USERFLAG,
  password: "",
  database: "hejp",
});

// attempt to connect to server
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

// Initialize express app
var app = express();

// This will be used to parse the request body sent by the client to the server into a JSON array
// N.B. the body parser is a separate NPM package that was installed
var bodyParser = require("body-parser");

// support json encoded bodies
app.use(bodyParser.json());

// Allows us to use scripts, views and organized for each visualization
// views holds the ejs files for each visualization
// scripts associated with the ejs files files for each visualization
app.use(express.static(__dirname + "/"));

// Marks that we will be using ejs templating
app.set("view engine", "ejs");

app.post("/jobsModeData", function(req, res) {
  // logging the request info for debugging
  console.log(req.body);
  client
    .query("select institutionstate as state, count(*) from job_state group by institutionstate;")
    .then((data) => {
      res.json(data.rows);
    })
    .catch((e) => console.error(e.stack));
});

/*
 This data posts the result of a SQL query on the database to /slide4data to be picked
 up by the client. Specifically, this code will query the database based on the year
 and subject selections on the client side. 
 */
app.post("/skillsModeData", function(req, res) {
  // logging the request info for debugging
  console.log(req.body);
});

app.post("/jobsModeState", function(req, res) {
  client
    .query(
      "SELECT state, count(jobid) FROM job_state WHERE state not like '" +
        req.body.value +
        "' and institutionstate like '" +
        req.body.value +
        "' GROUP BY state"
    )
    .then((data) => {
      res.json(data.rows);
    })
    .catch((e) => console.error(e.stack));
});

// Different Visualization Page are rendered at these URLS
// That is, when the links on index.html are clicked, those URLs are requested, and the ejs pages in the views
// subfolders are rendered.
app.get("/skillsMode", function(req, res) {
  res.render("skillsMode/skillsMode");
});

app.get("/jobsMode", function(req, res) {
  res.render("jobsMode/jobsMode");
});

// server running on port 8000
app.listen(7000);
