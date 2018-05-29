<template>
	<div class="Newalarm">
		<!--业务配置/设备监控阀值配置组件-->
		<Bread :breadData="abcde"></Bread>
		<div class="top_div1">
			<span class="span_left">发布新公告</span>
		</div>
		
		<div class="new_center_box">
			<!--上面4个小边框-->
			<span class="newdevice2"></span>
			<span class="newdevice3"></span>
			<span class="newdevice1"></span>
			<span class="newdevice5"></span>
			
			<div class="new_Device_center_ul1">
				<section class="section1">
					<span class="label">标题</span>
					<input type="text" placeholder="请输入标题" class="input_title"/>
				</section>
				<section class="selection2">
					<span class="labe2">内容</span>
					<textarea name=""></textarea>
				</section>
				<section class="selection2">
					<span class="labe3">接收人员</span>
					<textarea name=""></textarea>
				</section>
			</div>
			<div class="new_Device_center_ul2">
				<div class="el-cascader1">
					<el-select v-model="value1" placeholder="选择公司">
					    <el-option
					      v-for="item in options1"
					      :key="item.value1"
					      :label="item.label"
					      :value="item.value1">
					    </el-option>
					</el-select>
				</div>
				<div class="el-cascader2">
					<el-select v-model="value2" placeholder="选择项目">
					    <el-option
					      v-for="item in options2"
					      :key="item.value2"
					      :label="item.label"
					      :value="item.value2">
					    </el-option>
					</el-select>
				</div>
				<div class="el-cascader3">
					<el-select v-model="value3" placeholder="选择专业">
					    <el-option
					      v-for="item in options3"
					      :key="item.value3"
					      :label="item.label"
					      :value="item.value3">
					    </el-option>
					</el-select>
				</div>
				<div class="selection3">
					<textarea></textarea>
				</div>
			</div>
		</div>
		<!--中间左箭头点击图片-->
		<div class="newdevice_info">
			 <img class="newdevice_img" src="../../../assets/newdevice6.png" >
		</div>
		<div class="gloss_img_div">
			<img src="../../../assets/gloss3.png" alt="" class="gloss_img">
		</div>
		
		<!--!--确认点击和取消点击按钮-->
		<div class="box_btn">
			<button class="btn1"  @click="sure">确认</button>
			<button class="btn2" @click="cancel">取消</button>
		</div>
	</div>
