<template>
  <div class="self">
   这是一个组件{{heheda}}
  </div>
</template>

<script>


export default {
  data () {
    return {

    }
  },
  computed:{

  },
  components: {

  },
  mounted(){

  },
  methods: {

  },
  props:['heheda']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.self{
  width: 2rem;
  height: 2rem;
  background-color: red;
}
</style>
