<template>
  <div class="box">
    <div class="header">
      <div class="item_box">
        <div class="img_box">
          <img src="../../assets/img/user_name.png" alt="">
        </div>
        <div class="item_content">
          <div class="tt"><span>{{data.total.userQty || 0}}</span> 总计人数</div>
          <div class="userName">
            <div>昨日人数</div>
            <div class="num">{{data.yesterday.userQty || 0}}</div>
          </div>
          <div class="userName">
            <div>今日人数</div>
            <div class="num">{{data.today.userQty || 0}}</div>
          </div>
        </div>
      </div>
      <div class="item_box">
        <div class="img_box yell">
          <img src="../../assets/img/or.png" alt="">
        </div>
        <div class="item_content">
          <div class="tt"><span>{{data.total.orderQty || 0}}</span> 总计订单</div>
          <div class="userName">
            <div>昨日订单</div>
            <div class="num">{{data.yesterday.orderQty  || 0}}</div>
          </div>
          <div class="userName">
            <div>今日订单</div>
            <div class="num">{{data.today.orderQty  || 0}}</div>
          </div>
        </div>
      </div>
      <div class="item_box ">
        <div class="img_box gre">
          <img src="../../assets/img/li.png" alt="">
        </div>
        <div class="item_content">
          <div class="tt"><span>{{data.total.collectQty  || 0}}</span> 总计收藏</div>
          <div class="userName">
            <div>昨日收藏</div>
            <div class="num">{{data.yesterday.collectQty || 0}}</div>
          </div>
          <div class="userName">
            <div>今日收藏啊</div>
            <div class="num">{{data.today.collectQty || 0}}</div>
          </div>
        </div>
      </div>
      <div class="item_box ">
        <div class="img_box blue">
          <img src="../../assets/img/pic.png" alt="">
        </div>
        <div class="item_content">
          <div class="tt"><span>{{data.total.orderAmount  / 100 || 0}}</span> 总计金额</div>
          <div class="userName">
            <div>昨日金额</div>
            <div class="num">{{data.yesterday.orderAmount  / 100 || 0 }}</div>
          </div>
          <div class="userName">
            <div>今日金额</div>
            <div class="num">{{data.today.orderAmount  / 100 || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="f">
      <div class="fitler">
        <div class="filter_name">数据统计</div>
        <div class="get">
          <div>查看近6个月信息</div>
              <el-date-picker
                v-model="value1"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          <div @click="downLoad()">导出表格</div>
        </div>
      </div>
      <div class="chart" style="margin-bottom:90px">
        <chart :options="chartOptions" :auto-resize="true" style="width: 100%;"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import { Data } from "api"
export default {
  data () {
    return {
      data: {},
      value1: "",
      legendDict: {
        VISIT: "访问量",
        ORDER: "订单量",
        COLLECT: "收藏量"
      },
      filter: {
        days: "",
        startTime: "",
        endTime: " ",
        typeCode: ""
      },
      downFilter: {
        days: "",
        startTime: "",
        endTime: " "
      },
      chartOptions: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#717D8A",
              borderRadius: "6px"
            }
          }
        },
        legend: {
          data: ["访问量", "订单量", "收藏量"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "访问量",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "订单量",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "收藏量",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ],
        color: ["#FB9A84", "#FBCD96", "#D2E5C3"]
      }
    }
  },

  watch: {
    value1 (n) {
      this.filter.startTime = n[0]
      this.filter.endTime = n[1]
      console.log(n)
      this.queryCount()
    }
  },

  async mounted () {
    let { data } = await Data.queryData()
    this.data = data
    this.queryCount()
  },

  methods: {
    async queryCount () {
      this.filter.days = this.filter.days || 7
      let promises = ["VISIT", "WISH", "ORDER"].map(item => {
        this.filter.typeCode = item
        return Data.queryCount(this.filter)
      })
      let data = await Promise.all(promises)
      this.chartOptions.xAxis[0].data = data[0].data.dateList
      this.chartOptions.series.forEach((item, i) => {
        item.data = data[i].data.numberList
      })
    },

    async downLoad () {
      this.downFilter.days = this.downFilter.days || 7
      await Data.downLoad(this.downFilter)
      this.$message.success("下载成功")
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  margin: 0;
}
.header {
  // display: flex;
  overflow: hidden;
}
.item_box {
  float: left;
  background: white;
  border-radius: 3px;
  width: 47%;
  display: flex;
  margin-left: 0.15rem;
  margin-top: 0.15rem;
  .img_box {
    background: #fb9a84;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
  }
  .item_content {
    padding: 8px 0.2rem;
    width: 75%;
    .tt {
      margin-bottom: 0.12rem;
      font-size: 0.05rem;
      span {
        font-size: 0.13rem;
      }
    }
    .userName {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #58657c;
      font-size: 0.05rem;
      border-bottom: 1px solid #f3f3f3;
      width: 100%;
      margin-top: 5px;
      .num {
        font-size: 0.13rem;
      }
    }
  }
}
.yell {
  background: #fbcd96 !important;
}
.gre {
  background: #d2e5c3 !important;
}
.blue {
  background: #cce3ee !important;
}
.f {
  padding: 0 0.15rem;
}
.fitler {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  margin-top: 0.14rem;
  color: #717d8a;
  padding: 10px 0;
  font-size: 0.08rem;
}
.filter_name {
  color: #717d8a;
  font-size: 0.08rem;
  margin-left: 0.12rem;
}
.get {
  display: flex;
  align-items: center;
  margin-right: 0.05rem;
}
.date {
  margin: 0 10px;
}
.chart {
  background: white;
  padding-top: 20px;
}
</style>
define(function (require) {

    var wx = require('https://res.wx.qq.com/open/js/jweixin-1.0.0.js');

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    mui.init();

    mui.ready(function () {
        if (isWeiXin()) {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
            });

            wx.ready(function () {
                var mask = mui.createMask();
                mask.show();

                wx.onMenuShareAppMessage({
                    title: '这家供应商卖的肉不错!',
                    desc: '我店里用的肉就是在这儿买的',
                    link: domain + '/wechat/parttime/share/link/auth/' + ptCode,
                    imgUrl: domain + '/assets/images/wechat/logo-text.jpg',
                    type: 'link',
                    success: function () {
                        mui.alert('已发送邀请链接，赶紧通知好友查看吧', '温馨提示');
                    }
                });
                wx.onMenuShareTimeline({
                    title: '这家供应商卖的肉不错!',
                    link: domain + '/wechat/parttime/share/link/auth/' + ptCode,
                    imgUrl: domain + '/assets/images/wechat/logo-text.jpg',
                    success: function () {
                        mui.alert('已分享至朋友圈', '温馨提示');
                    }
                })
            })

        } else {
            mui.alert('请在微信浏览器中操作', '温馨提示', function () {
                mui.openWindow({
                    url: '/wechat/parttime/center/auth',
                    id: 'ptCenter'
                })
            })
        }
    });
});
