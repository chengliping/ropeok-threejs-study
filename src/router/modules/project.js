/**
 * 项目路由
 * @type {[null]}
 */
const projectRoutes = [
  { path: '/index', component: () => import('../../views/index') },
  { path: '/login', name: '登陆', component: () => import('../../views/login/login') },
  { path: '/show-model', name: '登陆', component: () => import('../../views/show-model/index') },
  { path: '/test', name: '三维显示一个立方体', component: () => import('../../views/study-test/test') },
  { path: '/three-course', name: '三维学习案例', component: () => import('../../views/three-course/three-course') },
  { path: '/chart-map', name: 'echart中国地图', component: () => import('../../views/chart/chart-map') }
];
export { projectRoutes };
