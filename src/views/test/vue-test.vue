<template>
  <div>
    <child :pId="'1'" />
  </div>
</template>

<script>
import Child from '@/views/test/child';
import { bus } from '@/js/tools/bus';

export default {
  name: 'VueTest',
  components: { Child },
  data () {
    return {};
  },
  mounted () {
    bus.on('foo', e => console.log('foo', e));
    // fire an event
    bus.emit('foo', { a: 'b' });
  },
  methods: {}
};
</script>

<style scoped>

</style>
