import { extend } from "vee-validate";
import { phoneReg, passwordReg } from "../utils/regs";

//手机号规则
extend("phoneRequired", {
  validate: (value) => !!value,
  message: "手机号不能为空",
  computesRequired: true,
});

extend("phone", {
  validate: (value) => phoneReg.test(value),
  message: "请输入合法手机号",
});

//密码规则
extend("passwordRequired", {
  validate: (value) => !!value,
  message: "请输入密码",
  computesRequired: true,
});

extend("password", {
  validate: (value) => passwordReg.test(value),
  message: "密码至少六位，包含数字或字母或下划线",
});