import { dailyForecastCard, hourlyForecastCard, getDayOfWeek, weatherCodeObject } from "../js/template.js";

const dailyForecastCardContainer = document.querySelector(".container__details__daily-forecast"),
    hourlyForecastCardContainer = document.querySelector(".container__details__hourly-forecast"),
    notificationBox = document.querySelector('.container .notification-box'),
    searchInput = document.querySelector('.summary__header__search-input'),
    searchBtn = document.querySelector('.summary__header__search-btn'),
    currentLocationIcon = document.querySelector('header .current-location'),
    header = document.querySelector('header'),
    detailsContainer = document.querySelector('.container__details'),
    basicInfoContainer = document.querySelector('.container__summary__weather-basic-info'),
    deatailedInfoContainer = document.querySelector('.container__summary__weather-detailed-info'),
    alertBox = document.querySelector('.container__loading-screen'),
    cityName = document.querySelector('.container__summaary__basic-info__date p');

const summaryWeatherIcon = document.querySelector('.weather-basic-info__image i'),
    currentTemp = document.querySelector('.current-temperature'),
    weatherCondition = document.querySelector('.weather-basic-info__info__condition'),
    overallTemp = document.querySelector('.overall-temperature'),
    humidity = document.querySelector('.humidity span'),
    feelsLike = document.querySelector('.feels-like span'),
    precipitations = document.querySelector('.precipitations span'),
    cloudCover = document.querySelector('.cloud-cover span'),
    visibility = document.querySelector('.visibility span'),
    windSpeed = document.querySelector('.wind-speed span'),
    windGust = document.querySelector('.wind-gust span'),
    pressureSurfaceLevel = document.querySelector('.pressure-surface-level span'),
    dewPoint = document.querySelector('.dew-point span');

const weatherCode = weatherCodeObject();
const weekDayArray = getDayOfWeek();

