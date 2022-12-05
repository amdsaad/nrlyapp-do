export const state = () => ({
  activeInfo: null,
  showinfo: false,
})
export const mutations = {
  set_activeInfo(state, payload) {
    state.activeInfo = payload
  },
  set_showinfo(state, payload) {
    state.showinfo = payload
  },
}
