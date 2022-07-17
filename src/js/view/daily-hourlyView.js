import View from "./View";
import icons from "./../../Img/icons.svg";
import { captilize } from "../helpers";
class DailyHourlyView extends View {
  _parentElement = document.querySelector(".display");

  constructor() {
    super();
  }
  _generateMarkup(data, location) {
    return `${this.dailyHourlyMarkup(data.daily)}${this.dailyHourlyMarkup(
      data.hourly
    )}`;
  }
  toggleDailyHourly(value) {
    const daily = this._parentElement.querySelector(".daily");
    const hourly = this._parentElement.querySelector(".hourly");
    const dailyOrHourly = value.toLowerCase();
    // console.log(dailyOrHourly);
    if (dailyOrHourly === "daily") daily.classList.remove("hidden");
    hourly.classList.add("hidden");
    if (dailyOrHourly === "hourly") {
      daily.classList.add("hidden");
      hourly.classList.remove("hidden");
    }
  }
  toggleEntireDisplay() {
    this._parentElement.classList.toggle("hidden");
  }
  dailyHourlyMarkup(data) {
    // console.log(data);
    return `
    <ul class="row-display ${data[0].daily ? "daily" : "hourly hidden"}">
     ${data
       .map((element) => {
         return this._generateMarkupPreview(element);
       })
       .join("")}
      </ul>`;
  }
  _generateMarkupPreview(data) {
    return `
        <li class="preview" >
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
         
        </li>
       `;
  }
  _dailyTemperatureMarkup(data) {
    return `<span>${captilize(data[0])} : ${data[1]}°C</span>
`;
  }
}
export default new DailyHourlyView();
