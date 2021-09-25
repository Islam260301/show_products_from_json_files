<template>
  <div id="container">
    <router-view/>
  </div>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
})
</script>
<style scoped>
#container {
  margin: auto 2.5rem;
}
</style>
