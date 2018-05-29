<template>
	<div class="device">
		<!--业务配置/设备监控阀值配置组件-->
		<Bread :breadData="abc"></Bread>
		<div class="device-nav">
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
						<el-input placeholder="请输入搜索内容" v-model="input5" class="place">
							<el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
								<el-option label="巡检配置名称" value="1"></el-option>
								<el-option label="巡检人工号" value="2"></el-option>
								<el-option label="巡检人姓名" value="3"></el-option>
								<!--<el-option label="误报" value="3"></el-option>-->
							</el-select>
							<el-button slot="append" icon="search"></el-button>
						</el-input>
					</div>
				</div>
				<input type="button" value="搜索" class="bttn">
				<img @click="method55('tableExcel')" src="../../../images/inout.png" alt="">

			</div>
		</div>
		<div class="table">
			<table id="tableExcel" cellspacing="0" cellpadding="0">
				<thead class="table_thead">
					<tr class="nav_table">
						<th class="left_none"> 巡检线路</th>
						<th> 巡检完成时间</th>
						<th> 巡检任务完成度</th>
						<th> 巡检人</th>
						<th> 报事描述</th>
						<th>视频回放</th>
						<th>审核人</th>
						<th>审核时间</th>
					</tr>
				</thead>
				<tbody class="table_body">
					<tr v-for='(d, index) in  value' :key="index" class="center_table">
						<td>{{d.巡检线路}}</td>
						<td v-for="(n, index2) in all" v-if="index == index2 " :key="index2">{{n}}</td>
						<td>{{d.巡检任务完成度*10000}}%</td>
						<td>{{d.巡检人}}</td>
						<td>
							{{d.报事描述}}
						</td>
						<td>{{d.视频回放}}</td>
						<td>{{d.审核人}}</td>
						<td>{{d.审核时间}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--底部每页显示-->
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
import { mapState } from 'vuex'
export default {
	data() {
		return {
			abc: ['物联监控', '视频物联监控', '巡检记录'],
			value6: '',
			currentPage2: 5,
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
			value: [],
			sum1: [],
			sum2: [],
			all: []
		}
	},
	computed: {
		...mapState(['token', 'mnUrl'])
	},
	components: {
		Bread
	},
	mounted() {
		this.getData();
	},
	methods: {
		removeTode(keep) {
			console.log(keep);
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
		getData() {
			const url = this.mnUrl + "/tmp/watching/video/records"
			this.$http.get(url).then(res => {
				for (var i = 0; i < res.body.content.length; i++) {
					this.sum1.push(res.body.content[i].巡检完成时间.substring(0, 10))
					this.sum2.push(res.body.content[i].巡检完成时间.substring(11, 19))
					var aa = this.sum1[i];
					var bb = this.sum2[i];
					this.all.push(aa + "-" + bb)
				}
				this.value = res.body.content;
			}, (err) => {
				console.log(err);
			})
		},
		method55(tableExcel) {
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
@import 'src/style/mixin';

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
		.img-time {
			display: inline-block;
			height: 0.6rem;
			width: auto; 
			position: relative;
			margin-bottom: 0.1rem;
			float: right;
			.date-time {
				display: inline-block;
				width: 2.58rem;
				height: 0.4rem;
				color: #67bce9;
				outline: none;
				margin-right: 0.2rem;
				vertical-align: middle; 
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
				.place {
					font-size: 0.14rem;
				}
			} // 搜索按钮
			.bttn {
				margin: 0.16rem 0.15rem 0 0;
				@include btn(0.8rem, 0.3rem);
			}
			img {

				margin-right: 0.15rem;
				img {
					width: 0.21rem;
					height: 0.21rem;
				}
			}
		}
	}
	.table {
		width: 100%;
		height: 6.8rem;
		background-image: url(../../../images/kaimen.png);
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
					th:last-child{
						border-right: 2px solid #698499;
					}
					th {
						flex: 1;
						width: 0.6rem;
						height: 0.4rem;
						line-height: 0.4rem;
						border-left: 2px solid #698499;
						display: inline-block;
					}
					.left_none {
					}
				}
			}
			.table_body {
				display: inline-block;
				width: 100%;
				height: 6.5rem;
				overflow: hidden;
				overflow-y: scroll;
				.center_table {
					display: flex;
					align-items: center;
					justify-content: space-around;
					border-bottom: 2px solid #698499;
					td {
						flex: 1;
						height: 0.4rem;
						padding: 0.2rem 0;
						line-height: 0.4rem;
						text-align: center;
						display: inline-block;
					}
				}
			}
		}
	}
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>