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
    console.log(data);
  })
}

getLocation();
