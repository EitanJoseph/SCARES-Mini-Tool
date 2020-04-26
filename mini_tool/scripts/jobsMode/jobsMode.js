// newest json data - out of state - (this does not include states with no results)
var serverData;
// json data onload (contains all jobs of all states)
var oldServerData
// current visibility factor is decided at 1.6
var VISIBILITY_FACTOR = 1.6

function updateMap() {
  // sending data at /jobsMode over POST as JSON
  fetch("/jobsModeData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // send request with empty body

    body: "{}",
  })
    .then((response) => {
      return response.json();
    })
    // data received from server is still dumped into console (but can easily be visualized using jsonFromServer)

    // the data is formatted in the following manner from the server:
    // an array of Json objects where each object is a (key, value) pair with the key being the state name
    // and the value being the number of jobs associated with that state.

    .then((jsonFromServer) => {
      // logging to client for debugging
      console.log("client received from server @ /jobsModeData");
      console.log("JOBS DATA PER STATE:");
      console.log(jsonFromServer);
      oldServerData = jsonFromServer;
      // runs d3 data visualization to generate the graph
      // -1 here indicates that there is no internal index for a "clicked" state yet
      drawData(jsonFromServer, -1);
    });
}

/*
 * This function returns the maxinimum number of jobs any one state has.
 * We mulitply this result by a visibility factor in order to give the map colors more readability
 */
function getMaxJobs() {
  var maxJobs = 0;
  for (var i = 0; i < serverData.length; i++) {
    maxJobs = Math.max(serverData[i].count, maxJobs);
  }
  return maxJobs * VISIBILITY_FACTOR;
}

/*
 * This function calculates the scaled RGB to use for coloration of each state.
 * json tuple "state" - the state that needs to be colored
 * int max jobs       - the maximum number of jobs of any particular state multiplied by some visibility factor
 */
function getScaledRGB(state, maxJobs) {
  // invert the scaling factor colors so that it is white based and not black based
  var scalingFactor = 1 - state.count / (1.0 * maxJobs);
  return (
    "rgb(" +
    scalingFactor * 255 +
    ", " +
    scalingFactor * 255 +
    ", " +
    scalingFactor * 255 +
    ")"
  );
}

/*
 * This function gets the query state from the serverData in order to calculate its stats
 * D3 Object d3_state - the state that we need to match
 */
function getQueryState(d3_state) {
  for (var i = 0; i < serverData.length; i++) {
    if (serverData[i].state === d3_state.properties.name) {
      return serverData[i];
    }
  }
  return null;
}

/*
 * This method is the main driver of the map creation
 * JSON Object jsonFromServer   - the current json data being returned by the server
 * int i                        - the index of the clicked sate (tentative... this index does not seem to line up properly)
 */
function drawData(jsonFromServer, clickedState) {
  // set the server data to the most recent query result
  serverData = jsonFromServer;
  // maxJobs integer represents the state with the most jobs - will detirmine our color scaling ratio
  var maxJobs = getMaxJobs();

  d3.selectAll(".country").classed("country-on", false)
  // change the color of each state here
  d3.selectAll(".country").style("fill", function(d) {
    let s = getQueryState(d);
    // some states that have no job postings do not populate in the jsonFromServer (this should be fixe)
    if (s == null) {
      return "rgb(255,255,255)";
    }
    if (s.state === clickedState){
      return "rgb(96,9,235)"
    }
    return getScaledRGB(s, maxJobs);
  });

  d3.selectAll(".countryLabel").text("")

  d3.selectAll(".countryLabel")
    .append("text")
    .attr("class", "countryName")
    .style("text-anchor", "middle")
    .attr("dx", 0)
    .attr("dy", 0)
    .text(function(d) {
      let s = getQueryState(d)
      let jobs = 0
      if (s != null) {
        jobs = s.count
      }
      //console.log(oldServerData)
      return d.properties.name + ": " + jobs + " Jobs";
    })
    .call(getTextBox);

  d3.selectAll(".countryLabel")
    .insert("rect", "text")
    .attr("class", "countryLabelBg")
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("transform", function(d) {
      return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
    })
    .attr("width", function(d) {
      return d.bbox.width + 4;
    })
    .attr("height", function(d) {
      return d.bbox.height;
    });
}

// function updateBigName(state){
//   d3.select("#bigYear").select("text").attr("value", state.name)
//   d3.select("#bigYear").select("text").text(d3.select("#bigYear").select("text").attr("value"))
//   var x = (1500 - 50*((d3.select("#bigYear").select("text").attr("value").length) - 4))
//   var y = getWidthOfText(state.name, "Arial", "4.2vw")
//   console.log(y)
//   d3.select("#bigYear").select("text").attr("x", 1800 - y).attr("y", "90")
//   d3.select("#bigYear").select("text").style("font-size", "4.2vw")
// }

// function getWidthOfText(txt, fontname, fontsize){
//   if(getWidthOfText.c === undefined){
//       getWidthOfText.c=document.createElement('canvas');
//       getWidthOfText.ctx=getWidthOfText.c.getContext('2d');
//   }
//   getWidthOfText.ctx.font = fontsize + ' ' + fontname;
//   return getWidthOfText.ctx.measureText(txt).width;
// }
