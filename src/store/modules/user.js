import { reqLogin } from "../../api/user";
import { reqLogout } from "../../api/user";

// 优先从localStorage中获取，没有就从sessionStorage
const state = JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user")) || {
    name: "",
    nickName: "",
    token: "",
  };

const getters = {};

const actions = {
  async login({ commit }, { phone, password }) {
    try {
      const res = await reqLogin({ phone, password });
      commit("LOGIN", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async logout({ commit }) {
    try {
      await reqLogout();
      commit("LOGOUT");
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  LOGIN(state, res) {
    state.name = res.name;
    state.nickName = res.nickName;
    state.token = res.token;
  },
  LOGOUT(state) {
    state.name = "";
    state.nickName = "";
    state.token = "";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
