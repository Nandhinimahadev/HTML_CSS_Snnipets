document.addEventListener('DOMContentLoaded',()=>{
    const form=document.getElementById("weatherForm");
    const input=document.getElementById("weatherInput");
    const WeatherResult=document.getElementById("weatherResult");

    const apiKey = "0e1e5a1279bc6e3714d403dd6942e6cc";
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city) {
        getWeather(city);
    }
});
async function getWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            weatherResult.innerHTML = '<div>City not found.</div>';
        }
    } catch (error) {
        weatherResult.innerHTML = '<div>Please try again.</div>';
    }
}
  function displayWeather(data) {
    const { name, main, weather } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
        <div><strong>${name}</strong></div>
        <div><img class="weatherIcon" src="${iconUrl}" alt="${weather[0].description}"></div>
        <div><strong>${main.temp}°C</strong></div>
        <div>${weather[0].description}</div>
    `;
}
});