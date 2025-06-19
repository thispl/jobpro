import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui';
import './index.css';

let app = createApp(App);

setConfig('resourceFetcher', frappeRequest);
app.use(resourcesPlugin);
app.use(router);
app.component('Button', Button);
app.mount('#app');
