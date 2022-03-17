import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件

export class HelloConcept {
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

    // 创建一个Buffer类型几何体对象
    const geometry = new THREE.BufferGeometry();
    // 类型数组创建顶点数据
    const vertices = new Float32Array([
      0, 0, 0, // 顶点1坐标
      1, 0, 0, // 顶点2坐标
      1, 1, 0, // 顶点3坐标
      0, 1, 0, // 顶点4坐标
      1, 1, 0, // 顶点5坐标
      0, 1, 1, // 顶点6坐标
    ]);
    // 创建属性缓冲区对象
    const attribue = new THREE.BufferAttribute(vertices, 3); // 3个为一组，表示一个顶点的xyz坐标
    // 设置几何体attributes属性的位置属性
    geometry.attributes.position = attribue;

    const normals = new Float32Array([
      0, 0, 1, // 顶点1法向量
      0, 0, 1, // 顶点2法向量
      0, 0, 1, // 顶点3法向量
      0, 1, 0, // 顶点4法向量
      0, 1, 0, // 顶点5法向量
      0, 1, 0, // 顶点6法向量
    ]);
    // 设置几何体attributes属性的位置normal属性
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); // 3个为一组,表示一个顶点的法向量数据

    // 类型数组创建顶点颜色color数据
    const colors = new Float32Array([
      1, 0, 0, // 顶点1颜色
      0, 1, 0, // 顶点2颜色
      0, 0, 1, // 顶点3颜色

      1, 1, 0, // 顶点4颜色
      0, 1, 1, // 顶点5颜色
      1, 0, 1, // 顶点6颜色
    ]);
    // 设置几何体attributes属性的颜色color属性
    geometry.attributes.color = new THREE.BufferAttribute(colors, 3); // 3个为一组,表示一个顶点的颜色数据RGB

    // 点渲染模式
    const material1 = new THREE.PointsMaterial({
      // color: 0xff0000,
      vertexColors: THREE.VertexColors, // 以顶点颜色为准
      size: 10.0 // 点对象像素尺寸
    });
    // 点模型对象
    const points = new THREE.Points(
      geometry, // 几何对象，立方体等
      material1
    );
    this.scene.add(points); // 网格模型添加到场景中

    const material = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      // vertexColors: THREE.VertexColors, // 以顶点颜色为准
      side: THREE.DoubleSide // 两面可见
    });
    this.mesh = new THREE.Mesh(
      geometry, // 几何对象，立方体等
      material
    );
    this.scene.add(this.mesh); // 网格模型添加到场景中

    // 线条渲染模式
    const material2 = new THREE.LineBasicMaterial({
      color: 0xff0000
    });
    // 线条模型对象
    const line = new THREE.Line(
      geometry, // 几何对象，立方体等
      material2
    );
    this.scene.add(line); // 网格模型添加到场景中

    // 创建一个立方体几何对象Geometry
    const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    // 几何体xyz三个方向都放大2倍
    geometry2.scale(2, 2, 2);
    // 几何体沿着x轴平移50
    geometry2.translate(1, 0, 0);
    // 几何体绕着x轴旋转45度
    geometry2.rotateX(Math.PI / 4);
    // 居中：偏移的几何体居中
    geometry2.center();
    // 矩形平面几何体
    // const geometry2 = new THREE.PlaneBufferGeometry(1.5, 1.5);
    // console.log(geometry2);

    // 材质对象Material
    const material3 = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
      opacity: 0.8, // 半透明效果
      transparent: true,
      wireframe: true // 线框
    });
    const mesh2 = new THREE.Mesh(geometry2, material3); // 网格模型对象Mesh
    this.scene.add(mesh2); // 网格模型添加到场景中

    // 点光源
    const point = new THREE.PointLight(0x444444);
    point.position.set(400, 200, 300); // 点光源位置
    this.scene.add(point);
    // 环境光
    const ambient = new THREE.AmbientLight(0x666666);
    this.scene.add(ambient);

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
