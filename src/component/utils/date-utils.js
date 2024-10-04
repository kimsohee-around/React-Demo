export function addDays(date , daysToAdd){
    const someday = new Date(date.getTime())
    someday.setDate(someday.getDate() + daysToAdd)   //특정날짜로 부터 날짜 계산하여 변경
    return someday;
}

export function getWeek(forDate, daysOffset=0){
    const date = addDays(forDate,daysOffset)
    const day = date.getDay()   //요일. 일요일 0 부터 시작. 화요일은 2
    return {
        date,
        start: addDays(date, -day),     //forDate 날짜의 -2은 월요일 날짜
        end: addDays(date, 6-day)  //forDate 날짜의 +4는 토요일
    }
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');


    return [year, month, day].join('-');
}

export function formatDateDay(date){
    const days = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const dayName = days[date.getDay()]; // 요일 가져오기

    return formatDate(date) + "\n" + dayName
}

export function shortISO (date) {
    return date.toISOString().split("T")[0];
}