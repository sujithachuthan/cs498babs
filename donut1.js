(function(d3) {
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;
var legendRectSize = 18;
var legendSpacing = 4;
/*var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);*/
var color = d3.scaleOrdinal(d3.schemeCategory20b);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 90);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.count; });

var svg = d3.select("#menu1").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("weekdays.csv", type, function(error, data) {

  if (error) throw error;

  var g = svg.selectAll(".arc1")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc1");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.label); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
	  .attr("font-weight", "bold")
      .text(function(d) { var total = d3.sum(data.map(function(d) {
	  return (d.enabled) ? d.count : 0; })); return d.data.count + " (" + Math.round(1000 * d.data.count / total) / 10 + "%)"; })
	  .style("fill", "#fff");
        
		
            var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color)                                   
            .on('click', function(label) {
				
              var rect = d3.select(this);                             
              var enabled = true;                                     
              var totalEnabled = d3.sum(data.map(function(d) {     
                return (d.enabled) ? 1 : 0;                           
              }));                                                    
			  
              /*if (rect.attr('class') === 'disabled') {                
                rect.attr('class', '');                               
              } else {                                                
                if (totalEnabled < 2) return;                         
                rect.attr('class', 'disabled');                       
                enabled = false;                                      
              }                                                       

              pie.value(function(d) {                                 
                if (d.label === label) d.enabled = enabled;           
                return (d.enabled) ? d.count : 0;                     
              }); */                                                    
            
			});
			
            legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
			.attr("font-weight", "bold")
            .text(function(d) { return d; });
			
});

function type(d) {
  d.count = +d.count;
  d.enabled=true;
  return d;
}
})(window.d3);