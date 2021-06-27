<template>
  <div class="outer">
    <div class="type-nav">
      <div class="container" @mouseleave="isShow = false">
        <h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <div class="sort" v-show="$route.path === '/' || isShow">
          <div class="all-sort-list2">
            <div
              class="item bo"
              v-for="category1 in categoryLists"
              :key="category1.categoryId"
              @click="toSearch"
            >
              <!-- 一级类目 -->
              <h3>
                <a
                  :data-categoryname="category1.categoryName"
                  :data-categoryid="category1.categoryId"
                  :data-level="1"
                  >{{ category1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="category2 in category1.categoryChild"
                    :key="category2.categoryId"
                  >
                    <!-- 二级类目 -->
                    <dt>
                      <a
                        :data-categoryname="category2.categoryName"
                        :data-categoryid="category2.categoryId"
                        :data-level="2"
                        >{{ category2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级类目 -->
                      <em
                        v-for="category3 in category2.categoryChild"
                        :key="category3.categoryId"
                      >
                        <a
                          :data-categoryname="category3.categoryName"
                          :data-categoryid="category3.categoryId"
                          :data-level="3"
                          >{{ category3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetCategoryType } from "../../api/requests";

export default {
  name: "TyepNav",
  data() {
    return {
      categoryLists: [],
      isShow: false,
    };
  },
  async mounted() {
    await reqGetCategoryType()
      .then((re) => {
        // console.log(re);
        this.categoryLists = re;
        // console.log(this.categoryLists);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    toSearch(e) {
      // console.log(e.target.dataset);
      // 解构自定义属性
      const { categoryname, categoryid, level } = e.target.dataset;
      const {keyword} = this.$route.params
      // 如果有自定义属性中的某一个属性，说明点击的就是a标签
      if (e.target.dataset.level) {
        this.$router.history.push({
          // 命名路由
          name: "Search",
          query: {
            categoryName: categoryname,
            [`category${level}Id`]: categoryid,
          },
          params:{
            keyword,
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  /* padding: 0 20px; */
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  display: block;
  padding: 0 20px;
  color: #333;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl.fore {
  border-top: 0;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd
  em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
.item:hover {
  background-color: #f3a79d;
}
</style>