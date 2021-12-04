import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import userService from "../store/userService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_URL: "http://localhost:5000/api",
    word: null,
    wordInfo: null,
    wordAuthor: null,
    wordComments: null
  },
  mutations: {
    setWord(state, responseData){
      state.word = responseData.word;
      state.wordInfo = responseData.information;
      state.wordAuthor = responseData.author;
    },
    setWordComments(state, wordComments){
      state.wordComments = wordComments;
    },
  },
  actions: {
    async getWord(ctx, payload){
      let response = await axios.get(`${ctx.state.API_URL}/glossary/${payload}`); 
      let responseData = {
        word: response.data[0].word,
        information: response.data[0].information,
        author: response.data[0].author
      }
      ctx.commit('setWord', responseData);
    },
    async postComment(ctx, payload){
     await axios.post(`${ctx.state.API_URL}/comments`, { comment: payload.comment, word: payload.word });    
    },
    async getComments(ctx, payload) {
      let resp = await axios.get(`${ctx.state.API_URL}/comments`); 
      let wordComments = resp.data.filter(item => item.word === payload);
      ctx.commit('setWordComments', wordComments);
    },
    async patchVote(ctx, payload) {
      await axios.patch(`${ctx.state.API_URL}/comments`, { author: payload.author });      
    }        
  },
  modules: {
    userService,
}
})
