function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }
}

function getWeather(lat, lon){
  $.get(`https://fcc-weather-api.glitch.me/api/current?lon=${lon}&lat=${lat}`, function(data){
    displayData(data);
  })
}

function displayData(data){
  $("#city").text(`${data.name}, ${data.sys.country}`);
  $("#temp").text(Math.floor(data.main.temp))
  $("#degree").text(String.fromCharCode(176))
  $("#unit").text("C");
  $("#unit").click(tempUnit);
  $("#weatherIcon").attr("src", data.weather[0].icon);
  console.log(data);
}

function tempUnit(){
  if($("#unit").text() == "C"){
    convertToFahrenheit();
    $("#unit").text("F");
  } else {
    convertToCelsius();
    $("#unit").text("C");
  }
}

function convertToFahrenheit(){
  var celsius = $("#temp").text();
  var fahrenheit = celsius * (9/5) + 32;
  $("#temp").text(Math.floor(fahrenheit))
}

function convertToCelsius(){
  var fahrenheit = $("#temp").text();
  var celsius = (fahrenheit -32) * (5/9);
  $("#temp").text(Math.ceil(celsius));
}

getLocation();
