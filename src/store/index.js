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
    async getWord(ctx, word){
      let response = await axios.get(`${ctx.state.API_URL}/api/dictionary/${word}`); 
      let responseData = {
        word: response.data[0].word,
        information: response.data[0].information,
        author: response.data[0].author
      }
      ctx.commit('setWord', responseData);
    },
    async putWordInfo(ctx, payload) {
      await axios.put(`${ctx.state.API_URL}/api/dictionary/${payload.word}`, payload);      
    },    
    async getComments(ctx, payload) {
      let resp = await axios.get(`${ctx.state.API_URL}/api/comments`); 
      let wordComments = resp.data.filter(item => item.word === payload);
      ctx.commit('setWordComments', wordComments.reverse());
    },
    async postComment(ctx, payload){
     await axios.post(`${ctx.state.API_URL}/api/comments`, payload);    
    },
    async deleteComment(ctx, commentID) {
      await axios.delete(`${ctx.state.API_URL}/api/comments`, { data: { id: commentID } });      
    },   
    async patchVote(ctx, commentID) {
      await axios.patch(`${ctx.state.API_URL}/api/comments`, { commentID });      
    }            
  },
  modules: {
  }
})
