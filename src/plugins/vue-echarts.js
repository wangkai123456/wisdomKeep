import Vue from "vue"
import ECharts from "vue-echarts/components/ECharts"

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/line"
import "echarts/lib/component/title"
import "echarts/lib/component/legend"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/dataZoom"

// register component to use
Vue.component("chart", ECharts)
