import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import userService from "../store/userService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_URL: "http://localhost:5000",
    wordsByLetter: null,
    word: null,
    definition: null,
    author: null,
    comments: null
  },
  mutations: {
    setWord(state, responseData) {
      state.word = responseData.word;
      state.definition = responseData.definition;
      state.author = responseData.author;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    setWordsByLetter(state, wordsByLetter) {
      state.wordsByLetter = wordsByLetter;
    }    
  },
  actions: {
    async createWord(ctx, payload) {
      await axios.post(`${ctx.state.API_URL}/api/dictionary/${payload.word}`, payload, {
        headers: { 'authorization': `Bearer ${ctx.state.userService.token}` }
      }); 
   }, 
   async getWord(ctx, word) {
    let response = await axios.get(`${ctx.state.API_URL}/api/dictionary/${word}`);
    let responseData = {
      word: response.data[0].word,
      definition: response.data[0].definition,
      author: response.data[0].author
    };
    ctx.commit("setWord", responseData);
  },
  async getWordsByLetter(ctx, letter) {
    let response = await axios.get(`${ctx.state.API_URL}/api/dictionary/words/${letter}`);
    let wordsByLetter = new Array();
    response.data.forEach((item) => {
      wordsByLetter.push(item.word);
    });
    ctx.commit("setWordsByLetter", wordsByLetter);
  },      
  async putWordDefinition(ctx, payload) {
    await axios.put(`${ctx.state.API_URL}/api/dictionary/${payload.updateDefinition.word}`, payload, {
      headers: { 'authorization': `Bearer ${ctx.state.userService.token}` }
    }); 
  },   
  async postComment(ctx, payload) {
    await axios.post(`${ctx.state.API_URL}/api/comments`, payload, {
      headers: { 'authorization': `Bearer ${ctx.state.userService.token}` }
    }); 
  },   
  async getComments(ctx, payload) {
    let resp = await axios.get(`${ctx.state.API_URL}/api/comments`);
    let comments = resp.data.filter((item) => item.word === payload);
    ctx.commit("setComments", comments.reverse());
  },
  async patchCommentVote(ctx, commentID) {
    await axios.patch(`${ctx.state.API_URL}/api/comments`, { commentID });
  },  
  async deleteComment(ctx, payload) {
    await axios.delete(`${ctx.state.API_URL}/api/comments`, {
      data: payload, 
      headers: {'authorization': `Bearer ${ctx.state.userService.token}`} 
    });      
  }   
},
  modules: {
    userService
  },
});