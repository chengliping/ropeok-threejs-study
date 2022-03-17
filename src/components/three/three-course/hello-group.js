import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export class HelloGroup {
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

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    });
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = new THREE.Mesh(geometry, material);
    mesh2.translateX(1);
    const group = new THREE.Group();
    group.add(mesh1);
    group.add(mesh2);
    group.remove(mesh1); // 删除父对象group的子对象网格模型mesh1
    group.rotateY(Math.PI);
    this.scene.add(group);
    this.scene.remove(group);

    // 头部网格模型和组
    const headMesh = this.sphereMesh(0.5, 0, 0, 0);
    headMesh.name = '脑壳';
    const leftEyeMesh = this.sphereMesh(0.1, 0.4, 0.2, 0.2);
    leftEyeMesh.name = '左眼';
    const rightEyeMesh = this.sphereMesh(0.1, 0.4, 0.2, -0.2);
    rightEyeMesh.name = '右眼';
    const headGroup = new THREE.Group();
    headGroup.name = '头部';
    headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);

    // 身体网格模型和组
    const neckMesh = this.cylinderMesh(0.3, 0.6, 0, 0.6, 0);
    neckMesh.name = '脖子';
    const bodyMesh = this.cylinderMesh(0.5, 1.2, 0, 1.5, 0);
    bodyMesh.name = '腹部';
    const leftLegMesh = this.cylinderMesh(0.1, 1.8, 0, 3, 0.2);
    leftLegMesh.name = '左腿';
    const rightLegMesh = this.cylinderMesh(0.1, 1.8, 0, 3, -0.2);
    rightLegMesh.name = '右腿';
    const legGroup = new THREE.Group();
    legGroup.name = '腿';
    legGroup.add(leftLegMesh, rightLegMesh);
    const bodyGroup = new THREE.Group();
    bodyGroup.name = '身体';
    bodyGroup.add(neckMesh, bodyMesh, legGroup);

    const peopleGroup = new THREE.Group();
    peopleGroup.name = '人';
    peopleGroup.add(headGroup, bodyGroup);
    peopleGroup.translateY(-2);
    this.scene.add(peopleGroup);

    this.scene.traverse((obj) => {
      if (obj.type === 'Group') {
        // console.log(obj.name);
      }

      if (obj.type === 'Mesh') {
        // console.log('  ' + obj.name);
        obj.material.color.set(0xffff00);
      }

      if (obj.name === '左眼' || obj.name === '右眼') {
        obj.material.color.set(0x000000);
      }

      // 打印id属性
      // console.log(obj.id);
    });

    console.log('本地坐标', neckMesh.position);
    // 该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
    this.scene.updateMatrixWorld(true);
    // 声明一个三维向量用来保存世界坐标
    const worldPosition = new THREE.Vector3();
    // 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
    neckMesh.getWorldPosition(worldPosition);
    console.log('世界坐标', worldPosition);

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

  // 球体网格模型创建函数
  sphereMesh(R, x, y, z) {
    const geometry = new THREE.SphereGeometry(R, 20, 20); // 球体
    const material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
  }

  // 圆柱体网格模型创建函数
  cylinderMesh(R, h, x, y, z) {
    const geometry = new THREE.CylinderGeometry(R, R, h, 25, 25);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
  }
}
