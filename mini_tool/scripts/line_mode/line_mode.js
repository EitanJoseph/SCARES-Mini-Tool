function getDataFromServer() {
  fetch("/lineModeData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // stringify an array containing the inputs from the HTML elements
    body: JSON.stringify({
      div: currDivision,
      ownership: currOwnership,
      length: currLength,
      isr1: currIsR1,
      jobType: currJobType,
      careerareas: Array.from(currCareerAreas),
    }),
  })
    .then((response) => {
      return response.json();
    })
    // data received from server is still dumped into console (but can easily be visualized using jsonFromServer)
    .then((jsonFromServer) => {
      console.log("client received from server @ /LineModeData");
      console.log(jsonFromServer);
      drawLineGraph(jsonFromServer);
    });
}

function clear() {
  d3.select("#graph-holder")
    .selectAll("*")
    .remove();
}

function drawLineGraph(data) {
  clear();
  // set the dimensions and margins of the graph
  var margin = { top: 40, right: 20, bottom: 30, left: 50 },
    width = 950 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3
    .line()
    .x(function(d) {
      return x(d.year);
    })
    .y(function(d) {
      return y(d.count);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3
    .select("#graph-holder")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data
  x.domain(
    d3.extent(data, function(d) {
      return d.year;
    })
  );
  max = 0;
  for (var i = 0; i < data.length; i++) {
    max = Math.max(max, data[i].count);
  }
  y.domain([0, Math.ceil(1.2 * max)]);

  //add the title
  svg
    .append("text")
    .text("Post-Doc Jobs By Year")
    .attr("transform", "translate(250,0)")
    .style("font-size", "1.5vw");

  // Add the line/path
  svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("id", "line")
    .attr("d", valueline)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "4px")
    .on("mouseover", function() {
      d3.select(this).attr("stroke-width", "8px");
      console.log("#" + d3.select(this).attr("id") + "_text");
      d3.select("#" + d3.select(this).attr("id") + "_text").attr(
        "font-size",
        "14pt"
      );
      d3.select("#" + d3.select(this).attr("id") + "_text").attr(
        "font-variant",
        "small-caps"
      );
      d3.select("#" + d3.select(this).attr("id") + "_legend").attr(
        "height",
        "4"
      );
    })
    .on("mouseout", function() {
      d3.select(this).attr("stroke-width", "4px");
      d3.select("#" + d3.select(this).attr("id") + "_text").attr(
        "font-size",
        "12pt"
      );
      d3.select("#" + d3.select(this).attr("id") + "_text").attr(
        "font-variant",
        "normal"
      );
      d3.select("#" + d3.select(this).attr("id") + "_legend").attr(
        "height",
        "2.4"
      );
    });
  // Add the X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));

  // Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

  //Add the legend

  var lineLegend = svg
    .selectAll(".lineLegend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "lineLegend")
    .attr("transform", function(d, i) {
      return "translate(30," + (i * 20 + 20) + ")";
    });
  /*
  lineLegend
    .append("text")
    .attr("id", function(d) {
      return "line_" + d.split(" ").join("") + "_text";
    })
    .text(function(d) {
      return d;
    })
    .attr("transform", "translate(25,6)"); //align texts with boxes

  lineLegend
    .append("rect")
    .attr("class", function(d) {
      return "legend_" + d.split(" ").join("");
    })
    .attr("id", function(d) {
      return "line_" + d.split(" ").join("") + "_legend";
    })
    .attr("width", 20)
    .attr("height", 2.4);
    */
}
