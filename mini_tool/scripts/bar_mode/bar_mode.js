/**
 * Updates the graph with the user's current input selections on the webpage.
 *
 * @param {boolean} starting whether or not the webpage is first starting
 */
function updateGraph(starting) {
  if (!starting && !shouldRunNewQuery()) {
    return;
  }

  fetch("/barModeData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // stringify an array containing the inputs from the HTML elements
    body: JSON.stringify({
      year1: currYear1,
      year2: currYear2,
      div: currDivision,
      ownership: currOwnership,
      length: currLength,
      isr1: currIsR1,
      jobType: currJobType,
      careerareas: Array.from(currCareerAreas),
      beazones: Array.from(currBEAZones),
    }),
  })
    .then((response) => {
      return response.json();
    })
    // data received from server is still dumped into console (but can easily be visualized using jsonFromServer)
    .then((jsonFromServer) => {
      console.log(jsonFromServer);
      drawFrequencyBarGraph(jsonFromServer);
    });
}

/*
 Draws the frequency bar graph using D3. The frequency bar graph shows the percentages 
 of the top 10 skills for a given subject in a given year.

 @param data this holds the top 10 skills data for a given year, subject determined
 by the client using HTML range, select elements. The data is the result of the SQL
 query on the server.
*/
function drawFrequencyBarGraph(data) {
  var margin = { top: 60, right: 180, bottom: 80, left: 100 },
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3
    .scaleBand()
    .range([0, width])
    .paddingInner(0.1)
    .paddingOuter(0.3);

  var y = d3.scaleLinear().range([height, 0]);

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y).ticks(8);

  d3.select("#graph-holder")
    .selectAll("*")
    .remove();

  var svg = d3
    .select("#graph-holder")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  x.domain(data.map((d) => d.skillname));
  y.domain([0, d3.max(data, (d) => d.count * 1.1)]);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .call(wrap, x.bandwidth());

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.skillname))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.count))
    .attr("height", (d) => height - y(d.count))
    .on("mouseover", function(d) {
      d3.select("#" + d.skillname.split(" ").join("") + "_bar").style(
        "font-size",
        "30px"
      );
    })
    .on("mouseout", function(d) {
      d3.select("#" + d.skillname.split(" ").join("") + "_bar").style(
        "font-size",
        "24px"
      );
    });

  svg
    .selectAll("text.bar")
    .data(data)
    .enter()
    .append("text")
    .attr("id", function(d) {
      console.log(d.skillname.split(" ").join("") + "_bar");
      return d.skillname.split(" ").join("") + "_bar";
    })
    .style("fill", "black")
    .attr("class", "bar")
    .attr("text-anchor", "middle")
    .attr("x", function(d) {
      return x(d.skillname) + 50;
    })
    .attr("y", function(d) {
      return y(d.count) - 10;
    })
    .text(function(d) {
      return d.count;
    });
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}
