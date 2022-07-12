import View from "./View";
class Nav extends View {
  _navModal = document.querySelector(".modal");
  _parentElement = document.querySelector(".nav-menu");
  _navBtn = document.querySelector(".nav-btn");
  _btnCloseNav = document.querySelector(".btn-close-menu");
  _selectEl = document.querySelector(".status");
  constructor() {
    super();
    this.toggleOnClick.call(
      this,
      this._navBtn,
      this.toggle.bind(this, this._parentElement, this._navModal, true)
    );
    this.toggleOnClick.call(
      this,
      this._navModal,
      this.toggle.bind(this, this._parentElement, this._navModal, true)
    );
    this.toggleOnClick.call(
      this,
      this._btnCloseNav,
      this.toggle.bind(this, this._parentElement, this._navModal, true)
    );
  }
  selectEltoDaily() {
    this._selectEl.value = "Daily";
  }
  initialSelectOption() {
    return this._selectEl.value;
  }
  addHandlerSelect(handler) {
    this._selectEl.addEventListener("change", function (e) {
      handler(this.value);
    });
  }
}
export default new Nav();
