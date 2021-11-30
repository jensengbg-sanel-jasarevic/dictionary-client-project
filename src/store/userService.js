import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: [],
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token)
    },
    registerUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async registerUser(ctx, userDetails) {
      const response = await fetch(process.env.USER_PATH+'/register', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      ctx.commit('registerUser', data.user);
    },
    async login(ctx, userDetails) {
      const response = await fetch(process.env.USER_PATH+'/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.status == 200) {
      const data = await response.json();
      ctx.commit('updateToken', data.token);
    }
    },
  },
  modules: {
  }
})
