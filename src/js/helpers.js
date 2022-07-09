export const timeout = async function (callBack, DELAY) {
  return setTimeout(function () {
    callBack();
  }, DELAY * 1000);
};
export const getJson = async function (fetchRes) {
  try {
    if (!fetchRes.ok) {
      throw new Error("Problem with retriving data");
      return;
    }
    // console.log(fetchRes);
    const data = await fetchRes.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error("from helpers", err);
    throw new Error(err);
  }
};
export const getHour = function (unix) {
  const time = new Date(unix * 1000).toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
  });
  // console.log(time);
  const day_night = time.slice(time.indexOf(" ") + 1);

  return { time: time.slice(0, time.indexOf(" ")), day_night };
};
export const captilize = function (string) {
  return string[0].slice(0, 1).toUpperCase() + string.slice(1);
};
