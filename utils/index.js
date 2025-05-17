// 일요일 구하는 함수
export const getSunday = (year, month, day) => {
  // month에 +1을 안해주면 전달 기준으로 일요일이 계산된다.
  const date = new Date(`${year}-${month + 1}-${day}`).getDay();

  if (date === 0) {
    return date;
  }

  return null;
};

const renderCalendar = (year, month) => {
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();

  // 이전 달 tail
  const prevLastDate = new Date(year, month, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevLastDate - i;
    const prevMonthDay = document.createElement("div");
    prevMonthDay.classList.add("day", "prev-month");
    prevMonthDay.textContent = day;
    calendar.appendChild(prevMonthDay);
  }

  // 현재 달
  for (let i = 1; i <= lastDate; i++) {
    const currentDay = document.createElement("div");
    currentDay.classList.add("day");
    if (getSunday(year, month, i) === 0) {
      currentDay.classList.add("sunday");
    }
    currentDay.textContent = i;
    calendar.appendChild(currentDay);
  }

  // 다음 달 head
  for (let i = 1; i < 7 - lastDay; i++) {
    const nextMonthDay = document.createElement("div");
    nextMonthDay.classList.add("day", "next-month");
    nextMonthDay.textContent = i;
    calendar.appendChild(nextMonthDay);
  }

  title.textContent = `${year}년 ${month + 1}월`;
};

const getChangedDate = (option) => {
  let year = dateObj.currentYear;
  let month = dateObj.currentMonth;
  if (option === "prev") {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
  } else if (option === "next") {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }
  dateObj.currentYear = year;
  dateObj.currentMonth = month;
  renderCalendar(year, month);
};
