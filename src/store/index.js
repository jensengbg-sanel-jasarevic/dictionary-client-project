import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import userService from "../store/userService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_URL: "https://serverexamensarbete.herokuapp.com",
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
    async getWord(ctx, word) {
      let response = await axios.get(
        `${ctx.state.API_URL}/api/dictionary/${word}`
      );
      let responseData = {
        word: response.data[0].word,
        information: response.data[0].information,
        author: response.data[0].author,
      };
      ctx.commit("setWord", responseData);
    },
    async getWordsByLetter(ctx, letter) {
      let response = await axios.get(
        `${ctx.state.API_URL}/api/dictionary/words/${letter}`
      );
      let wordsByLetter = new Array();
      response.data.forEach((item) => {
        wordsByLetter.push(item.word);
      });
      ctx.commit("setWordsByLetter", wordsByLetter);
    },
    async putWordInfo(ctx, payload) {
      ctx.commit("setErrorMsg", "");
      await axios
        .put(`${ctx.state.API_URL}/api/dictionary/${payload.word}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + ctx.state.userService.token,
          },
        })
        .then((response) => {
          const data = response.data[0];
          if (response.status != 200) ctx.commit("setErrorMsg", data.message);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("setErrorMsg", "User is unautorized");
          } else {
            ctx.commit("setErrorMsg", "Please try again later");
          }
        });
    },
    async createWordInfo(ctx, payload) {
      ctx.commit("setErrorMsg", "");
      await axios
        .post(`${ctx.state.API_URL}/api/dictionary/${payload.word}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + ctx.state.userService.token,
          },
        })
        .then((response) => {
          const data = response.data[0];
          if (response.status != 200) {
            ctx.commit("setErrorMsg", data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("setErrorMsg", "User is unautorized");
          } else {
            ctx.commit("setErrorMsg", "Please try again later");
          }
        });
    },

    async deleteWord(ctx, payload) {
      ctx.commit("setErrorMsg", "");
      await axios
        .delete(`${ctx.state.API_URL}/api/dictionary`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + ctx.state.userService.token,
          },
        })
        .then((response) => {
          const data = response.data[0];
          if (response.status != 200) {
            ctx.commit("setErrorMsg", data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("setErrorMsg", "User is unautorized");
          } else {
            ctx.commit("setErrorMsg", "Please try again later");
          }
        });
    },

    async getComments(ctx, payload) {
      let resp = await axios.get(`${ctx.state.API_URL}/api/comments`);
      let wordComments = resp.data.filter((item) => item.word === payload);
      ctx.commit("setWordComments", wordComments.reverse());
    },
    async postComment(ctx, payload) {
      await axios.post(`${ctx.state.API_URL}/api/comments`, payload);
    },
    async deleteComment(ctx, commentID) {
      await axios.delete(`${ctx.state.API_URL}/api/comments`, {
        data: { id: commentID },
      });
    },
    async patchVote(ctx, commentID) {
      await axios.patch(`${ctx.state.API_URL}/api/comments`, { commentID });
    },
  },
  modules: {
    userService,
  },
});
