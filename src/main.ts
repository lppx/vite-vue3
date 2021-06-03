import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from '@/router';
import { setupAntd } from '@/plugins';
import { setupGlobDirectives } from '@/directives';
import '@/assets/default.less';
import useComponents from '@/components/index';

import { setupStore } from '@/store';
import userModule from '@/store/modules/user';

import '@/icons'; // icon

const app = createApp(App);

/** route */
setupRouter(app);

/** vuex */
setupStore(app);

// init session
userModule.InitToken();

// ant design
setupAntd(app);

// glogDirectives
setupGlobDirectives(app);

// useComponents
app.use(useComponents);

router.isReady().then(() => app.mount('#app'));
