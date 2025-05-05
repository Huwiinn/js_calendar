import { getSunday } from "./utils/index.js";

let localDate = new Date();
let timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
let utc = localDate.getTime() + timezoneOffset;
let timeGapUtcAndKorea = 9 * 60 * 60 * 1000; // 표준시간차 9시간 * 1시간(60분) * 1분(60초) * 1000(밀리초) = 32,400,000ms
let today = new Date(utc + timeGapUtcAndKorea); // 타임존에 관계없이 동일한 한국시간을 표기

const dateObj = {
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(), // 0~11로 계산해야 해당 '월'과 일치하는 요일을 구할 수 있음. 이전엔 1~12로 표기하기 위해서 +1을 했는데, 5월에 6월 요일이 들어와버리는 이슈존재했음
};

// console.log("dateObj : ", dateObj);

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
    `<li class='disable prev day'><span class='text'>${i}</span></li>`;
}

// 이번달
for (let i = 1; i <= nextDate; i++) {
  const sunday = getSunday(dateObj.currentYear, dateObj.currentMonth, i);

  if (sunday !== null) {
    calendar.innerHTML =
      calendar.innerHTML +
      `<li class='current day'><span class='text sunday'>${i}</span></li>`;
  } else {
    calendar.innerHTML =
      calendar.innerHTML +
      `<li class='current day'><span class='text'>${i}</span></li>`;
  }
}

// 다음달
for (let i = 1; i <= nextMonthDayCount; i++) {
  calendar.innerHTML =
    calendar.innerHTML +
    `<li class='disable next day'><span class='text'>${i}</span></li>`;
}

const dayElement = document.querySelector(".calender-day__container");
console.log("dayElement : ", dayElement);

let title = document.querySelector(".title");
title.innerHTML = `${dateObj.currentYear}년 ${dateObj.currentMonth + 1}월`;

const handleTitle = (option) => {
  if (option === "prev") {
    console.log("이전달 보여주기");
    dateObj.currentMonth = dateObj.currentMonth - 1;

    // 1월보다 아래로 갈 수 없음. 1월 다음엔 작년 12월로 돌아가야함
    if (dateObj.currentMonth < 0) {
      dateObj.currentMonth = 11;
      dateObj.currentYear = dateObj.currentYear - 1;
    }

    // 다시 초기화하고 변경된 값 보여주기
    title.innerHTML = `${dateObj.currentYear}년 ${dateObj.currentMonth + 1}월`;

    console.log({ dateObj });
  }

  if (option === "next") {
    console.log("다음달 보여주기");
    dateObj.currentMonth = dateObj.currentMonth + 1;

    // 12월보다 위로 갈 수 없음. 12월 다음엔 내년 1월로 올라가야함
    if (dateObj.currentMonth > 11) {
      dateObj.currentMonth = 0;
      dateObj.currentYear = dateObj.currentYear + 1;
    }

    // 다시 초기화하고 변경된 값 보여주기
    title.innerHTML = `${dateObj.currentYear}년 ${dateObj.currentMonth + 1}월`;
    console.log({ dateObj });
  }
};

const prevBtn = document.querySelector(".prev-month");
const nextBtn = document.querySelector(".next-month");

prevBtn.addEventListener("click", () => handleTitle("prev"));
nextBtn.addEventListener("click", () => handleTitle("next"));

// ~요일 요소
dayList.map((item) => {
  const dayItem = document.createElement("li");
  dayItem.className = "day-item";
  dayItem.textContent = item.ko;
  dayElement.appendChild(dayItem);
});

console.log("오늘 날짜: ", today.toLocaleDateString());
console.log("today : ", today);
