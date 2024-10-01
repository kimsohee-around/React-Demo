const vehicles
    = ['mustang', 'f-150', 'expedition'];

// 기존 방식
const car = vehicles[0];
const truck = vehicles[1];
const suv = vehicles[2];

// 배열 구조 분해
const [car_, truck_, suv_]
                         = vehicles;
//                  ['mustang', 'f-150', 'expedition']
console.log("car_:",car_)
console.log("truck_:",truck_)
console.log("suv_:",suv_)

// 저장이 필요없는 요소는 제외
// const [car__,,suv__] = vehicles;
const [car__] = vehicles;
console.log("car__:",car__)
 // console.log(suv__)


//오브젝트
const vehicleOne = {
    brand: 'Ford',
    model: 'Mustang',
    type: 'car',
    year: 2021, 
    color: 'red'
  }
  
  let result = myVehicle(vehicleOne);
  console.log("예전 방식 result:",result)
  // 예전 방식
  function myVehicle(vehicle) {
    return   'My ' + vehicle.type + ' is a '
          + vehicle.color + ' ' + vehicle.brand +
          ' ' + vehicle.model + '.';
  }

  //the new way of using an object inside a function:
/* vehicleOne
{
    brand: 'Ford',
    model: 'Mustang',
    type: 'car',
    year: 2021,
    color: 'red'
  }
 */
  myVehicle_(vehicleOne);
  //새로운 방식의 함수 : 매개변수 이름과 일치하는 프로퍼티값만 저장하는 형식
  function myVehicle_({type, color, brand, model}) {
    const message = 'My ' + type + ' is a '
        + color + ' ' + brand + ' ' + model + '.';
    console.log("message",message)
  }

//   We can even destructure deeply nested objects by referencing the nested object then using a colon and curly braces to again /
//  destructure the items needed from the nested object:
  const vehicleOne__ = {
    brand: 'Ford',
    model: 'Mustang',
    type: 'car',
    year: 2021, 
    color: 'red',
    registration: {
      city: 'Houston',
      state: 'Texas',
      country: 'USA'
    }
  }
  
  myVehicle__(vehicleOne__)
  // { } 양끝에 공백이 필요한지 확인해야함.
  function myVehicle__({ model, registration: { state } }) {
    const message = 'My ' + model + ' is registered in ' + state + '.';
    console.log("myVehicle__ message",message)
  }

function calculate(a, b) {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  return [add, subtract, multiply, divide];
}  //배열 리턴

const [ add,subtract, multiply, divide] = calculate(4, 7);
  console.log(add)
  console.log(subtract)
  console.log(multiply)
  console.log(divide)