// === arrow function
// shorter function syntax

const hello = () => {
    return "Hello World!";
  }

const short_hello = () => "Hello World!";   //This works only if the function has only one statement.
//   hello = function() {
//     return "Hello World!";
//   }  

// 파라미터가 있다.
const param_hello = (val) => "Hello " + val;

// hello = val => "Hello " + val;     // 파라미터 1개 일때.

function Person() {
    this.age = 0;

    setInterval(function() {
        this.age++;
        // 여기서 this는 setInterval의 컨텍스트를 가리킴
        console.log(this.age); // NaN 또는 예상치 못한 값
    }, 1000);
}

const p = new Person();

/*function People() {
    this.age = 0;     // age=0 도 가능함

    setInterval(() => {
        this.age++; // 화살표 함수는 상위 스코프의 this를 참조함
        console.log(this.age);
    }, 1000);   //1초마다 화살표함수  실행
}

const p = new People();*/
