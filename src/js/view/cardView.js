import icons from "./../../Img/icons.svg";
import View from "./View.js";
import { captilize } from "../helpers";
// console.log(icons);
class Card extends View {
  _previousSelectOption;
  _card_container = document.querySelector(".card-container");
  _parentElement = document.querySelector(".card");
  _cardModal = this._card_container.lastElementChild;
  _btnCloseCard = document.querySelector(".btn-close-card");
  _testBtn = document.querySelector(".test-btn");
  constructor() {
    super();
    // this.testBtnClick.call(this);
    this.toggleOnClick.call(
      this,
      this._cardModal,
      this.toggleCard.bind(this, true)
    );
    this.btnClickCard.call(this);
  }
  selectOptionValue() {
    return this._selectEl.value;
  }

  addHandlerSelect(handler) {
    const a = this;
    this._selectEl.addEventListener("change", function (e) {
      if (!this.value) return;
      // console.log(this.value);
      if (this.value !== "Current") {
        a._previousSelectOption = this.value;
      }
      handler(this.value);
    });
  }
  btnClickCard() {
    const btn = document.querySelector(".btn-close-card");
    this.toggleOnClick(btn, this.toggleCard.bind(this, true));
    return "";
  }
  selecValueChange(value) {
    if (!value) return;
    this._selectEl.value = value;
  }
  toggleCard(daily = false) {
    this.toggle(this._card_container, this._cardModal, false);

    if (!this._previousSelectOption) return;
    this.selecValueChange(this._previousSelectOption);
  }
  _generateMarkup(data, location) {
    // console.log(data);
    return `
     <svg class="card-image">
        <use href="${icons}#${data.date.hour.day_night.toUpperCase()}-${
      data.icon
    }"></use>
      </svg>
      <span class="btn-close-card"><i class="fa-solid fa-xmark"></i></span>
      <div class="card-content">
        <div class="card-grid">
          <h3 class="align--text-left">${location}</h3>
        </div>
        <div class="card-grid">
          <div class="card-flex">
            <span class="align--text-left">${data.weather.main}  </span>
            <div><span>${
              data.date.hour.time
            }</span><span class="smaller_font">${
      data.date.hour.day_night
    }</span></div>
          </div>
        </div>
        ${
          data.daily
            ? data.temp
                .map((temp) => this._dailyTemperatureMarkup(temp))
                .join("")
            : `<div class="card-grid">
          <span >${data.temp} °C</span>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#temp-icon"></use>
            </svg>
             <span >Temp:</span>
          </div>
        </div>`
        }
        ${
          data.daily
            ? data.feelsLike
                .map((el) => this._dailyFeelsLikeMarkup(el))
                .join("")
            : `
        <div class="card-grid">
          <span class="align--text-left">Feels like:</span>
          <div>${data.feelsLike}  °C</div>
        </div>`
        }
        <div class="card-grid">
          <div>
            <span>${data.humidity} </span>
            <span></span>
          </div>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#humidity-icon"></use>
            </svg>
            <span>Humidity:</span>
          </div>
        </div>
        <div class="card-grid">
          <span>${data.uv}</span>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#uv-icon"></use>
            </svg>
            <span>uv</span>
          </div>
        </div>
        <div class="card-grid">
        <div>
          <span>${
            data.windSpeed
          } </span><span class="smaller_font">Km/h</span></div>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#windSpeed-icon"></use>
            </svg>
            <span>Windspeed:</span>
          </div>
        </div>
        ${data.sunRise && data.sunSet ? this._currHourlyMarkup(data) : ""}
      </div>`;
  }
  _currHourlyMarkup(data) {
    return `<div class="card-grid">
          <div>
            <span>${data.sunRise.time} </span>
            <span class="smaller_font">${data.sunRise.day_night}</span>
          </div>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use
                class="card-weather-icon"
                href="${icons}#sunRise-icon"
              ></use>
            </svg>
            <span>Sunrise:</span>
          </div>
        </div>
        <div class="card-grid">
          <div>
            <span>${data.sunSet.time} </span>
            <span class="smaller_font">${data.sunSet.day_night}</span>
          </div>
          <div class="card-flex">
            <span>Sunset:</span>
            <svg class="card-weather-icon">
              <use href="${icons}#sunSet-icon"></use>
            </svg>
          </div>
        </div>`;
  }
  _dailyTemperatureMarkup(data) {
    return `<div class="card-grid">
          <span >${data[1]} °C</span>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#temp-icon"></use>
            </svg>
             <span>${captilize(data[0])} Temp:</span>
          </div>
        </div>`;
  }
  _dailyFeelsLikeMarkup(data) {
    return `<div class="card-grid">
          <span >Feels like at ${data[0]}:</span>
          <div>${data[1]}°C</div>
        </div>`;
  }
}
export const card = new Card();
