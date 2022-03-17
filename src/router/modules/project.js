/**
 * 项目路由
 * @type {[null]}
 */
const projectRoutes = [
  { path: '/index', component: () => import('../../views/index') },
  { path: '/test', component: () => import('../../views/study-test/test') },
  { path: '/three-course', component: () => import('../../views/three-course/three-course') },
  { path: '/chart-map', component: () => import('../../views/chart/chart-map') }
];
export { projectRoutes };
