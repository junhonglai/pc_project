<template>
  <div class="dialog-wrapper" v-show="isShow" @click="close">
    <div class="dialog" :style="{ width }" @click.stop>
      <div class="dialog-header">
        <span class="dialog-header-title">标题</span>
        <button class="dialog-header-close" @click="close">x</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "30%",
    },
  },
  methods: {
    close() {
      console.log(11);
      this.$emit("update:visible", false);
    },
  },
  computed: {
    isShow() {
      if (this.visible) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
      return this.visible;
    },
  },
  beforeDestroy() {
    document.documentElement.style.overflow = "auto";
  },
};
</script>
<style lang="less" scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.3);
}
.dialog {
  position: relative;
  margin: 15vh auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  // align-content: center;
  padding: 20px 20px 10px;
  .dialog-header-close {
    width: 16px;
    height: 16px;
    line-height: 16px;
    outline: none;
    border: none;
    font-size: 18px;
    color: #333;
    background-color: #fff;
  }
}
.dialog-body {
  text-align: initial;
  padding: 25px 25px 30px;
}
.dialog-footer {
  padding: 10px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>