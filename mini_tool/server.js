/**
 * This file runs the back-end server and has the primary purpose of handling POST requests from the client
 * webpage and querying the postgres DB on turing.
 */

// get the exported functions from the library
const lib = require("./server_lib");
const BEAZone_lib = require("./scripts/map_mode/BEAZone_Server_lib.js");

// set up the postgres client, express
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

app.post("/mapsModeData", function(req, res) {
  // get the HTML elements' inputs on client-side via POST request body
  var year1 = req.body.year1;
  var year2 = req.body.year2;
  var div = req.body.div;
  var ownership = req.body.ownership;
  var length = req.body.length;
  var isr1 = req.body.isr1;
  var jobType = req.body.jobType;
  var careerareas = req.body.careerareas;
  var stateMode = req.body.stateMode;
  console.log(
    "SELECT instbeazone, count(*) FROM post_doc_jobs WHERE " +
      "year BETWEEN " +
      year1 +
      " AND " +
      year2 +
      lib.getQueryForDiv(div) +
      lib.getQueryForCareerArea(careerareas) +
      lib.getOwnership(ownership) +
      lib.getIsR1(isr1, true) +
      lib.getLength(length) +
      lib.getJobType(jobType) +
      " GROUP BY instbeazone"
  );
  if (!stateMode) {
    client
      .query(
        "SELECT instbeazone, count(*) FROM post_doc_jobs WHERE " +
          "year BETWEEN " +
          year1 +
          " AND " +
          year2 +
          lib.getQueryForDiv(div) +
          lib.getQueryForCareerArea(careerareas) +
          lib.getOwnership(ownership) +
          lib.getIsR1(isr1, true) +
          lib.getLength(length) +
          lib.getJobType(jobType) +
          " GROUP BY instbeazone"
      )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((e) => console.error(e.stack));
  } else {
    // Build query for postgres DB using library helper functions.
    client
      .query(
        "SELECT inststate AS state, count(*) FROM post_doc_jobs WHERE year BETWEEN " +
          year1 +
          " AND " +
          year2 +
          lib.getQueryForDiv(div) +
          lib.getQueryForCareerArea(careerareas) +
          lib.getOwnership(ownership) +
          lib.getIsR1(isr1, true) +
          lib.getLength(length) +
          lib.getJobType(jobType) +
          " GROUP BY inststate;"
      )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((e) => console.error(e.stack));
  }
});

app.post("/jobsModeState", function(req, res) {
  // get the HTML elements' inputs on client-side via POST request body
  var year1 = req.body.year1;
  var year2 = req.body.year2;
  var div = req.body.div;
  var ownership = req.body.ownership;
  var length = req.body.length;
  var isr1 = req.body.isr1;
  var jobType = req.body.jobType;
  var careerareas = req.body.careerareas;
  var clickedState = req.body.clickedState;

  client
    .query(
      "SELECT state, CASE WHEN inststate LIKE state THEN 0 ELSE count(jobid) END FROM post_doc_jobs WHERE inststate like '" +
        clickedState +
        "' AND year BETWEEN " +
        year1 +
        " AND " +
        year2 +
        lib.getQueryForDiv(div) +
        lib.getQueryForCareerArea(careerareas) +
        lib.getOwnership(ownership) +
        lib.getIsR1(isr1, true) +
        lib.getLength(length) +
        lib.getJobType(jobType) +
        " GROUP BY inststate, state"
    )
    .then((data) => {
      res.json(data.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/lineModeData", function(req, res) {
  // get the HTML elements' inputs on client-side via POST request body
  var div = req.body.div;
  var ownership = req.body.ownership;
  var length = req.body.length;
  var isr1 = req.body.isr1;
  var jobType = req.body.jobType;
  var careerareas = req.body.careerareas;
  var beazones = req.body.beazones;
  console.log(beazones);
  console.log(
    "SELECT d.year, SUM(d.count) FROM ((SELECT year, count(*) as count FROM post_doc_jobs WHERE " +
      lib.getIsR1(isr1, false) +
      lib.getQueryForDiv(div) +
      lib.getQueryForCareerArea(careerareas) +
      lib.getQueryForBEAZones(beazones) + 
      lib.getOwnership(ownership) +
      lib.getLength(length) +
      lib.getJobType(jobType) +
      "GROUP BY year) UNION (SELECT year, 0 as count FROM post_doc_jobs)) as d GROUP BY d.year ORDER BY d.year;"
  );
  client
    .query(
      "SELECT d.year, SUM(d.count) as count FROM ((SELECT year, count(*) as count FROM post_doc_jobs WHERE " +
        lib.getIsR1(isr1, false) +
        lib.getQueryForDiv(div) +
        lib.getQueryForCareerArea(careerareas) +
        lib.getQueryForBEAZones(beazones) + 
        lib.getOwnership(ownership) +
        lib.getLength(length) +
        lib.getJobType(jobType) +
        "GROUP BY year) UNION (SELECT year, 0 as count FROM post_doc_jobs)) as d GROUP BY d.year ORDER BY d.year;"
    )
    .then((data) => {
      res.json(data.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/map_mode", function(req, res) {
  res.render("map_mode/map_mode");
});

app.get("/bar_mode", function(req, res) {
  res.render("bar_mode/bar_mode");
});

app.get("/line_mode", function(req, res) {
  res.render("line_mode/line_mode");
});

// server running on port 8000
app.listen(7000);
