// load - the event is after the page loads

window.addEventListener('load', async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const urlDataObj = {
        long: position.coords.longitude,
        lat: position.coords.latitude
      }

      try {
        const weatherStream = await fetch('./.netlify/functions/weatherapi', {
          method: 'POST',
          body: JSON.stringify(urlDataObj)
        })
        const weatherJson = await weatherStream.json()
        weatherFunc(weatherJson)
      } catch (err) {
        console.error(err)
      }
    })
  }
})

function weatherFunc (data) {
  console.log(data)
  let temperatureDescription = document.querySelector('.temperature-description')
  let degreeNumber = document.querySelector('.deg-num')
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.temperature-section')
  let degreeLetter = document.querySelector('.deg-letter')

  const temperatureK = data.main.temp
  const temperatureC = (temperatureK - 273.15).toFixed(0)
  const temperatureF = ((temperatureK - 273.15) * 1.8 + 32).toFixed(0)
  const summary = data.weather[0].description
  const weatherType = data.weather[0].main
  const location = data.name

  sunUnix(data)
  temperatureDescription.textContent = summary
  locationTimezone.textContent = location
  degreeNumber.textContent = temperatureC
  welcomeMessage()

  // weather icon
  const icon = data.weather[0].icon
  let iconLink = document.querySelector("link[rel~='icon']")
  iconLink.href = `https://openweathermap.org/img/wn/${icon}@4x.png`
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`

  // Dynamic tab name

  document.title = `${weatherType} - ${temperatureC}C`

  // units change
  temperatureSection.addEventListener('click', () => {
    if (degreeLetter.textContent === 'F') {
      degreeNumber.textContent = temperatureC
      document.title = `${weatherType} - ${temperatureC}C`
      degreeLetter.textContent = 'C'
    } else {
      degreeNumber.textContent = temperatureF
      document.title = `${weatherType} - ${temperatureF}F`
      degreeLetter.textContent = 'F'
    }
  })

  // function timeDisplay () {
  //   const time = new Date()
  //   document.getElementById('time').innerHTML = time.toLocaleTimeString()
  //   setTimeout(timeDisplay, 500)
  // }
  // timeDisplay()

  function dateSuffixAssign (date) {
    var x = date % 10,
      y = date % 100
    if (x == 1 && y != 11) {
      return date + 'st'
    }
    if (x == 2 && y != 12) {
      return date + 'nd'
    }
    if (x == 3 && y != 13) {
      return date + 'rd'
    }
    return date + 'th'
  }

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

    let dateNameSuffix = dateSuffixAssign(date.getDate())

    document.querySelector('.date-display').innerHTML = `${dayName} ${dateNameSuffix} ${monthName}`
  }
  dateDisplay()

  function sunUnix () {
    let unixRise = data.sys.sunrise
    let unixSet = data.sys.sunset
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let dateRise = new Date(unixRise * 1000)
    let dateSet = new Date(unixSet * 1000)

    let hoursRise = dateRise.getHours()
    let hoursSet = dateSet.getHours()

    let minutesRise = '0' + dateRise.getMinutes()
    let minutesSet = '0' + dateSet.getMinutes()

    // let secondsRise = '0' + dateRise.getSeconds()
    // let secondsSet = '0' + dateSet.getSeconds()

    let formattedRiseTime = hoursRise + ':' + minutesRise.substr(-2)
    let formattedSetTime = hoursSet + ':' + minutesSet.substr(-2)

    document.querySelector('.sunrise-time').textContent = `${formattedRiseTime}`
    document.querySelector('.sunset-time').textContent = `${formattedSetTime}`
  }

  function welcomeMessage () {
    let welcomeMessage = document.querySelector('.welcome-msg')
    const time = new Date().getHours()

    if (time <= 11) {
      timeMessage = 'morning'
      morningTheme()
    } else if (time <= 17) {
      timeMessage = 'afternoon'
      afternoonTheme()
    } else {
      timeMessage = 'evening'
      eveningTheme()
    }
    welcomeMessage.textContent = `Good ${timeMessage},`
  }

  function morningTheme () {
    document.querySelector('.sunrise-set-section').classList.add('sunrise-set-section-black')
    document.querySelector('.container').classList.add('black', 'morning')
    document.body.classList.add('morning')
    if (temperatureC >= 16) {
      document.querySelector('.temperature-section').classList.add('temperature-section-morning-hot')
    } else {
      document.querySelector('.temperature-section').classList.add('temperature-section-morning-cold')
    }
  }

  function afternoonTheme () {
    document.querySelector('.container').classList.add('white', 'afternoon')
    document.body.classList.add('afternoon')
    if (temperatureC >= 16) {
      document.querySelector('.temperature-section').classList.add('temperature-section-afternoon-hot')
    } else {
      document.querySelector('.temperature-section').classList.add('temperature-section-afternoon-cold')
    }
  }
  function eveningTheme () {
    document.querySelector('.container').classList.add('white', 'evening')
    document.body.classList.add('evening')
    if (temperatureC >= 16) {
      document.querySelector('.temperature-section').classList.add('temperature-section-evening-hot')
    } else {
      document.querySelector('.temperature-section').classList.add('temperature-section-evening-cold')
    }
  }
}

// THEME CHANGE

// WELCOME MESSAGE
