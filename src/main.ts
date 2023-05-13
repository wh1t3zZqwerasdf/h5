import {createApp} from 'vue';
import './styles/index.css';
import App from './App.vue';
import 'element-plus/theme-chalk/index.css';
import ElementPlus from 'element-plus';
import router from './router';
import Vant, {Dialog, Toast} from 'vant';
import vConsole from "@/vconsole";
import 'qweather-icons/font/qweather-icons.css';
/* pinia */
import pinia from '@/store';
import 'vant/lib/index.css';
import 'virtual:windi.css';


const app = createApp(App);

app.use(ElementPlus)
    .use(router)
    .use(vConsole as any)
    .use(Vant)
    .use(pinia)
    .use(Toast)
    .use(Dialog)
    .mount('#app');

app.directive('debounce', {
    beforeMount(el: any, binding: any) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 3 * 1000);
            }
        });
    }
});
