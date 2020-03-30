


var locMarkers = [];
var locMarkersSmall = [];
// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  id: "mapbox.light",
  accessToken: API_KEY
});



  



  // Define a map object
 






  // var layer = [streetmap, states];



  // // Step 1: Append a div to the body to create tooltips, assign it a class
  // // =======================================================
  // var toolTip = d3.select("body").append("div")
  //   .attr("class", "tooltip");

  // // Step 2: Add an onmouseover event to display a tooltip
  // // ========================================================
  // d3.selectAll(".leaflet-interactive").on("mouseover", function (d, i) {
  //   toolTip.style("display", "block");
  //   toolTip.html(`Mag: ${response[i].magnitude}    Depth: ${response[i].depth} `)
  //     .style("left", d3.event.pageX + "px")
  //     .style("top", (d3.event.pageY - 30) + "px");
  // })
  //   // Step 3: Add an onmouseout event to make the tooltip invisible
  //   .on("mouseout", function () {
  //     toolTip.style("display", "none");
  //   });



  


  d3.json("/api").then((response)=> {

    var myMap = L.map("map", {
      center: [0, +10],
      zoom: 2,
      minZoom: 2,
      layers: [streetmap],
      worldCopyJump: true,
      attributionControl: false
    });
    

    var responseYear = response.filter(d => d.year == 1965);
    console.log(responseYear[1].magnitude);
    
    var mags = [];
  
    var i;
    for (i = 0; i < responseYear.length; i++) {
      mags.push(responseYear[i].magnitude);
    };

    responseYear = response;
    for (i = 0; i < responseYear.length; i++) {

    // creating markers

    locMarkers.push(
      L.circle([responseYear[i].latitude, responseYear[i].longitude], {
        className: `map${i}`,
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: `rgb(255, ${255 - 255 * (responseYear[i].magnitude-d3.min(mags)) / (d3.max(mags)-d3.min(mags))}, ${0})`,
        radius: Math.pow((responseYear[i].magnitude) * 80 ,2)/(1/Math.cos(responseYear[i].latitude * 0.0174533))
        
      })
    );

    locMarkersSmall.push(
      L.circle([responseYear[i].latitude, responseYear[i].longitude], {
        className: `map${i}`,
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: `rgb(255, ${255 - 255 * (responseYear[i].magnitude-d3.min(mags)) / (d3.max(mags)-d3.min(mags))}, ${0})`,
        radius: Math.pow((responseYear[i].magnitude) * 80 ,2)/(1/Math.cos(responseYear[i].latitude * 0.0174533))/10
      })
    );
  

  }


  var states = L.layerGroup(locMarkers);
  var statesSmall = L.layerGroup(locMarkersSmall);
  
  states.addTo(myMap)
 






  var output = $('.range-slider .output');
  var range = $('.range-slider input[type="range"]');
  // var j = 0;
  var lastYear = 1965;
  range.on('input', function () {
  // j++;
  states.removeFrom(myMap)
  statesSmall.removeFrom(myMap)
  
  var year = range.val();
  var cCenter = myMap.getCenter();
  console.log(cCenter);

  myMap.panTo(new L.LatLng(cCenter.lat, cCenter.lng+(year-lastYear)/myMap.getZoom()));
  var locMarkers = [];
  var locMarkersSmall = [];

  lastYear = range.val();
  
  
  responseYear = response.filter(d => d.year == year);
  for (i = 0; i < responseYear.length; i++) {

    // creating markers

    locMarkers.push(
      L.circle([responseYear[i].latitude, responseYear[i].longitude], {
        className: `map${i}`,
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: `rgb(255, ${255 - 255 * (responseYear[i].magnitude-d3.min(mags)) / (d3.max(mags)-d3.min(mags))}, ${0})`,
        radius: Math.pow((responseYear[i].magnitude) * 80 ,2)/(1/Math.cos(responseYear[i].latitude * 0.0174533))
      })
    );

    locMarkersSmall.push(
      L.circle([responseYear[i].latitude, responseYear[i].longitude], {
        className: `map${i}`,
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: `rgb(255, ${255 - 255 * (responseYear[i].magnitude-d3.min(mags)) / (d3.max(mags)-d3.min(mags))}, ${0})`,
        radius: Math.pow((responseYear[i].magnitude) * 80 ,2)/(1/Math.cos(responseYear[i].latitude * 0.0174533))/10
      })
    );

  }


  states = L.layerGroup(locMarkers);
  statesSmall = L.layerGroup(locMarkersSmall);
  
  

  var currentZoom = myMap.getZoom(); 
    if (currentZoom > 4) { 
      statesSmall.addTo(myMap)
     
        // map.addLayer(icons2);
    }
    if (currentZoom < 5) { 
      states.addTo(myMap)
     
        // map.addLayer(icons2);
    }



   // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  d3.selectAll(".leaflet-interactive").on("mouseover", function (d, i) {
    toolTip.style("display", "block");
    toolTip.html(`Mag: ${responseYear[i].magnitude},    Depth: ${responseYear[i].depth},    Date: ${responseYear[i].date.split(" ").slice(0,3).join(" ")} `)
      .style("left", d3.event.pageX + "px")
      .style("top", (d3.event.pageY - 30) + "px");
      d3.select("#map").selectAll(`.map${i}`).style("stroke", "black");
       d3.select("#scatter").selectAll(`.scat${i}`).style("stroke", "black");
      
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function (d, i) {
      toolTip.style("display", "none");
      d3.select("#map").selectAll(`.map${i}`).style("stroke", "none");
      d3.select("#scatter").selectAll(`.scat${i}`).style("stroke", "none");
    });

});






var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<div class="strong"><b>Mag:</b></div>'];

    for (var i = 0; i < 4; i++) {
      if (i == 3) {
        var end = "+";
      } else {
        var end = "-" + Math.round(5+((i + 1) / 3 * (d3.max(mags)-d3.min(mags))));
      };

      div.innerHTML +=
        labels.push(`<div class="rect" style="background: rgb(255, ${255 - 255 * (i) / 3}, ${0})"> ${5+Math.round(i / 3 * (d3.max(mags)-d3.min(mags)))}${end}</div>`);

    }
    div.innerHTML = labels.join('');
    return div;
  };

  legend.addTo(myMap);







  myMap.on('zoomend', function() {
    var currentZoom = myMap.getZoom(); 
    if (currentZoom > 4) { 
      states.removeFrom(myMap);
      statesSmall.addTo(myMap);
     
        // map.addLayer(icons2);
    }
    if (currentZoom < 5) { 
      states.addTo(myMap);
      statesSmall.removeFrom(myMap);
     
        // map.addLayer(icons2);
    }
})


   




  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  d3.selectAll(".leaflet-interactive").on("mouseover", function (d, i) {
    toolTip.style("display", "block");
    toolTip.html(`Mag: ${responseYear[i].magnitude}    Depth: ${responseYear[i].depth} `)
      .style("left", d3.event.pageX + "px")
      .style("top", (d3.event.pageY - 30) + "px");
      d3.select("#map").selectAll(`.map${i}`).style("stroke", "black");
      d3.select("#scatter").selectAll(`.scat${i}`).style("stroke", "black");
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function (d, i) {
      toolTip.style("display", "none");
      d3.select("#map").selectAll(`.map${i}`).style("stroke", "none");
      d3.select("#scatter").selectAll(`.scat${i}`).style("stroke", "none");
    });

  });




