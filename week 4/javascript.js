var navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(function(link) {
  link.addEventListener("click", function() {
    navLinks.forEach(function(l) { l.classList.remove("active"); });
    link.classList.add("active");
  });
});

function toggleDark() {
  document.body.classList.toggle("dark");
  var btn = document.getElementById("toggle-btn");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
}


async function getUser() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("user-card").style.display = "none";

  try {
    var res = await fetch("https://randomuser.me/api/");
    var data = await res.json();
    var user = data.results[0];

    document.getElementById("user-img").src = user.picture.large;
    document.getElementById("user-name").textContent = "Name: " + user.name.first + " " + user.name.last;
    document.getElementById("user-email").textContent = "Email: " + user.email;
    document.getElementById("user-country").textContent = "Country: " + user.location.country;

    document.getElementById("loading").style.display = "none";
    document.getElementById("user-card").style.display = "block";

  } catch (err) {
    document.getElementById("loading").textContent = "Failed to load user.";
  }
}


var weatherConditions = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  61: "Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Snow",
  80: "Showers",
  95: "Thunderstorm"
};

async function getWeather() {
  var city = document.getElementById("city-input").value;

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  try {
    var geoRes = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1");
    var geoData = await geoRes.json();

    if (!geoData.results) {
      alert("City not found!");
      return;
    }

    var lat = geoData.results[0].latitude;
    var lon = geoData.results[0].longitude;
    var cityName = geoData.results[0].name;
    var country = geoData.results[0].country;

    var weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,wind_speed_10m,weather_code");
    var weatherData = await weatherRes.json();
    var current = weatherData.current;

    var condition = weatherConditions[current.weather_code] || "Unknown";

    document.getElementById("weather-city").textContent = "📍 " + cityName + ", " + country;
    document.getElementById("weather-temp").textContent = "🌡 Temperature: " + current.temperature_2m + "°C";
    document.getElementById("weather-wind").textContent = "💨 Wind Speed: " + current.wind_speed_10m + " km/h";
    document.getElementById("weather-condition").textContent = "🌤 Condition: " + condition;

    document.getElementById("weather-result").style.display = "block";

  } catch (err) {
    alert("Error fetching weather. Try again.");
  }
}


function addTask() {
  var input = document.getElementById("task-input");
  var taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  var li = document.createElement("li");

  var span = document.createElement("span");
  span.textContent = taskText;

  var doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.className = "done-btn";
  doneBtn.onclick = function () {
    li.classList.toggle("completed");
    if (li.classList.contains("completed")) {
      doneBtn.textContent = "Undo";
    } else {
      doneBtn.textContent = "Done";
    }
  };

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  document.getElementById("todo-list").appendChild(li);
  input.value = "";
}


var products = [
  "Laptop",
  "Phone",
  "Headphones",
  "Keyboard",
  "Mouse",
  "Camera",
  "Smartwatch",
  "Tablet",
  "Speaker",
  "Monitor"
];

function filterProducts() {
  var query = document.getElementById("search-input").value.toLowerCase();
  var list = document.getElementById("product-list");

  list.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    if (products[i].toLowerCase().includes(query)) {
      var li = document.createElement("li");
      li.textContent = products[i];
      list.appendChild(li);
    }
  }
}

filterProducts();
