import { createStore } from "vuex";

export default createStore({
  state: {
    sessionToken: sessionStorage.getItem("sessionToken") || null,
    positionId: sessionStorage.getItem("positionId") || null,
    name: sessionStorage.getItem("name") || null,
  },
  getters: {
    sessionToken: (state) => {
      return state.sessionToken;
    },
    positionId: (state) => {
      return state.positionId;
    },
    name: (state) => {
      return state.name;
    },
  },
  mutations: {
    setUserData: (state, userData) => {
      state.sessionToken = userData.session_token;
      sessionStorage.setItem("sessionToken", userData.session_token);

      state.positionId = userData.position._id;
      sessionStorage.setItem("positionId", userData.position._id);

      state.name = userData.name;
      sessionStorage.setItem("name", userData.name);
    },
  },
  actions: {},
  modules: {},
});
