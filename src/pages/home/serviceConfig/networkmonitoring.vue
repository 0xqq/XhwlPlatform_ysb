<template>
<div class="device">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="device-nav">
    <button class="btn" @click="modifu('')">
				<span>+</span>
				新建网络监控</button>
    <div class="img-time">
      <div class="date-time">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="el_picker">
          </el-date-picker>
        </div>
      </div>
      <div class="date-device">
        <div>
          <el-input placeholder="请输入内容" v-model="input5" class="place">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </div>
      </div>
      <input type="button" value="搜索" class="bttn">
    </div>
  </div>
  <!--顶部导航-->
  <ul class="content_divNav">
    <li class="serial1">序号</li>
    <li>配置名称</li>
    <li>配置日期</li>
    <li>监控对象类型</li>
    <li>监控对象名称 </li>
    <li>报警阀值</li>
    <li>触发动作</li>
    <li>推送方式</li>
    <li>接收人</li>
    <li>推送内容</li>
    <li class="operation">操作&nbsp&nbsp</li>
  </ul>
  <!--中间内容-->
  <div class="content_div">
    <ul class="ul_list" v-for='(d, index) in  value'>
      <li>{{d.序号}}</li>
      <li>{{d.配置名称}}</li>
      <li>{{d.配置日期}}</li>
      <li>{{d.监控对象类型}}</li>
      <li>{{d.监控对象名称}}</li>
      <li>{{d.报警阈值}}</li>
      <li>{{d.触发动作}}</li>
      <li>{{d.推送方式}}</li>
      <li>{{d.接收人}}</li>
      <li>{{d.推送内容}}</li>
      <li class="btn_center">
        <button class="btn1" @click="modifu(d)">修改</button>
        <button class="btn2" @click="show_model(index)">删除</button>
      </li>
    </ul>
  </div>
  <!--底部每页显示-->
  <div class="page">
    <span>每页显示</span>
    <select class="select">
				<option value="A">10</option>
				<option value="B">20</option>
				<option value="C">30</option>
			</select>
    <div class="pageDiv">
      <img src="../../../images/left_select.png" />
      <span>1/1</span>
      <img src="../../../images/right_select.png" />
    </div>
  </div>
  <!--点击删除出现的模态框-->
  <div class="box_model" v-if="box_model">
    <p>确 认 删 除</p>
    <button @click="removeTode(keepIndex)">确认</button>
    <button class="btn2" @click="cancal">取消</button>
  </div>
