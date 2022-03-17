import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
let n = 0;
const T = 50;
const step = 0.01;
// 创建一个时钟对象Clock
const clock = new THREE.Clock();
let analyser = null; // 声明一个分析器变量
export class ThreeBone {
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

    this.drawBox();

    this.loadRadio();

    // 动态渲染物体
    this.render();
  }

  // 动态渲染物体
  render() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => {
      this.render();
    });

    n += 1;
    if (n < T) {
      // 改变骨关节角度
      this.skeleton.bones[0].rotation.x = this.skeleton.bones[0].rotation.x - step;
      this.skeleton.bones[1].rotation.x = this.skeleton.bones[1].rotation.x + step;
      this.skeleton.bones[2].rotation.x = this.skeleton.bones[2].rotation.x + 2 * step;
    }
    if (n < 2 * T && n > T) {
      this.skeleton.bones[0].rotation.x = this.skeleton.bones[0].rotation.x + step;
      this.skeleton.bones[1].rotation.x = this.skeleton.bones[1].rotation.x - step;
      this.skeleton.bones[2].rotation.x = this.skeleton.bones[2].rotation.x - 2 * step;
    }
    if (n === 2 * T) {
      n = 0;
    }

    // clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    this.mixer.update(clock.getDelta());

    if (analyser) {
      // 获得频率数据N个
      const arr = analyser.getFrequencyData();
      // 遍历组对象，每个网格子对象设置一个对应的频率数据
      this.group.children.forEach((elem, index) => {
        elem.scale.y = arr[index] / 80;
        elem.material.color.r = arr[index] / 200;
      });
      // getAverageFrequency()返回平均音频
      // const frequency = analyser.getAverageFrequency();
      // this.mesh1.scale.y = 5 * frequency / 256;
      // this.mesh1.material.color.r = 3 * frequency / 256;
      // 返回傅里叶变换得到的所有频率
      // console.log(analyser.getFrequencyData());
    }
  }

  draw() {
    /**
     * 创建骨骼网格模型SkinnedMesh
     */
    // 创建一个圆柱几何体，高度120，顶点坐标y分量范围[-60,60]
    const geometry = new THREE.CylinderBufferGeometry(5, 10, 120, 50, 300);
    geometry.translate(0, 60, 0); // 平移后，y分量范围[0,120]
    // const vertices = geometry.attributes.position;
    // const attribue = new THREE.BufferAttribute(vertices, 3); // 3个为一组，表示一个顶点的xyz坐标
    // console.log('name', attribue);

    // const vertices = geometry.attributes.position;
    // console.log(vertices, vertices.count, geometry.index);
    /**
     * 设置几何体对象Geometry的蒙皮索引skinIndices、权重skinWeights属性
     * 实现一个模拟腿部骨骼运动的效果
     */
    // 遍历几何体顶点，为每一个顶点设置蒙皮索引、权重属性
    // 根据y来分段，0~60一段、60~100一段、100~120一段
    /* for (let i = 0; i < attribue.count; i++) {
      const vertex = attribue[i]; // 第i个顶点
      if (vertex.y <= 60) {
        // 设置每个顶点蒙皮索引属性  受根关节Bone1影响
        geometry.skinIndices.push(new THREE.Vector4(0, 0, 0, 0));
        // 设置每个顶点蒙皮权重属性
        // 影响该顶点关节Bone1对应权重是1-vertex.y/60
        geometry.skinWeights.push(new THREE.Vector4(1 - vertex.y / 60, 0, 0, 0));
      } else if (vertex.y > 60 && vertex.y <= 60 + 40) {
        // Vector4(1, 0, 0, 0)表示对应顶点受关节Bone2影响
        geometry.skinIndices.push(new THREE.Vector4(1, 0, 0, 0));
        // 影响该顶点关节Bone2对应权重是1-(vertex.y-60)/40
        geometry.skinWeights.push(new THREE.Vector4(1 - (vertex.y - 60) / 40, 0, 0, 0));
      } else if (60 + 40 < vertex.y && vertex.y <= 60 + 40 + 20) {
        // Vector4(2, 0, 0, 0)表示对应顶点受关节Bone3影响
        geometry.skinIndices.push(new THREE.Vector4(2, 0, 0, 0));
        // 影响该顶点关节Bone3对应权重是1-(vertex.y-100)/20
        geometry.skinWeights.push(new THREE.Vector4(1 - (vertex.y - 100) / 20, 0, 0, 0));
      }
    } */

    // 材质对象
    const material = new THREE.MeshPhongMaterial({
      skinning: true, // 允许蒙皮动画
      // wireframe:true,
    });
    // 创建骨骼网格模型
    const SkinnedMesh = new THREE.SkinnedMesh(geometry, material);
    SkinnedMesh.position.set(50, 120, 50); // 设置网格模型位置
    SkinnedMesh.rotateX(Math.PI); // 旋转网格模型
    this.scene.add(SkinnedMesh); // 网格模型添加到场景中

    const bone1 = new THREE.Bone(); // 关节1，用来作为根关节
    const bone2 = new THREE.Bone();
    const bone3 = new THREE.Bone();
    bone1.add(bone2); // 设置关节父子关系   多个骨头关节构成一个树结构
    bone2.add(bone3);
    // 设置关节之间的相对位置
    // 根关节Bone1默认位置是(0,0,0)
    bone2.position.y = 60; // Bone2相对父对象Bone1位置
    bone3.position.y = 40; // Bone3相对父对象Bone2位置

    // 所有Bone对象插入到Skeleton中，全部设置为.bones属性的元素
    this.skeleton = new THREE.Skeleton([bone1, bone2, bone3]); // 创建骨骼系统
    // 查看.bones属性中所有骨关节Bone
    console.log(this.skeleton.bones);
    // 返回所有关节的世界坐标
    this.skeleton.bones.forEach(elem => {
      // console.log(elem.getWorldPosition(new THREE.Vector3()));
    });
    // 骨骼关联网格模型
    SkinnedMesh.add(bone1); // 根骨头关节添加到网格模型
    SkinnedMesh.bind(this.skeleton); // 网格模型绑定到骨骼系统
    console.log(SkinnedMesh);
    /**
     * 骨骼辅助显示
     */
    const skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
    this.scene.add(skeletonHelper);
    // 转动关节带动骨骼网格模型出现弯曲效果  好像腿弯曲一样
    this.skeleton.bones[1].rotation.x = 0.5;
    this.skeleton.bones[2].rotation.x = 0.5;
  }

  /**
   * 创建网格模型，并给模型的几何体设置多个变形目标
   */
  drawBox() {
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const vertices = geometry.attributes.position;
    console.log('box', vertices, vertices.array[0]);

    const material = new THREE.MeshLambertMaterial({
      morphTargets: true, // 允许变形
      color: 0x0000ff
    }); // 材质对象
    this.mesh = new THREE.Mesh(geometry, material); // 网格模型对象
    // 设置网格模型的位置，相当于设置音源的位置
    this.mesh.position.set(0, 0, 200);
    this.scene.add(this.mesh); // 网格模型添加到场景中

    // 为geometry提供变形目标的数据
    const box1 = new THREE.BoxGeometry(100, 5, 100); // 为变形目标1提供数据
    const box2 = new THREE.BoxGeometry(5, 200, 5); // 为变形目标2提供数据
    // 设置变形目标的数据
    console.log(box1.attributes.position.array, geometry.morphTargets);
    geometry.morphTargets = [];
    geometry.morphTargets[0] = { name: 'target1', position: box1.attributes.position.array };
    geometry.morphTargets[1] = { name: 'target2', position: box2.attributes.position.array };

    // 启用变形目标并设置变形目标影响权重，范围一般0~1
    // 设置第一组顶点对几何体形状影响的变形系数
    // mesh.morphTargetInfluences[0] = 0.5;
    // 设置第二组顶点对几何体形状影响的变形系数
    // mesh.morphTargetInfluences[1] = 1;

    /**
     * 设置关键帧数据
     */
    // 设置变形目标1对应权重随着时间的变化
    const Track1 = new THREE.KeyframeTrack('.morphTargetInfluences[0]', [0, 10, 20], [0, 1, 0]);
    // 设置变形目标2对应权重随着时间的变化
    const Track2 = new THREE.KeyframeTrack('.morphTargetInfluences[1]', [20, 30, 40], [0, 1, 0]);
    // 创建一个剪辑clip对象，命名"default"，持续时间40
    const clip = new THREE.AnimationClip('default', 40, [Track1, Track2]);

    this.mixer = new THREE.AnimationMixer(this.mesh); // 创建混合器
    const AnimationAction = this.mixer.clipAction(clip); // 返回动画操作对象
    AnimationAction.timeScale = 5; // 默认1，可以调节播放速度
    // AnimationAction.loop = THREE.LoopOnce; // 不循环播放
    // AnimationAction.clampWhenFinished=true; // 暂停在最后一帧播放的状态
    AnimationAction.play(); // 开始播放
  }

  loadRadio() {
    /**
     * 创建多个网格模型组成的组对象
     */
    this.group = new THREE.Group();
    const N = 128; // 控制音频分析器返回频率数据数量
    for (let i = 0; i < N / 2; i++) {
      const box = new THREE.BoxGeometry(2, 100, 2); // 创建一个立方体几何对象
      const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
      }); // 材质对象
      this.mesh1 = new THREE.Mesh(box, material); // 网格模型对象
      // 长方体间隔20，整体居中
      this.mesh1.position.set(20 * i - N / 2 * 10, 0, 0);
      this.group.add(this.mesh1);
    }
    this.scene.add(this.group);

    // 创建一个监听者
    const listener = new THREE.AudioListener();
    // 监听者绑定到相机对象
    this.camera.add(listener);
    // 创建一个位置音频对象,监听者作为参数,音频和监听者关联。
    const posAudio = new THREE.PositionalAudio(listener);
    this.mesh.add(posAudio);
    // 非位置音频可用于不考虑位置的背景音乐
    const audio = new THREE.Audio(listener); // 创建一个非位置音频对象  用来控制播放
    const audioLoader = new THREE.AudioLoader();
    // 加载音频文件，返回一个音频缓冲区对象作为回调函数参数
    audioLoader.load(require('../file/song.mp3'), (audioBuffer) => {
      console.log(audioBuffer);
      // 音频缓冲区对象关联到音频对象audio
      audio.setBuffer(audioBuffer);
      audio.setLoop(true); // 是否循环
      audio.setVolume(0.5); // 音量
      // 播放缓冲区中的音频数据
      audio.play(); // play播放、stop停止、pause暂停
      // 音频分析器和音频绑定，可以实时采集音频时域数据进行快速傅里叶变换
      analyser = new THREE.AudioAnalyser(audio, 2 * N);
    });
    audioLoader.load(require('../file/cat.mp3'), (audioBuffer) => {
      // 音频缓冲区对象关联到音频对象audio
      posAudio.setBuffer(audioBuffer);
      posAudio.setVolume(0.9); // 音量
      posAudio.setRefDistance(200); // 参数值越大,声音越大
      // posAudio.play(); // 播放
    });
  }
}
