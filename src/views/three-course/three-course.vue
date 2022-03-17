<template>
  <div class="three-course-page">
    <div class="header">
      <b> three.js 教程 </b>
      &nbsp;&nbsp;http://www.webgl3d.cn/Three.js/
    </div>
    <div class="content">
      <div class="block">
        <h5>01基础认识</h5>
        <div class="block-content" id="hello-block"></div>
        <p>
          总结： 场景scene + 对象 + 相机 + 渲染器renderer  + 动画
          <br/>
          对象 = 几何体对象geometry + 材质material + 模型mesh/line/point + 光照渲染
        </p>
      </div>
      <div class="block">
        <h5>02顶点概念</h5>
        <div class="block-content" id="hello-concept"></div>
        <p>
          总结：立方体几何体BoxGeometry本质上就是一系列的顶点构成。
          <br/>
          通过点构成三角形，三角形数量越多，球体网格模型表面越接近于球形。
        </p>
      </div>
      <div class="block">
        <h5>03材质、04模型、05光源</h5>
        <div class="block-content" id="hello-materail"></div>
        <p>
          总结：材质对象 Material
          <br/>
          （场景scene.add(new 材质Line/Point/Mesh(几何对象geometry, 材质material))）
        </p>
      </div>
      <div class="block">
        <h5>05光源-阴影</h5>
        <div class="block-content" id="hello-light"></div>
        <p>
          总结：光照效果 PointLight/AmbientLight/DirectionalLight/SpotLight
        </p>
      </div>
      <div class="block">
        <h5>06 Group</h5>
        <div class="block-content" id="hello-group"></div>
        <p>
          总结：组对象Group可以组织各个模型，构成一个层级结构。
        </p>
      </div>
      <div class="block">
        <h5>07 曲线、管道</h5>
        <div class="block-content" id="hello-curve"></div>
        <p>
          总结：曲线和几何体同样本质上都是用来生成顶点的算法，曲线主要是按照一定的规则生成一系列沿着某条轨迹线分布的顶点。
        </p>
      </div>
      <div class="block">
        <h5>08 贴图-1</h5>
        <div class="block-content" id="hello-chartlet"></div>
        <p>
          总结：TextureLoader
        </p>
      </div>
      <div class="block">
        <h5>08 贴图-2,09-相机对象</h5>
        <div class="block-content" id="hello-chartlet2"></div>
        <p>
          总结： 正投影相机 OrthographicCamera  + 透视投影相机 PerspectiveCamera
        </p>
      </div>
      <div class="block">
        <h5>10-精灵模型、粒子系统</h5>
        <div class="block-content" id="hello-sprite"></div>
        <p>
          总结： THREE.Sprite（THREE.SpriteMaterial({map: THREE.TextureLoader（）.load(url)})）
        </p>
      </div>
      <div class="block">
        <h5>11-帧动画</h5>
        <div class="block-content" id="hello-frame"></div>
        <p>
          总结：THREE.AnimationMixer(THREE.AnimationClip（THREE.KeyframeTrack）).clipAction
        </p>
      </div>
      <div class="block">
        <h5>12-骨骼动画，13-语音模块</h5>
        <div class="block-content" id="hello-bone"></div>
        <p>
          总结：（Bone + Skeleton） + （ SkinnedMesh + geometry）
          <br/>
          Audio + PositionalAudio  + AudioAnalyser
        </p>
      </div>
      <div class="block">
        <h5>14-模型文件</h5>
        <div class="block-content" id="hello-file"></div>
        <p>
          总结：FileLoader
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { HelloWorld } from '@/components/three/three-course/hello-world';
import { HelloConcept } from '@/components/three/three-course/hello-concept';
import { HelloMaterial } from '@/components/three/three-course/hello-material';
import { HelloLight } from '@/components/three/three-course/hello-light';
import { HelloGroup } from '@/components/three/three-course/hello-group';
import { HelloCurve } from '@/components/three/three-course/hello-curve';
import { HelloChartlet } from '@/components/three/three-course/hello-chartlet';
import { HelloChartlet2 } from '@/components/three/three-course/hello-chartlet2';
import { ThreeSprite } from '@/components/three/three-course/hello-sprite';
import { ThreeFrame } from '@/components/three/three-course/hello-frame';
import { ThreeBone } from '@/components/three/three-course/hello-bone';
import { ThreeFile } from '@/components/three/three-course/hello-file';
export default {
  name: 'ThreeCourse',
  mounted() {
    this.example = new HelloWorld({
      target: 'hello-block'
    });
    this.example = new HelloConcept({
      target: 'hello-concept'
    });
    this.example = new HelloMaterial({
      target: 'hello-materail'
    });
    this.example = new HelloLight({
      target: 'hello-light'
    });
    this.example = new HelloGroup({
      target: 'hello-group'
    });
    this.example = new HelloCurve({
      target: 'hello-curve'
    });
    this.example = new HelloChartlet({
      target: 'hello-chartlet'
    });
    this.example = new HelloChartlet2({
      target: 'hello-chartlet2'
    });
    this.example = new ThreeSprite({
      target: 'hello-sprite'
    });
    this.example = new ThreeFrame({
      target: 'hello-frame'
    });
    this.example = new ThreeBone({
      target: 'hello-bone'
    });
    this.example = new ThreeFile({
      target: 'hello-file'
    });
  }
};
</script>

<style scoped lang="less">
  @import './index.less';
</style>
