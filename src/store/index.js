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
    wordInfo: null,
    wordAuthor: null,
    wordComments: null,
    errorMsg: "",
  },
  mutations: {
    setWord(state, responseData) {
      state.word = responseData.word;
      state.wordInfo = responseData.information;
      state.wordAuthor = responseData.author;
    },
    setWordsByLetter(state, wordsByLetter) {
      state.wordsByLetter = wordsByLetter;
    },
    setWordComments(state, wordComments) {
      state.wordComments = wordComments;
    },
    setErrorMsg(state, error) {
      state.errorMsg = error;
    },
  },
  actions: {
    async createWordInfo(ctx, payload) {
      ctx.commit("setErrorMsg", "");
      await axios.post(`${ctx.state.API_URL}/api/dictionary/${payload.word}`, payload, {
        headers: { 'authorization': `Bearer ${ctx.state.userService.token}` }
      }); 
   }, 
   async getWord(ctx, word) {
    let response = await axios.get(`${ctx.state.API_URL}/api/dictionary/${word}`);
    let responseData = {
      word: response.data[0].word,
      information: response.data[0].information,
      author: response.data[0].author,
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
  async putWordInfo(ctx, payload) {
    await axios.put(`${ctx.state.API_URL}/api/dictionary/${payload.word}`, payload, {
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
    let wordComments = resp.data.filter((item) => item.word === payload);
    ctx.commit("setWordComments", wordComments.reverse());
  },
  async patchVote(ctx, commentID) {
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