</template>
<script>
import Bread from '@/components/common/bread'
export default {
	data() {
		return {
			abcde: ['物联监控', '人员指挥调度', '巡更人员', '实时信息下发','发布新公告'],
			value1:'',
			options1: [
				 	{
			          value1: 'zhinan',
			          label: '深圳分公司'
			       },
			       {
			          value1: 'zhinan',
			          label: '华南分公司'
			       },
			       {
			          value1: 'zhinan',
			          label: '华北分公司'
			       },
			       {
			          value1: 'zhinan',
			          label: '东北分公司'
			       }
			    ],
		    options2: [
			 	{
		          value2: 'zhinan',
		          label: '中海华庭项目'
		       },
		       {
		          value2: 'zhinan',
		          label: '深圳湾项目'
		       }
		    ],
		    options3: [
			 	{
		          value3: 'zhinan',
		          label: '安管'
		       },
		       {
		          value3: 'zhinan',
		          label: '工程'
		       },
		       {
		          value3: 'zhinan',
		          label: '环境'
		       },
		       {
		          value3: 'zhinan',
		          label: '客服'
		       }
		    ],
		    value:'',
			value2:'',
			value3:'',
		}
	},
	computed: {

	},
	components: {
		Bread
	},
	mounted() {
		this.add();
	},
	methods: {
		add() {
//			this.datas = this.$route.query.value;
		},
		sure(){
			this.$router.push({ path: '/monit/person/security/msg'});
		},
		cancel(){
			this.$router.push({ path: '/monit/person/security/msg'});
		}
	}
}
</script>
<style lang="scss" scoped>
	@import 'src/style/mixin';
	.Newalarm{
		vertical-align: top;
		width: 14.4rem;
		height: 8.96rem; 
		margin: 0 auto;
	}
	.selection2 textarea{
		resize: none;
		width: 3.22rem;
		height: 2.14rem;
		background: transparent;
		border: 2px solid #83DBFF;
		border-radius: 0.05rem;
		margin-top:0.3rem ;
		color: white;
		float: left;
		margin-left: 0.05rem;
	}
	.selection3 textarea{
		resize: none;
		width: 3.24rem;
		height: 2.14rem;
		background: transparent;
		border: 2px solid #83DBFF;
		border-radius: 0.05rem;
		margin-left: 0.05rem;
		margin-left: 1rem;
		color: white;
	}
	
	.top_div1 {
		width: 13.41rem;
		height: 0.5rem;
		margin: 0 auto;
		margin-bottom: 0.33rem;
	}
	.span_left {
		text-align: center;
		display: inline-block;
		width: 1.86rem;
		height: 0.5rem;
		line-height: 0.5rem;
		color: #70CCFC;
		background-image: url(../../../images/rectangle2.png);
		background-position: center;
	}
	.new_center_box{
		width: 10.73rem; // height: auto;
		height: 6.56rem;
		background: url(../../../images/blue.png);
		margin: 0 auto;
		position: relative;
		display: flex;
	}
	.new_Device_center_ul1,.new_Device_center_ul2{
		flex: 1;
		/*border: 1px solid red;*/
	}
	.newdevice2 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice3.png)no-repeat;
		background-size: contain;
		position: absolute;
		left: -0.13rem;
		bottom: -0.13rem;
	}
	.newdevice3 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice2.png)no-repeat;
		background-size: contain;
		position: absolute;
		left: -0.13rem;
		top: -0.13rem;
	}
	.newdevice1 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice1.png)no-repeat;
		background-size: contain;
		position: absolute;
		right: -0.13rem;
		top: -0.13rem;
	}
	.newdevice5 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice4.png)no-repeat;
		background-size: contain;
		position: absolute;
		right: -0.13rem;
		bottom: -0.13rem;
	}
	.gloss_img_div{
		width: 100%;
		height: 0.5rem;
		position: relative;
	}
	.gloss_img {
		width: 4.15rem;
		height: 0.5rem;
		position: absolute;
		bottom:0.27rem;
		right: 5.45rem;
	}
	.newdevice_info{
		width: 100%;
		position: relative;
	}
	.newdevice_info img{
		width: 0.69rem;
		height: 0.51rem;
		position: absolute;
		right: 6.8rem;
		bottom: 1.0rem;
		background: url(../../../assets/newdevice5.png);
		background-size: cover;
	}
	.section1{
		margin-top: 0.4rem;
		
	}
	.selection2{
		width: 5.1578rem;
		overflow: hidden;
	}
	.label,.labe2{
		color: white;
		display: inline-block;
		font-size: 0.16rem;
		margin-left: 0.76rem;
		margin-right: 0.25rem;
		font-weight: bold;
		
	}
	.labe2,.labe3{
		float: left;
		margin-top: 0.4rem;
	}
	.labe3{
		color: white;
		display: inline-block;
		font-size: 0.16rem;
		margin-left: 0.6rem;
		margin-right: 0.09rem;
	}
	.el-cascader1,.el-cascader2,.el-cascader3{
		width: 3.24rem;
		height: 0.37rem;
		margin-bottom: 0.2rem;
		margin-left: 1rem;
	}
	.el-cascader1{
		margin-top: 1.8rem;
	}
	.input_title{
		width: 3.24rem;
		height: 0.38rem;
		border: 2px solid #83DBFF;
		background: transparent;
		border-radius: 0.05rem;
		padding-left: 0.1rem;
	}
	.box_btn {
		display: inline-block;
		width: 100%;
		margin-left: 5.35rem;
	    
		.btn2 {
			@include btnX(1.54rem,
			0.36rem)
		}
		button {
			margin-right: 0.57rem;
			display: inline-block;
			@include btn(1.54rem,
			0.36rem)
		}
	}
	textarea {
	overflow: hidden;
}

input::-ms-clear {
	display: none;
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
	// / 按钮呼吸灯
	@-webkit-keyframes neon3 {
		from {
			box-shadow: 0 0 0.13rem 0.023rem #fff,
			0 0 0.13rem 0.053rem #fff,
		}
		to {
			box-shadow: 0 0 0.03rem 0.013rem #fff,
			0 0 0.13rem 0.043rem #fff,
		}
	}
</style>