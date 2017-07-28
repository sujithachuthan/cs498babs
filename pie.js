(function(d3) {
        'use strict';
	 /*Adding base data*/
	 
	 var newData = [{
        count: 272499,
		percent:"90",
        RiderType: "% Subscriber"
      }, {
        count: 32218,
		percent:"10",
        RiderType: "% Customer"
      },
      ];
	  
	 // Define size & radius of donut pie chart
    var width = 400,
      height = 500,
      radius = Math.min(width, height) / 2.5;
	  
	  // Define arc colours
	  //var color = d3.scale.ordinal()
    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	  
	  var color = d3.scaleOrdinal(["#377eb8", "#ff7f00"]);
	   
	    
	  // Determine size of arcs
    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    // Create the donut pie chart layout
    var pie = d3.pie()
      .value(function(d) {
        return d.count;
      })
      .sort(null);

	  // Append SVG attributes and append g to the SVG
    var mySvg = d3.select('#piediv').append("svg")
      .attr("width", width)
      .attr("height", height);

    var svg = mySvg
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    var svgText = mySvg
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    // Define inner circle
    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 100)
      .attr("fill", "#fff");
	  
	  console.log("Here 2");

    // Calculate SVG paths and fill in the colours
    var g = svg.selectAll(".arc")
      .data(pie(newData))
      .enter().append("g")
      .attr("class", "arc");

    // Append the path to each g
    g.append("path")
      .attr("d", arc)
      .attr("fill", function(d, i) {
        return color(d.data.count);
      });

	  console.log("Here 3");
	  
    var textG = svg.selectAll(".labels")
      .data(pie(newData))
      .enter().append("g")
      .attr("class", "labels");

    
    textG.append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .attr("fill", "#fff")
      .text(function(d, i) {
        return d.data.count;
      });
   
	
    var legendG = mySvg.selectAll(".legend")
      .data(pie(newData))
      .enter().append("g")
	  .attr("transform", function(d,i){
        return "translate(" + (width - 120) + "," + (i * 15 + 20) + ")";
      })
      .attr("class", "legend");   
    
    legendG.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function(d, i) {
        return color(i);
      });
    
    legendG.append("text")
      .text(function(d){
        return d.data.percent + d.data.RiderType;
      })
      .style("font-size", 15)
      .attr("y", 11)
      .attr("x", 11);
	   
		 })(window.d3);