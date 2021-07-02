<template>
  <div>
    <div
      class="swiper-container"
      id="mySwiper"
      ref="swiper"
      @mouseenter="swiper.autoplay.stop()"
      @mouseleave="swiper.autoplay.start()"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(banner, index) in banners"
          :key="banner.id"
        >
          <img
            v-if="index === 0 || index === banners.length - 1"
            :src="banner.imgUrl"
            :alt="banner.id"
          />
          <img v-else v-lazy="banner.imgUrl" :alt="banner.id" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "Carousel",
  props: {
    banners: Array,
  },
  // 由于这里是写死的图片，所以可以在mounted中设置，但是在开发中我们一般都是请求图片的，通过props传递给这个组件，一开始是空数组，要让其有了数据再开始进行轮播，但是请求是异步的，new Swiper是同步的，这个时候是拿不到数据的，因此使用监视属性，当请求成功后数据就有了，就会触发监视属性，但是跟新DOM又是异步的，new 的轮播图是同步的，因此拿到了数据却也不能操作DOM，因此用到$nextTick(在DOM渲染之后会触发一次)
  watch: {
    banners: {
      handler(banners) {
        this.$nextTick(() => {
          if (!banners.length) return;
          this.swiper = new Swiper(this.$refs.swiper, {
            allowTouchMove: false,
            // 前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 小圆点
            pagination: {
              el: ".swiper-pagination",
            },
            loop: true, // 无缝轮播，swiper默认没有无缝轮播
            autoplay: true, // 等同于以下设置  自动轮播，swiper也没有自动轮播
            /*autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
          },*/
          });
        });
      },
      immediate: true,
    },
  },
  // mounted() {
  //   const swiper = new Swiper(this.$refs.swiper, {
  //     // 前进后退按钮
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     // 小圆点
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },
  //     // 无缝轮播，swiper默认没有无缝轮播
  //     loop: true,
  //     // 自动轮播，swiper也没有自动轮播
  //     autoplay: true, //等同于以下设置
  //     /*autoplay: {
  //     delay: 3000,
  //     stopOnLastSlide: false,
  //     disableOnInteraction: true,
  //     },*/
  //   });
  //   console.log(swiper);
  // },
};
</script>
<style>
</style>