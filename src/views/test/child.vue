<template>
  <div>{{ pId }}</div>
</template>

<script>
import { onMounted } from 'vue';
export default {
  name: 'child',
  props: {
    pId: {
      type: String,
      default: '2'
    }
  },
  setup(props){
    console.log(props.pId);
    onMounted(()=>{
      console.log(props.pId);
    });
  }
};
</script>

<style scoped>

</style>
