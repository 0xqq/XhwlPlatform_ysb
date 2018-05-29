<template>
  <div class="login">
    <div class="stopAnimation" v-if="showMoution">
      <div class="plain" v-show="showplain">
        <img src="../../images/airship.png" alt="">
      </div>
    </div>
    <div>
      <div class="login-img" v-if="!showMoution">
        <div class="login-small">
          <div class="xmind_img"></div>
          <form>
            <input class="usename" type="text" value="login" v-model="login" placeholder="员工账号">
            <input class="password" type="password" value="password" v-model="password" placeholder="输入密码"></br>
            <button class="bttn" @click.prevent="toLogin()">
              <span></span>
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      showMoution: true,
      showplain: false,
      getImgUrl: '', //存数据接口
      login: 'copm_iot',
      password: '12345678'
    }
  },
  computed: {
    ...mapState([
      'token', 'mnUrl'
    ])
  },
  components: {
  },
  created() {
  },
  mounted() {
    var stopAmn = this;
    setInterval(function() {
      stopAmn.showplain = true;
    }, 200)
    setInterval(function() {
      stopAmn.showMoution = false;
    }, 3000)
  },
  methods: {
    toLogin() {
      if (this.login && this.password) {
        this.$http.post('http://202.105.104.105:5051/api/v1/login', { "account": this.login, "password": this.password }).then(res => {
          // console.log(res);
          //           alert(' ' + this.login+ ' ' +this.password);
          this.$store.commit('GET_TOKEN', res.body.content);
          this.$router.push({ path: '/realHome' })
        })
      } else {
        alert("请输入账号或密码！");
      }
    },
    toGet() {
      this.$http.get('http://202.105.104.105:5051/api/v1/user/token/' + this.token, { "token": this.token }).then(res => {
        console.log(res);
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/mixin';
* {
  margin: 0;
  padding: 0;
}

.login {
  width: 19.20rem;
  height: 10.80rem; // 初始页的大背景图
  background: url(../../images/statr.png) center no-repeat;
  background-size: 100% 100%; // overflow: hidden;
  .stopAnimation {
    background: url(../../images/statr.png)center no-repeat;
    background-size: cover;
    width: 19.20rem;
    height: 10.80rem; // 飞船的样式
    // overflow: hidden;
    .plain {

      // position: absolute;
      // right: 0;
      // bottom: 0;
      img {
        transform: scale(0.01);
        position: absolute;
        right: 0rem;
        bottom: 0rem; // transform: scale(0.1);
        animation: mysTatr 3s cubic-bezier(0.8, 0.5, 0.3, 0.1) forwards;
      }
    }
  } // 登录页的大背景图
  .login-img {
    width: 19.20rem;
    height: 10.80rem; // overflow: hidden;
    .login-small {
      width: 5.66rem;
      height: 3.48rem;
      background: url(../../images/login.png) center no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1.425rem;
      margin-left: -2.93rem;
      padding: 0.5rem 0.5rem 0.3rem 0.5rem;
      animation: fideInout 3s linear forwards;
      .xmind_img {
        width: 1.89rem;
        height: 0.49rem;
        margin: 0 auto;
        background: url(../../images/x_mind.png);
        margin-top: -0.1rem;
        margin-bottom: 0.3rem;
        background-size: 100% 100%;
      }
      h4 {
        font-size: 0.20rem;
        color: #fff;
        margin-bottom: 0.55rem;
        color: #fff;
      }
      input::-ms-clear{display:none;}
      input {
        width: 3.04rem;
        height: 0.36rem;
        margin-bottom: 0.28rem;
        border-radius: 0.15rem;
        background-color: transparent;
        color: #fff;
        font-size: 0.12rem;
        background-image: url(../../images/ipt_img1.png);
        background-size: 100% 100%;
        outline: none;
        padding-left: 0.2rem;
      }
      input::-webkit-input-placeholder {
        color: #fff;
        text-align: center;
      } // 用户名   
      .bttn {
        width: 3.04rem;
        height: 0.36rem;
        border-radius: 0.05rem;
        color: #83dbff;
        background-image: url(../../images/ipt_img2.png);
        background-size: 100% 100%;
        cursor: pointer;
        border-radius: 0.15rem;
        background-color: transparent;
        font-weight: bold;
        outline: none;
        padding-top: 0.05rem;
        span {
          width: 0.5rem;
          height: 0.27rem;
          display: inline-block;
          background-image: url(../../images/login_text.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .showLogin {
    font-size: 0!important;
    background-image: url(../../images/back_glass.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 10.80rem;
    width: 19.20rem;
    text-align: left;
    display: flex;
    position: relative;
    padding-right: 0.23rem;
    padding-left: 0.24rem;
  }
}

// 飞船动画
@keyframes mysTatr {
  0% {
    transform: translate(3rem, 4rem) scale(0.1);
  }
  100% {
    transform: translate(-20rem, -10rem) scale(2);
  }
}

@keyframes fideInout {
  0% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.9;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
