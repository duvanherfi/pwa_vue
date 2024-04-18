import { createStore } from "vuex";

export default createStore({
  state: {
    sessionToken: sessionStorage.getItem("sessionToken") || null,
    positionId: sessionStorage.getItem("positionId") || null,
    name: sessionStorage.getItem("name") || null,
    darkMode: JSON.parse(sessionStorage.getItem("darkMode")) || false,
  },
  getters: {
    darkMode: (state) => {
      return JSON.parse(state.darkMode);
    },
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
    setDarkMode: (state, darkMode) => {
      state.darkMode = darkMode;
      sessionStorage.setItem("darkMode", darkMode);
    },
    setUserData: (state, userData) => {
      state.sessionToken = userData.session_token;
      sessionStorage.setItem("sessionToken", userData.session_token);

      state.positionId = userData.position._id;
      sessionStorage.setItem("positionId", userData.position._id);

      state.name = userData.name;
      sessionStorage.setItem("name", userData.name);
    },
    cleanUserData: (state) => {
      state.sessionToken = null;
      sessionStorage.removeItem("sessionToken");

      state.positionId = null;
      sessionStorage.removeItem("positionId");

      state.name = null;
      sessionStorage.removeItem("name");
    },
  },
  actions: {},
  modules: {},
});
