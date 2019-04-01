<template>
  <div>
    <div class="loginpanel">
      <form action="/login" method="post">
        <div class="txt">
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            v-model="credentials.username"
            required
          >
          <label for="username" class="entypo-user"></label>
        </div>
        <div class="txt">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            v-model="credentials.password"
            required
          >
          <label for="password" class="entypo-lock"></label>
        </div>
        <div class="red" v-if="showMessage">
          {{message}}
          <i class="fas fa-times-circle"></i>
        </div>

        <div class="buttons">
          <input type="submit" value="Login">
          <span>
            <a
              href="javascript:void(0)"
              @click="register()"
              class="entypo-user-add register"
            >Register</a>
          </span>
        </div>
      </form>
      <div class="hr">
        <div></div>
        <div>OR</div>
        <div></div>
      </div>

      <div class="social">
        <a href="javascript:void(0)" class="facebook"></a>
        <a href="javascript:void(0)" class="twitter"></a>
        <a href="javascript:void(0)" class="googleplus"></a>
      </div>
    </div>

    <!-- <span class="resp-info"></span> -->
    <i class="far fa-times-circle"></i>
  </div>
</template>

<script>
import userServices from "../services/userServices.js";
export default {
  name: "login",
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      message: null,
      showMessage: false
    };
  },
  methods: {
    register() {
      this.$router.push({ name: "register" });
    }
  },
  created() {
    console.log(this.$route);
    if (this.$route.query.success === "new-user") {
      this.showMessage = true;
      this.message = "Please login";
    } else if (this.$route.query.faliure === "faliure") {
      this.showMessage = true;
      this.message = "Wrong username or password!";
    }
  }
};
</script>

