import icons from "./../../Img/icons.svg";
import View from "./View.js";

// console.log(icons);
class Card extends View {
  _parentElement = document.querySelector(".card");
  _cardModal = this._parentElement.nextElementSibling;
  _btnCloseCard = document.querySelector(".btn-close-card");
  _testBtn = document.querySelector(".test-btn");
  constructor() {
    super();
    this.testBtnClick.call(this);
    this.toggleModalClick.call(
      this,
      this._cardModal,
      this.toggle.bind(this, this._parentElement, this._cardModal, false)
    );
    this.btnClickCard.call(this);
    this._btnCloseCard.addEventListener("onblur event ", function (e) {
      console.log(e);
    });
  }
  btnClickCard() {
    this.btnClick.call(
      this,
      this._btnCloseCard,
      this.toggle.bind(this, this._parentElement, this._cardModal, false)
    );

    return "";
  }
  testBtnClick() {
    this._testBtn.addEventListener(
      "click",
      this.toggle.bind(this, this._parentElement, this._cardModal, false)
    );
  }
  toggleCard() {
    this._cardModal.classList.toggle("hidden");
    this._parentElement.classList.toggle("hidden");
  }
  timeOfdayTemp(data, time) {
    return "";
  }
  _generateMarkup(data, location) {
    return `
     <svg class="card-image">
        <use href="${icons}#${data.date.day_night.toUpperCase()}-${
      data.icon
    }"></use>
      </svg>
      <span class="btn-close-card"><i class="fa-solid fa-xmark"></i></span>${this.btnClick.call(
        this
      )}
      <div class="card-content">
        <div class="card-grid">
          <h3 class="align--text-left">${location}</h3>
        </div>
        <div class="card-grid">
          <div class="card-flex">
            <span class="align--text-left">${data.weather.main}  </span>
            <div><span>${data.date.time}</span><span class="smaller_font">${
      data.date.day_night
    }</span></div>
          </div>
        </div>
        <div class="card-grid">
          <span >${data.temp} °C</span>
         
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#temp-icon"></use>
            </svg>
             <span >Temp:</span>
          </div>
        </div>
        <div class="card-grid">
          <span class="align--text-left">Feels like:</span>
          <div>${data.feelsLike}  °C</div>
        </div>
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
        <div class="card-grid">
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
        </div>
      </div>`;
  }
}
export const card = new Card();
