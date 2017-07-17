export default function fetchWeather(city) {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=893a0d9beabe4d930832c2cfd4cf31c5&units=metric`

  return fetch(url).then((response) => response.json())
}  


export function fetchWeatherType() {
    return fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast", {
      headers: {
        "api-key": "TL8OvYpJ4pUZaju5AoAiJKRkLGl39jAG",
      }
    })
      .then((response) => response.json())
  }

export function fetchTemperature() {
    return fetch("https://api.data.gov.sg/v1/environment/air-temperature", {
      headers: {
        "api-key": "TL8OvYpJ4pUZaju5AoAiJKRkLGl39jAG",
      }
    })
      .then((response) => response.json())
  }

export function fetchWindSpeed() {
    return fetch("https://api.data.gov.sg/v1/environment/wind-speed", {
      headers: {
        "api-key": "TL8OvYpJ4pUZaju5AoAiJKRkLGl39jAG",
      }
    })
      .then((response) => response.json())
  }

export function fetchPsi() {
    return fetch("https://api.data.gov.sg/v1/environment/psi", {
      headers: {
        "api-key": "TL8OvYpJ4pUZaju5AoAiJKRkLGl39jAG",
      }
    })
      .then((response) => response.json())
  }