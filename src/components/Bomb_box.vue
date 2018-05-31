<template>
<div class="modal">
  <div class="modal-content">
    <div class="table_title">
      <span>联网项目详情</span>
      <button class="modal-close" @click="$emit('fireclose')">x</button>
    </div>
    <div class="table">
      <ul class="table_top">
        <li v-for="title in titleData" class="top_li">{{title}}</li>
      </ul>
      <div class="table_body">
        <div class="table_content">
          <ul class="content_ul">
            <li v-for='content in contentData1'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData2'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData3'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData4'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData5'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData6'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData7'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData8'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData9'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData10'>{{content}}</li>
          </ul>
          <ul class="content_ul">
            <li v-for='content in contentData11'>{{content}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
export default {
  data() {
    return {
      titleData: ["城市", "项目名称", "联网子平台数量", "停车场子平台", "门禁子平台", "云瞳子平台", "巡更子平台", "机房监控子平台", "周界防范子平台", "云环控平台", "智能家居平台"],
      contentData1: ["北京", "中海紫玉苑", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData2: ["广州", "中海云麓公馆", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData3: ["上海", "中建府邸", "5", "√", "√", "√", "", "√", "", '', ''],
      contentData4: ["大连", "中海紫御观邸", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData5: ["西安", "中海御湖", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData6: ["长春", "中海紫御华府", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData7: ["成都", "中海城南华府", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData8: ["重庆", "紫御江山", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData9: ["佛山", "千灯湖一号", "7", "√", "√", "√", "√", "√", "√", '√', ''],
      contentData10: ["深圳", "中海华庭", "6", "√", "√", "√", "√", "√", "√", '', ''],
      contentData11: ["深圳", "兴海物联测试中心", "8", "√", "√", "√", "√", "√", "√", '√', '√']
    }
  },
  computed: {
    ...mapState(['mnUrl']),
  },
  components: {

  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.titleData = ["城市", "项目名称", "联网子平台数量", "停车场子平台", "门禁子平台", "云瞳子平台", "巡更子平台", "机房监控子平台", "周界防范子平台", "云环控平台", "智能家居平台"],
      this.contentData1 = ["北京", "中海紫玉苑", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData2 = ["广州", "中海云麓公馆", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData3 = ["上海", "中建府邸", "5", "√", "√", "√", "", "√", "", '', ''],
      this.contentData4 = ["大连", "中海紫御观邸", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData5 = ["西安", "中海御湖", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData6 = ["长春", "中海紫御华府", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData7 = ["成都", "中海城南华府", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData8 = ["重庆", "紫御江山", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData9 = ["佛山", "千灯湖一号", "7", "√", "√", "√", "√", "√", "√", '√', ''],
      this.contentData10 = ["深圳", "中海华庭", "6", "√", "√", "√", "√", "√", "√", '', ''],
      this.contentData11 = ["深圳", "兴海物联测试中心", "8", "√", "√", "√", "√", "√", "√", '√', '√']
    }
  }
}
</script>

<style style lang="scss" scoped>@import 'src/style/mixin';

.modal {
    position: absolute;
    z-index: 10000;
    width: 100%;
    height: 8.95rem;
    background-image: url("../images/box_back.png");
}
/*关闭按钮*/
.modal-close {
    color: white;
    width: 0.6rem;
    height: 0.5rem;
    background: rgba(255,255,255,0);
    font-size: 0.40rem;
    float: right;
    // @include cl(0.3rem);
    @include aa;
}
/*内容区域*/
.modal-content {
    width: 13.93rem;
    height: 7.48rem;
    margin: 0.75rem auto 0;
}
.table_title {
    width: 13.93rem;
    height: 0.6rem;
    background-image: url("../images/title_box.png");
    text-align: center;
    line-height: 0.6rem;
    span {
        font-size: 0.25rem;
        color: white;
    }
}
.table {
    width: 100%;
    height: 6.80rem;
    margin-top: 0.08rem;
}
.table_top {
    width: 13.93rem;
    height: 0.45rem;
    background-image: url("../images/table_top.png");
    display: flex;
    border-bottom: 0.01rem solid #447399;
    .top_li {
        flex: 1;
        color: #fff;
        height: 0.45rem;
        text-align: center;
        line-height: 0.45rem;
        border-left: 0.01rem solid #447399;
    }
}
.table_top li:nth-of-type(1) {
    border-left: 0;
}
.table_body {
    width: 100%;
    height: 6.35rem;
    background-image: url("../images/table_body.png");
}
.table_content {
    width: 100%;
    height: 6.2rem;
    overflow: hidden;
}
.content_ul {
    display: flex;
    width: 100%;
    height: 0.55rem;
    li {
        flex: 1;
        color: #fff;
        text-align: center;
        line-height: 0.45rem;
        border-left: 0.015rem solid #447399;
        border-bottom: 0.015rem solid #447399;
        font-size: 0.14rem;
    }
}
.content_ul li:nth-of-type(1) {
    border-left: 0;
}
</style>
