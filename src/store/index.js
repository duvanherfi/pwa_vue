import { createStore } from "vuex";

export default createStore({
  state: {
    sessionToken: sessionStorage.getItem("sessionToken") || null,
  },
  getters: {
    sessionToken: (state) => {
      return state.sessionToken;
    },
  },
  mutations: {
    setSessionToken: (state, sessionToken) => {
      state.sessionToken = sessionToken;
      sessionStorage.setItem("sessionToken", sessionToken);
    },
  },
  actions: {},
  modules: {},
});
