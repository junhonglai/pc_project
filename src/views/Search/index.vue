<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 搜索的关键字 -->
            <li class="with-x" v-show="$route.params.keyword">
              {{ $route.params.keyword }}
              <i @click="delKeyword">×</i>
            </li>
            <!-- 搜索栏的类目 -->
            <li class="with-x" v-show="$route.query.categoryName">
              {{ $route.query.categoryName }}
              <i @click="delCategoryName">×</i>
            </li>
            <!-- 搜索的品牌显示 -->
            <li class="with-x" v-show="options.trademark">
              {{ options.trademark.split(":")[1]
              }}<i @click="delTrademark">×</i>
            </li>
            <!-- 搜索的商品属性显示 -->
            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="index"
              v-show="prop"
            >
              {{ `${prop.split(":")[2]}:${prop.split(":")[1]}`
              }}<i @click="delProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @search="search" :options="options" />

        <!--details-->
        <div class="details clearfix">
          <!-- 搜索条件展示 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: order.orderName === '1' }"
                  @click="setOrder('1')"
                >
                  <a
                    >综合
                    <span
                      v-show="order.orderName === '1'"
                      :class="[
                        'iconfont',
                        order.orderType === 'asc'
                          ? 'icon-direction-up'
                          : 'icon-direction-down',
                      ]"
                    ></span>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{ active: order.orderName === '2' }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格
                    <span
                      v-show="order.orderName === '2'"
                      :class="[
                        'iconfont',
                        order.orderType === 'asc'
                          ? 'icon-direction-up'
                          : 'icon-direction-down',
                      ]"
                    ></span
                  ></a>
                </li>
                <!-- <li>
                  <a href="#">价格 <span class="iconfont icon-direction-up"/> </a>
                </li> -->
              </ul>
            </div>
          </div>

          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="good in goodsList"
                :key="good.id"
                @click="toDetail(good.id)"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a><img v-lazy="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- <Pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"
          /> -->
          <Pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="options.pageNo"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="options.pageSize"
            :total="total"
            @changeCurrentPage="changePage"
            @changePageSize="changeSize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "../../components/Pagination";
import { mapState, mapActions } from "vuex";
// import { reqGoodsList } from "../../api/search";
import TypeNav from "../../components/TypeNav";

export default {
  name: "Search",
  components: {
    SearchSelector,
    TypeNav,
    Pagination,
  },
  data() {
    return {
      options: {
        // category3Id: "",
        // categoryName: "",
        // keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  // 将vuex中管理的数据代理到this中
  computed: {
    ...mapState("search", ["goodsList", "total"]),
    order() {
      const [orderName, orderType] = this.options.order.split(":");
      return {
        orderType,
        orderName,
      };
    },
  },
  // 将vuex间接修改数据的方法代理到this中
  methods: {
    ...mapActions("search", ["searchGoodsList"]),
    // 自定义事件获取searchSelector子组件传递过来的数据，将自定义事件给子组件时不用携带参数，但是子组件传递过来的参数我们再父组件定义自定义事件时需要参数接收
    search(newoptions = {}) {
      // console.log(newoptions);
      // this.searchGoodsList(newoptions);
      // 旧值，新值覆盖旧值
      const options = {
        ...this.options,
        ...newoptions,
      };

      // 搜索条件里需要的是props而不是prop，因此当prop有值时我们将其添加到props中，再把prop删除，因为搜索条件没有prop，会出问题
      if (newoptions.prop) {
        options.props.push(newoptions.prop);
        delete options.prop;
      }

      // 重新赋值
      this.options = options;

      // 发送请求
      this.searchGoodsList({
        ...options,
        ...this.$route.params,
        ...this.$route.query,
      });
    },

    // 设置排序
    setOrder(orderName) {
      // 如果点击的是同一个按钮，则改变排序方式orderType
      if (this.order.orderName === orderName) {
        this.options.order = `${orderName}:${
          this.order.orderType === "asc" ? "desc" : "asc"
        }`;
      } else {
        // 默认是降序
        this.options.order = `${orderName}:desc`;
      }
      this.search();
    },
    // 删除搜索关键字
    delKeyword() {
      // console.log(111);
      this.$router.history.push({
        name: "Search",
        query: this.$route.query,
        // 因为搜索关键字是可选的params参数，因此不传params参数就能删除，因为此时params为空
      });
    },
    // 删除搜索类目
    delCategoryName() {
      this.$router.history.push({
        name: "Search",
        params: this.$route.params,
        // 因为搜索关类目是query参数，因此不传query参数就能删除，因为此时query为空
      });
    },
    // 输出搜索品牌
    delTrademark() {
      this.options.trademark = "";
      this.search();
    },
    // 删除搜索属性
    delProp(index) {
      // 因为搜索属性可有展示多个，要知道删除的属性是哪个就得在@click是传递当前属性的index
      this.options.props.splice(index, 1);
      this.search();
    },
    // 每页条数改变
    handleSizeChange(pageNo, pageSize) {
      // console.log(pageNo);
      this.search({
        pageNo,
        pageSize,
      });
    },
    // 改变页码
    handleCurrentChange(pageNo) {
      this.search({
        pageNo,
      });
    },
    // 子组件将新的currenPage传过来通知父组件更新
    changePage(currentPage) {
      this.options.pageNo = currentPage;
    },
    // 子组件将新的currenPage传过来通知父组件更新
    changeSize(pageSize) {
      this.options.pageSize = pageSize;
    },
    // 点击商品跳转至商品详情
    toDetail(id) {
      this.$router.history.push({
        name: "Detail",
        params: {
          id,
        },
      });
    },
  },
  mounted() {
    this.search();
    // console.log(this.goodsList);
  },
  watch: {
    // 监视$route,因为搜索框内容变化，路径里面的query就会变化，因此路径变化，只要路径变化，就需要重新发送请求
    $route() {
      this.search();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>