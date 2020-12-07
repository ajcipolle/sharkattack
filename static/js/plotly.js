// Grab data from the flask route
d3.json("/api/v1.0/age_counts_data").then(age_counts_data => {

    // Define variables for graph
    let data_dict = age_counts_data[0]

    let x = Object.keys(data_dict)

    console.log(x)

    let y = Object.values(data_dict)

    // Define the x axis, y axis, and type
    var trace1 = {
        x: [x[1], x[5], x[0], x[3], x[2], x[4]],
        y: [y[1], y[5], y[0], y[3], y[2], y[4]],
        type: "bar",
        // orientation: "h"
    };

    // Create a list
    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "Age Group vs Number of Attacks",
    xaxis: { title: "Age Group" },
    yaxis: { title: "Number of Attacks" }
    };

    // Plot the chart to a div tag with id "age_bar"
    Plotly.newPlot("age_bar", data, layout);

});

// Grab data from the flask route
d3.json("/api/v1.0/fatal_counts_data").then(fatal_counts_data => {

    // Define variables for graph
    let data_dict = fatal_counts_data[0]

    let x = Object.keys(data_dict)

    let y = Object.values(data_dict)

    // Define the x axis, y axis, and type
    var trace1 = {
        x: x,
        y: y,
        type: "bar",
        orientation: "h"
    };

    // Create a list
    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "Fatality vs Number of Attacks",
    xaxis: { title: "Fatality" },
    yaxis: { title: "Number of Attacks" }
    };

    // Plot the chart to a div tag with id "fatal_bar"
    Plotly.newPlot("fatal_bar", data, layout);

});

// Grab data from the flask route
d3.json("/api/v1.0/sex_counts_data").then(sex_counts_data => {

    // Define variables for graph
    let data_dict = sex_counts_data[0]

    let x = Object.keys(data_dict)

    let y = Object.values(data_dict)

    // Define the x axis, y axis, and type
    var trace1 = {
        x: x,
        y: y,
        type: "bar",
        orientation: "h"
    };

    // Create a list
    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "Sex vs Number of Attacks",
    xaxis: { title: "Sex" },
    yaxis: { title: "Number of Attacks" }
    };

    // Plot the chart to a div tag with id "sex_bar"
    Plotly.newPlot("sex_bar", data, layout);

});