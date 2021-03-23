// load - the event is after the page loads
window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.deg-num')
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.temperature')
  let temperatureSpan = document.querySelector('.deg-letter')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4b8e9915d09b743689f7b97820c35c67`
      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          const temperatureK = data.main.temp
          const summary = data.weather[0].description
          temperatureDescription.textContent = summary
          const location = data.name
          locationTimezone.textContent = location
          const icon = data.weather[0].icon
          let iconLink = document.querySelector("link[rel~='icon']")
          iconLink.href = `http://openweathermap.org/img/wn/${icon}@4x.png`
          document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@4x.png`

          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureDegree.textContent = (temperatureK - 273.15).toFixed(1)
              temperatureSpan.textContent = 'C'
            } else {
              temperatureDegree.textContent = ((temperatureK - 273.15) * 1.8 + 32).toFixed(1)
              temperatureSpan.textContent = 'F'
            }
          })
        })
    })
  } else {
    console.log('not allowed or something')
  }
})
