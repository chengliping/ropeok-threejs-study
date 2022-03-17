import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export class ThreeSprite {
  /**
   * 构造函数
   * @param options
   */
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.init();
  }

  init() {
    // 场景
    this.scene = new THREE.Scene();

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(250);
    this.scene.add(axesHelper);

    // 点光源
    const pointLight = new THREE.PointLight(0x666666);
    pointLight.position.set(400, 200, 300); // 点光源位置
    this.scene.add(pointLight);
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(ambientLight);

    // 相机
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 1000);
    this.camera.position.set(200, 300, 200); // 该相机位置
    this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

    // 渲染
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize(this.width, this.height);
    this.ctx.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.ctx); // 创建控件对象
    // 注意requestAnimationFrame函数是实时调用render，所以使用了动画就没必要监听addEventListener了
    this.controls.addEventListener('change', () => {
      this.render();
    });

    this.draw();

    this.drawGroup();

    this.drawTree();

    this.drawGrass();

    this.drawRain();

    // 动态渲染物体
    this.render();
  }

  // 动态渲染物体
  render() {
    // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
    // 每次渲染都会更新雨滴的位置，进而产生动画效果
    this.group.children.forEach(sprite => {
      // 雨滴的y坐标每次减1
      sprite.position.y -= 1;
      if (sprite.position.y < 0) {
        // 如果雨滴落到地面，重置y，从新下落
        sprite.position.y = 1000;
      }
    });

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  draw() {
    const texture = new THREE.TextureLoader().load(require('../images/sprite.png'));
    // 创建精灵材质对象SpriteMaterial
    const spriteMaterial = new THREE.SpriteMaterial({
      color: 0xff00ff, // 设置精灵矩形区域颜色
      rotation: Math.PI / 4, // 旋转精灵对象45度，弧度值
      map: texture // 设置精灵纹理贴图
    });
    // 创建精灵模型对象，不需要几何体geometry参数
    const sprite = new THREE.Sprite(spriteMaterial);
    this.scene.add(sprite);
    sprite.scale.set(10, 10, 1); // 只需要设置x、y两个分量就可以
  }

  /**
   * 一个精灵模型对象表示一个城市的位置和数据
   */
  drawGroup() {
    // 加载一个背景透明的圆形贴图，矩形精灵显示为圆形效果
    const texture = new THREE.TextureLoader().load(require('../images/sprite.png'));
    const group = new THREE.Group();
    const data = [
      {
        name: '海门',
        value: 900,
        coordinate: [121.15, 31.89]
      },
      {
        name: '青岛',
        value: 180,
        coordinate: [120.33, 36.07]
      },
      {
        name: '武汉',
        value: 273,
        coordinate: [114.31, 30.52]
      }
    ];
    data.forEach(elem => {
      // 精灵材质
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture, // 设置精灵纹理贴图
        transparent: true,
        opacity: 0.5,
      });
      // 创建精灵模型对象
      const sprite = new THREE.Sprite(spriteMaterial);
      // 控制精灵大小   使用PM2.5大小设置精灵模型的大小
      // 注意适当缩放pm2.5大小,以便得到更好的显示效果
      const k = elem.value / 200;
      sprite.scale.set(k, k, 1);
      // 获得城市坐标设置精灵模型对象的位置
      sprite.position.set(elem.coordinate[0], elem.coordinate[1], 0);
      group.add(sprite);
    });
    // 中国城市坐标整体的几何中心不在坐标原点，需要适当的平移
    group.position.set(-110, -30, 0);
    this.scene.add(group); // 把精灵群组插入场景中
  }

  /**
   * 精灵创建树林效果
   */
  drawTree() {
    // 加载树纹理贴图
    const texture = new THREE.TextureLoader().load(require('../images/tree.png'));
    // 批量创建表示一个树的精灵模型
    for (let i = 0; i < 100; i++) {
      // 设置精灵纹理贴图
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture
      });
      // 创建精灵模型对象
      const sprite = new THREE.Sprite(spriteMaterial);
      this.scene.add(sprite);
      // 控制精灵大小
      sprite.scale.set(100, 100, 1); // 只需要设置x、y两个分量就可以
      const k1 = Math.random() - 0.5;
      const k2 = Math.random() - 0.5;
      // 设置精灵模型位置，在xoz平面上随机分布
      sprite.position.set(1000 * k1, 50, 1000 * k2);
    }
  }

  /**
   * 创建一个草地地面
   */
  drawGrass() {
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    // 加载草地纹理贴图
    const texture = new THREE.TextureLoader().load(require('../images/grass.jpg'));
    // 设置纹理的重复模式
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // uv两个方向纹理重复数量
    texture.repeat.set(10, 10);
    const material = new THREE.MeshLambertMaterial({
      color: 0x777700,
      map: texture
    });
    const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
    this.scene.add(mesh); // 网格模型添加到场景中
    mesh.rotateX(-Math.PI / 2);
  }

  /**
   * 精灵创建下雨效果
   */
  drawRain() {
    // 加载雨滴理贴图
    const texture = new THREE.TextureLoader().load(require('../images/rain.png'));
    this.group = new THREE.Group();
    // 批量创建表示雨滴的精灵模型
    for (let i = 0; i < 400; i++) {
      const material = new THREE.SpriteMaterial({
        map: texture
      });
      const sprite = new THREE.Sprite(material);
      // 控制精灵大小,
      sprite.scale.set(8, 10, 1); // 只需要设置x、y两个分量就可以
      const k1 = Math.random() - 0.5;
      const k2 = Math.random() - 0.5;
      const k3 = Math.random() - 0.5;
      // 设置精灵模型位置，在整个空间上上随机分布
      sprite.position.set(1000 * k1, 1000 * k3, 1000 * k2);
      this.group.add(sprite);
    }
    this.scene.add(this.group);
  }
}
