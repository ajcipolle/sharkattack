// Creating map object
var myMap = L.map("mapcontainer", {
    center: [40.7128, 0],
    zoom: 2
});
// Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// }).addTo(myMap);

// Use this link to get the geojson data.
var link = "../static/data/countries.geojson";
// var link = "https://github.com/ajcipolle/sharkattack/blob/main/data/countries.geojson";
// Official Olympic Colors
var olyblue = "#0085C7"
var olygold = "#F4C300"
var olyblack = "#000000"
var olygreen = "#009F3D"
var olyred = "#DF0024"
    // Function that will determine the color of a country
function chooseColor(ADMIN) {
    switch (ADMIN) {
        case "South Africa":
            return olyblue;
        case "Mexico":
            return olygold;
        case "Chile":
            return olyred;
        case "Cuba":
            return olyred;
        case "United States of America":
            return olyblue;
        case "Australia":
            return olyred;
        case "Mozambique":
            return olygold;
        case "Brazil":
            return olygreen;
        case "Japan":
            return olyblack;
        case "Indonesia":
            return olyblack;
        case "India":
            return olyblack;
        default:
            return "#d3ffff";
    }
}

// bring in cleaned shark attack from flask app
// var sharkmap = d3.json("/").then((_data) => {

//     console.log(_data);
// });

// mouseOn move shows pop-up with country name
// mouseOff undo move 
// bind the pop-up and fill popup with prediction data
// clickON move zooms in
// and shows pop-up with prediction data

// grabbing results data
// d3.json("/api/v1.0/machine_learning_results").then(machine_learning_results => {
// console.log(machine_learning_results)
// grabbing fatal counts data, the next two lines can be replaced with results data api call


// Grabbing our GeoJSON data..
// d3.json("/api/v1.0/fill_blanks_data").then(fillblanks => {

// Grab the fatal counts with d3 and flask
d3.json("/api/v1.0/plot_data_map").then(plot_data_map => {
    console.log(plot_data_map)
        // let attack_area = []
        // for (let i = 0; i < plot_data_map.length; i++) {
        //     let area = plot_data_map[i].area
        //     attack_area.push(area)
        // };
        // console.log(attack_area)
        // Grab the geoJSON country data
    d3.json(link).then(data => {
        console.log(data)

        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        }).addTo(myMap);


        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
            // Style each feature (in this case a country)
            style: function(feature) {
                return {
                    color: "black",
                    // Call the chooseColor function to decide which color to color our country (color based on goals?)
                    fillColor: chooseColor(feature.properties.ADMIN),
                    fillOpacity: 0.5,
                    weight: 0.5
                };
            },
            // Called on each feature
            onEachFeature: function(feature, layer) {
                // Set mouse events to change map styling
                layer.on({
                    // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: .9,
                            weight: 1,
                            color: "white"
                        });
                    },
                    // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
                    mouseout: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5,
                            weight: 0.5,
                            color: "black"
                        });
                    },
                    // When a feature (country) is clicked, it is enlarged to fit the screen
                    // click: function(event) {
                    //     myMap.fitBounds(event.target.getBounds());
                    // }
                });
                // Conditional for matching geoJSON country names (feature.properties.ADMIN) with lat longs 
                // Giving each feature a pop-up with information pertinent to it
                //  `<h3>${feature.properties.ADMIN}</h3> <hr> <h4>fatal count: ${fatal_counts_data[0].fatal}!</h4>`
                // run a function in the pop up to match geoJSON countries and results data
                // layer.bindPopup(popuptext(feature.properties.ADMIN, attack_area));
                for (var i = 0; i < plot_data_map.length; i++) {
                    prediction = plot_data_map[i].fatality_predicted
                        // console.log(prediction)
                    layer.bindPopup(`<h3>If you get attacked by a shark in ${feature.properties.ADMIN},</h3> <hr> <h4>we predict your chance of death is ${prediction}%. </h4>`)
                }

            }

        }).addTo(myMap);
        // Create a new marker cluster group
        // Loop through data
        for (var i = 0; i < plot_data_map.length; i++) {
            // Set the data location property to a variable
            // var location = plot_data_map[i].area;
            // console.log(location[0])
            // // Check for location property
            if (plot_data_map[0].latitude, plot_data_map[0].longitude) {
                console.log(plot_data_map[0].latitude)
                    // Add a new marker to the cluster group and bind a pop-up
                markers = L.marker([plot_data_map[i].latitude, plot_data_map[i].longitude])
                    .bindPopup(`<h3> ${plot_data_map[i].area}, ${plot_data_map[i].country} <br><hr> Predicted Chance of Death: ${plot_data_map[i].fatality_predicted}% <br><hr> Actual Death Percentage: ${plot_data_map[i].fatality_actual}%</h3>`);
                myMap.addLayer(markers);
            }
        }
    })
});




// Add our marker cluster layer to the map


// });

// });



// function popuptext(country_name, data) {
//     fatal_or_not = "";
//     data.forEach((record) => {
//         if (feature.properties.ADMIN == attack_area.country) {
//             fatal_or_not = attack_area.fatality_predicted
//         }
//     })
//     console.log(fatal_or_not)

//     return `<h3>${feature.properties.ADMIN}</h3> <hr> <h4>Fatality Prediction: ${fatal_or_not}!</h4>`
// }
// });


// add marker clusters layer



// d3.json(all_results).then(data => {
//     console.log(data);