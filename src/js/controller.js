import { Model } from "./model";
import { card } from "./view/cardView";
import dailyHourlyView from "./view/daily-hourlyView";
import navView, { Nav } from "./view/navView";
import searchView from "./view/searchView";
const renderSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) {
      throw new Error("Invalid query");
      return;
    }
    const data = await Model.getWeatherData(query);
    dailyHourlyView.render(data.hourly);
    card.render(data.daily[0], data.location);
    console.log(data.hourly);
    console.log(data.daily);
    console.log(data.curr);
  } catch (err) {
    console.error(err.message);
  }
};
const showSelectOption = function (value) {
  const selectValue = value.toLowerCase();
  if (selectValue === "current") {
    card.toggleCard();
  }
};
const init = function () {
  searchView.addHandlerSearch(renderSearchResult);
  navView.addHandlerSelect(showSelectOption);
};
init();
