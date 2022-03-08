const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const weatherEl = document.getElementsByClassName('weather-loading');
const days =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ?'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span class="display-6 fw-light" id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', '+ date+ ' '+monthes[month]
},100);


const API_KEY = '4e12d4da7a57eafc6aac3e1417d041c0';

function fetchWeather(city){
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q="+
      city+
      "&units=metric&appid=" +
      this.API_KEY
  ).then(res => res.json()).then(data => this.displayWeather(data));
  
}
function displayWeather(data){
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText =
    "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind speed: " + speed + " km/h";

  function search_btn(){
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
}

fetchWeather()

  
  document.querySelector(".btn").addEventListener("click", function () {
    search_btn();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        search_btn();
      }
    });
  
  fetchWeather("Riyadh");