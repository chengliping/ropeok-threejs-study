import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class HelloMaterial {
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

    // 创建一个球体的几何对象
    const geometry = new THREE.SphereGeometry(1, 25, 25);
    // 创建一个点的材质对象
    const materialPoint = new THREE.PointsMaterial({
      color: 0x0000ff, // 颜色
      size: 10, // 点渲染尺寸
    });
    // 点模型对象  参数：几何体  点材质
    const pointModal = new THREE.Points(geometry, materialPoint);
    this.scene.add(pointModal); // 将模型添加到场景中

    const materialLine = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });
    const lineModal = new THREE.Line(geometry, materialLine);
    this.scene.add(lineModal);

    const materailDashLine = new THREE.LineDashedMaterial({
      color: 0x0000ff,
      dashSize: 20, // 显示线段的大小。默认为3。
      gapSize: 20, // 间隙的大小。默认为1
    });
    const lineDashLine = new THREE.Line(geometry, materailDashLine); // 线模型对象
    lineDashLine.computeLineDistances(); // 计算LineDashedMaterial所需的距离数组
    this.scene.add(lineDashLine);

    // 直线基础材质对象 MeshBasicMaterial
    // 漫反射材质 MeshLambertMaterial
    // 高光材质 MeshPhongMaterial
    const materialMesh = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x444444, // 高光部分的颜色
      shininess: 20, // 高光部分的亮度，默认30
      side: THREE.DoubleSide,
      transparent: true, // transparent设置为true，开启透明，否则opacity不起作用
      opacity: 0.8, // 设置材质透明度
      wireframe: false // 线框
    });
    const mesh = new THREE.Mesh(geometry, materialMesh);
    const mesh2 = mesh.clone(); // 克隆
    mesh2.translateX(1); // 网格模型mesh平移
    mesh2.scale.set(0.5, 1.5, 0.5); // 网格模型xyz方向分别缩放0.5,1.5,2倍 mesh.scale.x = 0.5;
    // 向量Vector3对象表示方向
    const axis = new THREE.Vector3(1, 1, 1);
    axis.normalize(); // 向量归一化
    // 沿着axis轴表示方向平移100
    mesh2.translateOnAxis(axis, 0.5);
    this.scene.add(mesh, mesh2);

    // 点光源
    const point = new THREE.PointLight(0xff0000);
    point.position.set(400, 200, 300); // 点光源位置
    this.scene.add(point);

    // 环境光:环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    const ambient = new THREE.AmbientLight(0x440000);
    this.scene.add(ambient);

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, 50);
    directionalLight.target = mesh;
    this.scene.add(directionalLight);

    // 聚光光源
    const spotLight = new THREE.SpotLight(0xffffff);
    // 设置聚光光源位置
    spotLight.position.set(200, 200, 200);
    // 聚光灯光源指向网格模型mesh2
    spotLight.target = mesh2;
    // 设置聚光光源发散角度
    spotLight.angle = Math.PI / 6;
    this.scene.add(spotLight);

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
    /*
    this.mesh.rotateY(0.01); // 每次绕y轴旋转0.01弧度
    window.requestAnimationFrame(() => {
      this.render();
    });
     */
  }
}
