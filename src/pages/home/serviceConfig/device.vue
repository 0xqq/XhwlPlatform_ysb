<template>
<div class="device">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="device-nav">
    <button class="btn" @click="modifu('')">
				<span>+</span>
				新建设备监控</button>
    <div class="img-time">
      <div class="date_time">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="el_picker">
          </el-date-picker>
        </div>
      </div>
      <div class="date-device">
        <div>
          <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
            <el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
              <el-option label="配置名称" value="1"></el-option>
              <el-option label="设备类型" value="2"></el-option>
              <el-option label="设备名称" value="3"></el-option>
              <el-option label="接收人" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </div>
      </div>
      <input type="button" value="搜索" class="bttn">
      <img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
    </div>
  </div>
  <div class="table">
    <table id="tableExcel" cellspacing="0" cellpadding="0">
      <thead class="table_thead">
        <tr class="nav_table">
          <th class="left_none">序号</th>
          <th> 配置名称</th>
          <th> 配置日期</th>
          <th> 监控对象类型</th>
          <th> 监控对象名称</th>
          <th> 报警阈值</th>
          <th> 触发动作</th>
          <th> 推送方式</th>
          <th> 接收人</th>
          <th> 推送内容</th>
          <th> 操作</th>
        </tr>
      </thead>
      <tbody class="table_body">
        <tr v-for='(d, index) in  value' :key="index" class="center_table">
          <td>{{d.序号}}</td>
          <td>{{d.配置名称}} </td>
          <td>{{d.配置日期}}</td>
          <td>{{d.监控对象类型}}</td>
          <td>{{d.监控对象名称 }}</td>
          <td>{{d.报警阈值}}</td>
          <td>{{d.触发动作}}&nbsp</td>
          <td>{{d.推送方式}}&nbsp</td>
          <td>{{d.接收人}}</td>
          <td>{{d.推送内容}}</td>
          <td class="btn_center">
            <button class="btn1" @click="modifu(d)">修改</button>
            <button class="btn2" @click="show_model(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="pager">
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
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
import {
  mapState,
  mapMutations
} from 'vuex'
export default {

  data() {
    return {
      abc: ['业务配置', '工程业务配置', '设备监控阀值配置'],
      pageIndex: '1',
      modifyvue: null,
      box_model: false,
      keepIndex: null,
      currentPage2: 5,
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
        path: '/config/projectcfg/device/new',
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
      const url = this.mnUrl + "/tmp/config/iot/device"
      console.log('url', url)
      this.$http.get(url).then(res => {
        this.value = res.body.content;
        console.log(res);
      }, function(error) {
        console.log(error)
      })
    },
    loadMore() {},
    derivedForm(tableExcel) {
      this.$func.method5(tableExcel)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin'; // element_ui样式
.el-select .el-input {
	width: 110px;
} // 整个大框
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
			line-height: 0.3rem;
			margin: 0.13rem 0 0 0.15rem;
			@include btn(1.41rem, 0.36rem);
			span {
				display: inline-block;
				font-size: 0.24rem;
				color: #fff;
			}
		} //导航栏右边的日历搜索等框
		.img-time {
			display: inline-block;
			height: 0.6rem;
			width: auto;
			position: relative;
			margin-bottom: 0.1rem;
			float: right;
			.date_time {
				display: inline-block;
				width: 2.58rem;
				height: 0.4rem;
				color: #67bce9;
				outline: none;
				margin-right: 0.2rem;
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
				width: 4.65rem;
				background: transparent;
				color: #67bce9;
				vertical-align: middle;
				font-size: 0.14rem;
				.place {
					font-size: 0.14rem;
				}
			} // 搜索按钮
			.bttn {
				margin: 0.16rem 0.15rem 0 0;
				@include btn(0.8rem, 0.3rem)
			}
			img {
				width: 0.21rem;
				height: 0.21rem;
				margin-right: 0.15rem;
				@include aa;
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
			@include btn(0.91rem, 0.36rem)
		}
		.btn2 {
			@include btnX(0.91rem, 0.36rem);
		}
	}

	.table {
		width: 100%;
		height: 7rem;
		background-image: url(../../../images/kaimen.png);
		background-size: 100% 100%;
		overflow: hidden;
		scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
		scrollbar-face-color: #184e7a; // 滚动条整体颜色
		scrollbar-track-color: #12253d;
		scrollbar-arrow-color: #12253d;
		table {
			width: 100%;
			height: 6.7rem;
			border: 0;
			.table_thead {
				display: inline-block;
				width: 100%;
				height: 0.4rem;
				overflow: hidden;
				background-color: #184e7a;
				.nav_table {
					width: 100%;
					height: 0.4rem;
					text-align: center;
					overflow: hidden;
					background-image: url(../../../images/kaimenNav.png);
					background-size: 100% 100%;
					display: flex;
					align-items: center;
					th {
						flex: 1;
						width: 0.6rem;
						height: 0.4rem;
						line-height: 0.4rem;
						border-left: 2px solid #698499;
						display: inline-block;
						font-size: 0.12rem;
					}
					th:last-child{
						border-right:2px solid #698499;
					}
					.left_none {

					}
				}
			}
			.table_body {
				display: inline-block;
				width: 100%;
				height: 6.7rem;
				overflow: hidden;
				overflow-y: scroll;
				.center_table {
					display: flex;
					align-items: center;
					justify-content: space-around;
					border-bottom: 2px solid #698499;
					td {
						flex: 1;
						padding: 0.2rem 0;
						text-align: center;
						display: inline-block;
					}
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
				}
			}
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
	.pager {
		float: right;
		margin-top: 0.2rem;
	}
}
</style>
