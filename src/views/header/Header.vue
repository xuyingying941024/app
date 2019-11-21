<template>
  <div class="header">
    {{poiInfoChild.name}}
  </div>
</template>

<script>
export default {
  name: 'appheader',
  props: {
    poiInfoChild:{
      type:Object,
      default:{}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
