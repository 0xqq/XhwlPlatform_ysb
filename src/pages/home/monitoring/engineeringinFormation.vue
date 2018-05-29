<template>
	<div class="main">
		 <!--面包导航组件-->	
		<Bread :breadData="abcd" ></Bread>
		<div class="nav">
			<router-link to="/sendMsg">
				<input class="btn" type="button" value="发布新公告">
			</router-link>
			<span class="el_date_picker">
				<el-date-picker
			      	v-model="value6"
			      	type="daterange"
			     	 placeholder="选择日期范围">
		  		</el-date-picker>
			</span>
			<span class="el-cascader">
				<el-select v-model="value2" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value2"
				      :label="item.label"
				      :value="item.value2">
				    </el-option>
				</el-select>
			</span>
			<input type="text" class="device_case" placeholder="请输入搜索内容">
			<input type="button" value="搜索" class="search_btn">
		</div>
		
		<!--顶部标题-->
		<ul class="topNav">
				<li>序号</li>
				<li>标题</li>
				<li>内容</li>
				<li>发送者</li>
				<li>接收人</li>
				<li>发布时间</li>
				<li>未读人</li>	
		</ul>
		<!--主体内容-->
		<div class="content_div">
			<ul class="ul_list" v-for='(d,index) in value'>
				<li>{{index+1}}</li>
				<li>{{d.title}}</li>
				<li>{{d.content}}</li>
				<li>{{d.sender}}</li>
				<li>{{d.receive}}</li>
				<li>{{d.time}}</li>
				<li>{{d.unread}}</li>
			</ul>
		</div>
		<!--底部换页-->
		
		<div class="page">
			<span>每页显示</span>
			<select class="select">   
	            <option value="A">10</option>   
	            <option value="B">20</option>   
	            <option value="C">30</option>   
            </select>
            <div class="pageDiv">
            	<img src="../../../images/left_select.png"/>
            	<span>1/1</span>
            	<img src="../../../images/right_select.png"/>
            </div>
            
		</div>
	</div>
</template>

<script>
	import Bread from '@/components/common/bread'
	import { mapState} from 'vuex'
	export default{
		data (){
			return{
				 options: [
				 	{
			          value2: 'zhinan',
			          label: '标题'
			       },
			       {
			          value2: 'zhinan',
			          label: '内容'
			       },
			       {
			          value2: 'zhinan',
			          label: '发送者'
			       },
			       {
			          value2: 'zhinan',
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
			        },{
			            text: '最近一个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			              picker.$emit('pick', [start, end]);
			            }
			        },{
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
				abcd: ['物联监控','人员物联监控','工程人员','实时信息下发'],
				value:[
					{
					//'order':'1',
					'title':'周会',
					'content':'加强现场安保工作',
					'sender':'小明',
					'receive':'(10人)张三，马谡，诸葛孔明，司马懿，赵云，吴静，吴用，宋江，潘金莲，西门庆',
					'time':'2017-08-17 14:00:00',
					'unread':'(2人)张三，赵云'
					},
					{
					//'order':'2',
					'title':'周会',
					'content':'加强现场安保工作',
					'sender':'小明',
					'receive':'(10人)张三，马谡，诸葛孔明，司马懿，赵云，吴静，吴用，宋江，潘金莲，西门庆',
					'time':'2017-08-17 14:00:00',
					'unread':'(2人)张三，赵云'
					}
					
				]
			}
			
		},
		components: {
			Bread
		},
		computed: {
        ...mapState(['mnUrl'])
    	},
	}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	$padding_top: 0.1rem;
	.main{
		vertical-align: top;	
		width: 100%;
		height: 8.96rem;
		display: inline-block;
	}
	.nav{
		width:100%;
		height: 0.6rem;
		line-height: 0.6rem;
		position: relative;
	}
	.publish{
		width: 1.5rem;
		height: 0.4rem;
		background: #028FD8;
		color: white;
	}
	.publish:hover{
	    cursor:pointer;
	}
	.btn:hover{
		cursor: pointer;
	}
	.el_date_picker{
 		position: absolute;
 		right: 5.42rem;
 	}
	.btn {
		font-size:0.14rem;
		margin-left: 0.15rem;
		@include btn( 0.99rem, 0.4rem)
	}
	.search_btn{		
		background-size:cover;
		position: absolute;
		right: 0;
		top: 0.1rem;
		@include btn(0.99rem,0.4rem)
	}
	.device_case{
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
	.el-cascader{
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
	.topNav{
		flex: 1;
		display: flex;
		height: 0.5rem;
		width: 100%;
		background-image: url(../../../images/kaimenNav.png);
		margin-top: 0.3rem;
	}
	.topNav li{
		float: left;
		text-align: center;
		flex: 1;
		height: 0.5rem;
		line-height: 0.5rem;
		color: white;
	}
	
	.content_div{
		background-image: url(../../../images/kaimen.png);
		width: 100%;
		height: 5.6rem;
		overflow-y: scroll;
	}
	/*顶部标题部分*/
	.content_divNav{
		flex: 1;
		display: flex;
		height: 0.5rem;
		width: 100%;
		background-image: url(../../../images/kaimenNav.png);
	}
	.content_divNav li{
		float: left;
		text-align: center;
		flex: 1;
		height: 0.5rem;
		line-height: 0.5rem;
		color: white;
		border-left: 2px solid #698499;	
	}
	/*表格主体内容*/
	.ul_list{
		float: left;
		flex: 1;
		display: flex;
		height: 1.166rem;
		width: 100%;
	
	}
	.ul_list li{
		display: flex;
		flex: 1;
		-webkit-justify-content: center;
		align-items: center;
		color: white;
		border-bottom: 2px solid #698499;
		-webkit-justify-content:center;
		/*兼容写法*/
		justify-content:center;
		-moz-box-pack:center;
		-webkit--moz-box-pack:center;
		box-pack:center;
	}
	.operation{
		span{
			color: red;
			@include aa;
		}
	}
	/*底部换页框*/
	.page{
		line-height: 0.68rem;
		width: auto;
		height: 0.88rem;
		background-image: url(../../../images/kaimen.png);
		background-size: 100% 100%;
		float: right;
		line-height: 0.88rem;
		padding-right:0.1rem;
		margin-top:0.05rem;
	}
	.page>span{
		color: #70ccfc;
		margin-left: 0.4rem;
	}
	.select{
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
            span {
                color: #83dbff;
                margin: 0 0.15rem;
            }
            img {
                width: 0.1rem;
                height: 0.2rem;
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
</style>