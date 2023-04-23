import {createApp} from 'vue';
import './styles/index.css';
import App from './App.vue';
import 'element-plus/theme-chalk/index.css';
import ElementPlus from 'element-plus';
import router from './router';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vant, {Dialog, Toast} from 'vant';
import 'vant/lib/index.css';

createApp(App)
    .use(ElementPlus)
    .use(router)
    // .use(vConsole as any)
    .use(createPinia().use(piniaPluginPersistedstate))
    .use(Vant)
    .use(Toast)
    .use(Dialog)
    .mount('#app');
