export const dailyForecastCard = (maxTemp, minTemp, iconClass, dayOfWeek) => {
  const card = `<div class="daily-forecast__card">
                    <p>${Math.floor(maxTemp)}&deg;/${Math.floor(minTemp)}&deg; C</p>
                    <i class="${iconClass || 'fa-light fa-question'}"></i>
                    <p class="day">${dayOfWeek}</p>
                  </div>`;
  return card;
}
export const hourlyForecastCard = (iconClass, hour, humidity, cloudCover, temp, windSpeed, windGust, visibility, dewPoint, pressureSurfaceLevel) => {
  const card = `<div class="hourly-forecast__card">
    <div class="card__weather-icon">
      <i class="${iconClass}"></i>
    </div>
    <div class="card__weather-details">
      <div class="weather-details__field">
        <div class="weather-details__field__part">
          <h4>Hour</h4>
          <span>${hour}:00</span>
        </div>
        <div class="weather-details__field__part">
          <h4>Humidity</h4>
          <span>${humidity}%</span>
        </div>
        <div class="weather-details__field__part">
          <h4>Cloud Cover</h4>
          <span>${cloudCover}%</span>
        </div>
      </div>
      <div class="weather-details__field">
        <div class="weather-details__field__part">
          <h4>Temperature</h4>
          <span>${Math.floor(temp)} &deg;C</span>
        </div>
        <div class="weather-details__field__part">
          <h4>Wind Speed</h4>
          <span>${windSpeed} m/s</span>
        </div>
        <div class="weather-details__field__part">
          <h4>Wind Gust</h4>
          <span>${windGust} m/s</span>
        </div>
      </div>
      <div class="weather-details__field">
        <div class="weather-details__field__part">
          <h4>Visibility</h4>
          <span>${visibility} km</span>
        </div>
        <div class="weather-details__field__part">
          <h4>Dew Point</h4>
          <span>${dewPoint} &deg;C</span>
        </div>
        <div class="weather-details__field__part">
          <h4>Pressure Surface Level</h4>
          <span>${pressureSurfaceLevel} hpa</span>
        </div>
      </div>
    </div>
    <div class="card__expand-icon">
      <i class="bi bi-arrow-down-circle"></i>
    </div>
  </div>`;
  return card;
};

export const weatherCodeObject = () => {
  return {
    0: "Unknown",
    1000: {
      icon: 'bi bi-sun',
      condition: 'Clear, Sunny'
    },
    1100: {
      icon: 'bi bi-sun',
      condition: 'Mostly Clear'
    },
    1101: {
      icon: 'bi bi-cloud-sun',
      condition: 'Partly Cloudy'
    },
    1102: {
      icon: 'bi bi-cloud-sun',
      condition: 'Mostly Cloudy'
    },
    1001: {
      icon: 'bi bi-cloudy',
      condition: 'Cloudy'
    },
    2000: {
      icon: 'bi bi-cloud-fog2',
      condition: 'Fog'
    },
    2100: {
      icon: 'bi bi-cloud-fog',
      condition: 'Light Fog'
    },
    4000: {
      icon: 'bi bi-cloud-drizzle',
      condition: 'Drizzling'
    },
    4001: {
      icon: 'bi bi-cloud-rain',
      condition: 'Raining'
    },
    4200: {
      icon: 'bi bi-cloud-rain',
      condition: 'Light Rain'
    },
    4201: {
      icon: 'bi bi-cloud-rain-heavy',
      condition: 'Heavy Rain'
    },
    5000: {
      icon: 'bi bi-cloud-snow',
      condition: 'Snow'
    },
    5001: {
      icon: 'bi bi-snow3',
      condition: 'Fluries'
    },
    5100: {
      icon: 'bi bi-cloud-snow',
      condition: 'Light Snow'
    },
    5101: {
      icon: 'bi bi-cloud-snow',
      condition: 'Heavy Snow'
    },
    6000: {
      icon: 'fi fi-tr-snowflakes',
      condition: 'Freezing Drizzle'
    },
    6001: {
      icon: 'fi fi-tr-snowflakes',
      condition: 'Freezing Rain'
    },
    6200: {
      icon: 'fi fi-ts-cloud-hail-mixed',
      condition: 'Light Freezing Rain'
    },
    6201: {
      icon: 'fi fi-ts-cloud-hail-mixed',
      condition: 'Heavy Freezing Rain'
    },
    7000: {
      icon: 'fi fi-ts-cloud-hail',
      condition: 'Ice Pellets'
    },
    7101: {
      icon: 'fi fi-ts-cloud-hail',
      condition: 'Light Ice Pellets'
    },
    7102: {
      icon: 'fi fi-ts-cloud-hail',
      condition: 'Heavy Ice Pellets'
    },
    8000: {
      icon: 'bi bi-cloud-lightning-rain',
      condition: 'Thunderstorm'
    }
  };
}

export const getDayOfWeek = () => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
};