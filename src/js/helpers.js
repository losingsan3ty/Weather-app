/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-arrow-callback */
export const timeout = async function (callBack, DELAY) {
  return setTimeout(function () {
    callBack();
  }, DELAY * 1000);
};
export const getJson = async function (fetchRes) {
  try {
    if (!fetchRes.ok) {
      throw new Error('Problem with retriving data');
    }
    // console.log(fetchRes);
    const data = await fetchRes.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error('from helpers', err);
    throw new Error(err);
  }
};
export const getHour = function (unix) {
  const time = new Date(unix * 1000).toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
  });
  // console.log(time);
  const dayNight = time.slice(time.indexOf(' ') + 1);

  return { time: time.slice(0, time.indexOf(' ')), dayNight };
};
export const captilize = function (string) {
  return string[0].slice(0, 1).toUpperCase() + string.slice(1);
};
