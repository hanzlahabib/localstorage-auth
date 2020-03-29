/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { userService } from '../services';
import router from '../router';

const mockedUsers = [
  {
    id: '1',
    fName: 'hanzla',
    lName: 'habib',
    email: 'admin@hanzla.com',
    username: 'hanzla',
    password: '123456',
  },
];
const state = {
  all: {},
  mockedUsers,
};

const actions = {
  getAll({ commit }) {
    commit('getAllRequest');

    userService.getAll()
      .then(
        (users) => commit('getAllSuccess', users),
        (error) => commit('getAllFailure', error),
      );
  },

  delete({ commit }, id) {
    commit('deleteRequest', id);

    userService.delete(id)
      .then(
        (user) => commit('deleteSuccess', id),
        (error) => commit('deleteFailure', { id, error: error.toString() }),
      );
  },
  login(context, payload) {
    userService.login(payload.email, payload.password)
      .then((e) => router.push('/'))
      .catch((err) => console.log(err));
  },
  logout(context, payload) {
    userService.logout();
    router.push('/sign-in');
  },
};

const mutations = {
  getAllRequest(state) {
    state.all = { loading: true };
  },
  getAllSuccess(state, users) {
    state.all = { items: users };
  },
  getAllFailure(state, error) {
    state.all = { error };
  },
  deleteRequest(state, id) {
    // add 'deleting:true' property to user being deleted
    state.all.items = state.all.items.map((user) => (user.id === id
      ? { ...user, deleting: true }
      : user));
  },
  deleteSuccess(state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter((user) => user.id !== id);
  },
  deleteFailure(state, { id, error }) {
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map((user) => {
      if (user.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...userCopy } = user;
        // return copy of user with 'deleteError:[error]' property
        return { ...userCopy, deleteError: error };
      }

      return user;
    });
  },
};

export const users = {
  namespaced: true,
  state,
  actions,
  mutations,
};
