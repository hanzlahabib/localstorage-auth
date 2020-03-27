import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignIn,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/sign-in', '/sign-up'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');


  if (authRequired && !loggedIn) {
    return next('/login');
  }


  return next();
});


export default router;
