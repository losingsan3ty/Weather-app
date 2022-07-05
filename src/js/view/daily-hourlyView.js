import View from "./View";
import icons from "./../../Img/icons.svg";
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
          <span>${data.date.time}<span>${data.date.day_night}</span></span>
          <span>
            <img
              class="preview-image"
              src="http://openweathermap.org/img/wn/${data.weather.icon}@2x.png"
              alt="icon"
          /></span>
          <span>${data.temp}C</span>
          <span>${data.weather.main}</span>
          <span class="preview-btn">more info</span>
        </li>`;
  }
}
export default new DailyHourlyView();
