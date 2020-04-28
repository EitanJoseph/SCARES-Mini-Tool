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

/**
 * Helper function that gets an array of indices of the subjects' location in the 43 character binary
 * string located in the SQL table for the subjects that are in this field division. For instance, 
 * social sciences occupy indices 1 through 8 in the SQL table 43 character string. This function is
 * used by getQueryForDiv() to identify which substring characters in the SQL table attribute should
 * be '1' for a query on this division. If the division is 'unrestricted' an empty array is returned. 
 * 
 * @param {String} div a field division (e.g. social science, science, etc. or unrestricted)
 * @return the array of the indices in the division or an empty array if div = unrestricted
 */
function getSubjectIndicesInDiv(div) {
  var indices = new Array();

  // get indices for social science division 
  if (div == 'soc_sci') {
    for (var i = 1; i <= 8; i++) {
      indices.push(i)
    }
  }
  // get indices for science division 
  else if (div == 'sci') {
    for (var i = 9; i <= 14; i++) {
      indices.push(i)
    }
  }
  // get indices for humanities division
  else if (div == 'hum') {
    for (var i = 29; i <= 32; i++) {
      indices.push(i)
    }
  }
  // for now, putting everything not categorized by their 
  // "faculty exploration and addendum slides" into the other
  // division -> should probably make an "engineering" division
  // at some point
  else if (div == 'other') {
    for (var i = 15; i <= 28; i++) {
      indices.push(i);
    }
    for (var i = 33; i <= 42; i++) {
      indices.push(i);
    }
  }
  return indices;
}

/**
 * Helper function that utilizes getSubjectIndicesInDiv() to generate the component
 * of the SQL query that identifies all jobs that are marked as having subjects
 * in the given division. The query will be of the form: 
 * 
 * "and (substring(subjs, 1, 1) = '1' OR substring(subjs, 2, 1) = '1') ... )"
 * 
 * @param {String} div the division for which the query substring should be 
 * generated 
 * @return the SQL query substring pertaining to jobs in this division 
 */
function getQueryForDiv(div) {
  // get the indices for the division using helper 
  var divIndices = getSubjectIndicesInDiv(div)

  // if indices.length = 0, return "" (unrestricted)
  if (divIndices.length == 0) {
    return "";
  }

  // create SQL string starting with and (
  var out = " and (";

  // for n-1 of n indices, append "OR" after substring(subjs, i, 1) = '1'
  for (var i = 0; i < divIndices.length - 1; i++) {
    out += "substring(subjs, " + divIndices[i] + ", 1) = '1' OR "
  }

  // don't add OR after the last one, just )
  out += "substring(subjs, " + divIndices[divIndices.length - 1] + ", 1) = '1'";
  return out + ")";
}

app.post("/jobsModeData", function(req, res) {

  // get the HTML elements' inputs on client-side via POST request body 
  var year1 = req.body.year1;
  var year2 = req.body.year2; 
  var div = req.body.div;
  var pos = req.body.pos;
  var subj = req.body.subj;

  client
    .query("select inststate as state, count(*) from post_doc_jobs where year between " + year1 + " and " + year2 + getQueryForDiv(div) + " group by inststate;")
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
      "SELECT state, CASE WHEN institutionstate LIKE state THEN 0 ELSE count(jobid) END FROM job_state WHERE institutionstate like '" 
       + req.body.value +
       "' GROUP BY institutionstate, state"
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
