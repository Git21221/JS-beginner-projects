const API_key = "cf6dd317645d0aaf819fefd7a8db5bb3";
const sbmt = document.querySelector('#searchbtn');
const temp = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const vis = document.querySelector('.vis');
const feels=document.querySelector('.feels');
const body=document.querySelector('body');
let city_name;
sbmt.addEventListener('click', () => {
    city_name = document.querySelector('#cityname').value;
    console.log(city_name);
    const apiWeather = `https://api.weatherapi.com/v1/current.json?key=a4c2b1408e974194861181505232509&q=${city_name}&aqi=no`;
    const weatherXhr = new XMLHttpRequest();
    weatherXhr.open('GET', apiWeather);
    weatherXhr.onreadystatechange = () => {
        if (weatherXhr.readyState === 4) {
            const apiInfo = JSON.parse(weatherXhr.responseText);
            console.log(apiInfo);
            console.log(typeof apiInfo.humidity);
            console.log(apiInfo.current.wind_kph);
            console.log(apiInfo.current.temp_c);
            console.log(apiInfo.current.feelslike_c);
            vis.innerText = `${apiInfo.current.humidity}`;
            wind.innerText = `${apiInfo.current.wind_kph}`;
            temp.innerText = `${apiInfo.current.temp_c} ` ;
            feels.innerText=`${apiInfo.current.feelslike_c} `;
            switch (apiInfo.current.condition.text) {
                case 'Partly cloudy':
                    document.body.style.backgroundImage = 'url("/Weather App/Images/PartlyCloudy.jpg")';
                    break;
                case 'Clear':
                    document.body.style.backgroundImage = 'url("/Weather App/Images/clear.jpg")';
                    break;
                case 'Rain':
                    document.body.style.backgroundImage = 'url("/Weather App/Images/rain.jpg")';
                    break;
                case 'Mist':
                    document.body.style.backgroundImage = 'url("/Weather App/Images/mist.jpg")';
                    break;
                case 'Snow':
                    document.body.style.backgroundImage = 'url("/Weather App/Images/snow.jpg")';
                    break;
                    default:
                        document.body.style.backgroundImage = 'url("/Weather App/Images/PartlyCloudy.jpg")';
                break;
               
            }
            
        }
    }
    weatherXhr.send();
})
