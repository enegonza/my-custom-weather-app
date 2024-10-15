let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
function crrntDay(todayDay) {
  let dayChng = document.querySelector("#day-Today");
  if (dayChng) {
    dayChng.textContent = days[todayDay.getDay()];
  }
}

function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? ` PM` : ` AM`;
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0` + minutes : minutes;
  let currentTime = hours + `:` + minutes + ampm;
  let timeElement = document.querySelector("#current-time");
  if (timeElement) {
    timeElement.textContent = currentTime;
  }
}

function chngCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city").value.trim();
  if (cityInput) {
    retrieveWeather(cityInput);
  }

  function retrieveWeather(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e5d23o984ba0b21973288194ctbda24f&units=imperial`;
    axios.get(apiUrl).then(updatedCity);
  }

  function updatedCity(response) {
    let cityName = response.data.city;
    let cityElement = document.querySelector("#city-h1");
    let tempElement = document.querySelector("#currTemperature");

    if (cityElement) {
      cityElement.textContent = cityName;
    }

    if (tempElement) {
      let temp = Math.round(response.data.temperature.current);
      tempElement.textContent = `${temp}`;
    }
  }
}

let todayDay = new Date();
crrntDay(todayDay);
updateTime();
setInterval(updateTime, 1000);

let form = document.querySelector("#city-form");
if (form) {
  form.addEventListener("submit", chngCity);
}

let searchButton = document.querySelector("#search-city-click");
if (searchButton) {
  searchButton.addEventListener("click", chngCity);
}
