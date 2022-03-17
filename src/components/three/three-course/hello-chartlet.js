import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 鼠标操作三维场景控件

export class HelloChartlet {
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(this.options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.init();
    this.addCanvas();
  }

  init() {
    // 创建场景对象Scene
    this.scene = new THREE.Scene();

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    const textureLoader = new THREE.TextureLoader();
    // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
    textureLoader.load(require('../images/Earth.png'), (texture) => {
      const material = new THREE.MeshLambertMaterial({
        // color: 0x0000ff,
        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        map: texture
      });
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      const geometry = new THREE.SphereGeometry(0.5, 25, 25);
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
      this.renderer.render(this.scene, this.camera); // 执行渲染操作
    });

    const ImageLoader = new THREE.ImageLoader();
    ImageLoader.load(require('../images/water.jpg'), (image) => {
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      const material = new THREE.MeshLambertMaterial({
        map: texture
      });
      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.translateY(-1);
      this.scene.add(mesh);
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体
    // 材质对象1
    const material1 = new THREE.MeshPhongMaterial({
      color: 0xffff3f
    });
    const textureLoader2 = new THREE.TextureLoader(); // 纹理加载器
    const texture = textureLoader2.load(require('../images/Earth.png')); // 加载图片，返回Texture对象
    const material2 = new THREE.MeshLambertMaterial({
      map: texture, // 设置纹理贴图
      // wireframe:true,
    });
    const texture2 = new THREE.TextureLoader().load(require('../images/water.jpg'));
    const material3 = new THREE.MeshLambertMaterial({
      map: texture2
    });
    // 设置材质数组
    const materialArr = [
      material2,
      material1,
      material3,
      material1,
      material3,
      material2
    ];
    // 设置数组材质对象作为网格模型材质参数
    const mesh = new THREE.Mesh(geometry, materialArr); // 网格模型对象Mesh
    mesh.translateY(1);
    this.scene.add(mesh); // 网格模型添加到场景中

    const geometry3 = new THREE.PlaneGeometry(2, 2);
    const texture3 = new THREE.TextureLoader().load(require('../images/grass.jpg'));
    // 设置阵列模式
    texture3.wrapS = THREE.RepeatWrapping;
    texture3.wrapT = THREE.RepeatWrapping;
    texture3.repeat.set(4, 2);
    // 偏移效果
    texture3.offset = new THREE.Vector2(1, 0.5);
    this.texture = texture3;
    const material4 = new THREE.MeshLambertMaterial({
      map: texture3,
    });
    const mesh3 = new THREE.Mesh(geometry3, material4); // 网格模型对象Mesh
    this.scene.add(mesh3); // 网格模型添加到场景中
    // mesh3.rotateX(-Math.PI / 2);

    /**
     * 创建一个设置重复纹理的管道
     */
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1, 0.5, 1.5),
      new THREE.Vector3(-0.2, 0.3, 0.3),
      // new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, -0.6, 0),
      new THREE.Vector3(1, 0, 1.5),
    ]);
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.2, 50, false);
    const textureLoader4 = new THREE.TextureLoader();
    const texture4 = textureLoader4.load(require('../images/water.jpg'));
    // 设置阵列模式为 RepeatWrapping
    texture4.wrapS = THREE.RepeatWrapping;
    texture4.wrapT = THREE.RepeatWrapping;
    // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
    // 等价texture.repeat= new THREE.Vector2(20,1)
    texture4.repeat.x = 0.5;
    this.texture4 = texture4;
    const tubeMaterial = new THREE.MeshPhongMaterial({
      map: texture4,
      transparent: true,
    });
    const mesh4 = new THREE.Mesh(tubeGeometry, tubeMaterial); // 网格模型对象Mesh
    this.scene.add(mesh4); // 网格模型添加到场景中

    // 点光源
    const pointLight = new THREE.PointLight(0x666666);
    pointLight.position.set(400, 200, 300); // 点光源位置
    this.scene.add(pointLight);
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(ambientLight);
    // this.scene.remove(pointLight, ambientLight, group); // 一次删除场景中多个对象

    /**
     * 创建一个canvas对象，并绘制一些轮廓
     */
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const c = canvas.getContext('2d');
    // 矩形区域填充背景
    c.fillStyle = '#ff00ff';
    c.fillRect(0, 0, 100, 100);
    c.beginPath();
    // 文字
    c.beginPath();
    c.translate(50, 50);
    c.fillStyle = '#000000'; // 文本填充颜色
    c.font = 'bold 48px 宋体'; // 字体样式设置
    c.textBaseline = 'middle'; // 文本与fillText定义的纵坐标
    c.textAlign = 'center'; // 文本居中(以fillText定义的横坐标)
    c.fillText('郭隆邦_技术博客', 0, 0);
    const canvasImage = new Image();
    canvasImage.src = '../images/water.jpg';
    canvasImage.onload = () => {
      c.createPattern(canvasImage, 'no-repeat');
      // 注意图片加载完成执行canvas相关方法后，要更新一下纹理
      texture5.needsUpdate = true;
    };
    // canvas画布对象作为CanvasTexture的参数重建一个纹理对象
    // canvas画布可以理解为一张图片
    const texture5 = new THREE.CanvasTexture(canvas);
    // 打印纹理对象的image属性
    // console.log(texture.image);
    // 矩形平面
    const geometry5 = new THREE.PlaneGeometry(1, 1);
    const material5 = new THREE.MeshPhongMaterial({
      map: texture5, // 设置纹理贴图
    });
    // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
    const mesh5 = new THREE.Mesh(geometry5, material5);
    mesh5.translateY(-1.8);
    this.scene.add(mesh5);

    /**
    // 创建video对象
    const video = document.createElement('video');
    video.src = '1086x716.mp4'; // 设置视频地址
    video.autoplay = 'autoplay'; // 要设置播放
    // video对象作为VideoTexture参数创建纹理对象
    const texture6 = new THREE.VideoTexture(video);
    const geometry6 = new THREE.PlaneGeometry(108, 71); // 矩形平面
    const material6 = new THREE.MeshPhongMaterial({
      map: texture6, // 设置纹理贴图
    }); // 材质对象Material
    const mesh6 = new THREE.Mesh(geometry6, material6); // 网格模型对象Mesh
    this.scene.add(mesh6); // 网格模型添加到场景中
    */

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
    window.requestAnimationFrame(() => {
      this.texture.offset.x -= 0.01;
      this.texture4.offset.x -= 0.001;
      this.render();
    });
  }

  addCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const c = canvas.getContext('2d');
    // 矩形区域填充背景
    c.fillStyle = '#ff00ff';
    c.fillRect(0, 0, 100, 100);
    c.beginPath();
    // 文字
    c.beginPath();
    c.translate(50, 50);
    c.fillStyle = '#000000'; // 文本填充颜色
    c.font = 'bold 48px 宋体'; // 字体样式设置
    c.textBaseline = 'middle'; // 文本与fillText定义的纵坐标
    c.textAlign = 'center'; // 文本居中(以fillText定义的横坐标)
    c.fillText('郭隆邦_技术博客', 0, 0);
    // document.body.appendChild(canvas);
    this.ctx.appendChild(canvas);
  }
}
