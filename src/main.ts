import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

export default new Vuetify({
  icons: {
    iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    dark: false,
  },
  themes: {
    light: {
      primary: '#4682b4',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c',
    },
  },
});

// export default new Vuetify({ });

Vue.use(Vuetify);

Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     next('/sign-in');
//   } else {
//     next();
//   }
// });
new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
