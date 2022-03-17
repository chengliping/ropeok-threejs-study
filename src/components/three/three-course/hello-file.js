import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

let mixer = null; // 声明一个混合器变量
// 创建一个时钟对象Clock
const clock = new THREE.Clock();
export class ThreeFile {
  /**
   * 构造函数
   * @param options
   */
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    // 场景
    this.scene = new THREE.Scene();

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(250);
    this.scene.add(axesHelper);

    // 点光源
    const pointLight = new THREE.PointLight(0x666666);
    pointLight.position.set(400, 200, 300); // 点光源位置
    this.scene.add(pointLight);
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(ambientLight);

    // 相机
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 1000);
    this.camera.position.set(200, 300, 200); // 该相机位置
    this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

    // 渲染
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize(this.width, this.height);
    this.ctx.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.ctx); // 创建控件对象
    // 注意requestAnimationFrame函数是实时调用render，所以使用了动画就没必要监听addEventListener了
    this.controls.addEventListener('change', () => {
      this.render();
    });

    // this.draw();

    this.loadMMaterial();

    this.loadGeometry();

    // 动态渲染物体
    this.render();
  }

  // 动态渲染物体
  render() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => {
      this.render();
    });

    if (mixer !== null) {
      // clock.getDelta()方法获得两帧的时间间隔
      // 更新混合器相关的时间
      mixer.update(clock.getDelta());
    }
  }

  draw() {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    // 控制台查看立方体数据
    console.log(geometry);
    // 控制台查看geometry.toJSON()结果
    console.log(geometry.toJSON());
    // JSON对象转化为字符串
    console.log(JSON.stringify(geometry.toJSON()));
    // JSON.stringify()方法内部会自动调用参数的toJSON()方法
    console.log(JSON.stringify(geometry));

    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    });
    console.log(material);
    console.log(material.toJSON());
    console.log(JSON.stringify(material));

    const mesh = new THREE.Mesh(geometry, material);
    console.log(JSON.stringify(mesh));
    this.scene.add(mesh);
    console.log(this.scene);
    console.log(this.scene.toJSON());
  }

  loadMMaterial() {
    // 如果编写通用的材质加载器需要枚举所有的材质，这里没有列举完
    const typeApi = {
      MeshLambertMaterial: THREE.MeshLambertMaterial,
      MeshBasicMaterial: THREE.MeshBasicMaterial,
      MeshPhongMaterial: THREE.MeshPhongMaterial,
      PointsMaterial: THREE.PointsMaterial,
    };
    // 创建一个文件加载器，该加载器是对异步加载的封装
    const loader = new THREE.FileLoader();
    loader.load('/three-course/file/material.json', (elem) => {
      // console.log(elem);
      const obj = JSON.parse(elem);
      // console.log(obj);
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new typeApi[obj.type]();
      // 从obj.color中提取颜色
      // 16711935对应颜色0xFF00FF  255对应颜色0x0000FF
      material.color.r = (obj.color >> 16 & 255) / 255; // 获取颜色值R部分
      material.color.g = (obj.color >> 8 & 255) / 255; // 获取颜色值G部分
      material.color.b = (obj.color & 255) / 255; // 获取颜色值B部分
      const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
      mesh.translateY(100);
      this.scene.add(mesh);
    });
  }

  loadGeometry() {
    const loader = new THREE.BufferGeometryLoader();
    loader.load('/three-course/file/geometry.json', (geometry) => {
      console.log(geometry);
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    });

    const loader2 = new THREE.ObjectLoader();
    loader2.load('/three-course/file/modal.json', (modal) => {
      modal.scale.set(0.5, 0.5, 0.5);
      modal.translateY(-100);
      this.scene.add(modal);
    });

    const loader3 = new STLLoader();
    loader3.load('/three-course/file/disk.stl', (geometry) => {
      /* const material = new THREE.MeshLambertMaterial({
        color: 0xff00ff,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh); */
      console.log(geometry);
      const material = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 0.5
      });
      const points = new THREE.Points(geometry, material);
      this.scene.add(points);
    });

    const loaderObj = new OBJLoader();
    const loaderMtl = new MTLLoader();
    loaderMtl.load('/three-course/file/male02.mtl', (mtl) => {
      console.log(mtl);
      loaderObj.setMaterials(mtl);
      loaderObj.load('/three-course/file/male02.obj', (obj) => {
        console.log(obj);
        obj.scale.set(100, 100, 100);
        this.scene.add(obj);
      });
    });

    const loadFbx = new FBXLoader();
    loadFbx.load('three-course/file/cloth.fbx', (obj) => {
      console.log(obj);
      this.scene.add(obj);
      mixer = new THREE.AnimationMixer(obj);
      const AnimationAction = mixer.clipAction(obj.animations[0]);
      AnimationAction.play();
    });
  }
}
