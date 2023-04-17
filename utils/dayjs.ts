const dayjs = require("dayjs");
require("dayjs/plugin/utc");
require("dayjs/plugin/timezone");
require("dayjs/locale/hi");
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

dayjs.locale("hi");

export const convertTimeStamp = (time: string) => {
  return dayjs(time, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
};

export const convertServerTimestamp = (time: string) => {
  return dayjs(time, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
};

export const convertDateStringTimeStamp = (dateStr: Date) => {
  const dateObj = new Date(dateStr);
  return dayjs(dateObj).format("YYYY-MM-DD HH:mm");
};
export const defaultTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
