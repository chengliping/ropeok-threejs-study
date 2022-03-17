import * as THREE from 'three';
export class ThreeText {
  /**
   * 构造函数
   * @param options
   */
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.requestAnimationFrameTimer = null;
    this.init();
  }

  init(){
    // 相机
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      500
    );
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    // 场景
    this.scene = new THREE.Scene();

    // 渲染
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize(this.width, this.height);
    this.ctx.appendChild(this.renderer.domElement);

    // this.createPointLight();
    // this.createDireLight();

    // 渲染对象&物体&文字
    this.createText();

    // 动态渲染物体
    this.animate();
  }

  /**
   * 创建点光源 需要照亮场景
   */
  createPointLight() {
    const light = new THREE.PointLight(0xffe502, 1, 1000);
    light.position.set(50, 50, 50);
    this.scene.add(light);
  }

  /**
   * 创建方向光 金属感强烈
   */
  createDireLight() {
    const direLight = new THREE.DirectionalLight(0xffe502, 1000);
    direLight.position.set(0, 500, 0);
    direLight.castShadow = true;
    this.scene.add(direLight);
  }

  /**
   * 渲染对象
   */
  createText() {
    // eslint-disable-next-line no-unused-vars
    const loader = new THREE.FontLoader();
    let txtGeo = null;
    loader.load(
      './three/fonts/optimer_bold.typeface.json',
      (font) => {
        txtGeo = new THREE.TextGeometry('hello', {
          font: font,
          size: 30, // 字号大小，一般为大写字母的高度
          height: 10, // //文字的厚度
          weight: 'normal', // 值为'normal'或'bold'，表示是否加粗
          style: 'normal', // 值为'normal'或'italics'，表示是否斜体
          curveSegments: 4,
          bevelEnabled: true, // 布尔值，是否使用倒角，意为在边缘处斜切
          bevelThickness: 1, // 倒角厚度
          bevelSize: 0.05, // 倒角宽度
          bevelSegments: 30 // 弧线分段数，使得文字的曲线更加光滑
        });
        txtGeo.center();
        const txtMater = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          specular: 0x009900,
          shininess: 30,
          shading: THREE.FlatShading
        });
        this.mesh = new THREE.Mesh(txtGeo, txtMater);
        this.mesh.castShadow = true;
        this.mesh.position.set(-2, 2.3, -0.4);
        this.scene.add(this.mesh);
      }
    );
  }

  // 动态渲染物体
  animate() {
    this.requestAnimationFrameTimer = requestAnimationFrame(() => {
      this.animate();
    });
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
