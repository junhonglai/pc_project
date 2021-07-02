<template>
  <div>
    <div class="header">
      <div class="header-top">
        <div class="header-user">
          <p v-if="nickName">
            尚品汇欢迎您！{{ nickName }}
            <button @click="userLogout">退出登录</button>
          </p>
          <p v-else>
            尚品汇欢迎您！请
            <router-link to="/login" class="header-login">登录</router-link>
            <router-link to="/register">免费注册</router-link>
          </p>
        </div>
        <ul class="header-nav">
          <li><router-link to="/center">我的订单</router-link></li>
          <li><router-link to="/shopcart">我的购物车</router-link></li>
          <li><router-link to="/">我的尚品汇</router-link></li>
          <li><router-link to="/">尚品汇会员</router-link></li>
          <li><router-link to="/">企业采购</router-link></li>
          <li><router-link to="/">关注尚品汇</router-link></li>
          <li><router-link to="/">合作招商</router-link></li>
          <li><router-link to="/">商家后台</router-link></li>
        </ul>
      </div>
      <div class="header-bottom">
        <router-link to="/" class="header-logo">
          <img src="./logo.png" alt="logo" />
        </router-link>
        <form class="header-search" @submit.prevent="searchSubmit">
          <input type="text" class="search-inp" v-model="keyword" />
          <button class="search-btn">搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    ...mapActions("users", ["logout"]),
    searchSubmit() {
      const keyword = this.keyword.trim();
      // 问题：如果输入框内容为空，点击搜索路径错误，应该是http://localhost:8080/search，但是却是http://localhost:8080，这是由于这个时候携带的params参数为空keyword:""，而跳转至search的路由路径为/search/:keyword?，没有与之对应的路径/search/，
      let options = {
        name: "Search",
        query: this.$route.query,
      };
      // 判断params参数是否为空，若为空开不携带params参数
      if (keyword) {
        options.params = {
          keyword,
        };
      }
      this.$router.history.push(options);
    },
    // 退出登录
    async userLogout() {
      await this.logout();
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      console.log(this.nickName);
    },
  },
  computed: {
    ...mapState("users", ["nickName"]),
  },
};
</script>
<style lang="less">
.header-top {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #eaeaea;
}

.header-user .header-login {
  border-right: 1px solid #333;
  padding-right: 5px;
  margin-right: 5px;
}

// 头部导航条是
.header-nav {
  display: flex;
  li {
    border-right: 1px solid #333;
    padding-right: 10px;
    margin-right: 10px;
    &:last-child {
      border: none;
      padding-right: 0;
      margin-right: 0;
    }
  }
}

// logo图片
.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.header-logo {
  display: block;
  height: 65px;
  img {
    height: 100%;
  }
}

.header-search {
  display: flex;
}
//  输入框
.search-inp {
  display: block;
  padding: 4px 5px;
  width: 460px;
  height: 22px;
  outline: none;
  font-size: 14px;
  border: 1px solid #ea4a36;
}

// 搜索按钮
.search-btn {
  display: block;
  width: 80px;
  height: 32px;
  border: none;
  color: #fff;
  background-color: #ea4a36;
}
</style>