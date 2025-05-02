// const calenderItem = document.querySelector('.calender-item');
//
// console.log('calenderItem : ', calenderItem);
//
// calenderItem.innerHTML = '5월';

let localDate = new Date();
let timezoneOffset = localDate.getTimezoneOffset() * 60 *  1000;
let utc = localDate.getTime() + timezoneOffset;
let timeGapUtcAndKorea = 9 * 60 * 60 * 1000; // 표준시간차 9시간 * 1시간(60분) * 1분(60초) * 1000(밀리초) = 32,400,000ms
let today = new Date(utc + timeGapUtcAndKorea); // 타임존에 관계없이 동일한 한국시간을 표기

console.log('localDate : ', new Date(localDate));
console.log('utc : ', new Date(utc));
console.log('timeGapUtcAndKorea : ', timeGapUtcAndKorea);
console.log('today : ', today);

