// grid(격자,테이블)
// 행제목은 세션이름들
// 열제목은 선택한 날짜 해당 주의 날짜들

// 선택한 bookable 데이터를 격자구조로 출력할 수 있는 오브젝트만들기
import {addDays, formatDate} from "../utils/date-utils.js";
import {sessions as sessionNames} from "../../static.json"   //test-of-.... .js 파일 실행할때에는 주석처리 필수.

export function getGrid(bookable, startDate){
    // 선택한 날짜 해당 주의 날짜들 저장한 배열 생성
    const dates = bookable.days.sort().map(
        d => formatDate(addDays(startDate,d))
    )
    // 선택한 bookable 의 sessions 숫자를 문자열 이름으로 저장한 배열 생성
    // bookable.sessions 는 id: 3은 [0,2,4] 을 [ 'Breakfast', 'Lunch', 'Evening' ]
    const sessions = bookable.sessions.map(
        i=> sessionNames[i]
    )

    const grid = {}
    sessions.forEach(session => {
        grid[session] ={}
        dates.forEach(date => grid[session][date]={
            session,
            date,
            bookableId : bookable.id,
            title:""
        })
    })
    //키이름과 변수명이 같으면 생략해서 하나만 써도 됩니다.
    return { grid,  //grid: grid,
             dates,
             sessions: sessions
           }
}

export function transformBookings (bookingsArray) {
    return bookingsArray.reduce((bookings, booking) => {

        const {session, date} = booking;

        if (!bookings[session]) {
            bookings[session] = {};
        }

        bookings[session][date] = booking;

        return bookings;
    }, {});
}
/*
reduce(bookings, booking) => bookingsArray 배열 각 요소들 booking 객체의 값을 
Grid 컴포넌트에 표시할 수 있는 객체로 변환하는 함수 실행 후 순서대로 bookings 객체에 누적시킨다.
//======배열의 reduce 메소드 ========
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);
 */

