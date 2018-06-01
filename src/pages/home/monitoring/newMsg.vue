<template>
	<div class="main">
		<!--面包导航组件-->
		<Bread :breadData="abcd"></Bread>
		<div class="nav">
			<router-link to="/monit/person/security/msg/new">
				<input class="btn" type="button" value="发布新公告">
			</router-link>
			<span class="el_date_picker">
				<el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围">
				</el-date-picker>
			</span>
			<span class="el-cascader">
				<el-select v-model="value2" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value2" :label="item.label" :value="item.value2">
					</el-option>
				</el-select>
			</span>
			<input type="text" class="device_case" placeholder="请输入搜索内容">
			<input type="button" value="搜索" class="search_btn">
			<img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
		</div>
		<el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
			<el-table-column prop="序号" label="序号">
			</el-table-column>
			<el-table-column prop="标题" label="标题">
			</el-table-column>
			<el-table-column prop="内容" label="内容">
			</el-table-column>
			<el-table-column prop="发送者" label="发送者">
			</el-table-column>
			<el-table-column prop="接收人" label="接收人">
			</el-table-column>
			<el-table-column prop="发布时间" label="发布时间">
			</el-table-column>
			<el-table-column prop="未读人" label="未读人">
			</el-table-column>
		</el-table>
		<div class="pager">
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'
import newMsg from '@/httpData/newMsg'
import { format, gapTime } from '@/script/timeFormat.js'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			options: [
				{
					value2: '1',
					label: '标题'
				},
				{
					value2: '2',
					label: '内容'
				},
				{
					value2: '3',
					label: '发送者'
				},
				{
					value2: '4',
					label: '接受者'
				}
			],

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
			value2: '',
			value6: '',
			value7: '',
			abcd: ['物联监控', '人员物联监控', '安防人员', '实时信息下发'],
			currentPage2: 1,
			tableData3: [],
		}

	},
	components: {
		Bread
	},
	computed: {
		...mapState(['mnUrl'])
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
      this.tableData3 = newMsg.content
      this.tableData3.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 上报时间
        item.发布时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.发布时间.substr(-8) //日期随机+时间取定值
      })
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
		},
		derivedForm(tableExcel) {
			this.$func.method5(tableExcel)
		},
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$padding_top: 0.1rem;
.main {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
}

.nav {
	width: 100%;
	height: 0.6rem;
	line-height: 0.6rem;
	position: relative;
}

.publish {
	width: 1.5rem;
	height: 0.4rem;
	background: #028FD8;
	color: white;
}

.publish:hover {
	cursor: pointer;
}

.btn:hover {
	cursor: pointer;
}

.el_date_picker {
	position: absolute;
	right: 5.42rem;
}

.btn {
	font-size: 0.14rem;
	margin-left: 0.15rem;
	@include btn( 0.99rem, 0.4rem)
}

.search_btn {
	background-size: cover;
	position: absolute;
	right: 0.5rem;
	top: 0.1rem;
	@include btn(0.99rem, 0.4rem)
}

img {
	width: 0.21rem;
	height: 0.21rem;
	margin:0.15rem 0.15rem 0 0;
	float:right;
	@include aa;
}

.device_case {
	width: 3.01rem;
	height: 0.4rem;
	line-height: 0.4rem;
	border: 2px solid #83DBFF;
	background: transparent;
	padding-left: 0.1rem;
	color: white;
	position: absolute;
	right: 0.99rem;
	top: 0.1rem;
}

.el-cascader {
	display: inline-block;
	width: 1.3rem;
	height: 0.4rem;
	/*border-radius: 0.05rem 0 0 0.05rem;*/
	background: transparent;
	/*border-top: 2px solid #83DBFF;
		border-left: 2px solid #83DBFF;
		border-bottom: 2px solid #83DBFF;*/
	position: absolute;
	right: 4rem;
	/*top: 0.2rem;*/
}






/*顶部标题部分*/

#tableExcel {
	min-height: 7rem;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>
