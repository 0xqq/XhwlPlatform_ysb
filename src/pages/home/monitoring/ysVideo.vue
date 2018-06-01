<template>
<div class="ys-container">
  <!--面包导航组件-->
  <Bread :breadData="abc"></Bread>
    <video id="myPlayer" poster=""controls playsInline webkit-playsinline autoplay>
    <source src="rtmp://rtmp.open.ys7.com/openlive/f6e56ad41968499f8453a07374075851.hd" type="" />
    <source src="http://hls.open.ys7.com/openlive/f6e56ad41968499f8453a07374075851.hd.m3u8" type="application/x-mpegURL" />
    <!-- <source src="rtmp://rtmp.open.ys7.com/openlive/f6e56ad41968499f8453a07374075851" type="" />
    <source src="http://hls.open.ys7.com/openlive/f6e56ad41968499f8453a07374075851.m3u8" type="" /> -->
  </video>
  <div class="operate_btns">
    <el-button @click="capture">抓拍</el-button>
  </div>
  <div class="show_content">
    <ul class="show_photo">
      <li class="photo_item" v-for="(item, index) in photoList">
        <img :src="item"/>
        <div class="img_operate">
          <a :href="item" target="_blank">+</a>
          <b @click="photoList.splice(index, 1)">x</b>
        </div>
        <el-button @click="textIdentify(item)">文字识别</el-button>
        <ul class="show_word">
          <li v-for="(item, index) in identifyWords">{{item}}</li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import Bread from '@/components/common/bread'
import { setSession, getSession} from '@/script/util'
require('@/config/yingshi.js')
export default {
  data() {
    return {
      abc: ['物联监控', '视频物联监控', '点击预览', '实时预览'],
      ysUrl: '',
      appKey: 'f92a4af56fdd4f47ad9947b015f90a64',
      appSecret: 'fe4e9d44fd8c6d32f40f6f99c9a2accc',
      accessToken: '',
      player: '',
      deviceSerial: '', // 设备序列号
      channelNo: '1', // 通道号，默认为1
      photoList: [],  // 图片展示集
      identifyWords: [] // 文字识别数组
    }
  },
  mounted() {
    this.player = new EZUIPlayer('myPlayer');
    this.ysUrl = this.apis.ysUrl
    this.getDeviceInfo()
    this.getYsToken()
  },
  components: {
    Bread
  },
  methods: {
    getDeviceInfo() {
      this.appKey = 'f92a4af56fdd4f47ad9947b015f90a64'
      this.appSecret = 'fe4e9d44fd8c6d32f40f6f99c9a2accc'
      this.deviceSerial = '137235349'
    },
    getYsToken() {
      this.accessToken = getSession('ysToken')
      if (!this.accessToken) {
        var obj = {
          appKey: this.appKey,
          appSecret: this.appSecret
        }
        this.$post('/api/lapp/token/get', obj, this.ysUrl).then((res) => {
          var data = res.data
          if (data.code === '200') {
            this.accessToken = data.data.accessToken
            setSession('ysToken', this.accessToken)
          }
        })
      }
      console.log('ysToken', this.accessToken)
    },
    // 图片抓取
    capture() {
      var obj = {
        accessToken: this.accessToken,
        deviceSerial: this.deviceSerial,
        channelNo: this.channelNo
      }
      this.$post('/api/lapp/device/capture', obj, this.ysUrl).then((res) => {
        if (res.data.code === '200') {
          var capturePhoto = res.data.data.picUrl
          this.photoList.push(capturePhoto)
          console.log('photoList', this.photoList)
        }
      })
    },
    // 文字识别
    textIdentify(url) {
      var obj = {
        accessToken: this.accessToken,
        dataType: 0,
        image:url
      }
      this.$post('/api/lapp/intelligence/ocr/generic', obj, this.ysUrl).then((res) => {
        if (res.data.code === '200') {
          var data = res.data.data
          this.identifyWords = data.words
          console.log('words', this.identifyWords)
        }
      })
    }
  }
}
</script>
<!--

<script src="../../script/playView.js" type="text/javascript"></script> -->

<style lang="scss" scoped>@import 'src/style/mixin';
.ys-container {
  height: 100%;
  overflow-y: auto;
  #myPlayer{
    width: 90%;
  }
  .operate_btns {
    margin: 20px 0;
  }
  .show_content {
    .show_photo {
      .photo_item {
        width: 220px;
        height: 150px;
        margin: 10px;
        display: inline-block;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .img_operate {
          position: absolute;
          right: 0;
          top: 0;
          a,b {
            margin:2px;
          }
        }
        .show_word {
          li {
            line-height: 16px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
