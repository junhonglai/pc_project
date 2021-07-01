import { extend } from "vee-validate";
import { phoneReg, codeReg, passwordReg } from "../../utils/regs";

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

//验证码规则
extend("codeRequired", {
  validate: (value) => !!value,
  message: "验证码不能为空",
  computesRequired: true,
});

extend("code", {
  validate: (value) => codeReg.test(value),
  message: "验证码为六位数字",
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

//确认密码规则
extend("rePasswordRequired", {
  validate: (value) => !!value,
  message: "请确认密码",
  computesRequired: true,
});

extend("rePassword", {
  validate: (value, args) => value === args.password,
  message: "两次密码输入不一致",
  params: ["password"],
});

//确认密码规则
extend("isAgreen", {
  validate: (value) => value,
  message: "请同意协议",
  computesRequired: true,
});
