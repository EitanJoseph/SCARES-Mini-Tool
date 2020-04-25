/*
  This function displays new data to the webpage whenever the user updates one of the two year selection sliders. 

  Specifically, this code requests new data from the server based on the year inputs. In future, this could be sped
  up by only running the 2 queries for the slider that was updated. As of now, 4 queries are run for each update. 
  */

var serverData;

function updateMap() {
  // sending data at /slide1data over POST as JSON
  fetch("/jobsModeData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // send request with body that holds both year inputs

    body: "{}",
  })
    .then((response) => {
      return response.json();
    })
    // data received from server is still dumped into console (but can easily be visualized using jsonFromServer)

    // the data is formatted in the following manner from the server:
    // an array of Json objects where each object is a key, value pair with key being the beazone and the value
    // being an array of json objects. these json objects contain name, value pairs with a name marking the
    // data type (e.g. year1PostDoc v. year2Hejp) and value marking the count of jobs for that beazone and name

    // this data set up was needed for D3

    .then((jsonFromServer) => {
      // logging to client for debugging
      console.log("client received from server @ /jobsModeData");
      console.log("JOBS DATA PER STATE:");
      console.log(jsonFromServer);
      // runs d3 data visualization to generate the graph
      drawData(jsonFromServer);
    });
}

function getMaxJobs() {
  var maxJobs = 0;
  for (var i = 0; i < serverData.length; i++) {
    maxJobs = Math.max(serverData[i].count, maxJobs);
  }
  return maxJobs * 1.6;
}

function getScaledRGB(state, maxJobs) {
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

function getQueryState(d3_state) {
  for (var i = 0; i < serverData.length; i++) {
    if (serverData[i].state === d3_state.properties.name) {
      return serverData[i];
    }
  }
  return null;
}

function drawData(jsonFromServer) {
  serverData = jsonFromServer;
  var maxJobs = getMaxJobs();

  d3.selectAll(".country").classed("country-on", false);
  d3.selectAll(".country").style("fill", function(d) {
    let s = getQueryState(d);
    if (s == null) {
      return "rgb(255,255,255)";
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
