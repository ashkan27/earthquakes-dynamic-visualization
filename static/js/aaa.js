
//  var x = d3.scaleLinear()
//  .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
//  .range([0, 100]);

// var histogram = d3.histogram()
// .value(function(d) { return d.magnitude;})   // I need to give the vector of value
// .domain([5.5, 9.2])  // then the domain of the graphic
// .thresholds(37); // then the numbers of bins


var i;
binsx=[];
for (i=0; i<36; i++){
binsx.push(i/10+5.5);
};



// And apply this function to data to get the bins



function buildCharts(dropyear) {

d3.json("/api").then((response)=> {
  

var year = response[0].year
  // console.log(year)

var firstyear = response
if (dropyear=="1965-2016"){
var firstyear = response.filter(r => r);
}else{
var firstyear = response.filter(r => r.year == dropyear)
}

// var bins = histogram(firstyear);
//   console.log(bins.map(d=>d.length));
//   console.log(bins.map((d, i)=>i/10+5.5))

var x = [];
for (var i = 0; i < firstyear.length; i ++) {
	x[i] = firstyear[i].magnitude
}

var trace = {
  x: x,
  type: 'histogram',
  name: "Hist.",
  autobinx: false,
  xbins: {
    end: 10, 
    size: 0.1, 
    start: 5.5
  },
  marker: {
  color: 'gray',
	}
};



var trace2 = {
  x : binsx,
  y: binsx.map(d=>Math.pow(10,9.36654-1.03129*(d))),
  mode: 'lines',
  name: 'GR fit',
  line: {color: 'black'},
  type: 'scatter',
  fill: 'tozeroy',
  fillcolor: "#12345680"
};

var barLayout = {
  title: `Significant Earthquakes in ${dropyear}`,
  xaxis: { title: "Magnitudes"},
  yaxis: { title: "Number of Earthquakes"},
  margin: { t: 30, l: 150 },
  bargap: 0.05
};


if (dropyear=="1965-2016"){
  Plotly.newPlot("bar", [trace, trace2], barLayout);
  }else{
  Plotly.newPlot("bar", [trace], barLayout);
  }



})
}

// function buildMetadata(sample) {
//   d3.json("/api").then((response)=> {
//     var metadata = data.metadata;
//     // Filter the data for the object with the desired sample number
//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//     var result = resultArray[0];
//     // Use d3 to select the panel with id of `#sample-metadata`
//     var PANEL = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     PANEL.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(result).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//     });

//     // BONUS: Build the Gauge Chart
//     buildGauge(result.wfreq);
//   });
// }

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

var selector = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("/api").then((response)=> {
  var sampleyear = []

  for (var i = 0; i < response.length; i ++) {
    sampleyear[i] = response[i].year
  }
sampleyear = sampleyear.filter(unique)

  console.log(sampleyear)


  sampleyear.forEach((s) => {
    selector
      .append("option")
      .text(s)
      .property("value", s);
  });


var firstsample = sampleyear[0];

buildCharts("1965-2016")

})

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
// }


// var range = $('.range-slider input[type="range"]');

// range.on('input', function () {
//   var year = range.val();
//   buildCharts(range.val());
// });




