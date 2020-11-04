var isImperial = false;

const APIkey = "9f59d77a6813b5f48e666428fd4f8811";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?"

const requestCity = async (city) => {// COOL IT WORKS!
    const baseURL= "http://api.openweathermap.org/data/2.5/weather" ;

    let unit = 'metric'
    if(isImperial){
        unit = 'imperial'
    }

    let query = `?q=${city}&units=${unit}&appid=${APIkey}`;
    const response = await fetch(baseURL + query);
    return await response.json();
}

async function weatherSearchData(){
//user input city (getUserInput())
    let userCityInput = getUserInput();

    if(userCityInput == ""){
    alert("No city name has been entered.");
    return;
    }
    //fecth city weather info from server(requestCity(userInputCity))
    let weatherData = await requestCity (userCityInput);

    if(weatherData.cod == "404" && weatherData.message=="city not found"){
        alert(`City not found '${userCityInput}'`+ "\nPlease enter valid city name. \nExample: 'Rome' or 'Rome,IT'");
        return;
    }

    displayWeatherData(weatherData);
    //data on webpage (displayWeatherData(weatherData))
}
function displayWeatherData(weatherData) {
    //get weatherData
console.log(weatherData);
    const {name} = weatherData;
    const {temp, temp_max, temp_min, pressure, humidity} = weatherData.main; 
    const {speed, deg} = weatherData.wind;
    const {country} = weatherData.sys;
    const {description, icon} = weatherData.weather[0];

    if(isImperial){
        
        document.querySelector("#tempMax span").innerHTML = Math.floor(`${temp_max}`)+"°F &uarr;";
        document.querySelector(".temp").innerHTML = Math.floor(`${temp}`)+"°F";
        document.querySelector("#tempMin span").innerHTML = Math.floor(`${temp_min}`)+"°F &darr;";
        document.querySelector(".speedAnswr").innerHTML =  `${speed}`+" m/h";
    
    }else{
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/${icon}.svg">`;
        document.querySelector("#countryCode").innerHTML = `${country}`;
        document.querySelector("#cityName").innerHTML =  `${name}`;
        document.querySelector("#tempMax span").innerHTML = Math.floor(`${temp_max}`)+"°C &uarr;";
        document.querySelector(".temp").innerHTML = Math.floor(`${temp}`)+"°C";
        document.querySelector("#tempMin span").innerHTML = Math.floor(`${temp_min}`)+"°C &darr;";
        document.querySelector(".speedAnswr").innerHTML =  `${speed}`+" km/h";
        document.querySelector(".degAnswr").innerHTML =  `${deg}`+"°";
        document.querySelector(".hPaAnswr").innerHTML =  `${pressure}`+" kPa";
        document.querySelector(".humidityAnswr").innerHTML =  `${humidity}`+"%";
        document.querySelector("#tempDesc h2").innerHTML = `${description}`.toUpperCase();
    }
}


function getUserInput () { 
    let input = document.querySelector(".searchBar").value;
    return input;
}

window.onload = setInterval(clock,100);
function clock()
{
    var d = new Date();
    var date = d.getDate();
    var year = d.getFullYear();
    var month = d.getMonth();
    var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    month = monthArr[month];
    document.getElementById("date").innerHTML= `${date} ${month} ${year}`;
}

function toggleUnitType(){
    //This toggles the metric-imperial
isImperial = !isImperial;

weatherSearchData();
}
// Did not use a framework as I consider using PURE javascript for learning purpouses. 