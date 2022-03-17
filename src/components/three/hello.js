import * as THREE from 'three';

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
    this.animate();
  }

  /**
   * three init
   */
  init() {
    this.initCamera();
    this.initScene();
    this.initObject();

    // 渲染
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.width, this.height);
    // document.body.appendChild(this.renderer.domElement);
    this.ctx.appendChild(this.renderer.domElement);
  }

  /**
   * 相机
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10
    );
    this.camera.position.z = 1;
  }

  /**
   * 场景
   */
  initScene() {
    this.scene = new THREE.Scene();
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
   * 渲染场景（动画循环）
   */
  animate() {
    // 让物体动起来
    this.requestAnimationFrameTimer = requestAnimationFrame(() => {
      this.animate();
    });
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    // 动态渲染场景和相机
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    this.mesh.clear();
    this.scene.remove(this.mesh);
    cancelAnimationFrame(this.requestAnimationFrameTimer);
  }
}
