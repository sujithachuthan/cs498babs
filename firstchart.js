var w = 1100,
    h = 700,
    r1 = h / 2,
    r0 = r1 - 80;

var formatPercent = d3.format("0, f");

var fill = d3.scale.category20c();

var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var arc = d3.svg.arc()
    .innerRadius(r0)
    .outerRadius(r0 + 20);

var svg = d3.select("#menu2").append("svg:svg")
    .attr("width", w)
    .attr("height", h + 32 )
     .append("svg:g")
	 .attr("id", "circle")
    .attr("transform", "translate(" + ((w / 2)) + "," + ((h / 2) + 30) + ")");
	
svg.append("circle")
.attr("r", r0);

d3.csv("teams.csv", function(cities) {
d3.json("matrix.json", function(matrix) {
// Returns an event handler for fading a given chord group.
      var fade = function(opacity) {
        return function(g, i) {
          svg.selectAll(".chord")
              .filter(function(d) {
                return d.source.index != i && d.target.index != i;
              })
            .transition()
              .style("opacity", opacity);
          var groups = [];
          svg.selectAll(".chord")
              .filter(function(d) {
                if (d.source.index == i) {
                  groups.push(d.target.index);
                }
                if (d.target.index == i) {
                  groups.push(d.source.index);
                }
              });
          groups.push(i);
          var length = groups.length;
          svg.selectAll('.group')
              .filter(function(d) {
                for (var i = 0; i < length; i++) {
                  if(groups[i] == d.index) return false;
                }
                return true;
              })
              .transition()
                .style("opacity", opacity);
        };
      };
	  
  chord.matrix(matrix);

  var g = svg.selectAll("g.group")
      .data(chord.groups)
    .enter().append("svg:g")
      .attr("class", "group")
	  .on("mouseover", mouseover)
      //.on("mouseover", fade(.02))
     .on("mouseout", fade(1));

  g.append("svg:path")
      .style("stroke", function(d, i) { return fill(cities[i]); })
      .style("fill", function(d, i) { return cities[i].color; })
      .attr("d", arc);

  g.append("svg:text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
	  .style("fill", "blue")
	  .style("font-weight", "bold")
      .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (r0 + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .text(function(d, i) { return cities[i].name; });

 var pathChord = svg.selectAll("path.chord")
      .data(chord.chords)
    .enter().append("svg:path")
      .attr("class", "chord")
      .style("stroke", function(d) { return d3.rgb(fill(cities[d.source.index])).darker(); })
      .style("fill", function(d) { return cities[d.source.index].color;})
      .attr("d", d3.svg.chord().radius(r0));

// Add an elaborate mouseover title for each chord.
 pathChord.append("title").text(function(d) {
 return cities[d.source.index].name
 + " -> " + cities[d.target.index].name
 + ": " + formatPercent(d.source.value)
 + "\n" + cities[d.target.index].name
 + " -> " + cities[d.source.index].name
 + ": " + formatPercent(d.target.value);
 });
 
function mouseover(d, i) {
pathChord.classed("fade", function(p) {
return p.source.index != i
&& p.target.index != i;
});
}

});
});