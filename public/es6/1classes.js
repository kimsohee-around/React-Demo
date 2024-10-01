// == 자바스크립트에서도 다음과 같이 클래스를 정의합니다. ==
class Car {
    constructor(name) {
      this.brand = name;
    }

    present() {
        return 'I have a ' + this.brand;
    }
  }
  
const mycar = new Car("Ford");
// 자바스크립트 런타임 환경 node.js 에서는 터미널에서 출력확인 가능
console.log(mycar)  //Car { brand: 'Ford' }
console.log(mycar.present())

class Model extends Car {
    constructor(name, mod) {
      super(name);
      this.model = mod;
    }  
    show() {
        return this.present() + ', it is a ' + this.model
    }
  }
  const mycar2 = new Model("Ford", "Mustang");

  console.log(mycar2)
  console.log(  mycar2.show())