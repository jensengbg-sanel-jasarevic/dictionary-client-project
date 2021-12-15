import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "./../router";
import userService from "../store/userService";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],

  state: {
    API_URL: "https://serverexamensarbete.herokuapp.com",
    wordsByLetter: null,
    word: null,
    definition: null,
    author: null,
    comments: null,
    getWordErrorMsg: null,
    createWordSuccessMsg: null,
    createWordErrorMsg: null,
    updateWordSuccessMsg: null,
    updateWordErrorMsg: null,
    deleteWordSuccessMsg: null,
    deleteWordErrorMsg: null,
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
    },
    registerGetWordError(state, errorMsg) {
      state.getWordErrorMsg = errorMsg;
    },
    registerCreateWordSuccess(state, successMsg) {
      state.createWordSuccessMsg = successMsg;
    },
    registerCreateWordError(state, errorMsg) {
      state.createWordErrorMsg = errorMsg;
    },
    registerUpdateWordSuccess(state, successMsg) {
      state.updateWordSuccessMsg = successMsg;
    },
    registerUpdateWordError(state, errorMsg) {
      state.updateWordErrorMsg = errorMsg;
    },
    registerDeleteWordSuccess(state, successMsg) {
      state.deleteWordSuccessMsg = successMsg;
    },
    registerDeleteWordError(state, errorMsg) {
      state.deleteWordErrorMsg = errorMsg;
    },
    clear(state) {
      (state.word = null),
        (state.getWordErrorMsg = null),
        (state.createWordSuccessMsg = null),
        (state.createWordErrorMsg = null),
        (state.deleteWordSuccessMsg = null),
        (state.deleteWordErrorMsg = null);
    },
  },
  actions: {
    async clearStateValues(ctx) {
      ctx.commit("clear");
    },
    async createWord(ctx, payload) {
      ctx.commit("registerCreateWordError", null);
      ctx.commit("registerCreateWordSuccess", null);
      ctx.commit("registerUpdateWordError", null);
      ctx.commit("registerUpdateWordSuccess", null);
      ctx.commit("registerDeleteWordError", null);
      ctx.commit("registerDeleteWordSuccess", null);
      try {
        await axios.post(
          `${ctx.state.API_URL}/api/dictionary/${payload.word}`,
          payload,
          {
            headers: { authorization: `Bearer ${ctx.state.userService.token}` },
          }
        );
        ctx.commit(
          "registerCreateWordSuccess",
          "Added a new word to the dictionary"
        );
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 403) {
          ctx.commit("registerCreateWordError", "Unauthorized");
        } else {
          ctx.commit(
            "registerCreateWordError",
            "This word is already in the dictionary"
          );
        }
      }
    },
    async getWord(ctx, word) {
      ctx.commit("registerGetWordError", null);
      try {
        let response = await axios.get(
          `${ctx.state.API_URL}/api/dictionary/${word}`
        );
        let responseData = {
          word: response.data[0].word,
          definition: response.data[0].definition,
          author: response.data[0].author,
        };
        ctx.commit("setWord", responseData);
        ctx.commit("registerGetWordError", null);
      } catch (err) {
        if (err.response.status === 404) {
          ctx.commit(
            "registerGetWordError",
            "Word is not found in the dictionary"
          );
        }
      }
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
    async putWordDefinition(ctx, payload) {
      ctx.commit("registerCreateWordError", null);
      ctx.commit("registerCreateWordSuccess", null);
      ctx.commit("registerUpdateWordError", null);
      ctx.commit("registerUpdateWordSuccess", null);
      ctx.commit("registerDeleteWordError", null);
      ctx.commit("registerDeleteWordSuccess", null);
      try {
        await axios.put(
          `${ctx.state.API_URL}/api/dictionary/${payload.word}`,
          payload,
          {
            headers: { authorization: `Bearer ${ctx.state.userService.token}` },
          }
        );
        ctx.commit(
          "registerUpdateWordSuccess",
          "Word has been updated in the dictionary"
        );
      } catch (err) {
        ctx.commit(
          "registerUpdateWordError",
          "This word is not in the dictionary"
        );
      }
    },
    async deleteWord(ctx, payload) {
      ctx.commit("registerCreateWordError", null);
      ctx.commit("registerCreateWordSuccess", null);
      ctx.commit("registerUpdateWordError", null);
      ctx.commit("registerUpdateWordSuccess", null);
      ctx.commit("registerDeleteWordError", null);
      ctx.commit("registerDeleteWordSuccess", null);
      try {
        await axios.delete(
          `${ctx.state.API_URL}/api/dictionary/${payload.word}`,
          {
            data: payload,
            headers: { authorization: `Bearer ${ctx.state.userService.token}` },
          }
        );
        ctx.commit(
          "registerDeleteWordSuccess",
          "Word has been deleted from the dictionary"
        );
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 403) {
          ctx.commit("registerDeleteWordError", "Unauthorized");
        } else {
          ctx.commit(
            "registerDeleteWordError",
            "This word is not in the dictionary"
          );
        }
      }
    },
    async postComment(ctx, payload) {
      try {
        await axios.post(`${ctx.state.API_URL}/api/comments`, payload, {
          headers: { authorization: `Bearer ${ctx.state.userService.token}` },
        });
      } catch (err) {
        if (err.response.status === 401) {
          router.push("/login");
        }
      }
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
        headers: { authorization: `Bearer ${ctx.state.userService.token}` },
      });
    },
  },
  modules: {
    userService,
  },
});
