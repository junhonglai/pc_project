<template>
  <div class="home">
    <TyepNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import TyepNav from "../../components/TypeNav";
import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContainer from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import { reqGetFloors } from "../../api/requestsMock";
export default {
  name: "Home",
  components: {
    TyepNav,
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  data() {
    return {
      floors: [],
    };
  },
  async mounted() {
    await reqGetFloors()
      .then((re) => {
        this.floors = re;
        // console.log(this.floors);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<style>
</style>

