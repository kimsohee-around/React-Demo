import {sessions as sessionNames} from "../../static.json";
import {addDays, formatDate} from "../utils/date-utils.js";

/*const sessions= [
    "Breakfast",
    "Morning",
    "Lunch",
    "Afternoon",
    "Evening"
]*/

export function getGrid (bookable, startDate) {
    const dates = bookable.days.sort().map(
        d => formatDate(addDays(startDate, d))
    );

    const sessions = bookable.sessions.map(i => sessionNames[i]);

    const grid = {};

    sessions.forEach(session => {
        grid[session] = {};
        dates.forEach(date => grid[session][date] = {
            session,
            date,
            bookableId: bookable.id,
            title: "", notes:""
        });
    });

    return {
        grid,
        dates,
        sessions
    };
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

// =====          위의 함수 테스트 ========
const result = getGrid({
    id: 3,
    group: "Rooms",
    title: "Games Room",
    notes: "Table tennis, table football, pinball! There's also a selection of board games. Please tidy up!",
    sessions: [
        0,
        2,
        4
    ],
    days: [
        0,
        2,
        3,
        4,
        5,
        6
    ]
},new Date("2024-09-22"));
// console.log("result",result)
// console.log("test",result.grid.Breakfast)

const bookingArray = [
    {
        "session": "Lunch",
        "date": "2024-09-22",
        "bookableId": 1,
        "title": "Onboarding",
        "bookerId": 3,
        "id": 1
    },
    {
        "session": "Morning",
        "date": "2024-09-24",
        "bookableId": 1,
        "title": "Movie Pitch!",
        "bookerId": 2,
        "id": 3
    },
    {
        "session": "Evening",
        "date": "2024-09-25",
        "bookableId": 1,
        "title": "Meeting Room",
        "bookerId": 2,
        "id": 4
    },
    {
        "session": "Lunch",
        "date": "2024-09-26",
        "bookableId": 1,
        "title": "New Employee Intro",
        "bookerId": 1,
        "id": 7
    },
    {
        "session": "Afternoon",
        "date": "2024-09-23",
        "bookableId": 1,
        "title": "Project Update",
        "bookerId": 1,
        "id": 8
    },
]

const trans = transformBookings(bookingArray);
console.log("-",trans)



//기존 예약에 대한 조회 : sessionName과 날짜로 전달하면 bookings 객체로 변환한다.
//bookings["Morning"]["2024-09-24"] 를 조회하기

/*
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

* */