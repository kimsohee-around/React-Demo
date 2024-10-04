// grid(격자,테이블)
// 행제목은 세션이름들
// 열제목은 선택한 날짜 해당 주의 날짜들

// 선택한 bookable 데이터를 격자구조로 출력할 수 있는 오브젝트만들기
import {addDays, formatDate} from "../utils/date-utils.js";
import {sessions as sessionNames} from "../../static.json"

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
             sessions: sessionNames
           }
}

// ====  테스트 ======
/*
const sessionNames= [
    "Breakfast",
    "Morning",
    "Lunch",
    "Afternoon",
    "Evening"
]

const bookable = {
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
}


const result = getGrid(bookable, new Date("2024-09-29"))
console.log('-->', result)   // grid 객체

//자바스크립트 프로퍼티 get/set 할 때, 객체.프로퍼티이름 또는 객체[프로퍼티이름]
const grid = result.grid
console.log('--',grid["Lunch"])
console.log('---',grid["Lunch"]["2024-10-01"])
 */