<style lang="scss" scoped>
// @import url(https://fonts.googleapis.com/css?family=Ubuntu|Courgette);
@import url(http://weloveiconfonts.com/api/?family=entypo);
$green: #2ecc71;
$green-dark: #27ae60;
$facebook: #3b5998;
$twitter: #56b4ef;
$googleplus: #dd4b39;
// @import url(https://fonts.googleapis.com/css?family=Ubuntu|Courgette);
@import url(http://weloveiconfonts.com/api/?family=entypo);
$green: #2ecc71;
$green-dark: #27ae60;
$facebook: #3b5998;
$twitter: #56b4ef;
$googleplus: #dd4b39;
[class*="entypo-"]:before {
  font-family: "entypo", sans-serif;
}
* {
  font-family: "Ubuntu", sans-serif;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
  backface-visibility: hidden;
}
html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  background: url(https://subtlepatterns.com/patterns/tweed.png);
  transition: all 0s;
}
div.loginpanel {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: fade(#ddd, 60%);
  border-radius: 4px;
  box-shadow: 0 0 5px 1px #333;

  a.register {
    color: #444;
    text-decoration: none;
    transition: all 0s;
    &:before {
      padding-right: 6px;
    }
    &:hover {
      color: $green;
      text-shadow: 0 1px #555;
    }
    &:active {
      text-shadow: 0 -1px #555;
      transform: translateY(2px);
    }
  }
  input {
    width: 100%;
    margin: 8px 0px;
    padding: 12px;
  }
  div.txt {
    position: relative;
    input[type="text"],
    input[type="password"] {
      color: #555;
      text-shadow: 0 1px #fff;
      padding: 12px 12px 12px 45px;
      border: 1px solid #888;
      border: 2px solid transparent;
      border-radius: 4px;
      outline: none;
      background-color: fade(#fff, 80%);
      &:hover,
      &:focus {
        background-color: #fff;
      }
      &:focus {
        border-color: $green-dark;
      }
    }
    label {
      cursor: text;
      &:before {
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 0px;
        font-family: "entypo", sans-serif;
        font-size: 1.1em;
        color: $green;
        line-height: 58px;
        text-align: center;
        width: 50px;
        height: 50px;
      }
    }
  }
  div.buttons {
    display: flex;
    input {
      flex: 1;
      width: 100%;
    }
    span {
      a {
        display: inline-block;
        vertical-align: middle;
        padding: 0 15px;
        line-height: 70px;
        text-align: center;
      }
    }
  }
  input[type="button"] {
    cursor: pointer;
    color: #fff;
    text-shadow: 0 1px $green-dark;
    font-size: 1.2em;
    border: 0 none;
    border-radius: 4px;
    outline: none;
    background-color: $green;
    box-shadow: 0 2px $green-dark, inset 0 0 $green-dark;
    &:hover,
    &:focus {
      background-color: darken($green, 5%);
      box-shadow: 0 2px darken($green-dark, 5%), inset 0 0 $green-dark;
    }
    &:active {
      box-shadow: 0 0 darken($green-dark, 5%),
        inset 0 1px darken($green-dark, 5%);
      transform: translateY(2px);
      transition: all 0s;
    }
  }
  div.social {
    display: flex;
    margin-bottom: 10px;
    a {
      display: inline-block;
      flex: 1;
      text-align: center;
      text-decoration: none;
      outline: none;
      &:before {
        display: inline-block;
        padding: 0;
        font-family: "entypo", sans-serif;
        font-size: 2em;
        color: #444;
        line-height: 50px;
        text-align: center;
        text-shadow: 0 1px fade(#fff, 40%);
        transition: all 0.2s ease-out;
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      &:hover:before,
      &:focus:before {
        color: #fff;
        transition: all 0.2s ease-out, box-shadow 0.3s ease-out 0.1s;
      }
      &:active:before {
        transform: scale(0.9);
        transition: all 0s;
      }
      &.facebook {
        &:before {
          content: "\f30c";
        }
        &:hover:before,
        &:focus:before {
          text-shadow: 0 1px darken($facebook, 20%);
          background-color: $facebook;
          box-shadow: 0 0 0 4px fade($facebook, 60%);
        }
        &:active:before {
          box-shadow: 0 0 0 4px fade($facebook, 60%), 0 0 0 4px #333,
            0 1px 0 4px fade(#fff, 60%);
        }
      }
      &.twitter {
        &:before {
          content: "\f309";
        }
        &:hover:before,
        &:focus:before {
          text-shadow: 0 1px darken($twitter, 20%);
          background-color: $twitter;
          box-shadow: 0 0 0 4px fade(darken($twitter, 10%), 60%);
        }
        &:active:before {
          box-shadow: 0 0 0 4px fade($twitter, 60%), 0 0 0 4px #333,
            0 1px 0 4px fade(#fff, 60%);
        }
      }
      &.googleplus {
        &:before {
          content: "\f30f";
        }
        &:hover:before,
        &:focus:before {
          text-shadow: 0 1px darken($googleplus, 20%);
          background-color: $googleplus;
          box-shadow: 0 0 0 4px fade($googleplus, 60%);
        }
        &:active:before {
          box-shadow: 0 0 0 4px fade($googleplus, 60%), 0 0 0 4px #333,
            0 1px 0 4px fade(#fff, 60%);
        }
      }
    }
  }
  div.hr {
    display: flex;
    width: 100%;
    margin: 40px 0;
    color: #555;
    text-shadow: 0 1px fade(#fff, 40%);
    div {
      font-family: "Courgette", cursive;
      font-size: 1.2em;
      &:first-child,
      &:last-child {
        flex: 1;
        position: relative;
        &:before {
          content: " ";
          position: absolute;
          top: 50%;
          left: 0px;
          right: 0px;
          height: 1px;
          background-color: #5f5f5f;
          box-shadow: 0 1px 0 fade(#fff, 20%);
        }
      }
      &:first-child {
        margin-right: 20px;
      }
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
// .resp-info:before {
//   content: "fuck!!!";
//   position: fixed;
//   bottom: 10px;
//   left: 10px;
//   color: #f00;
// }
@media only screen and (max-width: 555px) {
  div.loginpanel {
    width: 90%;
    top: 30%;
    transform: translateY(30%);

    div.buttons {
      flex-direction: column;
      span {
        width: 100%;
        a {
          width: 100%;
          line-height: 40px;
        }
      }
    }
  }
  .resp-info:before {
    content: "max 555";
  }
}
@media only screen and (max-width: 400px) {
  div.loginpanel {
    width: 100%;
    border-radius: 0;
  }
  .resp-info:before {
    content: "max 400";
  }
}
// @import url(https://fonts.googleapis.com/css?family=Ubuntu|Courgette);
@import url(http://weloveiconfonts.com/api/?family=entypo);
$green: #2ecc71;
$green-dark: #27ae60;
$facebook: #3b5998;
$twitter: #56b4ef;
$googleplus: #dd4b39;
[class*="entypo-"]:before {
  font-family: "entypo", sans-serif;
}
* {
  font-family: "Ubuntu", sans-serif;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
  backface-visibility: hidden;
}
html,
body {
  width: 100%;
  height: 100%;

  padding: 0px;
  margin: 0px;

  background: url(https://subtlepatterns.com/patterns/tweed.png);
  transition: all 0s;
}
div.loginpanel {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(50%);
  background-color: fade(#ddd, 60%);
  border-radius: 4px;
  box-shadow: 0 0 5px 1px #333;

  a.register {
    color: #444;
    text-decoration: none;
    transition: all 0s;

    &:before {
      padding-right: 6px;
    }

    &:hover {
      color: $green;
      text-shadow: 0 1px #555;
    }

    &:active {
      text-shadow: 0 -1px #555;
      transform: translateY(2px);
    }
  }

  input {
    width: 100%;
    margin: 8px 0px;
    padding: 12px;
  }

  div.txt {
    position: relative;

    input[type="text"],
    input[type="password"] {
      color: #555;
      text-shadow: 0 1px #fff;

      padding: 12px 12px 12px 45px;

      border: 1px solid #888;
      border: 2px solid transparent;
      border-radius: 4px;
      outline: none;

      background-color: fade(#fff, 80%);

      &:hover,
      &:focus {
        background-color: #fff;
      }

      &:focus {
        border-color: $green-dark;
      }
    }

    label {
      cursor: text;

      &:before {
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 0px;

        font-family: "entypo", sans-serif;
        font-size: 1.1em;
        color: $green;
        line-height: 58px;

        text-align: center;

        width: 50px;
        height: 50px;
      }
    }
  }

  div.buttons {
    display: flex;

    input {
      flex: 1;
      width: 100%;
    }

    span {
      a {
        display: inline-block;
        vertical-align: middle;
        padding: 0 15px;
        line-height: 70px;
        text-align: center;
      }
    }
  }

  input[type="button"] {
    cursor: pointer;

    color: #fff;
    text-shadow: 0 1px $green-dark;
    font-size: 1.2em;

    border: 0 none;
    border-radius: 4px;
    outline: none;

    background-color: $green;
    box-shadow: 0 2px $green-dark, inset 0 0 $green-dark;

    &:hover,
    &:focus {
      background-color: darken($green, 5%);
      box-shadow: 0 2px darken($green-dark, 5%), inset 0 0 $green-dark;
    }

    &:active {
      box-shadow: 0 0 darken($green-dark, 5%),
        inset 0 1px darken($green-dark, 5%);

      transform: translateY(2px);

      transition: all 0s;
    }
  }

  div.social {
    display: flex;

    margin-bottom: 10px;

    a {
      display: inline-block;
      flex: 1;
      text-align: center;
      text-decoration: none;
      outline: none;

      &:before {
        display: inline-block;
        padding: 0;
        font-family: "entypo", sans-serif;
        font-size: 2em;
        color: #444;
        line-height: 50px;
        text-align: center;
        text-shadow: 0 1px fade(#fff, 40%);
        transition: all 0.2s ease-out;

        border-radius: 50%;

        width: 50px;
        height: 50px;
      }

      &:hover:before,
      &:focus:before {
        color: #fff;
        transition: all 0.2s ease-out, box-shadow 0.3s ease-out 0.1s;
      }

      &:active:before {
        transform: scale(0.9);

        transition: all 0s;
      }

      &.facebook {
        &:before {
          content: "\f30c";
        }

        &:hover:before,
        &:focus:before {
          text-shadow: 0 1px darken($facebook, 20%);
          background-color: $facebook;
          box-shadow: 0 0 0 4px fade($facebook, 60%);
        }

        &:active:before {
          box-shadow: 0 0 0 4px fade($facebook, 60%), 0 0 0 4px #333,
            0 1px 0 4px fade(#fff, 60%);
        }
      }

      &.twitter {
        &:before {
          content: "\f309";
        }

        &:hover:before,
        &:focus:before {
          text-shadow: 0 1px darken($twitter, 20%);
          background-color: $twitter;
          box-shadow: 0 0 0 4px fade(darken($twitter, 10%), 60%);
        }

        &:active:before {
          box-shadow: 0 0 0 4px fade($twitter, 60%), 0 0 0 4px #333,
            0 1px 0 4px fade(#fff, 60%);
        }
      }

      &.googleplus {
        &:before {
          content: "\f30f";
        }

        &:hover:before,
        &:focus:before {
          text-shadow: 0 1px darken($googleplus, 20%);
          background-color: $googleplus;
          box-shadow: 0 0 0 4px fade($googleplus, 60%);
        }

        &:active:before {
          box-shadow: 0 0 0 4px fade($googleplus, 60%), 0 0 0 4px #333,
            0 1px 0 4px fade(#fff, 60%);
        }
      }
    }
  }

  div.hr {
    display: flex;

    width: 100%;

    margin: 40px 0;

    color: #555;
    text-shadow: 0 1px fade(#fff, 40%);

    div {
      font-family: "Courgette", cursive;
      font-size: 1.2em;

      &:first-child,
      &:last-child {
        flex: 1;

        position: relative;

        &:before {
          content: " ";
          position: absolute;
          top: 50%;
          left: 0px;
          right: 0px;

          height: 1px;

          background-color: #5f5f5f;
          box-shadow: 0 1px 0 fade(#fff, 20%);
        }
      }

      &:first-child {
        margin-right: 20px;
      }

      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
// .resp-info:before {
//   content: "full";
//   position: fixed;
//   bottom: 10px;
//   left: 10px;
//   color: #f00;
// }
@media only screen and (max-width: 555px) {
  div.loginpanel {
    width: 90%;

    div.buttons {
      flex-direction: column;

      span {
        width: 100%;
        a {
          width: 100%;
          line-height: 40px;
        }
      }
    }
  }
  .resp-info:before {
    content: "max 555";
  }
}
@media only screen and (max-width: 400px) {
  div.loginpanel {
    width: 100%;
    border-radius: 0;
    top: 20%;
    transform: translateY(20%);
  }
  .resp-info:before {
    content: "max 400";
  }
}
</style>
