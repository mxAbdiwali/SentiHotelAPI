var map;
var markerGroup;


$(document).ready(function () {
    map = L.map('map').setView([51.5074, -0.1278], 13);
    markerGroup = L.layerGroup().addTo(map);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYW1hcnJvIiwiYSI6ImNqZjJqcXRmdTAzNXoyd3A0ZmUwdWtpdGcifQ.61C6cl2MCXGbwvTWARNxbw'
    }).addTo(map);


    $.get("http://localhost:3000/api/stats", function (data) {
        data.forEach(element => { renderMapPieAllCategory(element) });
    });


    $('#category').children('button').each(function () {
        markerGroup.clearLayers();
        var category = $(this).attr('data-category');
        $.get("http://localhost:3000/api/stats?id="+category, function (data) {
            data.forEach((element) => {
                renderMapPieByCategory(element);
            });
        });

    });



});


//close all popup windows
$(document).ready(function () {
    $(".close").bind("click", function () {
        $(this).parent().slideToggle();
    });
});

//load data
$(document).ready(function () {
    $.get("http://localhost:3000/api/hotels", function (data) {
        data.forEach(element => {
            renderResult(element);
        });
    });
});


function renderCharPie(hotelID) {
}

function renderMapPieByCategory(element) {
   // L.circleMarker(<LatLng> latlng, <CircleMarker options> options?)
   //Lat":51.5177,"Long":-0.143948
   var frequency = element.Frequency;
   var category = element.Ctegory;
   var result = element.Result;
   console.log(category);
   console.log(frequency);
   var options ={
        radius : 10 + (result*frequency)
    }
    console.log((result*frequency))
    /*
   var marker = L.circleMarker([element.Lat,element.Long], options);
   markerGroup.addLayer(marker);
    */
}


function renderMapPieAllCategory(element) {
    if (element.Lat === null || element.Long === null) {
        return;
    }

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', element.HotelID);
    canvas.setAttribute('heigth', 200);
    canvas.setAttribute('weigth', 200);
    var ctx = canvas.getContext('2d');


    //create a pie chart
    var options = {
        animateRotate: true
    };

    data = {
        datasets: [{ data: getArrayOfElement(element.Results) }],
        labels: getArrayOfElement(element.Categories)
    }

    var html = new Chart(ctx, {
        data: data,
        type: 'polarArea',
        options: options
    });


    var pieIcon = L.divIcon({
        html: html,

    })
    //add the chart to the marker
    L.marker([element.Lat, element.Long], { icon: pieIcon }).addTo(map);
}

function getArrayOfElement(string) {
    var arr = [];
    var list = string.split(',');
    for (key in list) {
        if (!isNaN(list[key])) arr.push(parseFloat(list[key]) * 100);
        else arr.push(list[key]);
    }
    return arr;
}

function renderResult(element) {
    var result_container = document.getElementById("result_container");
    var link = document.createElement("a");
    link.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
    link.setAttribute("type", "button");
    link.setAttribute("data-toggle", "modal");
    link.setAttribute("data-target", "#hotelexpand");
    link.setAttribute("data-hotel-id", element.ID);
    link.addEventListener("click", function () {
        var popup = $('#hotelInfoPopup');
        var hotelid = $(this).attr('data-hotel-id');
        popup.children("#name").text(hotelid);
        popup.slideDown();

    });
    result_container.appendChild(link);

    //inner content
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "d-flex w-100")
    //adding 
    link.appendChild(wrapper);
    //height="90" width="90"
    var img = document.createElement("img");
    img.setAttribute("class", "rounded")
    img.setAttribute("src", "img/placeholder.png");
    img.setAttribute("height", "90");
    img.setAttribute("width", "90");
    wrapper.appendChild(img);

    var left_wrapper = document.createElement("div");
    left_wrapper.setAttribute("class", "d-flex  flex-column w-100 ml-3");
    wrapper.appendChild(left_wrapper);

    //left container elements
    //title
    var title = document.createElement("h5");
    title.innerHTML = element.Name;
    title.setAttribute("class", "mb-1 font-weight-light text-capitalize text-primary");
    left_wrapper.appendChild(title);

    var left_wrapper_div = document.createElement("div");
    left_wrapper_div.setAttribute("class", "d-flex flex-row justify-content-between");
    //Minprice

    var hotel_class = document.createElement("span");
    hotel_class.innerHTML = element.Star;
    hotel_class.setAttribute("class", "font-bold text-danger");
    left_wrapper_div.appendChild(hotel_class)

    //rating wrapper
    var ratting_wrapper = document.createElement("div");
    ratting_wrapper.setAttribute("class", "rating");
    left_wrapper_div.appendChild(ratting_wrapper);
    //star element 1
    var star1 = document.createElement("i");
    star1.setAttribute("class", "fa fa-star");
    ratting_wrapper.appendChild(star1);
    //star element 2
    var star2 = document.createElement("i");
    star2.setAttribute("class", "fa fa-star");
    ratting_wrapper.appendChild(star2);
    //star element 3
    var star3 = document.createElement("i");
    star3.setAttribute("class", "fa fa-star");
    ratting_wrapper.appendChild(star3);
    //star element 4
    var star4 = document.createElement("i");
    star4.setAttribute("class", "fa fa-star");
    ratting_wrapper.appendChild(star4);
    //star element 5
    var star5 = document.createElement("i");
    star5.setAttribute("class", "fa fa-star");
    ratting_wrapper.appendChild(star5);

    var price = document.createElement("span");
    price.innerHTML = element.Minprice;
    price.setAttribute("class", "font-italic text-success");
    left_wrapper_div.appendChild(price);


    var right_wrapper = document.createElement("div");
    right_wrapper.setAttribute("class", "d-flex  flex-column w-100 float-right align-items-end alignjustify-content-center");
    wrapper.appendChild(right_wrapper);
    var nmReview = document.createElement("small");
    nmReview.innerHTML = "Review : " + element.Nbreview;
    right_wrapper.appendChild(nmReview)
}


