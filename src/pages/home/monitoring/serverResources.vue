<template>
<div class="serverResources">
  <Bread :breadData="abc"></Bread>
  <!--头部导航条-->
  <div class="nav">
    <input type="button" class="nowTime" value="实时" />
    <input type="button" class="afterTime" value="昨天" />
    <input type="button" class="customTime" value="自定义" />
    <span class="el_date_picker">
				<el-date-picker
			      v-model="value6"
			      type="daterange"
			      placeholder="选择日期范围">
		  	</el-date-picker>
			</span>
    <input type="text" class="searchBox" placeholder="请输入内容" />
    <input type="button" class="search" value="搜索" />
    <span class="searchIcon"></span>
    <span class="windowIcon" @click="method55('tableExcel')"></span>
  </div>
  <div class="table">
    <table id="tableExcel" cellspacing="0" cellpadding="0">
      <thead class="table_thead">
        <tr class="nav_table">
          <th class="left_none">ID/主机名</th>
          <th> IP地址</th>
          <th>状态</th>
          <th> CPU利用率(%)</th>
          <th>内存利用率(%)</th>
          <th>磁盘利用率(%)</th>
        </tr>
      </thead>
      <tbody class="table_body">
        <tr v-for="(d, index1) in value" :key="index1" class="center_table">
          <td>{{d["ID/主机名"]}}</td>
          <td>{{d.IP地址}}</td>
          <td>{{d.状态}}</td>
          <td>{{d.CPU占用率*1000/10}}%</td>
          <td>{{d.内存占用率*1000/10}}%</td>
          <td>{{d.磁盘占用率*1000/10}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import Bread from '@/components/common/bread'
import serverObj from '@/httpData/serverResources'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
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
      value7: '',
      show: true,
      abc: ['物联监控', '机房物联监控', '服务器资源监控'],
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
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.value = serverObj.content
    },
    method55(tableExcel) {
      this.$func.method5(tableExcel)
    },
  }
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	$padding_top: 0.1rem;
	*{
		margin: 0;
		padding: 0;
	}
	.serverResources{
		width: 100%;
		height: 8.96rem;
		display: inline-block;
	}

	.nav{
		width:100%;
		height: 0.6rem;
		background: url(../../../images/head_nav.png);
		background-size: cover;
		line-height: 0.6rem;
		position: relative;
	}
	.nav input{
		color: white;
		font-size: 0.16rem;
		border-radius: 0.05rem;
		outline: none;

	}
	.nowTime,.afterTime{
		width: 1.19rem;
		height: 0.36rem;
		background: url(../../../images/zHover.png);
		background-size: cover;
		margin-right: 0.12rem;
	}
	.nowTime{
		margin-left: 0.15rem;
	}
	.el-input{
 	}
 	.el-input__icon {
 		top: 0.012rem !important;
 	}
 	.el_date_picker{
 		position: absolute;
 		right: 5.68rem;
 	}
 	.customTime{
 		width: 1.19rem;
		height: 0.36rem;
		background: url(../../../images/zHover.png);
		background-size: cover;
 		/*margin-right: 1.96rem;*/
 	}
 	.searchBox{
 		width: 3.66rem;
 		height: 0.46rem;
 		border: 2px solid #83DBFF;
 		margin-left: 0.25rem;
 		padding-left: 0.1rem;
 		color: white;
 		background: transparent;
 		font-size: 0.16rem;
 		position: absolute;
 		right: 1.76rem;
 		top: 0.07rem;
 	}
 	input::-webkit-input-placeholder{
		color: #9a9fa5;
	}
	input:-moz--input-placeholder{
		color: #9a9fa5;
	}
	input:-ms-input-placeholder{
		color: #9a9fa5;
	}
	input:hover{
		cursor: pointer;
	}
	button:hover{
		cursor: pointer;
	}
	.searchIcon{
		display: inline-block;
		width: 0.2rem;
		height: 0.2rem;
		background: url(../../../assets/search.png)no-repeat;
		background-size:contain;
		position: absolute;
		top: 0.2rem;
		right: 1.91rem;
		@include aa;
	}
	.search{
		width: 0.9rem;
		height: 0.37rem;
		color: white;
		background: url(../../../images/zHover.png);
		background-size: cover;
		position: absolute;
		right: 0.7rem;
		top: 0.115rem;
	}
	.windowIcon{
		display: inline-block;
		width:0.21rem;
		height: 0.21rem;
		background: url(../../../images/inout.png);
		background-size: cover;
		right: 0.32rem;
		top: 0.2rem;
		position: absolute;
	}
	.table {
		margin-top:0.1rem;
        width: 100%;
        height: 6.8rem;
        background-size: 100% 100%;
        overflow: hidden;
        scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
        scrollbar-face-color: #184e7a; // 滚动条整体颜色
        // scrollbar-highlight-color: #333;
        // 滚动条阴影
        // scrollbar-shadow-color: #ccc;
        // 滚动条轨道颜色·································································	··································································
        scrollbar-track-color: #12253d;
        scrollbar-arrow-color: #12253d;
        table {
            width: 100%;
            height: 6.2rem;
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
                    }
                    .left_none {
                        border-left: none;
                    }
                }
            }
            .table_body {
                display: inline-block;
                width: 100%;
                height: 6.5rem;
                overflow: hidden;
                overflow-y: auto;
                .center_table {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    border-bottom: 2px solid #698499;
                    td {
                        flex: 1;
                        height: 0.5rem;
                        padding: 0.2rem 0;
                        line-height: 0.4rem;
                        text-align: center;
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>
