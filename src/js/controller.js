/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-unused-vars */
import { captilize } from './helpers';
import Model from './model';
import card from './view/cardView';
import dailyHourlyView from './view/daily-hourlyView';
import navView from './view/navView';
import searchView from './view/searchView';

const renderSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) {
      throw new Error('Invalid query');
    }
    const data = await Model.getWeatherData(query);
    card.render(data.curr, data.location);
    dailyHourlyView.render(data);
    const select = card.selectOptionValue();
    // console.log(select);
    dailyHourlyView.toggleDailyHourly(select);
  } catch (err) {
    console.error(err.message);
  }
};
const showSelectOption = function (value) {
  const selectValue = value.toLowerCase();
  // console.log('trigger');
  if (selectValue === 'current') {
    card.toggleCard();
    dailyHourlyView.hideEntireDisplay();

    return;
  }
  dailyHourlyView.showEntireDisplay();
  dailyHourlyView.toggleDailyHourly(value);
};
const init = function () {
  searchView.addHandlerSearch(renderSearchResult);
  card.addHandlerSelect(showSelectOption);
};
init();
// document.querySelector('.test').addEventListener('click', (e) => {
//   const status = document.querySelector('.status');
//   status.value = 'Hourly';

// });
