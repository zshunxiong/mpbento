import { createStore } from 'vuex'

export default createStore({
  state: {
    // Toast 以陣列形式保存，以進行多個 Toast 顯示
    toast: [],
  },
  mutations: {
    addToast(state, payload) {
      state.toast = payload;
    },

    dismissToast(state, id) {
      if (id) state.toast = state.toast.filter((r) => id !== r.id);
      else state.toast = [];
    },
  },
  actions: {
    fireToast({ commit, state }, payload) {
      // 呼叫新增 Toast 時，建立隨機碼為 ID，用於關閉該 Toast
      const id = payload.id || Math.random();
      const newToast = [...state.toast, {
        id: id,
        dismiss: () => commit('dismissToast', id),
        ...payload
      }];
      commit('addToast', newToast);

      // 如果 Toast 有 action，不做自動關閉
      if (!payload.action) setTimeout(() =>
        commit('dismissToast', id)
        , payload.duration || 1750)
    },
  },
  modules: {
  }
})
