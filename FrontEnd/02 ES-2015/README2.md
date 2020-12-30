## 11

> 모듈

```
// 클래스를 모듈화 lib/person.js
export class Person {
  constructor(id, name){
    this.id = id;
    this.name = name;
  }
  printName(){
    console.log(this.name);
  }
}

import { Person } from 'lib/person';
const person = new Person(1, "유저");
person.printName(); // 유저

// 파일을 모듈화
const max_length = 150;
function validate_message(message){
  retourn message.length <= max_length;
}
export {max_length, validate_nessage};

// 여러가지 호출방법
import {max_length, validate_message} form 'xxx';
import * form 'xxx';
import * as validation form 'xxx';
validation.message_validation(message);

```

## 12

> TypeScript

```
npm i -g typescript // 4.1.3
tsc -t ES5 src/hello.ts // 트랜스파일(transpile)
```

> 변수와 타입 어노테이션

```
변수명 : 타입 = 값;

  let str: string = "문자열";
  let num: number = 1;
  let bool: boolean = true;
  let obj: any = {};

변수의 값을 보고 타입을 유추하는 기능 -> "타입 추론"
```

> 타입 변환

```
방법 1 : <변환후_타입> 변수
방법 2 : 변수 as 변환후_타입

  // any type
  let obj: any = "1";

  // <> 연산자를 사용
  let num1: number = <number>obj; // JSX를 사용할 때는 사용 불가.

  // as 연산자를 사용
  let num2: number = obj as number; // 상단의 any 타입 obj를 number타입으로 변환
```

> 함수의 타입 어노테이션

```
인자는 인자명 우측에 콜론을 붙여 타입명을 기재
반환값의 타입은 함수의 정의 () 완 {} 사이에 콜론을 붙여서 기재

  function greet(name: string): string {
    return `안녕하세요, ${name}님`; // 타입추론이 가능
  }
  const greeting_message = greet('성함'); // string

필수가 아닌 인자도 ? 를 붙이면 가능하다

  function greet(name?: string) {
    return `안녕하세요, ${name || "익명"}님`;
  }

// 인자를 생략하고 호풀하면 name값이 없으므로 익명이 반환됨
const greeting_message = greet();


```

## 13

```

```
