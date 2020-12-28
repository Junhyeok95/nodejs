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
