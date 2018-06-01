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
          <ul class="content_ul" v-for="item in content">
            <li v-for='sub in (Object.keys(item))'>{{item[sub]}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Bomb from '@/httpData/Bomb_box'
import {
  mapState
} from 'vuex';
export default {
  data() {
    return {
      titleData: [],
      content: []
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
      this.content = Bomb.content
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
