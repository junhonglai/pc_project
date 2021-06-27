import { reqGoodsList } from "../../api/search";

// 管理的数据
const state = {
  trademarkList: [],
  attrsList: [],
  goodsList: [],
  total: 0,
};

//  只读的计算属性
const getters = {};

// 间接操作数据的方法
const actions = {
  async searchGoodsList({ commit }, options) {
    const res = await reqGoodsList(options);
    commit("SEARCH_GOODS_LIST", res);
  },
};

// 直接操作数据的方法
const mutations = {
  SEARCH_GOODS_LIST(state, res) {
    state.trademarkList = res.trademarkList;
    state.attrsList = res.attrsList;
    state.goodsList = res.goodsList;
    state.total = res.total;
    console.log(state, res);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
