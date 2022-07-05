import View from "./View";
class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _searchBar = document.querySelector(".search-input");
  _selectEl = document.querySelector(".status");
  getQuery() {
    const query = this._searchBar.value;
    this._searchBar.value = "";
    return query;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
