import { createApp } from 'vue'
import App from './App.vue'
import '../index.css';
import router from './router'
import store from './store';
// 載入 font-awesome icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

createApp(App).use(router).use(store).mount('#app')
