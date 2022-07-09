import View from "./View";
import icons from "./../../Img/icons.svg";
import { captilize } from "../helpers";
class DailyHourlyView extends View {
  _parentElement = document.querySelector(".row-display");
  _daily = document.querySelector(".daily");
  _hourly = document.querySelector(".hourly");
  _generateMarkup(data, location) {
    console.log(data.hourly);
    return `${this._data.daily
      .map((element) => {
        return this._generateMarkupPreview(element);
      })
      .join("")}${this._data.hourly
      .map((element) => {
        return this._generateMarkupPreview(element);
      })
      .join("")};
   `; // console.log(a);`
  }
  toggleCard() {
    this._parentElement.toggle("hidden");
    this._card_container.classList.toggle("hidden");
  }
  _generateMarkupPreview(data) {
    return `
        <li class="preview ${data.daily ? "daily" : "hourly"}">
          <span>${data.date.weekday}</span><span>${data.date.hour.time}<span>${
      data.date.hour.day_night
    }</span></span>
          <span>
            <img
              class="preview-image"
              src="http://openweathermap.org/img/wn/${data.weather.icon}@2x.png"
              alt="icon"
          /></span> <span>${data.weather.main}</span>
         ${
           data.daily
             ? data.temp
                 .map((temp) => this._dailyTemperatureMarkup(temp))
                 .join("")
             : `<span>${data.temp}
          °C</span>`
         }
          <span class="preview-btn">more info</span>
        </li>`;
  }
  _dailyTemperatureMarkup(data) {
    return `<span>${captilize(data[0])} : ${data[1]}°C</span>
`;
  }
}
export default new DailyHourlyView();
