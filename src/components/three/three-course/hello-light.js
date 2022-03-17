import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件

export class HelloLight {
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
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    const geometry = new THREE.BoxGeometry(1, 1.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
    mesh.castShadow = true; // 设置产生投影的网格模型

    // 创建一个平面几何体作为投影面
    const planeGeometry = new THREE.PlaneGeometry(1.5, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x999999
    });
    // 平面网格模型作为投影面
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    this.scene.add(planeMesh);
    planeMesh.rotateX(-Math.PI / 2); // 旋转网格模型
    planeMesh.position.y = -0.5; // 设置网格模型y坐标
    // 设置接收阴影的投影面
    planeMesh.receiveShadow = true;

    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源位置
    directionalLight.position.set(0.5, 1, 0.5);
    this.scene.add(directionalLight);
    // 设置用于计算阴影的光源对象
    directionalLight.castShadow = true;
    // 设置计算阴影的区域，最好刚好紧密包围在对象周围
    // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 2;
    directionalLight.shadow.camera.left = -0.5;
    directionalLight.shadow.camera.right = 0.5;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.bottom = -1;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    // directionalLight.shadow.mapSize.set(1024,1024)
    // console.log(directionalLight.shadow.camera);

    // 聚光光源
    const spotLight = new THREE.SpotLight(0xffffff);
    // 设置聚光光源位置
    spotLight.position.set(0.5, 1, 0.5);
    // 设置聚光光源发散角度
    spotLight.angle = Math.PI / 6;
    this.scene.add(spotLight); // 光对象添加到scene场景中
    // 设置用于计算阴影的光源对象
    spotLight.castShadow = true;
    // 设置计算阴影的区域，注意包裹对象的周围
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 2;
    spotLight.shadow.camera.fov = 0.5;

    // 相机对象
    const k = this.width / this.height; // 窗口宽高比
    const s = 0.5; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    this.camera = new THREE.PerspectiveCamera(
      -s * k,
      s * k,
      s,
      -s,
      1,
      10
    );
    this.camera.position.set(250, 300, 200); // 设置相机位置
    // this.camera.position.z = 3;
    this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

    // 渲染器对象
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    this.ctx.appendChild(this.renderer.domElement);
    this.render();

    this.controls = new OrbitControls(this.camera, this.ctx); // 创建控件对象
    // 注意requestAnimationFrame函数是实时调用render，所以使用了动画就没必要监听addEventListener了
    this.controls.addEventListener('change', () => {
      this.render();
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera); // 执行渲染操作
  }
}
