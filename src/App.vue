<template>
  <div id="app">
    <Countdown :until="'2018-04-16'" />
  </div>
</template>

<script>
import Countdown from "./components/Countdown.vue";

export default {
  name: "App",
  components: {
    Countdown
  }
};
</script>

<style>

</style>
