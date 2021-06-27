<template>
  <div class="pagination">
    <!-- 左箭头 -->
    <button
      :class="{ disabled: myCurrentPage <= 1 }"
      :disabled="myCurrentPage === 1"
      @click="myCurrentPage--"
    >
      &lt;
    </button>
    <!-- 第一页 -->
    <button :class="{ active: myCurrentPage === 1 }" @click="myCurrentPage = 1">
      1
    </button>
    <!-- 左三点 -->
    <button v-show="startEnd.start > 2">...</button>
    <!-- 中间页 -->
    <button
      v-for="item in startEnd.end - startEnd.start + 1"
      :key="item"
      :class="{ active: myCurrentPage === item - 1 + startEnd.start }"
      @click="myCurrentPage = item - 1 + startEnd.start"
    >
      {{ item - 1 + startEnd.start }}
    </button>

    <!-- 右三点 -->
    <button v-show="startEnd.end < pageTotal - 1">...</button>

    <!-- 最后一页 -->
    <button
      :class="{ active: myCurrentPage === pageTotal }"
      @click="myCurrentPage = pageTotal"
      v-show="pageTotal > 1"
    >
      {{ pageTotal }}
    </button>

    <!-- 右箭头 -->
    <button
      :class="{ disabled: myCurrentPage >= pageTotal }"
      @click="myCurrentPage++"
      :disabled="myCurrentPage === pageTotal"
    >
      &gt;
    </button>

    <!-- 每页条数 -->
    <select v-model="myPageSize">
      <option v-for="size in pageSizes" :key="size" :value="size">
        每页{{ size }}条
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 中划线会自动转换为小驼峰命名法
  props: {
    "current-page": {
      type: Number,
      // default: 1,
    },
    "page-sizes": {
      type: Array,
      default: () => [5, 10, 15, 20],
    },
    "page-size": {
      type: Number,
      default: 5,
    },
    total: {
      type: Number,
      // default: 0,
    },
  },
  data() {
    return {
      // myCurrentPage: this.currentPage,
      // myPageSize: this.pageSize,
    };
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.total / this.myPageSize);
    },
    startEnd() {
      /* 
      1.正常情况 ： 1 ... 3 4 [5] 6 7 ... 10
      [5]是当前页
      start = currentPage -2
      end = start + 4

      2. 特殊情况1： 1 [2] 3 4 5 6 ... 10
      根据之前算法： start：0  , end: 4
        而实际应是： start: 2  , end: 6

        解决： start<2时  start = 2 ,end 根据之前的算法可以得到正确的值

      3.特殊情况2： 1 ... 5 6 7 8 [9] 10
      根据之前算法： start：7  , end: 11
        而实际应是： start: 5  , end: 9

        解决；end > pageTotal-1 时  end = pageTotal-1                                         但是此时的start还是错的还是根据start = currentPage -2 得出的，
        start = end - 4

      4.特殊情况3：页数不足时，这里我们的数字按钮是要显示7个的是写死的，
        1 [2] 3 4 
        1 2 [3] 4 5 
        1 2 [3] 4 5 6 
        1 2 [3] 4 5 6 7 
        解决： pageTotal < 7 时  start = 2    end = pageTotal - 1

      5.特殊情况4：当页数只有一页时，
        [1]   因为有两个按钮写死了， 1 和 最后一个按钮写死，但是只需要一个按钮就行
         pageTotal < 1 时 ， start = 1 , end = 0  ,这里这么写是因为后面按钮遍历的原因
       
      */

      const { myCurrentPage, pageTotal } = this;
      // 特殊情况4
      if (pageTotal <= 1) {
        // start = 1;
        // end = 0;
        return {
          start: 1,
          end: 0,
        };
      }

      // 特殊情况3
      if (pageTotal <= 7) {
        // start = 2;
        // end = pageTotal - 1;
        return {
          start: 2,
          end: pageTotal - 1,
        };
      }

      let start = myCurrentPage - 2;

      // 特殊情况1
      if (start < 2) {
        start = 2;
      }

      let end = start + 4;

      // 特殊情况2
      if (end > pageTotal - 1) {
        end = pageTotal - 1;
        start = end - 4;
      }

      return {
        start,
        end,
      };
    },
    myCurrentPage: {
      get() {
        return this.currentPage;
      },
      set(val) {
        this.$emit("changeCurrentPage", val);
      },
    },
    myPageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("changePageSize", val);
      },
    },
  },
  watch: {
    myCurrentPage(currentPage) {
      // console.log(currentPage);
      this.$emit("current-change", currentPage);
    },
    myPageSize(pageSize) {
      this.$emit("size-change", pageSize);
    },
  },
};
</script>
<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  button {
    margin: 0 5px;
    min-width: 30px;
    height: 28px;
    border-radius: 2px;
    font-size: 13px;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #f4f4f5;
    &.active {
      background-color: #409eff;
      color: #fff;
    }
  }

  .disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>