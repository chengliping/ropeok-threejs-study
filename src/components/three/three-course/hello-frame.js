import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export class ThreeFrame {
  /**
   * 构造函数
   * @param options
   */
  constructor(options) {
    this.options = options;
    this.ctx = document.getElementById(options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.clock = new THREE.Clock();
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

    // this.pause();

    // 动态渲染物体
    this.render();
  }

  // 动态渲染物体
  render() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => {
      this.render();
    });

    // clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    this.mixer.update(this.clock.getDelta());
  }

  draw() {
    const geometry = new THREE.BoxGeometry(100, 50, 50);
    const geometry1 = new THREE.SphereGeometry(50, 100, 100);
    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    });
    const mesh = new THREE.Mesh(geometry, material);
    const mesh1 = new THREE.Mesh(geometry1, material);
    mesh.name = 'Box'; // 网格模型1命名
    mesh1.name = 'Sphere'; // 网格模型2命名
    const group = new THREE.Group();
    group.add(mesh, mesh1);
    this.scene.add(group);

    /**
     * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
     */
    // 创建名为Box对象的关键帧数据
    const times = [0, 10]; // 关键帧时间数组，离散的时间点序列
    const values = [0, 0, 0, 150, 0, 0]; // 与时间点对应的值组成的数组
    // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
    const posTrack = new THREE.KeyframeTrack('Box.position', times, values);
    // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
    const colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
    // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
    const scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

    // duration决定了默认的播放时间，一般取所有帧动画的最大时间
    // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
    const duration = 20;
    // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
    this.clip = new THREE.AnimationClip('default', duration, [posTrack, colorKF, scaleTrack]);

    /**
  * 播放编辑好的关键帧数据
   */
    // group作为混合器的参数，可以播放group中所有子对象的帧动画
    this.mixer = new THREE.AnimationMixer(group);
    // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
    this.AnimationAction = this.mixer.clipAction(this.clip);
    // 通过操作Action设置播放方式
    // this.AnimationAction.timeScale = 20; // 默认1，可以调节播放速度
    // AnimationAction.loop = THREE.LoopOnce; // 不循环播放
    this.AnimationAction.clampWhenFinished = true; // 暂停在最后一帧播放的状态
    // 设置播放区间10~18   关键帧数据总时间是20
    this.AnimationAction.time = 10; // 操作对象设置开始播放时间
    // clip.duration = 18; // 剪辑对象设置播放结束时间
    this.clip.duration = this.AnimationAction.time; // 剪辑对象设置播放结束时间
    // this.AnimationAction.loop = THREE.LoopOnce; // 不循环播放
    this.AnimationAction.play(); // 开始播放
  }

  /**
   * 暂停
   */
  pause() {
    if (this.AnimationAction.paused) {
      this.AnimationAction.paused = false;
    } else {
      this.AnimationAction.paused = true;
    }
  }

  /**
   * 快进
   */
  pos() {
    // 开始结束时间设置为一样，相当于播放时间为0，直接跳转到时间点对应的状态
    this.AnimationAction.time += 2; // 操作对象设置开始播放时间
    this.clip.duration = this.AnimationAction.time; // 剪辑对象设置播放结束时间
    this.AnimationAction.play(); // 开始播放
  }

  /**
   * 滚动条拖动播放帧动画
   */
  timeSlider(value) {
    // <el-slider v-model="time" show-input :max=20 :step=0.01></el-slider>
    // 开始结束时间设置为一样，相当于播放时间为0，直接跳转到时间点对应的状态
    this.AnimationAction.time = value; // 操作对象设置开始播放时间
    this.clip.duration = this.AnimationAction.time; // 剪辑对象设置播放结束时间
    this.AnimationAction.play(); // 开始播放
  }
}
