import { card } from "./cardView";

export default class View {
  _data;
  _selectEl = document.querySelector(".status");

  toggleOnClick(El, toggleFunction) {
    El.addEventListener("click", toggleFunction);
  }

  /**
   *
   * @param {string} El represent the parent El we want to show and hide
   * @param {*} Modal represent the modal we want to show and hide
   * @param {*} nav in case of nav we change hidden to (nav-slide)
   */
  toggle(El, Modal, nav = false) {
    El.classList.toggle(nav ? "nav-slide" : "hidden");
    Modal.classList.toggle("hidden");
  }
  render(data, location) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    // console.log(this._data);

    const markup = this._generateMarkup(data, location);
    this._clear();
    // console.log(this);
    // this._parentElement.insertAdjacentHTML("afterbegin", "hi");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    if (this === card) card.btnClickCard();
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
    <svg>
    <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>  
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="${icons}#icon-smile"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
