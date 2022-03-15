const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

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

let weather = {
    API_KEY: "4e12d4da7a57eafc6aac3e1417d041c0",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.API_KEY
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");

    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".btn").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Riyadh");

  // End Weather 
  

  let btn = document.getElementById("top-btn");

window.onscroll = function() {
    myScroll();
};

function myScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function topBtn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



  // --------------------------------------------------

  // Start News
  const NewsKey = '2e17dffe5e274272a9cd25a881f7ce29'

  let cat = "general"

  let NewsApi = `https://newsapi.org/v2/top-headlines?country=sa&apiKey=${NewsKey}&category=${cat}`


  let items= document.querySelectorAll("#items a");
  for(let item of items){
    item.addEventListener("click", (event)=>{
      cat = event.target.id;
      NewsApi= `https://newsapi.org/v2/top-headlines?country=sa&category=${cat}&apiKey=${NewsKey}`
      fetchNews()

      // search_News();
    })
  }

  function fetchNews(){
    fetch(NewsApi)
      .then((res) =>  res.json())
      .then(data => {
        console.log(data.articles)
        document.getElementById("news").innerHTML= data.articles.map(news => 
          `
          <div class="col-md-6">
          <div class="row g-1 rounded-3 overflow-hidden pt-4">
            <div class="col d-flex flex-column pt-2">
              <h2 class="title">${news.title}</h2>
              <div class="pushed">${news.publishedAt}</div>
              <p class="description mt-3">${news.description}</p>
              <h6 class="author">${news.author}</h6>

              <a href="${news.url}" class="read-more">Read More</a>
              
            </div>
    
            <div class="col-auto ">
            <img src="${news.urlToImage}" class="mx-auto d-block" style="height:400px" "width: 400px;" alt="...">
            </div>
          </div>
        </div>
          `).join('')
        })
  }

  document.getElementById("button-add").addEventListener("click", function(){
    fetchNews();
  });

  document.querySelector(".btn-news").addEventListener("click", function () {
    fetchNews();
  });
  
  document.querySelector("button-add")
    addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        fetchNews();
      }
    });
  
var prev = document.getElementById('prev');
var next = document.getElementById('next');
let page= 1;

document.querySelector("#prev").addEventListener("click", function(){
  if(page == 1){
    Prev.disabled = true;
  }
  page--;
  NewsApi= `https://newsapi.org/v2/top-headlines?country=sa&category=${cat}&apiKey=${NewsKey}&page=${page}`
  fetchNews()
});
document.querySelector("#next").addEventListener("click", function(){
  if(page == 5){
    next.disabled = true;
  }
  page++;
  NewsApi= `https://newsapi.org/v2/top-headlines?country=sa&category=${cat}&apiKey=${NewsKey}&page=${page}`
  fetchNews()
});
fetchNews();


