/**
 * 测试路由
 * @type {[null]}
 */
const testRoutes = [
  {
    path: '/axios-test',
    component: () => import('../../views/test/axios.vue')
  },
  {
    path: '/vue-test',
    component: () => import('../../views/test/vue-test.vue')
  },
];
export { testRoutes };
