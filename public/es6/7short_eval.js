// 단축 평가(short-circuit evaluation)
// and , or 논리연산 특징
// and 연산 : true && 뒤 => 뒤의 값으로 결과가 결정
//           false && 뒤 => 무조건 거짓. 뒤의 수식을 실행하지 않음
let isValid = true
//기존 방식
if(isValid)  console.log("hello")
//단축 평가식 : if 문 대신 사용합니다.
isValid && console.log("hello")

isValid=false
isValid && console.log("hello")

let a=20
console.log(isValid || a>10)   //단축평가 적용하여 논리연산 수행
isValid=true
console.log(isValid || a>10)
