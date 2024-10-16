let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function retrieveWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e5d23o984ba0b21973288194ctbda24f&units=imperial`;
  axios.get(apiUrl).then(updatedCity);
}

function updatedCity(response) {
  let cityName = response.data.city;
  let cityElement = document.querySelector("#city-h1");
  let tempElement = document.querySelector("#currTemperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayElement = document.querySelector("#day-Today");
  let unixTime = response.data.time;

  if (cityElement) {
    cityElement.textContent = cityName;
  }
  if (tempElement) {
    let temp = Math.round(response.data.temperature.current);
    tempElement.textContent = `${temp}`;
  }
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedKmh = response.data.wind.speed;
  let windSpeedMph = (windSpeedKmh * 0.621371).toFixed(2);
  windElement.innerHTML = `${windSpeedMph} mph`;

  let localDate = new Date(unixTime * 1000);
  dayElement.innerHTML = formatDate(localDate);
  updateTimeWithAPI(unixTime);
}

function formatDate(date) {
  let day = days[date.getDay()];
  return `${day}`;
}

function updateTimeWithAPI(unixTime) {
  let localTime = new Date(unixTime * 1000);

  let hours = localTime.getUTCHours();
  let minutes = localTime.getUTCMinutes();
  let ampm = hours >= 12 ? ` PM` : ` AM`;
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0` + minutes : minutes;

  let currentTime = `${hours}:${minutes}${ampm}`;

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
}

window.onload = function () {
  let defaultCity = "Gaza";
  retrieveWeather(defaultCity);

  let form = document.querySelector("#city-form");
  if (form) {
    form.addEventListener("submit", chngCity);
  }

  let searchButton = document.querySelector("#search-city-click");
  if (searchButton) {
    searchButton.addEventListener("click", chngCity);
  }
};
