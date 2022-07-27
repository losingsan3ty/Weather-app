/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-useless-path-segments */
import icons from './../../Img/icons.svg';
import View from './View';
import { captilize } from '../helpers';
// console.log(icons);
class Card extends View {
  _previousSelectOption = 'Daily';

  _card_container = document.querySelector('.card-container');

  _parentElement = document.querySelector('.card');

  _cardModal = this._card_container.nextElementSibling;
  // _btnCloseCard = document.querySelector('.btn-close-card');

  _testBtn = document.querySelector('.test-btn');

  // constructor() {
  //   super();
  //   this.addCloseButtonEvent();
  // }

  selectOptionValue() {
    return this._selectEl.value;
  }

  toggleModal() {
    // console.log(this);

    this.toggleOnClick.call(this, this._cardModal, this.toggleCard.bind(this));
    return '';
  }

  addHandlerSelect(handler) {
    const a = this;

    this._selectEl.addEventListener('change', function () {
      if (!this.value) return;
      // console.log('it changes', this.value);

      // console.log(this.value);
      if (this.value !== 'Current') {
        a._previousSelectOption = this.value;
      }
      handler(this.value);
    });
  }

  btnClickCard() {
    const btn = this._parentElement.querySelector('.btn-close-card');
    if (btn) {
      this.toggleOnClick(btn, this.toggleCard.bind(this));
    }
  }

  selecValueChange(value) {
    if (!value) value = 'Daily';
    // console.log(value);
    this._selectEl.value = value;
    this._selectEl.dispatchEvent(new Event('change'));
  }

  toggleCard() {
    // console.log(this);
    this._card_container.classList.toggle('hidden');
    this._parentElement.classList.toggle('hiddencard');
    this._cardModal.classList.toggle('hidden');
    if (!this._previousSelectOption) return;
    // this.selecValueChange(this._previousSelectOption);
    this.selecValueChange(this._previousSelectOption);
  }

  _generateMarkup(data, location) {
    // console.log(this);
    return `
     <svg class="card-image">
        <use href="${icons}#${data.date.hour.dayNight.toUpperCase()}-${
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
            <div><span>${data.date.hour.time}</span><span >${
      data.date.hour.dayNight
    }</span></div>
          </div>
        </div>
        ${
          data.daily
            ? data.temp
                .map((temp) => this._dailyTemperatureMarkup(temp))
                .join('')
            : `<div class="card-grid">
          <span >${data.temp} °C</span>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#temp-icon"></use>
            </svg>
             <span >Temp:</span>${this.toggleModal()}
          </div>
        </div>`
        }
        ${
          data.daily
            ? data.feelsLike
                .map((el) => this._dailyFeelsLikeMarkup(el))
                .join('')
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
          <span>${data.windSpeed} </span><span>Km/h</span></div>
          <div class="card-flex">
            <svg class="card-weather-icon">
              <use href="${icons}#windSpeed-icon"></use>
            </svg>
            <span>Windspeed:</span>
          </div>
        </div>
        ${data.sunRise && data.sunSet ? this._currHourlyMarkup(data) : ''}
      </div>`;
  }

  _currHourlyMarkup(data) {
    return `<div class="card-grid">
          <div>
            <span>${data.sunRise.time} </span>
            <span >${data.sunRise.dayNight}</span>
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
            <span >${data.sunSet.dayNight}</span>
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

  // addCloseButtonEvent() {
  //   const targetNode = this._card_container.childNodes[1];
  //   const config = { childList: true, subtree: true };
  //   const cardView = this;
  //   const callback = function (mutationsList, observer) {
  //     mutationsList.forEach((mutation) => {
  //       if (mutation.type === 'childList') {
  //         const btn = cardView._parentElement.querySelector('.btn-close-card');
  //         if (btn) {
  //           cardView.btnClickCard(btn);
  //         }
  //       }
  //     }, this);
  //   };

  // const observer = new MutationObserver(callback);
  // observer.observe(targetNode, config);
  // }
}
export default new Card();
