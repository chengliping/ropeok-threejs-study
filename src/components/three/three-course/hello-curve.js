import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件

export class HelloCurve {
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

    const geometry = new THREE.BufferGeometry(); // 声明一个几何体对象Geometry
    // 参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
    const arc = new THREE.ArcCurve(0, 0, 1, 0, 2 * Math.PI);
    // getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
    const points = arc.getPoints(50); // 分段数50，返回51个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: 0x00ff00
    });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);

    const geometry2 = new THREE.BufferGeometry();
    // 二维直线LineCurve
    const LineCurve2 = new THREE.LineCurve(new THREE.Vector2(1, 0), new THREE.Vector2(0, 1));
    const pointArr = LineCurve2.getPoints(10);
    geometry2.setFromPoints(pointArr);
    const line2 = new THREE.Line(geometry2, material);
    this.scene.add(line2);

    const geometry3 = new THREE.BufferGeometry();
    const p1 = new THREE.Vector3(1, 0, 0);
    const p2 = new THREE.Vector3(1, 1, 1);
    // 三维直线LineCurve3
    const LineCurve3 = new THREE.LineCurve3(p1, p2);
    const pointArr2 = LineCurve3.getPoints(20);
    geometry3.setFromPoints(pointArr2);
    const line3 = new THREE.Line(geometry3, material);
    this.scene.add(line3); // 线条对象添加到场景中

    const geometry4 = new THREE.BufferGeometry();
    // 三维样条曲线  Catmull-Rom算法
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1, 0.5, 1.5),
      new THREE.Vector3(-0.2, 0.3, 0.3),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, -0.6, 0),
      new THREE.Vector3(1, 0, 1.5),
    ]);
    // getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    const points4 = curve.getPoints(100); // 分段数100，返回101个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometry4.setFromPoints(points4);
    const line4 = new THREE.Line(geometry4, material); // 线条模型对象
    this.scene.add(line4);

    const geometry5 = new THREE.BufferGeometry();
    const cp1 = new THREE.Vector3(-1.2, 0, 0);
    const cp2 = new THREE.Vector3(0.1, 2, 0);
    const cp3 = new THREE.Vector3(1, 0, 0);
    // 三维二次贝赛尔曲线
    const curve2 = new THREE.QuadraticBezierCurve3(cp1, cp2, cp3);
    const points5 = curve2.getPoints(100); // 分段数100，返回101个顶点
    geometry5.setFromPoints(points5);
    const material2 = new THREE.LineBasicMaterial({
      color: 0xff0000
    });
    const line5 = new THREE.Line(geometry5, material2); // 线条模型对象
    this.scene.add(line5);

    const geometry6 = new THREE.BufferGeometry();
    const R = 1.2;
    const darc = new THREE.ArcCurve(0, 0, R, Math.PI, true);
    // 半圆弧的一个端点作为直线的一个端点
    const dline1 = new THREE.LineCurve(new THREE.Vector2(R, 1.6, 0), new THREE.Vector2(R, 0, 0));
    const dline2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 1.6, 0));
    const curPath = new THREE.CurvePath(); // 创建组合曲线对象CurvePath
    curPath.curves.push(dline1, darc, dline2);
    const points6 = curve2.getPoints(200); // 分段数100，返回101个顶点
    geometry6.setFromPoints(points6);
    const material3 = new THREE.LineBasicMaterial({
      color: 0xffffff
    });
    const line6 = new THREE.Line(geometry6, material3); // 线条模型对象
    this.scene.add(line6);

    // 三维样条曲线  Catmull-Rom算法
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1, 0.5, 1.5),
      new THREE.Vector3(-0.2, 0.3, 0.3),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, -0.6, 0),
      new THREE.Vector3(1, 0, 1.5),
    ]);
    // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    const geometry7 = new THREE.TubeGeometry(path, 40, 0.2, 25);
    const material4 = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
    const line7 = new THREE.Line(geometry7, material4);
    line7.translateY(1.5);
    this.scene.add(line7);

    // LineCurve3创建直线段路径
    const path2 = new THREE.LineCurve3(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0));
    // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    const geometry8 = new THREE.TubeGeometry(path2, 10, 0.2, 20);
    const line8 = new THREE.Line(geometry8, material);
    this.scene.add(line8);

    // 创建多段线条的顶点数据
    const pp1 = new THREE.Vector3(-0.75, -0.15);
    const pp2 = new THREE.Vector3(-0.5, 0, 0);
    const pp3 = new THREE.Vector3(0, 0.5, 0);
    const pp4 = new THREE.Vector3(0.5, 0, 0);
    const pp5 = new THREE.Vector3(0.75, -0.15);
    // 创建线条一：直线
    const line10 = new THREE.LineCurve3(pp1, pp2);
    // 重建线条2：三维样条曲线
    const curve8 = new THREE.CatmullRomCurve3([pp2, pp3, pp4]);
    // 创建线条3：直线
    const line9 = new THREE.LineCurve3(pp4, pp5);
    const CurvePath = new THREE.CurvePath(); // 创建CurvePath对象
    CurvePath.curves.push(line10, curve8, line9); // 插入多段线条
    // 通过多段曲线路径创建生成管道
    // 通过多段曲线路径创建生成管道，CCurvePath：管道路径
    const geometry9 = new THREE.TubeGeometry(CurvePath, 100, 0.1, 25, false);
    const line11 = new THREE.Line(geometry9, material2);
    this.scene.add(line11);

    // 创建旋转网格模型
    const points3 = [
      new THREE.Vector2(0.5, 0.6),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.5, -0.6)
    ];
    const geometry12 = new THREE.LatheGeometry(points3, 30);
    const material5 = new THREE.MeshPhongMaterial({
      color: 0xffff00, // 三角面颜色
      side: THREE.DoubleSide // 两面可见
    });
    material5.wireframe = true; // 线条模式渲染(查看细分数)
    const mesh = new THREE.Mesh(geometry12, material5); // 旋转网格模型对象
    this.scene.add(mesh);

    const shape = new THREE.Shape(); // 创建Shape对象
    shape.splineThru(points3); // 顶点带入样条插值计算函数
    const splinePoints = shape.getPoints(20); // 插值计算细分数20
    const geometry13 = new THREE.LatheGeometry(splinePoints, 30); // 旋转造型
    const mesh2 = new THREE.Mesh(geometry13, material); // 旋转网格模型对象
    mesh2.translateX(-1);
    this.scene.add(mesh2);

    const points14 = [
      new THREE.Vector2(-0.5, -0.5),
      new THREE.Vector2(-0.6, 0),
      new THREE.Vector2(0, 0.5),
      new THREE.Vector2(0.6, 0),
      new THREE.Vector2(0.5, -0.5),
      new THREE.Vector2(-0.5, -0.5),
    ];
    // 通过顶点定义轮廓
    const shape14 = new THREE.Shape(points14);
    shape14.absarc(0, 0, 1, 0, 2 * Math.PI); // 圆弧轮廓
    // console.log(shape14.getPoints(5)); // 查看shape顶点数据
    // shape可以理解为一个需要填充轮廓
    // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
    const geometry14 = new THREE.ShapeGeometry(shape14, 25);
    const mesh3 = new THREE.Mesh(geometry14, material5); // 旋转网格模型对象
    mesh3.translateY(-1.7);
    this.scene.add(mesh3);

    // 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
    const shape15 = new THREE.Shape();
    // 四条直线绘制一个矩形轮廓
    shape15.moveTo(0, 0); // 起点
    shape15.lineTo(0, 1); // 第2点
    shape15.lineTo(1, 1); // 第3点
    shape15.lineTo(1, 0); // 第4点
    shape15.lineTo(0, 0); // 第5点
    // 拉伸造型
    const geometry15 = new THREE.ExtrudeGeometry(shape15, {
      amount: 1, // 拉伸长度
      bevelEnabled: false // 无倒角
    });
    const material6 = new THREE.PointsMaterial({
      color: 0xff00ff,
      size: 10.0 // 点对象像素尺寸
    });
    const mesh4 = new THREE.Mesh(geometry15, material6); // 旋转网格模型对象
    mesh4.translateY(-1);
    this.scene.add(mesh4);

    // 点光源
    const pointLight = new THREE.PointLight(0x444444);
    pointLight.position.set(400, 200, 300); // 点光源位置
    this.scene.add(pointLight);
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x666666);
    this.scene.add(ambientLight);
    // this.scene.remove(pointLight, ambientLight, group); // 一次删除场景中多个对象

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
    this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

    // 渲染器对象
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
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
