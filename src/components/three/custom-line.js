import * as THREE from 'three';
import Stats from './libs/stats.module.js';
export class CustomLine {
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
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.width, this.height);
    // document.body.appendChild(this.renderer.domElement);
    this.ctx.appendChild(this.renderer.domElement);

    this.stats = new Stats();
    this.ctx.appendChild(this.stats.dom);
  }

  /**
   * 相机
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.z = 300;
  }

  /**
   * 场景
   */
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050505);
  }

  /**
   * 渲染对象
   */
  initObject() {
    this.uniforms = {
      amplitude: { value: 1.0 },
      color: { value: new THREE.Color(0xff2200) },
      colorTexture: { value: new THREE.TextureLoader().load('./images/water.jpg') }

    };

    this.uniforms.colorTexture.value.wrapS = this.uniforms.colorTexture.value.wrapT = THREE.RepeatWrapping;
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent
    });

    const radius = 50; const segments = 128; const rings = 64;
    const geometry = new THREE.SphereGeometry(radius, segments, rings);
    this.displacement = new Float32Array(geometry.attributes.position.count);
    this.noise = new Float32Array(geometry.attributes.position.count);
    for (let i = 0; i < this.displacement.length; i++) {
      this.noise[i] = Math.random() * 5;
    }
    geometry.setAttribute('displacement', new THREE.BufferAttribute(this.displacement, 1));
    this.sphere = new THREE.Mesh(geometry, shaderMaterial);
    this.scene.add(this.sphere);
  }

  /**
   * 渲染场景（动画循环）
   */
  animate() {
    // 让物体动起来
    this.requestAnimationFrameTimer = requestAnimationFrame(() => {
      this.animate();
    });

    this.render();
    this.stats.update();

    // 动态渲染场景和相机
    // this.renderer.render(this.scene, this.camera);
  }

  render() {
    const time = Date.now() * 0.01;

    this.sphere.rotation.y = this.sphere.rotation.z = 0.01 * time;

    this.uniforms.amplitude.value = 2.5 * Math.sin(this.sphere.rotation.y * 0.125);
    this.uniforms.color.value.offsetHSL(0.0005, 0, 0);

    for (let i = 0; i < this.displacement.length; i++) {
      this.displacement[i] = Math.sin(0.1 * i + time);

      this.noise[i] += 0.5 * (0.5 - Math.random());
      this.noise[i] = THREE.MathUtils.clamp(this.noise[i], -5, 5);

      this.displacement[i] += this.noise[i];
    }

    this.sphere.geometry.attributes.displacement.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    cancelAnimationFrame(this.requestAnimationFrameTimer);
  }
}
