import View from "./View";
import icons from "./../../Img/icons.svg";
import { captilize } from "../helpers";
class DailyHourlyView extends View {
  _parentElement = document.querySelector(".row-display");
  _generateMarkup() {
    return this._data
      .map((element) => {
        return this._generateMarkupPreview(element);
      })
      .join("");
    // console.log(a);
  }

  _generateMarkupPreview(data) {
    return `
        <li class="preview">
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
