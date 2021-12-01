import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_URL: "https://serverexamensarbete.herokuapp.com",
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
      let response = await axios.get(`${ctx.state.API_URL}/api/dictionary/${payload}`); 
      let responseData = {
        word: response.data[0].word,
        information: response.data[0].information,
        author: response.data[0].author
      }
      ctx.commit('setWord', responseData);
    },
    async postComment(ctx, payload){
     await axios.post(`${ctx.state.API_URL}/api/comments`, { comment: payload.comment, word: payload.word });    
    },
    async getComments(ctx, payload) {
      let resp = await axios.get(`${ctx.state.API_URL}/api/comments`); 
      console.log("data comments", resp)
      let wordComments = resp.data.filter(item => item.word === payload);
      console.log("data comments filter", wordComments)
      console.log("reversed"), wordComments.reverse()
      ctx.commit('setWordComments', wordComments.reverse());
    },
    async patchVote(ctx, payload) {
      await axios.patch(`${ctx.state.API_URL}/api/comments`, { comment: payload.comment });      
    }        
  },
  modules: {
  }
})
