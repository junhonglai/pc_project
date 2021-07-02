<template>
  <div class="controls">
    <input
      autocomplete="off"
      class="itxt"
      :value="currentValue"
      @keyup.enter="handleChange"
      @blur="handleChange"
    />
    <a
      href="javascript:"
      :class="{ plus: true, disabled: currentValue === max }"
      @click="add"
      >+</a
    >
    <a
      href="javascript:"
      :class="{ mins: true, disabled: currentValue === min }"
      @click="sub"
      >-</a
    >
  </div>
</template>

<script>
export default {
  name: "InputCom",
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      currentValue: 1,
    };
  },
  methods: {
    handleChange(e) {
      this.currentValue = e.target.value;
    },
    add() {
      if (this.currentValue === this.max) {
        this.currentValue = this.max;
      }
      this.currentValue++;
    },
    sub() {
      if (this.currentValue === this.min) {
        this.currentValue = this.min;
      }
      this.currentValue--;
    },
  },
  watch: {
    currentValue(currenValue, oldValue) {
      // 这里输入的是字符串，要转换为数字，否则进行非数字判断时一直是false
      let value = currenValue;
      let newVal = value;
      if (isNaN(value)) {
        newVal = oldValue;
      } else if (value > this.max) {
        newVal = this.max;
      } else if (value < this.min) {
        newVal = this.min;
      }
      this.currentValue = newVal;
      // 更新外面的count值，v-model="count"
      this.$emit("input", newVal);
    },
  },
};
</script>
<style lang="less" scoped>
.controls {
  width: 48px;
  position: relative;
  float: left;
  margin-right: 15px;

  .itxt {
    width: 38px;
    height: 37px;
    border: 1px solid #ddd;
    color: #555;
    float: left;
    border-right: 0;
    text-align: center;
  }

  .plus,
  .mins {
    width: 15px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    background: #f1f1f1;
    color: #666;
    position: absolute;
    right: -8px;
    border: 1px solid #ccc;
  }

  .mins {
    right: -8px;
    top: 19px;
    border-top: 0;
  }

  .plus {
    right: -8px;
  }
  .disabled{
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>