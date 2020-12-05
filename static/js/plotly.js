

d3.json("/api/v1.0/age_counts_data").then(age_counts_data => {

    let data_dict = age_counts_data[0]

    let x = Object.keys(data_dict)

    let y = Object.values(data_dict)

    var trace1 = {
        x: x,
        y: y,
        type: "bar",
        orientation: "h"
    };

    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "Age Group vs Number of Attacks",
    xaxis: { title: "Age Group" },
    yaxis: { title: "Number of Attacks" }
    };

    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);

});