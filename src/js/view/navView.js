import View from "./View";
class Nav extends View {
  _navModal = document.querySelector(".modal");
  _parentElement = document.querySelector(".nav-menu");
  _navBtn = document.querySelector(".nav-btn");
  _btnCloseNav = document.querySelector(".btn-close-menu");
  constructor() {
    super();
    this.btnClick.call(
      this,
      this._navBtn,
      this.toggle.bind(this, this._parentElement, this._navModal, true)
    );
    this.toggleModalClick.call(
      this,
      this._navModal,
      this.toggle.bind(this, this._parentElement, this._navModal, true)
    );
    this.btnClick.call(
      this,
      this._btnCloseNav,
      this.toggle.bind(this, this._parentElement, this._navModal, true)
    );
  }
}
export default new Nav();
