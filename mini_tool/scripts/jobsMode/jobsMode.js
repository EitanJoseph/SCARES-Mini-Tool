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
      "Content-Type": "application/json"
    },

    // send request with body that holds both year inputs
    
    body: "{}"
  })
    .then(response => {
      return response.json();
    })
    // data received from server is still dumped into console (but can easily be visualized using jsonFromServer)

    // the data is formatted in the following manner from the server:
    // an array of Json objects where each object is a key, value pair with key being the beazone and the value
    // being an array of json objects. these json objects contain name, value pairs with a name marking the
    // data type (e.g. year1PostDoc v. year2Hejp) and value marking the count of jobs for that beazone and name

    // this data set up was needed for D3

    .then(jsonFromServer => {
      // logging to client for debugging
      console.log("client received from server @ /jobsModeData");
      console.log(
        "JOBS DATA PER STATE:"
      );
      console.log(jsonFromServer);
      serverData = jsonFromServer;
      // runs d3 data visualization to generate the graph
      drawData(jsonFromServer);
    });
}

function drawData(jsonFromServer) {
}


// collects clicked state name
function updateStateColors(state, scalingFactors){
  var scalingFactor = scalingFactors.get(state.properties.name)*255;
  return "rgb("+scalingFactor+", "+scalingFactor+", "+scalingFactor+")"
  //console.log(state.properties.name);
 // return calculateScalingFactor(state.properties.name);
}

function calculateScalingFactor(state){
  state = captureState(state);
  updateBigName(state)

  var maxJobs = 0;

  for (var i = 0; i < serverData.length; i++){
    maxJobs = Math.max(serverData[i].count, maxJobs);
  }


  return state.count/maxJobs

}

function captureState(state){
  for (let i = 0; i < serverData.length; i++){
      if (serverData[i].state === state.properties.name){
          return serverData[i];
      }
  }

  return null;
}

function updateBigName(state){
  d3.select("#bigYear").select("text").attr("value", state.name)
  d3.select("#bigYear").select("text").text(d3.select("#bigYear").select("text").attr("value"))
  var x = (1500 - 50*((d3.select("#bigYear").select("text").attr("value").length) - 4))
  var y = getWidthOfText(state.name, "Arial", "4.2vw")
  console.log(y)
  d3.select("#bigYear").select("text").attr("x", 1800 - y).attr("y", "90")
  d3.select("#bigYear").select("text").style("font-size", "4.2vw")
  
}

function getWidthOfText(txt, fontname, fontsize){
  if(getWidthOfText.c === undefined){
      getWidthOfText.c=document.createElement('canvas');
      getWidthOfText.ctx=getWidthOfText.c.getContext('2d');
  }
  getWidthOfText.ctx.font = fontsize + ' ' + fontname;
  return getWidthOfText.ctx.measureText(txt).width;
}