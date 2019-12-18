<template>
  <div class="box">
    <header-tit img="ueT.png" tit="用户管理" back="1"/>
    <div class="wrap">
    	<h2>订单详情:</h2>
    	<div class="wrapper">
			<div class="item"><span class="name">用户名称：</span><span>{{detail.name}}</span></div>
			<div class="item marginB-2"><span class="name">联系电话：</span><span>{{detail.mobile}}</span></div>
			<div class="item"><span class="name">注册时间：</span><span>{{detail.createTime | formatDate}}</span></div>
			<div class="item marginB-2"><span class="name">注册详情：</span><span v-if="detail.unionId">微信授权</span> <span v-if="detail.mobile">手机绑定</span> </div>
			<div class="item"><span class="name">收藏课程：</span><span v-for="(item, i) in wishs" :key="i">{{item.name}}</span></div>
			<div class="item marginB-2"><span class="name">成功支付：</span><span>{{detail.buyQty}}</span></div>
			<div class="item head"><span class="name">用户头像：</span><span class="pic"><img :src="detail.avatarUrl"></span></div>
    	</div>
    </div>
  </div>
</template>
<script>
import { User, Wish } from "api"
export default {
  data () {
    return {
      detail: {},
			 filter: {
        offset: 0,
        limit: 10
      },
      wishs: []
    }
  },

  async created () {
    let { data } = await User.querySchoolDetail(this.$route.query.id)
    this.detail = data
    this.filter.userId = this.$route.query.id
    let res = await Wish.queryWish(this.filter)
    this.wishs = res.data
  }
}
</script>

<style lang="less" scoped>
	i{
		font-style: normal;
	}
	.box{
		width: 100%;
		background: #fff;
	}
	.marginB-1{
		margin-bottom: 10px;
	}
	.marginB-2{
		margin-bottom: 20px;
	}
	.wrap{
		width:80%;
		margin: 0 auto;
		background: white;
	}
	.wrap h2{
		font-size:18px;
		color:#444;
		margin: 20px 0;
	}
	.wrapper .item{
		line-height: 30px;
		color: #626262;
		font-size:14px;
	}
	.wrapper .item span.name{
		width: 100px;
		display: inline-block;
		color: #59A9DE;
	}
	.head{
		display: flex;
    	align-items: center;
	}
	.wrapper .item span.pic{
		display: inline-block;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
	}
	.wrapper .item span.pic img{
		width: 100%;
	}
</style>
