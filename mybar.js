(function(d3) {
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin

var svg = d3.select("#bardiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.json("data.json", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.percent = +d.percent;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.station; }));
  y.domain([0, d3.max(data, function(d) { return d.percent; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.station); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.percent); })
      .attr("height", function(d) { return height - y(d.percent); })
	  .style('fill',function(d,i){ return d.paint; });
   
   svg.selectAll("text.trip-percent-label")
		.data(data)
		.enter()
		.append("text")
		.attr("y" , function(d) { return y(d.percent) - 5;})
		.attr("x" , function(d) { return x(d.station)+ 20})
		.text(function(d) { return d.value + "(" + d.percent + "%)" ;})
		.classed("trip-percent-label" , true);
           
  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
	  
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "6em")
      .style("text-anchor", "middle")
      .attr("font-size", "100px")
	  .attr("font-weight", "bold")
	  .text("Trips Percentage%");

});

})(window.d3);
