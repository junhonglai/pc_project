<template>
  <div
    class="footer"
    v-if="$route.path !== '/login' && $route.path !== '/register'"
  >
    <div class="footer-container">
      <div class="footer-list">
        <div class="footer-item">
          <h4>购物指南</h4>
          <ul class="footerListIcon">
            <li>购物流程</li>
            <li>会员介绍</li>
            <li>生活旅行/团购</li>
            <li>常见问题</li>
            <li>购物指南</li>
          </ul>
        </div>
        <div class="footer-item">
          <h4>配送方式</h4>
          <ul class="footerListIcon">
            <li>上门自提</li>
            <li>211限时达</li>
            <li>配送服务查询</li>
            <li>配送费收取标准</li>
            <li>海外配送</li>
          </ul>
        </div>
        <div class="footer-item">
          <h4>支付方式</h4>
          <ul class="footerListIcon">
            <li>货到付款</li>
            <li>在线支付</li>
            <li>分期付款</li>
            <li>邮局汇款</li>
            <li>公司转账</li>
          </ul>
        </div>
        <div class="footer-item">
          <h4>售后服务</h4>
          <ul class="footerListIcon">
            <li>售后政策</li>
            <li>价格保护</li>
            <li>退款说明</li>
            <li>返修/退换货</li>
            <li>取消订单</li>
          </ul>
        </div>
        <div class="footer-item">
          <h4>特色服务</h4>
          <ul class="footerListIcon">
            <li>夺宝岛</li>
            <li>DIY装机</li>
            <li>延保服务</li>
            <li>尚品汇E卡</li>
            <li>尚品汇通信</li>
          </ul>
        </div>
        <div class="footer-item">
          <h4>帮助中心</h4>
          <div>
            <img src="./wx_cz.jpg" alt="帮助二维码" />
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <ul class="footer-helplist">
          <li class="footer-helpItem">关于我们</li>
          <li class="footer-helpItem">联系我们</li>
          <li class="footer-helpItem">关于我们</li>
          <li class="footer-helpItem">商家入驻</li>
          <li class="footer-helpItem">营销中心</li>
          <li class="footer-helpItem">友情链接</li>
          <li class="footer-helpItem">关于我们</li>
          <li class="footer-helpItem">营销中心</li>
          <li class="footer-helpItem">友情链接</li>
          <li class="footer-helpItem">关于我们</li>
        </ul>
        <p class="footer-address">地址：北京市昌平区宏福科技园综合楼6层</p>
        <p class="footerId">京ICP备19006430号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
<style lang="less">
.footer {
  width: 100%;
  background-color: #eaeaea;
}
.footer-container {
  margin: 0 144.6px;
  padding: 0 15px;
  font-size: 14px;
}
.footer-list {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.footer-item {
  width: 100%;
}
/* footer下面的导航栏 */
.footer-bottom {
  padding: 20px;
}
.footer-helplist {
  display: flex;
  justify-content: center;
  /* 设置导航栏分隔符 */
  li {
    border-right: 1px solid #333;
    padding-right: 12px;
    margin-right: 12px;
    &:last-child {
      border: none;
      padding-right: 0;
      margin-right: 0;
    }
  }
}
.footer-address,
.footerId {
  text-align: center;
  margin: 10px 0;
}
</style>