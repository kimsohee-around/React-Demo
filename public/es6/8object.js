const obj ={
    id: 2,
    group: "Rooms",
    title: "Lecture Hall",
    notes: "For more formal 'sage-on-the-stage' presentations. Seats 100. See Sandra for help with AV setup.",
    sessions: [
    1,
    3,
    4
]}
console.log('obj:',obj)
obj["days"] = [0,1,2,3,4]
console.log('obj:',obj)
const test={}
test["Breakfast"] = {"2024=10-11":{}}
console.log(test)
console.log(test.Breakfast)
test["Breakfast"]["2024=10-11"] = {title:"test", id:123}
console.log(test)
console.log(test.Breakfast["2024=10-11"])

/*const sessions= [
    "Breakfast",
    "Morning",
    "Lunch",
    "Afternoon",
    "Evening"
]*/
/*
,
    days: [
    0,
    1,
    2,
    3,
    4
]

 */