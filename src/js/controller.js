import { Model } from "./model";
import { card } from "./view/cardView";
import dailyHourlyView from "./view/daily-hourlyView";
import { Nav } from "./view/navView";
import searchView from "./view/searchView";
const renderSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) {
      throw new Error("Invalid query");
      return;
    }
    const data = await Model.getWeatherData(query);
    card.render.bind(this, data.curr, data.location);
    console.log(data.hourly);
  } catch (err) {
    console.error(err.message);
  }
};
const init = function () {
  searchView.addHandlerSearch(renderSearchResult);
};
init();
