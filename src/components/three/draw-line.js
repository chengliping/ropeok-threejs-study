import * as THREE from 'three';
export class ThreeDrawLine {
  /**
   * 构造函数
   * @param options
   */
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.init();
  }

  init() {
    // 相机
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 500);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    // 场景
    this.sence = new THREE.Scene();

    // 渲染
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize(this.width, this.height);
    this.ctx.appendChild(this.renderer.domElement);

    // 渲染对象&物体
    this.initLine();

    // 动态渲染物体
    this.animate();
  }

  /**
   * 渲染对象
   */
  initLine() {
    // 画线
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });

    /**
     * 已废弃
     * google了一番发现是版本的问题，125版本就不再支持这个api了，如果还需要就用他的子类BufferGeometry
     * @type {BufferGeometry}
     const geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(x,y,z)) // 点
     // 这里用下面这个构造
     */

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(10, 0, 0)
    ]);
    this.line = new THREE.Line(geometry, material);
    this.line.position.set(0, 6, 0);
    this.sence.add(this.line);
  }

  // 动态渲染物体
  animate() {
    this.renderer.render(this.sence, this.camera);
  }
}
