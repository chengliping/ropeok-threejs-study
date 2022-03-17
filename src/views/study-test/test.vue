
<template>
  <div>
    <div ref="container" id="container"></div>
  </div>
</template>
<script>
import * as THREE from 'three'; // 引入Threejs
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  data() {
    return {
      // 在这里声明变量会报错。。。。。。，不声明就没问题了。。。，就是说，不能是响应式的。。。
      // 原因：https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3/65732553
    };
  },
  methods: {
    init() {
      /* 一、应用场景 */
      // 1. 创建场景
      this.scene = new THREE.Scene();
      // 创建模型,要显示的东西
      //  (1). 创建一个立方体几何对象Geometry
      var geometry = new THREE.BoxGeometry(100, 100, 100);
      //  (2). 创建材质，就是立方体的表面那一层，这里设置成蓝色
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
      });
        //  (3). 使用刚刚定义的玩意儿创建网格模型对象（一个有蓝色的立方体）
      var mesh = new THREE.Mesh(geometry, material);
      // 2. 将网格模型（立方体）添加到场景中
      this.scene.add(mesh);

      /* 二、添加光源 */
      // 白色的光源
      var point = new THREE.PointLight(0xffffff);
      // 点光源位置
      point.position.set(400, 200, 300);
      // 点光源添加到场景中
      this.scene.add(point);
      //  环境光
      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);
      /* 三、相机设置 */
      var width = window.innerWidth; // 窗口宽度
      var height = window.innerHeight; // 窗口高度
      var k = width / height; // 窗口宽高比
      var s = 200; // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

      this.camera.position.set(200, 300, 200); // 设置相机位置
      this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)
      /* 四、相机设置 */
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); // 设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
      document
        .getElementById('container')
        .appendChild(this.renderer.domElement); // body元素中插入canvas对象
      this.renderer.render(this.scene, this.camera); // 执行渲染操作

      var controls = new OrbitControls(this.camera, this.renderer.domElement); // 创建控件对象
      controls.addEventListener('change', () => {
        this.resetRender();
      }); // 监听鼠标、键盘事件
    },
    resetRender() {
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
  #container {
  }
</style>
