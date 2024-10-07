import {transformBookings} from "../Bookings/grid-builder.js";

const sessionNames= [
    "Breakfast",
    "Morning",
    "Lunch",
    "Afternoon",
    "Evening"
]

/*
bookable.id는 3, week.start는 2024-09-22, week.end는 2024-09-28 3개의 값을 조건으로
예약 현황을 조회하여 수신된 bookins 배열이 아래와 같다면,
 */

const bookings = [
     {
        session: "Lunch",
        date: "2024-09-23",
        bookableId: 3,
        title: "Football Challenge",
        bookerId: 3,
        id: 2
    },
    {
        session: "Breakfast",
        date: "2024-09-26",
        bookableId: 3,
        title: "Tiddlywinks",
        bookerId: 2,
        id: 5
    }
]

// 메소드를 실행 시키면 Grid 에 표시하기 위한 객체로 변환하여 반환된다.
const result = transformBookings(bookings)
/*
//====== bookings 배열을 변환한 결과
{
  Lunch: {
    '2024-09-23': {
      session: 'Lunch',
      date: '2024-09-23',
      bookableId: 3,
      title: 'Football Challenge',
      bookerId: 3,
      id: 2
    }
  },
  Breakfast: {
    '2024-09-26': {
      session: 'Breakfast',
      date: '2024-09-26',
      bookableId: 3,
      title: 'Tiddlywinks',
      bookerId: 2,
      id: 5
    }
  }
 */
console.log('-*result',result)