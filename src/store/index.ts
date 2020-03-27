import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert';
import { account } from './account';
import { users } from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    account,
    users,
  },
});
