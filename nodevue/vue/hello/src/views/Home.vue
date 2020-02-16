<template>
  <div class="home">
    <p>이벤트 중단 시 사용되는 방식 <br>
    event.preventDefalut() -> 현재 이벤트의 기본 동작을 중단 ex) A 태그를 막는다.<br>
    event.stopPropagation() -> 현재 이벤트가 상위로 전파되지 않도록 중단<br>
    event.stopImmediatePropagation() -> 같은 dom에 있는 이벤트도 중단</p>
    <br>
    <todo-item> t1 </todo-item>
    <TodoItem> t2 </TodoItem>
    <br>

    <div>
      <button :disabled="isButtonDisabled" 
      @click="isButtonDisabled = !isButtonDisabled">
      disabled</button>
    </div>
    <br>

    <div>
      <a href="#" @click.prevent="aaa()"> aaa()<br> 
        <span @click="bbb()"> bbb() </span></a>
    </div>
    <br>

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

    <span v-once>메시지: {{ msg }} </span>
    <input v-model="msg">
    <br>
    <br>
    

    <span v-html="msgStrong"></span>
    <br>
    <br>

    <span v-html="reverse"></span>
    <span class="red">{{reverse}}</span>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TodoItem from '@/components/todo-item'

export default {
  name: 'Home',
  components: {
    // HelloWorld, 
    TodoItem
  },
  methods: {
    aaa() {
      // if (e) e.preventDefalut();
      alert("");
    }
  },
  data() {
    return {
      isButtonDisabled: false,
      msg: "00asdsa00",
      msgStrong: "<strong>aaaa</strong>",
      reverse: "abcd"
    }
  },
  watch: {

  }
}
</script>

<style>
  .red {
    color: red;
  }
</style>