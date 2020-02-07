<template>
  <div id="app">
    <hr>
    <h1>{{test}} :: <span v-if="isVisible">{{visit}}</span> </h1>
    <input type="text" v-on:keyup="visit++" v-model="test">
    <button v-on:click="visitCount()">visit Count</button>
    <br><hr>
    <h1>{{test2}}</h1>


    <br>
    <h1> Hello ~ </h1>
    <br>

    <h1>Tip</h1>
    <p>V2 버전은 v-on:click="" , v-on:keyup=""</p>
    <p>V3 버전은 @click , @keyup=""</p>
    <p>V4 버전은? ㅜㅜ</p>


    <br><br>
    <img alt="Vue logo" src="./assets/logo.png">
    <br><br><br><br><br><br>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return {
      test:"test",
      visit: 0,
      isVisible: false
    }
  },
  methods: {
    visitCount() {
      this.visit++;
      this.isVisible = true;
    }
  },
  computed: {
    test2(){ // 아래 변수가 변화하는 것을 보고 있다, computed Properties !!
      return "hello ~ ! " + this.visit;
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
