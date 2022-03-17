<template>
  <div class="page-index">
    <div class="index-left">
      <div class="title">
        <h2>three.js-study-note</h2>
        <a>文档</a>
      </div>
      <div class="search-input">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchText">
        </el-input>
      </div>
      <div class="menu-list">
        <div
          v-for="(item, itemIndex) in leftMenu"
          :key="itemIndex"
        >
          <h2>{{ itemIndex }}</h2>
          <div
            v-for="(row, rowIndex) in item"
            :key="rowIndex"
          >
            <h3>
              {{ rowIndex }}
            </h3>
            <ul>
              <li
                v-for="(last, lastIndex) in row"
                :key="lastIndex"
                @click="changeIframeShow(last)"
                :class="getCurrentClass(last)"
              >
                <a>{{ lastIndex }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="index-right">
      <iframe :src="iframeUrl" />
    </div>
    <div class="index-note">
      <h3>实例预览</h3>
      <div class="example" id="example">
        <canvas class="info"></canvas>
      </div>
      <h3>笔记</h3>
      <div class="note">
        <img :src="noteImageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import { ThreeHello } from '@/components/three/hello';
// import { ThreeText } from '@/components/three/text';
// import { CustomLine } from '@/components/three/custom-line';
export default {
  name: 'Index',
  data() {
    return {
      leftMenu: {},
      example: null,
      searchText: '',
      iframeUrl: './three/docs/manual/zh/introduction/Creating-a-scene.html',
      noteImageUrl: './three/docs/note/hello.png'
    };
  },
  async mounted() {
    this.getLeftMenu(); // 左边菜单

    this.example = new ThreeHello({
      target: 'example'
    });
  },
  methods: {
    /**
     * 左边菜单
     * @returns {Promise<void>}
     */
    async getLeftMenu() {
      const list = await (await fetch('./three/docs/list.json')).json();
      this.leftMenu = list.zh;
    },
    /**
     * 改变ifream显示的内容
     * @param url
     */
    changeIframeShow(url) {
      this.iframeUrl = './three/docs/' + url + '.html';
    },
    /**
     * 激活当前的菜单
     * @param url
     * @returns {string}
     */
    getCurrentClass(url) {
      const currentUrl = './three/docs/' + url + '.html';
      if (currentUrl === this.iframeUrl) {
        return 'selected';
      } else {
        return '';
      }
    }
  }
};
</script>

<style scoped lang="less">
  @import './index.less';
</style>
