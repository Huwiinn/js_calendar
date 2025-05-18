// 일요일 구하는 함수
export const getSunday = (year, month, day) => {
  // month에 +1을 안해주면 전달 기준으로 일요일이 계산된다.
  const date = new Date(`${year}-${month + 1}-${day}`).getDay();

  if (date === 0) {
    return date;
  }

  return null;
};

export const getDayElement = (day, today, isSunday, isNowMonth) => {
  let isTodayStr = "today";
  if (!isNowMonth) {
    isTodayStr = "not-today";
  }

  if (isSunday !== null) {
    const sundayElement =
      today === day
        ? `<li class='day ${isTodayStr}'><span class='text sunday'>${day}</span>
        <p class='today'>Today!</p>
        </li>`
        : `<li class='day'><span class='text sunday'>${day}</span></li>`;

    return sundayElement;
  }

  if (day === today) {
    const todayElement = `<li class='day ${isTodayStr}'><span class='text'>${day}</span></li>`;

    return todayElement;
  } else {
    const element = `<li class='day'><span class='text'>${day}</span></li>`;

    return element;
  }
};
