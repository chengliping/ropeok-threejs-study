import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件
export class HelloWorld {
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

    // 网格模型
    // 长方体 参数：长，宽，高
    const geometry = new THREE.BoxGeometry(0.5, 1, 1);
    // 正八面体
    // const geometry = new THREE.OctahedronGeometry(1);
    // 正十二面体
    // const geometry = new THREE.DodecahedronGeometry(1);
    // 正二十面体
    // const geometry = new THREE.IcosahedronGeometry(1);
    this.mesh = new THREE.Mesh(
      geometry, // 几何对象，立方体等
      new THREE.MeshBasicMaterial({
        color: 0x00ff00
      })
    );
    this.scene.add(this.mesh); // 网格模型添加到场景中

    // 球体 参数：半径1  经纬度细分数40,40
    const geometry2 = new THREE.SphereGeometry(0.5, 40, 40);
    this.mesh2 = new THREE.Mesh(
      geometry2, // 几何对象，立方体等
      new THREE.MeshLambertMaterial({
        color: 0xff00ff,
        opacity: 0.8, // 半透明效果
        transparent: true,
        wireframe: true // 线框
      })
    );
    this.mesh2.translateX(10);
    this.mesh2.position.set(1, 0, 0);
    this.scene.add(this.mesh2); // 网格模型添加到场景中

    // 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
    const geometry3 = new THREE.CylinderGeometry(0.5, 0.5, 1, 25);
    this.mesh3 = new THREE.Mesh(
      geometry3, // 几何对象，立方体等
      new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0x4488ee, // 表示球体网格模型的高光颜色
        shininess: 12 // 可以理解为光照强度的系数
      })
    );
    this.mesh3.translateX(10);
    this.mesh3.position.set(0, 0, 1);
    this.scene.add(this.mesh3); // 网格模型添加到场景中

    // 点光源
    const point = new THREE.PointLight(0x444444);
    point.position.set(400, 200, 300); // 点光源位置
    this.scene.add(point);
    // 点光源2 位置和point关于原点对称
    // 点光源无法照射的地方相对其他位置会比较暗。
    // 你可以通过下面的代码在新的位置插入一个新的光源对象。点光源设置的位置是(-400, -200, -300)，相当于把立方体夹在两个点光源之间。
    const point2 = new THREE.PointLight(0xffffff);
    point2.position.set(-400, -200, -300); // 点光源位置
    this.scene.add(point2); // 点光源添加到场景中
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
  }

  render() {
    this.renderer.render(this.scene, this.camera); // 执行渲染操作
    this.mesh.rotateY(0.01); // 每次绕y轴旋转0.01弧度
    window.requestAnimationFrame(() => {
      this.render();
    });
  }
}
