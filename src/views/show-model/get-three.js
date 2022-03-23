import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class ThreeHello {
  /**
   * 构造函数
   * @param options
   */
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(this.options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.requestAnimationFrameTimer = null;
    this.init();
    this.animate(); // render
  }

  /**
   * three init
   */
  init() {
    this.initCamera(); // 相机
    this.initScene(); // 场景
    // this.initObject(); // 立方体
    this.loadModel(); // 加载模型

    // 渲染
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor(0x3e7bff);
    this.renderer.setPixelRatio(window.devicePixelRatio); // 为了兼容高清屏幕
    this.ctx.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.ctx); // 创建控件对象
    // 注意requestAnimationFrame函数是实时调用render，所以使用了动画就没必要监听addEventListener了
    this.controls.addEventListener('change', () => {
      this.animate();
    });
  }

  /**
   * 相机
   */
  initCamera() {
    // this.camera = new THREE.PerspectiveCamera(
    //   70,
    //   this.width / this.height,
    //   0.01,
    //   10
    // );
    // this.camera.position.z = 1;
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 30);
  }

  /**
   * 场景
   */
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x999999));
    this.light = new THREE.DirectionalLight(0xdfebff, 0.45);
    this.light.position.set(50, 200, 100);
    this.light.position.multiplyScalar(0.3);
    this.scene.add(this.light);
  }

  /**
   * 渲染对象
   */
  initObject() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    this.scene.add(this.mesh);
    this.camera.position.z = 3;
  }

  /**
   * 加载外部模型
   */
  loadModel() {
    new OBJLoader().setPath('/three-course/models/').load('GL_Units06A.obj', obj => {
      // console.log(obj);
      obj.scale.set(0.08, 0.08, 0.08);
      obj.position.set(40, -11, 0);
      obj.castShadow = true;
      obj.receiveShadow = true;
      this.scene.add(obj);
    });
    new OBJLoader().setPath('/three-course/file/').load('male02.obj', obj => {
      obj.scale.set(0.1, 0.1, 0.1);
      obj.position.set(0, -7, 0);
      obj.castShadow = true;
      obj.receiveShadow = true;
      // obj.traverse(child => {
      //   if (child instanceof THREE.Mesh) {
      //     child.material = new THREE.MeshBasicMaterial({
      //       color: 0xfe4066
      //     });
      //   }
      // });
      this.scene.add(obj);
    });
  }

  /**
   * 渲染场景（动画循环）
   */
  animate() {
    // 让物体动起来
    this.requestAnimationFrameTimer = requestAnimationFrame(() => {
      this.animate();
    });
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.02;

    // 动态渲染场景和相机
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    this.mesh.clear();
    this.scene.remove(this.mesh);
    cancelAnimationFrame(this.requestAnimationFrameTimer);
  }
}
