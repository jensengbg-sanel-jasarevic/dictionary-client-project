import axios from "axios";

export default {
  state: {
    API_URL: "http://localhost:5000/api",
    token: "",
    user: [],
    error: "",
    passwordUpdatedMsg: "",
    active: false
  },
  mutations: {
    loggedIn(state, authorizedUser){
      state.error = "";
      state.token = authorizedUser.token
      state.user = authorizedUser.user
      state.active = true
    },   
    loggedOut(state){
      state.token = ""
      state.user = []
      state.active = false
    },
    registerError(state, error) {
      state.error = error;
    },
    registerPasswordUpdatedMsg(state, message) {
      state.passwordUpdatedMsg = message
    }     
  },
  actions: {
    async clearStateValues(ctx) {
      ctx.commit("registerError", "");
      ctx.commit("registerPasswordUpdatedMsg", "");
    },
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
      ctx.commit("registerError", "");
      await axios.patch(`${ctx.state.API_URL}/auth`, { user: userDetails.email }, {
        headers: { 'authorization': `Bearer ${ctx.state.token}` }
      }); 
      ctx.commit('loggedOut')
    },
    async deleteUser(ctx, userDetails) {
      ctx.commit("registerError", "");
      try {
        await axios.delete(`${ctx.state.API_URL}/accounts`, { 
        data: {email: userDetails.email},
        headers: {'authorization': `Bearer ${ctx.state.token}`} 
      });
        ctx.commit('loggedOut')
      } catch (err){
        const errorMsg = "Request could not be fulfilled"
        ctx.commit("registerError", errorMsg);
      }
    },
    async updatePassword(ctx, payload) {
      ctx.commit("registerError", "");
      ctx.commit("registerPasswordUpdatedMsg", "");
      try {
        await axios.patch(`${ctx.state.API_URL}/accounts`, payload); 
        const passwordUpdatedMsg = "Password successfully updated"
        ctx.commit("registerPasswordUpdatedMsg", passwordUpdatedMsg );      
      } catch {
        const errorMsg = "Credentials provided are not valid"
        ctx.commit("registerError", errorMsg);      
      }
    }
  },
  modules: {},
};