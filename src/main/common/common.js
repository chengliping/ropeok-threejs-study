import { createApp } from 'vue';
import '../../public/css/base.less';
import App from '../../App.vue';
import store from '../../store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

export default function (options) {
  const app = createApp(App)
    .use(options.router)
    .use(ElementPlus)
    .use(store);
  app.mount('#app');
}
