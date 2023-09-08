import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/auto'
    },
    {
      title: '创建页面',
      name: 'createPage',
      path: '/createPage',
      component: () => import('@/views/createPage/index')
    },
    {
      title: 'test',
      name: 'test',
      path: '/test',
      component: () => import('@/views/test.vue')
    }
  ],
  // 路由切换, 滚动条重置
  scrollBehavior(router) {
    const { isNotScroll } = router.meta;
    if (isNotScroll === true) {
      return {};
    }
    return {
      top: 0
    };
  }
});

// 处理路由异常
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
export default router;
