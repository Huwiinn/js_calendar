import { getDayElement, getSunday } from "./utils/index.js";

let localDate = new Date();
let timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
let utc = localDate.getTime() + timezoneOffset;
let timeGapUtcAndKorea = 9 * 60 * 60 * 1000; // 표준시간차 9시간 * 1시간(60분) * 1분(60초) * 1000(밀리초) = 32,400,000ms
let today = new Date(utc + timeGapUtcAndKorea); // 타임존에 관계없이 동일한 한국시간을 표기

const dateObj = {
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(), // 0~11로 계산해야 해당 '월'과 일치하는 요일을 구할 수 있음. 이전엔 1~12로 표기하기 위해서 +1을 했는데, 5월에 6월 요일이 들어와버리는 이슈존재했음
};

const dayList = [
  {
    ko: "일요일",
    en: "Sun",
  },
  {
    ko: "월요일",
    en: "Mon",
  },
  {
    ko: "화요일",
    en: "Tue",
  },
  {
    ko: "수요일",
    en: "Wed",
  },
  {
    ko: "목요일",
    en: "Thu",
  },
  {
    ko: "금요일",
    en: "Fri",
  },
  {
    ko: "토요일",
    en: "Sat",
  },
];

// 이전 달 마지막 요일과 날짜 구하기
let startDay = new Date(dateObj.currentYear, dateObj.currentMonth, 0);
let prevDate = startDay.getDate(); // 월 마지막 날짜
let prevDay = startDay.getDay(); // 월 마지막 날짜의 요일, 0~6 숫자로 나타나는데, 일요일부터 토요일을 의미함.

console.log("startDay : ", startDay);
console.log("prevDate : ", prevDate);
console.log("prevDay : ", prevDay);

// 이번 달 마지막 요일과 날짜 구하기
let endDay = new Date(dateObj.currentYear, dateObj.currentMonth + 1, 0);
let nextDate = endDay.getDate();
let nextDay = endDay.getDay();

console.log("endDay : ", endDay);
console.log("nextDate : ", nextDate);
console.log("nextDay : ", nextDay);

// html 달력 렌더링 요소 선택
let calendar = document.querySelector(".calender-item__container");

const nextMonthDayCount = nextDay === 6 ? 0 : 6 - nextDay;

// 지난달
for (let i = prevDate - prevDay; i <= prevDate; i++) {
  calendar.innerHTML =
    calendar.innerHTML +
    `<li class='disable prev day'><span class='text'>${dateObj.currentMonth}월 ${i}일</span></li>`;
}

// 이번달
for (let i = 1; i <= nextDate; i++) {
  const sunday = getSunday(dateObj.currentYear, dateObj.currentMonth, i);
  const element = getDayElement(i, Number(today.getDate()), sunday, true);

  calendar.innerHTML = calendar.innerHTML + element;
}

// 다음달
for (let i = 1; i <= nextMonthDayCount; i++) {
  calendar.innerHTML =
    calendar.innerHTML +
    `<li class='disable next day'><span class='text'>${dateObj.currentMonth}월 ${i}일</span></li>`;
}

const dayElement = document.querySelector(".calender-day__container");
// console.log("dayElement : ", dayElement);

let title = document.querySelector(".title");
title.innerHTML = `${dateObj.currentYear}년 ${dateObj.currentMonth + 1}월`;

// 이전달, 다음달 버튼 클릭시 날짜 계산 후, 렌더링
const renderCalendar = (year, month) => {
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();

  const isYear = year === nowYear;
  const isMonth = month === nowMonth;

  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month + 1, 0).getDay();

  // 이전달 마지막 날짜
  const prevLastDate = new Date(year, month, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDay();

  // 이전달 tail
  if (firstDay.getDay() !== 0) {
    let startPrevMonthDay = prevLastDate - firstDay.getDay() + 1;
    for (let i = startPrevMonthDay; i <= prevLastDate; i++) {
      calendar.innerHTML += `<li class='disable prev day'><span class='text'>${month}월 ${i}일</span></li>`;
    }
  }

  // 이번달 days
  for (let i = 1; i <= lastDate; i++) {
    const sunday = getSunday(year, month, i);
    let element = "";

    if (isYear && isMonth) {
      element = getDayElement(i, Number(today.getDate()), sunday, true);
    } else {
      element = getDayElement(i, Number(today.getDate()), sunday, false);
    }

    calendar.innerHTML = calendar.innerHTML + element;
  }

  // 다음달 head
  const nextMonthDayCount = lastDay === 6 ? 0 : 6 - lastDay;
  for (let i = 1; i <= nextMonthDayCount; i++) {
    calendar.innerHTML += `<li class='disable next day'><span class='text'>${
      month + 2
    }월 ${i}일</span></li>`;
  }

  title.innerHTML = `${year}년 ${month + 1}월`;
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

const prevBtn = document.querySelector(".prev-month");
const nextBtn = document.querySelector(".next-month");

prevBtn.addEventListener("click", () => getChangedDate("prev"));
nextBtn.addEventListener("click", () => getChangedDate("next"));

// ~요일 요소
dayList.map((item) => {
  const dayItem = document.createElement("li");
  dayItem.className = "day-item";
  dayItem.textContent = item.en;
  dayElement.appendChild(dayItem);
});

console.log("오늘 날짜: ", today.toLocaleDateString());
console.log("today : ", today);
