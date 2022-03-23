<!-- 登陆 -->
<template>
  <div class="login-page">
    <div class="hello-block" id="hello-block"></div>
  </div>
</template>

<script>
import { ThreeHello } from './get-three';
export default {
  name: 'Login',
  mounted() {
    this.example = new ThreeHello({
      target: 'hello-block'
    });
  }
};
</script>

<style scoped lang="less">
  .login-page{
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    color: #FFFFFF;
    .hello-block{
      flex: 1;
      display: flex;
      width: 100vw;
      height: 100vh;
    }
  }
</style>
