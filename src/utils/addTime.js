// create a function that add two times with the format hh:mm
export const addTime = (time1, time2) => {
    const time1Arr = time1?.split(":");
    const time2Arr = time2.split(":");
    const time1Hours = parseInt(time1Arr[0]);
    const time1Minutes = parseInt(time1Arr[1]);
    const time2Hours = parseInt(time2Arr[0]);
    const time2Minutes = parseInt(time2Arr[1]);
    const hours = time1Hours + time2Hours;
    const minutes = time1Minutes + time2Minutes;
    if (minutes >= 60) {
      const newHours = hours + Math.floor(minutes / 60);
      const newMinutes = minutes % 60;

      if(newMinutes < 10) {
        return `${newHours}:0${newMinutes}`;
      }
      return `${newHours}:${newMinutes}`;
    } else {
      if(minutes < 10){
         return `${hours}:0${minutes}`;
      }
      return `${hours}:${minutes}`;
    }
  };