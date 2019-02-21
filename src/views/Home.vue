<template>
  <div class='home'>
    <img src='../assets/czarnakaczka.jpg'>
    <img src='../assets/czarnakaczka.jpg'>
    <img src='../assets/czarnakaczka.jpg'>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component
export default class Home extends Vue {}
</script>
