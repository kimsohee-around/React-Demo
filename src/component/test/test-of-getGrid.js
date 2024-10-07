// grid -builder 테스트 코드 여기로 이동.

// ====  테스트 ======

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