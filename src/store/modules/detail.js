import { reqGoodsDetail } from "../../api/detail";

const state = {
  goods: {
    categoryView: {},
    spuSaleAttrList: [],
    skuInfo: {
      skuImageList: [],
    },
  },
};

const getters = {};

const actions = {
  async getGoodsDetail({ commit }, id) {
    try {
      const goods = await reqGoodsDetail(id);
      commit("GET_GOODS_DETAIL", goods);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  GET_GOODS_DETAIL(state, goods) {
    // state.categoryView = goods.categoryView;
    // state.spuSaleAttrList = goods.spuSaleAttrList;
    // state.skuInfo.skuImageList = goods.skuInfo.skuImageList;
    state.goods = goods
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
