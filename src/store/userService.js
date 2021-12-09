import axios from "axios";

export default {
  state: {
    API_URL: "http://localhost:5000/api",
    token: "",
    user: [],
    error: "",
    active: false
  },
  mutations: {
    registerError(state, error) {
      state.error = error;
    },
    loggedIn(state, authorizedUser){
      state.error = "";
      sessionStorage.setItem("token", authorizedUser.token)
      state.token = authorizedUser.token
      state.user = authorizedUser.user
      state.active = true
    },   
    loggedOut(state){
      state.token = ""
      state.user = []
      state.active = false
    }     
  },
  actions: {
    async registerUser(ctx, userDetails){
      ctx.commit("registerError", "");
      try {
        await axios.post(`${ctx.state.API_URL}/accounts`, userDetails); 
      }catch {
        const errorMsg = "User with this email already exists"
        ctx.commit("registerError", errorMsg);
      }
    },
    async login(ctx, userDetails) {
      ctx.commit("registerError", "");
      try {
        let resp = await axios.post(`${ctx.state.API_URL}/auth`, {
          email: userDetails.email,
          password: userDetails.password
        });
        const authorizedUser = resp.data 
        ctx.commit("loggedIn", authorizedUser);
      } catch {
        const errorMsg = "Credentials provided are not valid"
        ctx.commit("registerError", errorMsg);
      }
    },
    async logout(ctx, userDetails) {
      await axios.patch(`${ctx.state.API_URL}/auth`, { user: userDetails.email })
      ctx.commit('loggedOut')
    },
    async deleteUser(ctx, userDetails) {
      ctx.commit("registerError", "");
      try {
        await axios.delete(`${ctx.state.API_URL}/accounts`, { data: {email: userDetails.email} });
        ctx.commit('loggedOut')
      } catch {
        const errorMsg = "Request could not be fulfilled"
        ctx.commit("registerError", errorMsg);
      }
    },
    async updatePassword(ctx, data) {
      ctx.commit("registerError", "");
      try {
        await axios.patch(`${ctx.state.API_URL}/accounts`, { data });
      } catch {
        const errorMsg = "Request could not be fulfilled"
        ctx.commit("registerError", errorMsg);      
      }
    }
  },
  modules: {},
};