// const calenderItem = document.querySelector('.calender-item');
//
// console.log('calenderItem : ', calenderItem);
//
// calenderItem.innerHTML = '5월';

let localDate = new Date();
let timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
let utc = localDate.getTime() + timezoneOffset;
let timeGapUtcAndKorea = 9 * 60 * 60 * 1000; // 표준시간차 9시간 * 1시간(60분) * 1분(60초) * 1000(밀리초) = 32,400,000ms
let today = new Date(utc + timeGapUtcAndKorea); // 타임존에 관계없이 동일한 한국시간을 표기

const dateObj = {
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth() + 1,
};
console.log("dateObj : ", dateObj);

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

// html 달력 렌더링 요소 생성
let calendar = document.querySelector(".calender-item__container");

// 지난달
for (let i = prevDate - prevDay; i <= prevDate; i++) {
  console.log({ i });
  calendar.innerHTML =
    calendar.innerHTML +
    `<div class='disable prev day'><span class='text'>${i}</span></div>`;
}

// 이번달
for (let i = 1; i <= nextDate; i++) {
  calendar.innerHTML =
    calendar.innerHTML +
    `<div class='current day'><span class='text'>${i}</span></div>`;
}

console.log(7 - nextDay === 7 ? 7 : 7 - nextDate);
// 다음달
for (let i = 1; i <= (7 - nextDay === 7 ? 7 : 7 - nextDate); i++) {
  console.log("다음달인데요");
  calendar.innerHTML =
    calendar.innerHTML +
    `<div class='disable next dey'><span class='text'>${i}</span></div>`;
}

const dayElement = document.querySelector(".calender-day__container");
console.log("dayElement : ", dayElement);

const title = document.querySelector(".title");
title.innerHTML = `${dateObj.currentYear}년 ${dateObj.currentMonth}월`;

dayList.map((item) => {
  console.log("item : ", item);
  const dayItem = document.createElement("li");
  dayItem.className = "day-item";
  dayItem.textContent = item.ko;
  console.log(dayItem);
  console.log(dayElement);
  dayElement.appendChild(dayItem);
});
