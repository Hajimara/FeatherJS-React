export function date_to_str(format) {
  var year = format.getFullYear();
  var month = format.getMonth() + 1;
  var date = format.getDate();
  var hour = format.getHours();
  var min = format.getMinutes();
  var sec = format.getSeconds();

  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
}
