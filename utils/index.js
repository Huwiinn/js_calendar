// 일요일 구하는 함수
export const getSunday = (year, month, day) => {
  // month에 +1을 안해주면 전달 기준으로 일요일을 계산함
  const date = new Date(`${year}-${month + 1}-${day}`).getDay();

  if (date === 0) {
    return date;
  }

  return null;
};
