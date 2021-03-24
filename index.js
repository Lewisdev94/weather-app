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
      // const proxy = 'https://cors-anywhere.herokuapp.com/'
      // const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4b8e9915d09b743689f7b97820c35c67`
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4b8e9915d09b743689f7b97820c35c67`
      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          const temperatureK = data.main.temp
          const temperatureC = (temperatureK - 273.15).toFixed(1)
          const temperatureF = ((temperatureK - 273.15) * 1.8 + 32).toFixed(1)
          const summary = data.weather[0].description
          const weatherType = data.weather[0].main
          const location = data.name
          sunUnix(data)
          temperatureDescription.textContent = summary
          locationTimezone.textContent = location
          temperatureDegree.textContent = temperatureC

          // weather icon
          const icon = data.weather[0].icon
          let iconLink = document.querySelector("link[rel~='icon']")
          iconLink.href = `https://openweathermap.org/img/wn/${icon}@4x.png`
          document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`

          // Dynamic tab name

          document.title = `${weatherType} - ${temperatureC}`

          // units change
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureDegree.textContent = temperatureC
              document.title = `${weatherType} - ${temperatureC}C`
              temperatureSpan.textContent = 'C'
            } else {
              temperatureDegree.textContent = temperatureF
              document.title = `${weatherType} - ${temperatureF}F`
              temperatureSpan.textContent = 'F'
            }
          })
        })
    })
  } else {
    console.log('not allowed or something')
  }
})

// date and time display

function timeDisplay () {
  const time = new Date()
  document.getElementById('time').innerHTML = time.toLocaleTimeString()
  setTimeout(timeDisplay, 500)
}
timeDisplay()

function dateDisplay () {
  const date = new Date()
  let weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  let months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ]
  let dayName = weekdays[date.getDay()]
  let monthName = months[date.getMonth()]
  let dateName = date.getDate()
  let yearName = date.getFullYear()
  document.getElementById('date').innerHTML = `${dayName} ${dateName} ${monthName} ${yearName}`
  setTimeout(dateDisplay, 1000)
}
dateDisplay()

// Welcome message

function welcomeMessage () {
  let welcomeMessage = document.querySelector('.welcome-msg')
  let timeMessage = ''
  const time = new Date().getHours()

  if (time <= 11) {
    timeMessage = 'morning'
  } else if (time <= 17) {
    timeMessage = 'afternoon'
  } else {
    timeMessage = 'evening'
  }
  welcomeMessage.textContent = `Good ${timeMessage}, here is your weather report...`
}
welcomeMessage()

// Sunrise and sunset

function sunUnix (data) {
  let unixRise = data.sys.sunrise
  let unixSet = data.sys.sunset
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let dateRise = new Date(unixRise * 1000)
  let dateSet = new Date(unixSet * 1000)

  let hoursRise = dateRise.getHours()
  let hoursSet = dateSet.getHours()

  let minutesRise = '0' + dateRise.getMinutes()
  let minutesSet = '0' + dateSet.getMinutes()

  let secondsRise = '0' + dateRise.getSeconds()
  let secondsSet = '0' + dateSet.getSeconds()

  let formattedRiseTime = hoursRise + ':' + minutesRise.substr(-2) + ':' + secondsRise.substr(-2)
  let formattedSetTime = hoursSet + ':' + minutesSet.substr(-2) + ':' + secondsSet.substr(-2)

  document.querySelector('.sunrise').textContent = `Sunrise: ${formattedRiseTime}`
  document.querySelector('.sunset').textContent = `Sunset: ${formattedSetTime}`
}
