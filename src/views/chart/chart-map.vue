<template>
  <div
    id="main"
    class="echart">
  </div>
</template>

<script>
import echarts from 'echarts';

// 下边这两行尤为重要，数据才能正常渲染
import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china);
export default {
  name: 'ChartMap',
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    // this.myEcharts();
    this.initMap();
  },
  methods: {
    myEcharts() {
      this.chart = echarts.init(document.getElementById('main'));

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['已出租', '未出租', '已预约']
        },
        series: [
          {
            name: '车辆出租状态',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: [
              { value: 40, name: '已出租' },
              { value: 30, name: '未出租' },
              { value: 30, name: '已预约' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    initMap() {
      this.chart = echarts.init(document.getElementById('main'));
      // const num = Math.random();
      const data = [
        { name: '北京', selected: false, value: 1 },
        { name: '天津', selected: false, value: 2 },
        { name: '上海', selected: false, value: 3 },
        { name: '重庆', selected: false, value: 4 },
        { name: '河北', selected: false, value: 5 },
        { name: '河南', selected: false, value: 6 },
        { name: '云南', selected: false, value: 7 },
        { name: '辽宁', selected: false, value: 8 },
        { name: '黑龙江', selected: false, value: 9 },
        { name: '湖南', selected: false, value: 10 },
        { name: '安徽', selected: false, value: 11 },
        { name: '山东', selected: false, value: 12 },
        { name: '新疆', selected: false, value: 13 },
        { name: '江苏', selected: false, value: 14 },
        { name: '浙江', selected: false, value: 15 },
        { name: '江西', selected: false, value: 16 },
        { name: '湖北', selected: false, value: 17 },
        { name: '广西', selected: false, value: 18 },
        { name: '甘肃', selected: false, value: 19 },
        { name: '山西', selected: false, value: 20 },
        { name: '内蒙古', selected: false, value: 21 },
        { name: '陕西', selected: false, value: 22 },
        { name: '吉林', selected: false, value: 23 },
        { name: '福建', selected: false, value: 24 },
        { name: '贵州', selected: false, value: 25 },
        { name: '广东', selected: false, value: 26 },
        { name: '青海', selected: false, value: 27 },
        { name: '西藏', selected: false, value: 28 },
        { name: '四川', selected: false, value: 29 },
        { name: '宁夏', selected: false, value: 30 },
        { name: '海南', selected: false, value: 31 },
        { name: '台湾', selected: false, value: 32 },
        { name: '香港', selected: false, value: 33 },
        { name: '澳门', selected: false, value: 34 }
      ];
      const dataColor = {
        x: '-1000 px', // 图例横轴位置
        y: '-1000 px', // 图例纵轴位置
        splitList: [
          { start: 1, end: 1, label: '北京', color: '#dddddd' },
          { start: 2, end: 2, label: '天津', color: '#dddddd' },
          { start: 3, end: 3, label: '上海', color: '#dddddd' },
          { start: 4, end: 4, label: '重庆', color: '#dddddd' },
          { start: 5, end: 5, label: '河北', color: '#b3e2f8' },
          { start: 6, end: 6, label: '河南', color: '#dddddd' },
          { start: 7, end: 7, label: '云南', color: '#dddddd' },
          { start: 8, end: 8, label: '辽宁', color: '#dddddd' },
          { start: 9, end: 9, label: '黑龙江', color: '#dddddd' },
          { start: 10, end: 10, label: '湖南', color: '#dddddd' },
          { start: 11, end: 11, label: '安徽', color: '#dddddd' },
          { start: 12, end: 12, label: '山东', color: '#69b2ed' },
          { start: 13, end: 13, label: '新疆', color: '#dddddd' },
          { start: 14, end: 14, label: '江苏', color: '#0d77df' },
          { start: 15, end: 15, label: '浙江', color: '#69b2ed' },
          { start: 16, end: 16, label: '江西', color: '#dddddd' },
          { start: 17, end: 17, label: '湖北', color: '#dddddd' },
          { start: 18, end: 18, label: '广西', color: '#dddddd' },
          { start: 19, end: 19, label: '甘肃', color: '#dddddd' },
          { start: 20, end: 20, label: '山西', color: '#dddddd' },
          { start: 21, end: 21, label: '内蒙古', color: '#dddddd' },
          { start: 22, end: 22, label: '陕西', color: '#dddddd' },
          { start: 23, end: 23, label: '吉林', color: '#dddddd' },
          { start: 24, end: 24, label: '福建', color: '#b3e2f8' },
          { start: 25, end: 25, label: '贵州', color: '#dddddd' },
          { start: 26, end: 26, label: '广东', color: '#b3e2f8' },
          { start: 27, end: 27, label: '青海', color: '#dddddd' },
          { start: 28, end: 28, label: '西藏', color: '#dddddd' },
          { start: 29, end: 29, label: '四川', color: '#dddddd' },
          { start: 30, end: 30, label: '宁夏', color: '#dddddd' },
          { start: 31, end: 31, label: '海南', color: '#dddddd' },
          { start: 32, end: 32, label: '台湾', color: '#dddddd' },
          { start: 33, end: 33, label: '香港', color: '#dddddd' },
          { start: 34, end: 34, label: '澳门', color: '#dddddd' }
        ]
        /*
        splitList: [
          { start: 1, end: 1, label: '北京', color: '#cfc5de' },
          { start: 2, end: 2, label: '天津', color: '#f1ebd1' },
          { start: 3, end: 3, label: '上海', color: '#feffdb' },
          { start: 4, end: 4, label: '重庆', color: '#e0cee4' },
          { start: 5, end: 5, label: '河北', color: '#fde8cd' },
          { start: 6, end: 6, label: '河南', color: '#e4f1d7' },
          { start: 7, end: 7, label: '云南', color: '#fffed7' },
          { start: 8, end: 8, label: '辽宁', color: '#e4f1d7' },
          { start: 9, end: 9, label: '黑龙江', color: '#e4f1d7' },
          { start: 10, end: 10, label: '湖南', color: '#fffed7' },
          { start: 11, end: 11, label: '安徽', color: '#fffed8' },
          { start: 12, end: 12, label: '山东', color: '#dccee7' },
          { start: 13, end: 13, label: '新疆', color: '#fffed7' },
          { start: 14, end: 14, label: '江苏', color: '#fce8cd' },
          { start: 15, end: 15, label: '浙江', color: '#ddceeb' },
          { start: 16, end: 16, label: '江西', color: '#e4f1d3' },
          { start: 17, end: 17, label: '湖北', color: '#fde8cd' },
          { start: 18, end: 18, label: '广西', color: '#fde8cd' },
          { start: 19, end: 19, label: '甘肃', color: '#fde8cd' },
          { start: 20, end: 20, label: '山西', color: '#fffdd6' },
          { start: 21, end: 21, label: '内蒙古', color: '#ddcfe6' },
          { start: 22, end: 22, label: '陕西', color: '#fad8e9' },
          { start: 23, end: 23, label: '吉林', color: '#fce8cd' },
          { start: 24, end: 24, label: '福建', color: '#fad8e8' },
          { start: 25, end: 25, label: '贵州', color: '#fad8e8' },
          { start: 26, end: 26, label: '广东', color: '#ddcfe8' },
          { start: 27, end: 27, label: '青海', color: '#fad8e9' },
          { start: 28, end: 28, label: '西藏', color: '#ddcfe6' },
          { start: 29, end: 29, label: '四川', color: '#e4f1d5' },
          { start: 30, end: 30, label: '宁夏', color: '#fefcd5' },
          { start: 31, end: 31, label: '海南', color: '#fad8e9' },
          { start: 32, end: 32, label: '台湾', color: '#fce8cd' },
          { start: 33, end: 33, label: '香港', color: '#dc9bbb' },
          { start: 34, end: 34, label: '澳门', color: '#e0f7cc' }
        ]
         */
      };
      // 从数组中获取最大值和最小值
      /*
      const dataValue = [];
      data.forEach(e => {
        dataValue.push(e.value);
      });
      const max = Math.max.apply(null, dataValue); // 数据最大值
      const min = Math.min.apply(null, dataValue); // 数据最小值
      const minMax = max - min; // 极差
      const R = 178; // 色值差
      const G = 98;
      const B = 12;
      const RMin = 18;
      const GMin = 139;
      const BMin = 237;
      dataColor.splitList.forEach(e => {
        const RED = (R / minMax * e.start) + RMin;
        const GREEN = (G / minMax * e.start) + GMin;
        const BLUE = (B / minMax * e.start) + BMin;
        e.color = 'rgb(' + RED + ',' + GREEN + ',' + BLUE + ')';
      });
      */

      // 指定相关的配置项和数据
      const mapBoxOption = {
        series: [{
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true, // 显示省份标签
              textStyle: {
                color: '#333'
              } // 省份标签字体颜色
            }
          },
          aspectScale: 0.75,
          zoom: 1.2,
          itemStyle: {
            normal: {
              borderWidth: 0.5, // 区域边框宽度
              borderColor: '#009fe8', // 区域边框颜色
              areaColor: '#ffefd5', // 区域颜色
            }
          },
          data: data // 各省地图颜色数据依赖value
        }],
        dataRange: dataColor, // 各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；
      };
      // 使用制定的配置项和数据显示图表
      this.chart.setOption(mapBoxOption);
    }
  }
};
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
