<template>
  <div class="home">
    <todo-item> t1 </todo-item>
    <TodoItem> t2 </TodoItem>

    <div>
      <button :disabled="isButtonDisabled" 
      @click="isButtonDisabled = !isButtonDisabled">
      disabled</button>
    </div>

    <div>
      <a href="#" @click.prevent="aaa()"> aaa() 
        <span @click="bbb()"> bbb() </span></a>
    </div>

    <img alt="Vue logo" src="../assets/logo.png">
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
      alert("");
    }
  },
  data() {
    return {
      isButtonDisabled: false
    }
  }
}
</script>