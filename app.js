 

window.addEventListener('load', ()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let timezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span");

  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy ="https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/42a705b79a16283e6aac77c55795b8fe/${lat},${long}`;
        fetch(api)
        .then(response =>{
        	return response.json();
        })
        .then(data => {
        	console.log(data);
        	const {temperature, summary, icon}= data.currently; //this structure helps us retrieve information easily using new JS
        	//set DOM elements from API
            temperatureDegree.innerHTML = temperature;
            temperatureDescription.innerHTML = summary;
            timezone.innerHTML = data.timezone;
            //formula for Celcius
            let celciusTemperature = (temperature - 32) * 5/9;
            //set Icon
            setIcons(icon, document.querySelector(".icon"));
   	        //Change temperature to Celcius/Fahrenheit
   	        degreeSection.addEventListener("click", ()=>{
   	        	if(temperatureSpan.innerHTML === "F"){
   	        	   
   	               temperatureDegree.innerHTML = Math.round(celciusTemperature);
                   temperatureSpan.innerHTML = "C";
   	        	} else{
   	        		temperatureDegree.innerHTML = temperature;
                    temperatureSpan.innerHTML = "F";
   	        	}
   	        })
        });
     });
  } else{
     
  }
   function setIcons(icon, iconID) {
   	 const skycons = new Skycons({color: "white"});
   	 const currentIcon = icon.replace(/-/g, "_").toUpperCase();
   	 skycons.play();
   	 return skycons.set(iconID, Skycons[currentIcon]);

   } 
});