</div>
</template>
<script>
import Bread from '@/components/common/bread'
import networKmonitoring from '@/httpData/networKmonitoring'
import { format, gapTime } from '@/script/timeFormat.js'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      abc: ['业务配置', '物联业务', '物联监控阀值配置'],
      modifyvue: null,
      box_model: false,
      keepIndex: null,
      input5: '',
      select: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value6: '',
      value: []


    }
  },
  computed: {
    ...mapState([
      'token', 'mnUrl'
    ])
  },
  components: {
    Bread
  },
  mounted() {},
  created() {

    this.getDate();

  },
  methods: {
    modifu(d) {
      this.modifyvue = d;
      this.$router.push({
        path: '/newnetworkmonitoring',
        query: {
          value: this.modifyvue
        }
      });
    },
    removeTode(keep) {
      this.value.splice(keep, 1);
      this.box_model = false;
    },
    show_model(index) {
      this.keepIndex = index;
      this.box_model = true;
    },
    cancal() {
      this.box_model = false;
    },
    getDate() {
      this.value = networKmonitoring.content
      this.value.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 2) * 86400000 //
        item.配置日期 = format(time1, 'yyyy-MM-dd HH:mm:ss')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// element_ui样式
.el-select .el-input {
	width: 110px;
}

// 整个大框
.device {
	vertical-align: top;
	width: 100%;
	height: 8.96rem; // display: inline-block;
	margin: 0 auto;
	position: relative;
	.device-nav {
		height: 0.6rem;
		width: 100%;
		background: url(../../../assets/kaimenNav.png)no-repeat;
		background-size: 100% 100%;
		padding-bottom: 0.5rem;
		margin-bottom: 0.08rem;
		.btn {
			margin: 0.13rem 0 0 0.15rem;
			line-height: 0.33rem;
			@include btn(1.41rem, 0.36rem);
			span {
				display: inline-block;
				font-size: 0.24rem;
				color: #fff;
			}
		}
		.img-time {
			display: inline-block;
			height: 0.6rem;
			width: auto; // float: right; // line-height: 0.1rem;
			// margin-right: 0.3rem;
			position: relative;
			margin-bottom: 0.1rem;
			float: right;
			.date-time {
				display: inline-block;
				width: 2.58rem;
				height: 0.4rem;
				color: #67bce9;
				outline: none;
				vertical-align: middle; // margin-top:0.05rem;
				.el_picker {
					display: inline-block;
					width: 2.58rem;
					height: 0.4rem;
					font-size: 0.14rem;
				}
			}
			.search {
				display: inline-block;
				width: 0.2rem;
				height: 0.2rem;
				background: url(../../../assets/search.png)no-repeat;
				background-size: 100% 100%;
				margin-left: -0.3rem;
				@include aa;
			} // 配置名称框
			.date-device {
				display: inline-block;
				height: 0.4rem;
				width: 3.65rem;
				background: transparent;
				color: #67bce9;
				vertical-align: middle;
				.place {
					font-size: 0.14rem;
				}
			} // 搜索按钮
			.bttn {
				margin: 0.16rem 0.15rem 0 0;
				@include btn(0.9rem, 0.3rem);
			}
		}
	} // 点击删除弹出的模态框
	.box_model {
		background: url(../../../images/box_model.png) no-repeat;
		width: 4.04rem;
		height: 1.97rem;
		@include center;
		p {
			color: #fff;
			font-size: 0.2rem;
			text-align: center;
			padding-top: 0.5rem;
		}
		button {
			margin-top: 0.3rem;
			margin-left: 0.75rem;
			@include btn(0.91rem,
			0.36rem)
		}
		.btn2 {
			@include btnX(0.91rem,
			0.36rem)
		}
	}
	.content_div {
		background-image: url(../../../images/kaimen.png);
		width: 100%;
		height: 6.20rem;
		overflow: auto; // 三角箭头的颜色
		scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
		scrollbar-face-color: #184e7a; // 滚动条整体颜色
		// scrollbar-highlight-color: #333;
		// 滚动条阴影
		// scrollbar-shadow-color: #ccc;
		// 滚动条轨道颜色·································································	··································································
		scrollbar-track-color: #12253d;
		scrollbar-arrow-color: #12253d;
	}
	.content_divNav {
		display: flex;
		height: 0.4rem;
		width: 100%;
		background-image: url(../../../images/kaimenNav.png);
		.serial1 {
			border-left: none;
		}
		li {
			float: left;
			text-align: center; // flex-shrink: auto;
			flex: 1;
			height: 0.4rem;
			line-height: 0.4rem;
			color: white;
			border-left: 2px solid #698499; // font-size:0.12rem;
			font-size: 0.18rem;
		}
	}
	/*表格主体内容*/
	.ul_list {
		float: left;
		flex: 1;
		display: flex;
		width: 100%;
		.btn_center {
			button {
				background: transparent;
				border: 0rem;
				@include aa;
				outline: none;
			}
			.btn1 {
				color: #fff;
				margin-left: 0.25rem;
			}
			.btn2 {
				color: red; // margin-left: 0.2rem;
				padding-left: 0.05rem;
			}
		}
		li {
			flex: 1;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			// line-height: 1rem;
			text-align: center; // line-height: 1.166rem;
			color: white;
			border-bottom: 2px solid #698499;
			font-size: 0.16rem;
			padding: 0.2rem 0;

		}
	}
	/*底部换页框*/
	.page {
		line-height: 0.6rem;
		width: 2.7rem;
		height: 0.6rem;
		background-image: url(../../../images/page.png);
		background-position: center;
		float: right;
		margin-top: 0.2rem;
		margin-right: 0.25rem;
	}
	.page>span {
		color: #70ccfc;
		margin-left: 0.2rem;
	}
	.select {
		text-align: center;
		width: 0.61rem;
		height: 0.35rem;
		background: darkgray;
		background-image: url(../../../images/kaimen.png);
		color: white;
	}
	.pageDiv {
		display: inline-block;
		margin-left: 0.15rem;
		margin:0 auto;
		span {
			color: #83dbff;
			margin: 0 0.15rem;
		}
		img {
			width: 0.1rem;
			height: 0.22rem;
			@include aa;
		}
	}
	select {
		/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
		/*很关键：将默认的select选择框样式清除*/
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		background: transparent;
		/*在选择框的最右侧中间显示小箭头图片*/
		background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
		/*为下拉小箭头留出一点位置，避免被文字覆盖*/
		padding-right: 14px;
	}

	select::-ms-expand {
		display: none;
	}
}
</style>
