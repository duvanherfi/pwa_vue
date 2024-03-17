import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    currentUser: (state) => {
      return state.user;
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
