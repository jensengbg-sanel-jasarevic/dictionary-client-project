import axios from "axios";

export default {
  state: {
    API_URL: "https://serverexamensarbete.herokuapp.com/api",
    token: "",
    user: [],
    error: "",
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    registerUser(state, user) {
      state.error = "";
      state.user = user;
    },
    registerError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async registerUser(ctx, userDetails) {
      ctx.commit("registerError", "");
      const response = await fetch(ctx.state.API_URL + "/user/register", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status == 200) {
        ctx.commit("registerUser", data.user);
      } else {
        ctx.commit("registerError", data.message);
      }
    },
    async login(ctx, userDetails) {
      ctx.commit("registerError", "");
      return axios
        .post(ctx.state.API_URL + "/user/login", JSON.stringify(userDetails), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          if (response.status == 200) {
            ctx.commit("registerUser", data.user);
            ctx.commit("updateToken", data.token);
          } else {
            ctx.commit("registerError", data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("registerError", "User not autorized");
          } else {
            ctx.commit("registerError", "Please try again later");
          }
        });
    },

    async logout(ctx, userDetails) {
      ctx.commit("registerError", "");
      return axios
        .post(ctx.state.API_URL + "/user/logout", JSON.stringify(userDetails), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + ctx.state.token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (response.status == 200) {
            ctx.commit("updateToken", "");
            ctx.commit("registerUser", []);
          } else {
            ctx.commit("registerError", data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("registerError", "User not autorized");
          } else {
            ctx.commit("registerError", "Please try again later");
          }
        });
    },

    async updatePassword(ctx, data) {
      ctx.commit("registerError", "");

      return axios
        .post(
          ctx.state.API_URL + "/user/updateUserPassword",
          { newPassword: data.newPassword, user: JSON.stringify(data.user) },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + ctx.state.token,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          if (response.status != 200) {
            ctx.commit("registerError", data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("registerError", "User not autorized");
          } else {
            ctx.commit("registerError", "Please try again later");
          }
        });
    },
    async deleteUser(ctx, userDetails) {
      ctx.commit("registerError", "");
      return axios
        .post(
          ctx.state.API_URL + "/user/deleteUser",
          JSON.stringify(userDetails),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + ctx.state.token,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          if (response.status == 200) {
            ctx.commit("registerUser", []);
            ctx.commit("updateToken", data.token);
          } else {
            ctx.commit("registerError", data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            ctx.commit("registerError", "User not autorized");
          } else {
            ctx.commit("registerError", "Please try again later");
          }
        });
    },
  },
  modules: {},
};
