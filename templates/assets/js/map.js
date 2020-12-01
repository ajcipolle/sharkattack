// Creating map object
var myMap = L.map("map", {
    center: [40.7128, 0],
    zoom: 2
});
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
// var link = "../data/countries.geojson";
var link = "https://github.com/ajcipolle/sharkattack/blob/main/data/countries.geojson";
// Official Olympic Colors
var olyblue = "#0085C7"
var olygold = "#F4C300"
var olyblack = "#000000"
var olygreen = "#009F3D"
var olyred = "#DF0024"
    // Function that will determine the color of a country based on the medals count? it belongs to
function chooseColor(ADMIN) {
    switch (ADMIN) {
        case "United Kingdom":
            return olyblue;
        case "Algeria":
            return olygold;
        case "China":
            return olyred;
        case "Russia":
            return olyred;
        case "United States of America":
            return olyblue;
        case "Spain":
            return olyred;
        case "France":
            return olygold;
        case "Brazil":
            return olygreen;
        case "Japan":
            return olyblack;
        case "Germany":
            return olyblack;
        case "India":
            return olyblack;
        default:
            return "#d3ffff";
    }
}

// bring in cleaned shark attack from flask app
// var mapmedal = d3.json("api").then((_data) => {

//     console.log(_data);
// });

// mouseOn move shows pop-up with country name
// mouseOff undo move 
// bind the pop-up and fill popup with country name and medal count
// clickON move zooms in
// and shows pop-up with medal count

// Grabbing our GeoJSON data..
d3.json(link).then(data => {
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
                click: function(event) {
                    myMap.fitBounds(event.target.getBounds());
                }
            });
            // Giving each feature a pop-up with information pertinent to it
            layer.bindPopup(`<h3>${feature.properties.ADMIN}</h3> <hr> <h4>Api call from flask app.py route /medals</h4>`);

        }
    }).addTo(myMap);
});

// d3.json(all_results).then(data => {
//     console.log(data);
// });