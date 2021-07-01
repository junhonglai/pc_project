<template>
  <div class="register-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <!-- 注册内容 -->
      <form class="register" @submit.prevent="handleSubmit(submit)">
        <h3>
          注册新用户
          <span class="go"
            >我有账号，去 <a href="login.html" target="_blank">登陆</a>
          </span>
        </h3>
        <ValidationProvider
          class="content"
          tag="div"
          name="Phone"
          rules="phoneRequired|phone"
          :debounce="100"
          v-slot="{ errors }"
        >
          <label>手机号:</label>
          <input
            type="text"
            placeholder="请输入你的手机号"
            v-model="user.phone"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="content"
          tag="div"
          name="Code"
          rules="codeRequired|code"
          :debounce="100"
          v-slot="{ errors }"
        >
          <label>验证码:</label>
          <input type="text" placeholder="请输入验证码" v-model="user.code" />
          <button :disabled="isDisabled" @click="getCode(user.phone)">
            发送验证码
          </button>
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="content"
          name="Password"
          rules="passwordRequired|password"
          :debounce="100"
          v-slot="{ errors }"
          tag="div"
        >
          <label>登录密码:</label>
          <input
            type="password"
            placeholder="请输入你的登录密码"
            v-model="user.password"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="content"
          tag="div"
          name="rePassword"
          :rules="`rePasswordRequired|rePassword:${user.password}`"
          :debounce="100"
          v-slot="{ errors }"
        >
          <label>确认密码:</label>
          <input
            type="password"
            placeholder="请输入确认密码"
            v-model="user.rePassword"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="controls"
          tag="div"
          rules="isAgreen"
          :debounce="100"
          v-slot="{ errors }"
        >
          <input name="m1" type="checkbox" v-model="user.isChecked" />
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="btn">
          <button type="submit">完成注册</button>
        </div>
      </form>
    </ValidationObserver>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
// import { reqRegister } from "../../api/user";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { phoneReg } from "../../utils/regs";
import { reqCode, reqRegister } from "../../api/user";
import "./validate";

export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "",
        password: "",
        rePassword: "",
        code: "",
        isChecked: false,
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async submit() {
      try {
        console.log("全部验证通过");
        const { phone, password, code } = this.user;
        await reqRegister({ phone, password, code });
        this.$router.history.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    // 获取验证码
    async getCode(phone) {
      try {
        const res = await reqCode(phone);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    isDisabled() {
      return phoneReg.test(this.user.phone) ? false : true;
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>