const getData = async (cityQueryName, cityQueryLocation) => {
    cityName.innerText = cityQueryName.toUpperCase();
    const apiKey = 'PBfvgMMycwCUpKEbnDYRaR1r89IW6Fgz';
    alertBox.classList.add('active');

    const options = { method: 'GET', headers: { accept: 'application/json' } };
    try {
        const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${cityQueryLocation}&apikey=${apiKey}`, options);
        const data = await response.json();
        const dailyForecastArr = data.timelines.daily;
        const hourlyForecastArr = data.timelines.hourly;

        summaryData(hourlyForecastArr, dailyForecastArr)

        detailsContainer.classList.add('active');
        header.classList.remove('active-center');

        basicInfoContainer.classList.add('active');
        deatailedInfoContainer.classList.add('active');

        alertBox.classList.remove('active');

        dailyForecastCardContainer.innerHTML = '';
        dailyForecastCardData(dailyForecastArr, weekDayArray);

        hourlyForecastCardContainer.innerHTML = '';
        hourlyForecastCardData(hourlyForecastArr);

    } catch (error) {
        alertBox.querySelector('span').innerHTML = `Could not connect to server. Please <a href="http://localhost:5173" >Click here</a> to try again and Try typing somthing else. If issue still persists, please refer to API provider.`;
        console.log(error);
        alertBox.querySelector('p').remove();
    }
}

const dailyForecastCardData = (targetArr, weekDayArray) => {
    let dayNum = new Date().getDay();
    targetArr.forEach(dailyForecast => {
        for (let code in weatherCode) {
            if (parseInt(code) === dailyForecast.values.weatherCodeMax) {
                dayNum = (dayNum > 6) ? (dayNum - 7) : dayNum;
                const card = dailyForecastCard(dailyForecast.values.temperatureMax, dailyForecast.values.temperatureMin, weatherCode[code].icon, weekDayArray[dayNum]);
                dailyForecastCardContainer.insertAdjacentHTML('beforeend', card);
                break;
            }
        }
        dayNum++;
    });
};

const hourlyForecastCardData = (targetArr) => {
    let hours = new Date().getHours();
    for (let i = 0; i < 24; i++) {
        for (let code in weatherCode) {
            if (parseInt(code) === targetArr[i].values.weatherCode) {
                hours = (hours > 24) ? (hours - 24) : hours;
                hours = (hours < 10) ? `0${hours}` : hours;
                const card = hourlyForecastCard(weatherCode[code].icon, hours, targetArr[i].values.humidity, targetArr[i].values.cloudCover, targetArr[i].values.temperature, targetArr[i].values.windSpeed, targetArr[i].values.windGust, targetArr[i].values.visibility, targetArr[i].values.dewPoint, targetArr[i].values.pressureSurfaceLevel);

                hourlyForecastCardContainer.insertAdjacentHTML('beforeend', card);
                break;
            }
        }
        hours++;
    }
};

const summaryData = (targetArr, targetArr2) => {
    for (let code in weatherCode) {
        if (parseInt(code) === targetArr[0].values.weatherCode) {
            summaryWeatherIcon.removeAttribute('class');
            summaryWeatherIcon.classList.add(`${weatherCode[code].icon.slice(0, 2)}`);
            summaryWeatherIcon.classList.add(`${weatherCode[code].icon.slice(3)}`);
            weatherCondition.innerText = weatherCode[code].condition;
            break;
        }
    }

    basicInfoContainer.classList.add('active');
    deatailedInfoContainer.classList.add('active');

    currentTemp.innerText = `${Math.floor(targetArr[0].values.temperature)} °C`;
    overallTemp.innerText = `${Math.floor(targetArr2[0].values.temperatureMax)}°/${Math.floor(targetArr2[0].values.temperatureMin)}° C`;
    humidity.innerText = `${targetArr[0].values.humidity}%`;
    feelsLike.innerText = `${Math.floor(targetArr[0].values.temperatureApparent)}° C`;
    precipitations.innerText = `${targetArr[0].values.precipitationProbability}%`;
    cloudCover.innerText = `${targetArr[0].values.cloudCover}%`;
    visibility.innerText = `${targetArr[0].values.visibility} km`;
    windSpeed.innerText = `${targetArr[0].values.windSpeed} m/s`;
    windGust.innerText = `${targetArr[0].values.windGust} m/s`;
    pressureSurfaceLevel.innerText = `${targetArr[0].values.pressureSurfaceLevel} hPa`;
    dewPoint.innerText = `${targetArr[0].values.dewPoint}° C`;
};

hourlyForecastCardContainer.addEventListener('click', e => {
    if (e.target.classList.contains('bi-arrow-down-circle')) {
        e.target.parentElement.parentElement.classList.toggle('expand');
        e.target.classList.toggle('expand');
    }
});

dailyForecastCardContainer.addEventListener("dblclick", e => {
    if (e.target.matches('.daily-forecast__card')) {
        // alert('Hello');
    }
});

searchBtn.addEventListener('click', e => {
    const searchInputValue = searchInput.value;
    if (searchInputValue !== '') getData(searchInputValue, searchInputValue);
    else {
        notificationBox.classList.add('active');
        notificationBox.innerText = 'Please enter a name of place to search';
        setTimeout(() => {
            notificationBox.classList.remove('active');
        }, 2000)
    };
});
searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        const searchInputValue = searchInput.value;
        if (searchInputValue !== '') getData(searchInputValue, searchInputValue);
        else {
            notificationBox.classList.add('active');
            notificationBox.innerText = 'Please enter a name of place to search';
            setTimeout(() => {
                notificationBox.classList.remove('active');
            }, 2000)
        };
    }
})

currentLocationIcon.addEventListener('click', e => {
    searchInput.value = '';
    const success = location => {
        getData('Sargodha', `${location.coords.latitude}, ${location.coords.longitude}`);
    };
    const error = async error => {
        alert('Plase select Allow to get forecast of your current location');
    };
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(success, error, options);
});
