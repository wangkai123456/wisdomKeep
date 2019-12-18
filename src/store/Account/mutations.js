
import { default as types } from "./mutation-types"
export default {
  // 选择菜单
  [types.SEKECT_MENU] (state, v) {
    state.selectMenu = v
  },

  [types.SAVE_USERNAME] (state, v) {
    state.account = v
  },
  // 保存用户信息
  [types.SAVE_USERINFO] (state, v) {
    state.userInfo = v
  },

  [types.SAVE_TITLE] (state, v) {
    state.titInfo = v
  },

  async [types.QUERY_QTOKEN]  (state, v) {
    state.QnInfo = v
  }

}
