<template>
  <div class="spec-preview">
    <img v-lazy="img.imgUrl" />
    <div class="event" @mousemove="handleMove"></div>
    <div class="big">
      <img v-lazy="img.imgUrl" :style="{ left: bigLeft, top: bigTop }" />
    </div>
    <div class="mask" :style="{ left, top }"></div>
  </div>
</template>

<script>
// 引入lodash
import { throttle } from "lodash";
export default {
  name: "Zoom",
  data() {
    return {
      left: 0,
      top: 0,
      bigLeft: 0,
      bigTop: 0,
    };
  },
  props: {
    img: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleMove: throttle(function (e) {
      let moveLeft = 0;
      let moveTop = 0;
      const eventWidth = 400;
      const eventHeight = 400;
      const maskWidth = 200;
      const maskHeight = 200;
      // console.log(e.offsetX);
      moveLeft = e.offsetX - maskWidth / 2;
      moveTop = e.offsetY - maskHeight / 2;
      if (moveLeft < 0) {
        moveLeft = 0;
      } else if (moveLeft > eventWidth - maskWidth) {
        moveLeft = eventWidth - maskWidth;
      }

      if (moveTop < 0) {
        moveTop = 0;
      } else if (moveTop > eventHeight - maskHeight) {
        moveTop = eventHeight - maskHeight;
      }
      this.top = moveTop + "px";
      this.left = moveLeft + "px";
      this.bigLeft = -2 * moveLeft + "px";
      this.bigTop = -2 * moveTop + "px";
    }, 1000 / 60),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>