// ===========================================================

d3.json("/api").then((response)=> {

  mags=[];
  depths=[];

  var i;

  for (i = 0; i < response.length; i++) {
   mags.push(response[i].magnitude);
   depths.push(response[i].depth);
  };


function scatterPlot(xData, yData) {


  // Define SVG area dimensions
  var svgWidth = 500;
  var svgHeight =  300 ;
  
  // var svgWidth = 160;
  // var svgHeight = 960;
  
  // Define the chart's margins as an object
  var chartMargin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 60
  };
  
  // Define dimensions of the chart area
  var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
 
 
 
 // Select body, append SVG area to it, and set the dimensions
 var svg = d3.select("#scatter")
   .append("svg")
   .attr("height", svgHeight)
   .attr("width", svgWidth);
 
 // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
 var chartGroup = svg.append("g")
   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
 
 // Load data from hours-of-tv-watched.csv
 
 
   var dataNew= response;
   console.log(response[1].magnitude);
  


  

  //  console.log(mags);
  //  console.log(depths);

 
 
   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
   var xBandScale = d3.scaleLinear()
     .domain([d3.min(mags)*0.98, d3.max(mags)*1.05])
     .range([0, chartWidth]);
 
 
   // Create a linear scale for the vertical axis.
   var yLinearScale = d3.scaleLinear()
   .domain([ d3.max(depths), -20])
   .range([0, chartHeight]);
     
 
 
 //   // Create two new functions passing our scales in as arguments
 //   // These will be used to create the chart's axes
   var bottomAxis = d3.axisBottom(xBandScale).ticks(5);
   var leftAxis = d3.axisLeft(yLinearScale).ticks(5);
 
 //   // Append two SVG group elements to the chartGroup area,
 //   // and create the bottom and left axes inside of them
   chartGroup.append("g")
     
     .call(leftAxis);
 
   chartGroup.append("g")
     .attr("transform", `translate(0, ${chartHeight})`)
     .call(bottomAxis);
 

   function make_x_gridlines() {		
     return d3.axisBottom(xBandScale)
         .ticks(5)
   }

   function make_y_gridlines() {		
    return d3.axisLeft(yLinearScale)
        .ticks(5)
  }
   
 
    // add the X gridlines
    svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate("+chartMargin.left+"," + (chartHeight+chartMargin.top) + ")")
    .call(make_x_gridlines()
        .tickSize(-chartHeight)
        .tickFormat("")
    )

      // add the Y gridlines
      svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate("+chartMargin.left+"," + (10) + ")")
      .call(make_y_gridlines()
          .tickSize(-chartWidth)
          .tickFormat("")
      )
 
     
 
   // Create one SVG rectangle per piece of tvData
   // Use the linear and band scales to position each rectangle within the chart
   var barsGroup = chartGroup.selectAll(".bar")
     .data(xData)
     .enter()
     .append("circle")
     .attr("class", (d, i) =>`scat${i}`)
     .attr("cy", (d, i) => yLinearScale(yData[i]))
     .attr("cx", (d, i) => xBandScale(d))
     .attr("r", (d, i) => Math.pow(xData[i],2)/7)
     .attr("style", (d, i) =>`fill:rgb(255, ${255 - 255 * (xData[i]-d3.min(mags)) / (d3.max(mags)-d3.min(mags))}, ${0}, 0.2)`)
    
     ;
 
 
 
 
 
 
 
 // Step 1: Append a div to the body to create tooltips, assign it a class
   // =======================================================
   var toolTip = d3.select("body").append("div")
     .attr("class", "tooltip");
 
   // Step 2: Add an onmouseover event to display a tooltip
   // ========================================================
   barsGroup.on("mouseover", function(d, i) {
     toolTip.style("display", "block");
     console.log(`OTU labels: ${xData[i]}`);
     toolTip.html(`Mag: ${xData[i]},    Depth: ${yData[i]} `)
      .style("left", d3.event.pageX + "px")
      .style("top", (d3.event.pageY - 30) + "px");
      d3.select("#map").selectAll(`.map${i}`).style("stroke", "black");
      d3.select("#scatter").selectAll(`.scat${i}`).style("stroke", "black");
       
   })
     // Step 3: Add an onmouseout event to make the tooltip invisible
     .on("mouseout", function(d, i) {
       toolTip.style("display", "none");
       d3.select("#map").selectAll(`.map${i}`).style("stroke", "none");
       d3.select("#scatter").selectAll(`.scat${i}`).style("stroke", "none");
     });
 
  
 };




 
 
 var range = $('.range-slider input[type="range"]');

 range.on('input', function () {

 
 responseYear = response.filter(d => d.year == range.val());

 magsYear=[];
 depthsYear=[];

  var i;

  for (i = 0; i < responseYear.length; i++) {
   magsYear.push(responseYear[i].magnitude);
   depthsYear.push(responseYear[i].depth);
  };


 d3.select("#scatter").select("svg").remove();
 scatterPlot(magsYear, depthsYear);
 });

 scatterPlot(mags, depths);


  // test=d3.select("output").text()

  // console.log("test"+test);

});
 
 
//    d3.select("#selDataset").on("click", function(){
//      console.log("Update ID");
//      console.log("Update ID");
//      ID=d3.select("#selDataset").node().value;
//      d3.select("#sample-metadata").selectAll("div").remove();
//      d3.selectAll("#bar").select("svg").remove();
//      barChart(ID);
//      d3.select("#gauge").select("svg").remove();
//      scatterPlot(ID);
    
  //  });

  


   