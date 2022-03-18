<!-- 登陆 -->
<template>
  <div class="login-page">
    <div class="login-page-content">
      <el-button type="primary" @click="login()">登陆</el-button>
    </div>
    <div class="hello-block" id="hello-block"></div>
  </div>
</template>

<script>
import { HelloLogin } from './hello-login';
import { useRouter } from 'vue-router';
export default {
  name: 'Login',
  mounted() {
    this.example = new HelloLogin({
      target: 'hello-block'
    });
  },
  setup() {
    /**
     * 登陆
     */
    const router = useRouter();
    function login() {
      router.push('/order');
    }
    return {
      login
    };
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
    .login-page-content{
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
</style>
