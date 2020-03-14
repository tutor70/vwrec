<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <canvas id="render-canvas"/>
<!--    <button @click="onClick">Click!</button>-->
  </div>
</template>

<script lang="ts" src="../components/model3d/app3d.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
.hello {
  background-color: blueviolet;
}

#render-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

</style>
