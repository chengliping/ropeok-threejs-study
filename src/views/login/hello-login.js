import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件

const AMOUNTX = 100;
const AMOUNTY = 70;
const particles = [];
let particle;
let count = 0;
let mouseX = 85;
let mouseY = -342;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
export class HelloLogin {
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(this.options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.init();
  }

  init() {
    // 创建场景对象Scene
    this.scene = new THREE.Scene();

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    // const axesHelper = new THREE.AxesHelper(1000);
    // this.scene.add(axesHelper);

    // 网格模型
    // 长方体 参数：长，宽，高
    // const geometry = new THREE.BoxGeometry(0.5, 1, 1);
    // 正八面体
    // const geometry = new THREE.OctahedronGeometry(1);
    // 正十二面体
    // const geometry = new THREE.DodecahedronGeometry(1);
    // 正二十面体
    // const geometry = new THREE.IcosahedronGeometry(1);
    const PI2 = Math.PI * 2;
    this.material = new THREE.PointCloudMaterial({
      color: 0xe1e1e1,
      program: function(context) {
        context.beginPath();
        context.arc(0, 0, 0.6, 0, PI2, true);
        context.fill();
      }
    });

    // this.mesh = new THREE.Mesh(
    //   geometry, // 几何对象，立方体等
    //   this.material
    // );
    // this.scene.add(this.mesh); // 网格模型添加到场景中ß

    const SEPARATION = 100;
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // particle = particles[i++] = new THREE.Particle(this.material);
        particle = particles[i++] = new THREE.Sprite(this.material);
        particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
        particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
        this.scene.add(particle);
      }
    }

    // 点光源
    const point = new THREE.PointLight(0x444444);
    point.position.set(400, 200, 300); // 点光源位置
    this.scene.add(point);
    // 环境光
    const ambient = new THREE.AmbientLight(0x666666);
    this.scene.add(ambient);

    // 相机对象
    const k = this.width / this.height; // 窗口宽高比
    this.camera = new THREE.PerspectiveCamera(
      45,
      k,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 150); // 设置相机位置
    this.camera.position.z = 1000;
    this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

    // 渲染器对象
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1); // 设置背景颜色
    this.ctx.appendChild(this.renderer.domElement);
    this.render();
    /*
    window.setInterval(() => {
      this.render();
    }, 20);
     */
    this.controls = new OrbitControls(this.camera, this.ctx); // 创建控件对象
    /*
    // 注意requestAnimationFrame函数是实时调用render，所以使用了动画就没必要监听addEventListener了
    this.controls.addEventListener('change', () => {
      this.render();
    });
     */
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  render() {
    this.renderer.render(this.scene, this.camera); // 执行渲染操作
    this.camera.position.x += (mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++];
        particle.position.y =
          Math.sin((ix + count) * 0.3) * 50 +
          Math.sin((iy + count) * 0.5) * 50;
        particle.scale.x = particle.scale.y =
          (Math.sin((ix + count) * 0.3) + 1) * 2 +
          (Math.sin((iy + count) * 0.5) + 1) * 2;
        this.scene.add(particle);
      }
    }
    this.renderer.render(this.scene, this.camera);
    count += 0.1;

    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }
}
