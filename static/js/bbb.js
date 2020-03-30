function histChart(dropyear) {

d3.json("/api").then((response) => {

var baryear = response
var baryear = response.filter(r => r.year == dropyear)

var x = [];
for (var i = 0; i < baryear.length; i ++) {
	x[i] = baryear[i].magnitude
}

var trace = {
  x: x,
  type: 'histogram',
  marker: {
    color: 'brown',
	}
};

var barLayout = {
  title: `Significant Earthquakes in ${dropyear}`,
  xaxis: { title: "Magnitudes"},
  yaxis: { title: "Number of Earthquakes"},
  margin: { t: 30, l: 150 }
};

Plotly.newPlot("bar", [trace], barLayout);

})
}


function summary(dropyear) {

  d3.json("/api").then((response) => {

    var sum = response;
    sum = sum.filter(r => r.year == dropyear);
    var total = sum.length
    var maxmag = sum.reduce((max, p) => p.magnitude > max ? p.magnitude : max, sum[0].magnitude)

    var sig = sum.filter(r => r.magnitude == maxmag);
    sig = sig[0]

    var latitude = sig.latitude.toFixed(3)
    var longitude = sig.longitude.toFixed(3)

    var result = {Earthquakes:total, MaxMagnitude:maxmag, Depth:sig.depth, Date:sig.date, latitude:latitude, longitude:longitude};
    console.log(result)

    var info = d3.select("#information");

    info.html("");

    Object.entries(result).forEach(([key, value]) => {
      info.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

var selector = d3.select("#selectyear");

d3.json("/api").then((response) => {
  var allyear = []

  for (var i = 0; i < response.length; i ++) {
    allyear[i] = response[i].year
  }
allyear = allyear.filter(unique)

  console.log(allyear)


  allyear.forEach((s) => {
    selector.append("option").text(s).property("value", s);
  });


var firstyear = allyear[0];

histChart(firstyear)
summary(firstyear)


var totaleq = [];
for (var i = 0; i < allyear.length; i ++) {

  eachyear = response.filter(r => r.year == allyear[i]);
  totaleq[i] = eachyear.length
  
}

console.log(totaleq)

var trace = {
  x: allyear,
  y: totaleq,
  type: 'scatter',
  marker: {
    color: 'black',
	}
};

var barLayout = {
  title: "Significant Earthquakes from 1965 to 2016",
  xaxis: { title: "Years"},
  yaxis: { title: "Number of Earthquakes"},
  margin: { t: 30, l: 150 }
};

Plotly.newPlot("linechart", [trace], barLayout);

});

function newentry(newyear) {

  histChart(newyear);
  summary(newyear)
}




