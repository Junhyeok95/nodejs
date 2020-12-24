## 07

> ES5 (2009)

```
1. 배열에 forEach, map, filter, reduce, some, every와 같은 메소드 지원
2. Object에 대한 getter / setter 지원
3. 자바스크립트 strict 모드 지원
4. JSON 지원 ( 과거에는 XML )
```

> ES6 (2015)

```

1. 변수선언 : let, const

2. 블록 유효범위 : var와 다르다. 함수의 정의 역시 블록 유효범위를 가짐

3. 템플릿 리터럴 : 문자열을 연접을 + , concat() 대신 백틱(`)으로 감싼 템플릿 활용

4. 디폴트 연산자

  function ex(name){              function ex2(name = "기본값"){
    if(!name){                      console.log(name) // name == "기본값"
      name = "기본값";      =>      }
    }                             ex2(); // 기본값
    console.log(name);
  }
  ex(); // 기본값

5. 화살표 함수

  const add = function(a,b){              const add2 = (a,b) => {
    return a+b;                   =>        return a+b;
  }                                       }
  add(1,2); // 3                          add2(2,3); // 5

6. this 예약어와 화살표 함수

  const text = { // ERR
    name : "기본",
    hello : function(){
      setTimeout(function(){
        console.log(`hello ${this.name}`);
      }, 1000);
    }
  };

  const text_bind = { // OK
    name : "바인드",
    hello_bind : function(){
      setTimeout(function(){
        console.log(`hello ${this.name}`);
      }.bind(this), 1000);
    }
  };


  function NumberEx() {
    var that = this
    that.num = 0;
    setInterval(function add() {
    // setInterval 안에서의 this 는 NumberEx의 this가 아니므로 다른 변수에 this 를 지정
    that.num++;
      console.log(that.num);
    }, 1000);
  }

  function NumberEx() {
    this.num = 0
    setInterval(() => {
      this.num++ // this is from NumberEx
    }, 1000);
  }

```

```
참고 : https://woowabros.github.io/experience/2017/12/01/es6-experience.html
```
