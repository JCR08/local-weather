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
  $("#weatherDesc").text(data.weather[0].main);
  $("#weatherIcon").attr("src", data.weather[0].icon);
  backgroundImage(data);
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

function backgroundImage(data){
  var weather = data.weather[0].main;
  switch(weather){
    case 'Mist':
      $('body').css({'background': "url('/images/mist.jpg')",
      "background-size" : "100%"})
      break;
    case 'Clouds':
      $('body').css({'background': "url('images/cloudy.jpg')",
      "background-size" : "100%"})
      break;
    case 'Rain':
      $('body').css({'background': "url('/images/rain.jpg')",
      "background-size" : "100%"})
      break;
    case 'Snow':
      $('body').css({'background': "url('/images/snow.jpg')",
      "background-size" : "100%"})
      break;
    case 'Thunderstorm':
      $('body').css({'background': "url('/images/thunderstorm.jpg')",
      "background-size" : "100%"})
      break;
    case 'Drizzle':
      $('body').css({'background': "url('/images/rain.jpg')",
      "background-size" : "100%"})
      break;
    case 'Clear':
      $('body').css({'background': "url('/images/clear.jpg')",
      "background-size" : "100%"})
      break;
  }
  console.log(data);
}


getLocation();
