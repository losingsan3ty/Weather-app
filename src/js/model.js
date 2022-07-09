import {
  API_GEOCODING_URL,
  API_KEY,
  API_WEATHER_DATA_URL,
  DELAY,
  UNITS,
} from "./config";
import { getHour, getJson, timeout } from "./helpers";
/**
 * @class  for functions encpasulation only
 
 */
class Data {
  _locationFail = function () {
    throw new Error("failed to retrive your location");
  };
  /**
   * purpsoe is to promisify the geoLocation process
   * @returns {object}  promise
   */
  _getGeoLocation = function () {
    return new Promise(function (resolve, reject = this._locationFail()) {
      navigator.geolocation?.getCurrentPosition(resolve, reject);
    });
  };
  /**
   *
   * @param {string} main weather short description from Api
   */
  _icon_id_finder(weather) {
    // console.log(weather);
    const main = weather[0].main;
    // console.log(weather.main);
    const description = weather[0].description;
    // console.log(weather.description);
    if (main === "Thunderstorm") {
      return "Thunderstorm";
    }
    if (main === "Drizzle") {
      return "Drizzle";
    }
    if (main === "Rain") {
      if (description === "freezing rain") return "Snow";
      if (
        description === "light intensity shower rain" ||
        description === "heavy intensity shower rain	" ||
        description === "light intensity shower rain" ||
        description === "ragged shower rain	"
      )
        return "Shower-Rain";

      return "Rain";
    }
    if (main === "Snow") {
      return "Snow";
    }
    if (
      main === "Mist" ||
      main === "Fog" ||
      main === "Smoke" ||
      main === "Haze" ||
      main === "Dust" ||
      main === "Ash" ||
      main === "Squall" ||
      main === "Tornado" ||
      main === "Sand"
    ) {
      return "Dust";
    }
    if (main === "Clouds") {
      if (description === "few clouds") return "Few-Clouds";
      if (description === "scattered clouds") return "Scattered-Clouds";
      if (description === "broken clouds" || description === "overcast clouds")
        return "Broken-Clouds";
    }
    return "Clear";
  }
  /**
   * @param {number} unix time stamp provided from the api
   * @returns {Object}
   */
  _getDay(unix) {
    const weekday = new Date(unix * 1000).toLocaleString("default", {
      weekday: "long",
    });
    const hour = getHour(unix);
    return { weekday, hour };
  }
  /**
   *
   * @param {object} data
   * @param {boolean} [daily=false] if true return object in daily format provided by the Api since there is a difference between hourly/currently and daily provided from the Api
   * @returns {object} organized freezed data that is ready to be used by the controller to display on html
   */
  _createWeatherObject(data, daily = false) {
    const tempData = { ...data };
    const temp = {
      ...(daily && { daily: true }),
      icon: this._icon_id_finder(data.weather),
      date: daily ? this._getDay(tempData.dt) : getHour(tempData.dt),
      humidity: tempData.humidity,
      temp: daily ? Object.entries(tempData.temp) : tempData.temp,
      weather: Object.freeze(tempData.weather[0]),
      uv: tempData.uvi,
      windSpeed: tempData.wind_speed,
      feelsLike: daily
        ? Object.entries(tempData.feels_like)
        : tempData.feels_like,
      ...(tempData.sunrise && { sunRise: getHour(tempData.sunrise) }),
      ...(tempData.sunset && { sunSet: getHour(tempData.sunset) }),
    };
    return Object.freeze(temp);
  }
  /**
   * a general over view about this function:it either gives lat lon based on geolocation api or based on search result from user
   * @param {boolean} query if there is a value that means we have a search result given from the user so we use a different link of the Api to fetch data based on search result if
   * @returns {number,number} lat,lon
   */
  _getLanLon = async function (query = null) {
    try {
      const position = await (query
        ? this._apiGeoCodingRes(query)
        : this._getGeoLocation());
      if (query) {
        const { lat, lon } = position[0];
        return { lat, lon };
      }
      // console.log(position.coords);
      const { latitude: lat, longitude: lon } = position.coords;
      return { lat, lon };
    } catch (err) {
      console.error("from Get Latlon", err);
      throw new Error(err.message);
    }
  };
  /**
   *
   * @param {string} query here is a city name recived from the user
   * @returns {object} a promise with the lat,lon of the city  that was entered by the user
   */
  _apiGeoCodingRes = async function (query) {
    const res = await fetch(
      `${API_GEOCODING_URL}q=${query}&limit=1&appid=${API_KEY}`
    );
    // console.log("hi");
    // const test = await getJson(res);
    // console.log(test);
    return await getJson(res);
  };
  /**
   *
   * @param {boolean} query if there is a value meaning we have user search
   * @returns {object} the final freezed object with the data formated and ready to be displayed on html
   */
  getWeatherData = async function (query = null) {
    try {
      const { lat, lon } = await this._getLanLon(query);
      // console.log(lat, lon);
      const data = await this._weatherData(lat, lon);
      console.log(data);
      const curr = this._createWeatherObject(data.current);
      // console.log(curr);
      const hourly = data.hourly.map((hour) => {
        return this._createWeatherObject(hour);
      });
      // console.log(data.hourly);
      const daily = data.daily.map((day) => {
        return this._createWeatherObject(day, true);
      });
      const location = data.timezone
        .slice(data.timezone.indexOf("/") + 1)
        .replace("_", " ");
      // console.log(curr);
      // console.log(hourly);
      // console.log(daily);
      return Object.freeze({ curr, daily, hourly, location });
    } catch (err) {
      console.log(err.message);
    }
  };
  /**
   *
   * @param {number} lat
   * @param {number} lon
   * @returns {object} nested object with  daily weather as object ,hourly wearther data as object,currently weather data as object provided from the api
   */
  _weatherData = async function (lat, lon) {
    try {
      const res = await fetch(
        `${API_WEATHER_DATA_URL}lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}`
      );
      return await getJson(res);
    } catch (err) {
      console.error("err from Ajax", err);
      throw new Error(err);
    }
  };
}

// AJAX();

export const Model = new Data();
