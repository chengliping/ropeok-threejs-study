import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件

export class HelloChartlet2 {
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(this.options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.init();
    this.sizeOnload();
  }

  init() {
    // 创建场景对象Scene
    this.scene = new THREE.Scene();

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    const geometry = new THREE.SphereGeometry(0.5, 25, 25); // 立方体
    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    const textureLoader = new THREE.TextureLoader();
    // 加载法线贴图
    const textureNormal = textureLoader.load(require('../images/Earth.png'));
    const material = new THREE.MeshPhongMaterial({
      // specular: 0xff0000, // 高光部分的颜色
      map: textureNormal,
      normalMap: textureNormal, // 法线贴图
      // 设置深浅程度，默认值(1,1)。
      normalScale: new THREE.Vector2(3, 3),
      specularMap: textureNormal, // 高光贴图
      shininess: 30 // 高光部分的亮度，默认30
    });
    const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
    this.scene.add(mesh);

    const geometry2 = new THREE.PlaneGeometry(2, 2);
    const textureAuto = textureLoader.load(require('../images/aotu2.png'));
    const textureBump = textureLoader.load(require('../images/aotu1.png'));
    const material2 = new THREE.MeshPhongMaterial({
      map: textureAuto, // 普通纹理贴图
      normalMap: textureBump, // 凹凸贴图
      // 设置深浅程度，默认值(1,1)。
      bumpScale: 2 // 设置凹凸高度，默认值1。
    });
    const mesh2 = new THREE.Mesh(geometry2, material2); // 网格模型对象Mesh
    this.scene.add(mesh2);

    const geometry3 = new THREE.BoxGeometry(1, 1, 1);
    // 所有贴图在同一目录下，可以使用该方法设置共用路径
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('../images/');
    // 立方体纹理加载器返回立方体纹理对象CubeTexture
    /* const cubeTexture = loader.load([
      require('../images/Earth.png'),
      require('../images/water.jpg'),
      require('../images/aotu2.png'),
      require('../images/aotu1.png'),
      require('../images/Earth.png'),
      require('../images/water.jpg')
    ]); */
    const cubeTexture = loader.load([
      'Earth.png',
      'water.jpg',
      'aotu2.png',
      'aotu1.png',
      'Earth.png',
      'water.jpg'
    ]);
    const material3 = new THREE.MeshStandardMaterial({
      envMap: cubeTexture // 设置环境贴图
    });
    // console.log(cubeTexture.image);
    const mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.translateY(1);
    this.scene.add(mesh3);

    const geometry4 = new THREE.PlaneGeometry(1, 1);
    const geometry5 = new THREE.PlaneGeometry(1, 1);
    /**
     * 创建纹理对象的像素数据
     */
    const width = 12; // 纹理宽度
    const height = 12; // 纹理高度
    const size = width * height; // 像素大小
    const data = new Uint8Array(size * 3); // size*3：像素在缓冲区占用空间
    const data1 = new Uint8Array(size * 4); // size*4：像素在缓冲区占用空间
    for (let i = 0; i < size * 3; i += 3) {
      // 随机设置RGB分量的值
      data[i] = data1[i] = 255 * Math.random();
      data[i + 1] = data1[i + 1] = 255 * Math.random();
      data[i + 2] = data1[i + 2] = 255 * Math.random();
      // 设置透明度分量A
      data1[i + 3] = 255 * 0.5;
    }
    // 创建数据文理对象   RGB格式：THREE.RGBFormat
    const dataTexture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
    // 创建数据文理对象   RGBA格式：THREE.RGBAFormat
    const dataTexture2 = new THREE.DataTexture(data1, width, height, THREE.RGBAFormat);
    dataTexture.needsUpdate = true; // 纹理更新
    dataTexture2.needsUpdate = true;
    // console.log(dataTexture.image);
    const material4 = new THREE.MeshPhongMaterial({
      map: dataTexture // 设置纹理贴图
    });
    const material5 = new THREE.MeshPhongMaterial({
      map: dataTexture2, // 设置纹理贴图
      transparent: true // 允许透明设置
    });
    const mesh4 = new THREE.Mesh(geometry4, material4);
    const mesh5 = new THREE.Mesh(geometry5, material5);
    mesh4.translateY(-1);
    mesh5.translateY(-2);
    this.scene.add(mesh4, mesh5);

    // 点光源
    const pointLight = new THREE.PointLight(0x444444);
    pointLight.position.set(400, 200, 300); // 点光源位置
    this.scene.add(pointLight);
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x666666);
    this.scene.add(ambientLight);
    // this.scene.remove(pointLight, ambientLight, group); // 一次删除场景中多个对象

    // 相机对象
    /* const k = this.width / this.height; // 窗口宽高比
    const s = 2; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // OrthographicCamera(left, right, top, bottom, near, far);
    // left 渲染空间的左边界
    // right 渲染空间的右边界
    // top 渲染空间的上边界
    // bottom 渲染空间的下边界
    // near near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1
    // far far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到。 默认值1000
    // 大家还可以看到参数left与right、参数top与bottom互为相反数，这样做的目的是lookAt指向的对象能够显示在canvas画布的中间位置。

    // PerspectiveCamera( fov, aspect, near, far )
    // fov fov表示视场，所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度
    // aspect aspect表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比
    // near near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值
    // far far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到
    this.camera = new THREE.PerspectiveCamera(
      -s * k,
      s * k,
      s,
      -s,
      1,
      10
    ); */
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.set(2, 3, 2); // 设置相机位置
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
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  sizeOnload() {
    // onresize 事件会在窗口被调整大小时发生
    window.onresize = function(){
      // 重置渲染器输出画布canvas尺寸
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // 重置相机投影的相关参数
      const k = window.innerWidth / window.innerHeight; // 窗口宽高比
      const s = 2;
      this.camera.left = -s * k;
      this.camera.right = s * k;
      this.camera.top = s;
      this.camera.bottom = -s;
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // Threejs系统只会首次渲染的时候计算一次投影矩阵，所以当你改变影响相机投影矩阵的属性,自然需要调用.updateProjectionMatrix ()更新相机对象的投影矩阵.projectionMatrix。
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      this.camera.updateProjectionMatrix();
    };
  }
}
