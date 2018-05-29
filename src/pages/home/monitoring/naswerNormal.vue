<template>
	<div class="naswerNormal">
		<!--面包屑菜单-->
		<Bread :breadData="abc" ></Bread>
		
		<div class="left">视频</div>
		<div class="right">
			<span class="angle-1"></span>
			<span class="angle-2"></span>
			<span class="angle-3"></span>
			<span class="angle-4"></span>
			<div class="right-send">
				<ul>
					<li>
						<span class="report">上报时间</span>
						<input type="text" placeholder="请输入上报时间" class="report-input"/>
					</li>
					<li>
						<span class="dispose">处理时间</span>
						<input type="text" placeholder="请输入处理时间" class="dispose-input"/>
					</li>
					<li>
						<span class="alert">报警类型</span>
						<select name="" class="alert-select">
							<option value="">严重报警</option>
							<option value="">复杂报警</option>
							<option value="">一般报警</option>
						</select>
					</li>
					<li>
						<span class="location">位置</span>
						<input type="text" placeholder="请输入位置" class="location-input"/>
					</li>
					<li>
						<span class="people">对接人</span>
						<input type="text" placeholder="请输入对接人姓名" class="people-input"/>
						<input type="button" value="呼叫" class="peole-button"/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Bread from '@/components/common/bread'
	export default{
		data (){
			return{
				abc: ['物联监控','异常报警','接听处理']
			}
		},
		components:{
			Bread
		},
		
	}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	*{
		padding: 0;
		margin: 0;
	}
	$padding_top: 0.1rem;
	.naswerNormal{
		vertical-align: top;	
		width: 100%;
		height: 8.96rem;
		display: inline-block;
		position: relative;
	}
	.left{
		width: 9.01rem;
		height: 6.67rem;
		text-align: center;
		line-height: 6.67rem;
		background: url(../../../images/answer_video.png);
		background-size: cover;
		color: white;
		margin-top: 0.84rem;
		left: 0.3rem;
		display: inline-block;
	}
	.right{
		width: 4.16rem;
		height: 6.41rem;
		background: url(../../../images/answer-call.png);
		background-size: cover;
		position: absolute;
		display: inline-block;
		margin-left: 0.77rem;
		margin-top: 0.93rem;
	}
	.angle-1,.angle-2,.angle-3,.angle-4{
		display: inline-block;
	}
	.angle-1{
		width: 0.35rem;
		height: 0.35rem;
		background: url(../../../assets/newdevice2.png);
		position: absolute;
		margin-top: -0.09rem;
		margin-left: -0.09rem;
	}
	.angle-2{
		width: 0.35rem;
		height: 0.35rem;
		background: url(../../../assets/newdevice1.png);
		position: absolute;
		margin-top: -0.09rem;
		right: -0.09rem;
	}
	.angle-3{
		width: 0.35rem;
		height: 0.35rem;
		background: url(../../../assets/newdevice3.png);
		position: absolute;
		bottom: -0.09rem;
		margin-left: -0.09rem;
	}
	.angle-4{
		width: 0.35rem;
		height: 0.35rem;
		background: url(../../../assets/newdevice4.png);
		position: absolute;
		bottom: -0.09rem;
		right: -0.09rem;
	}
	ul>li>input{
		background: transparent;
		color: white;
	}
	ul>li>input::-webkit-input-placeholder{
		color: white;
	}
	ul>li>input:-moz--input-placeholder{
		color: white;
	}
	ul>li>input:-ms-input-placeholder{
		color: white;
	}​
	
	ul>li>select{
		background: transparent;
		color: white;
	}
	ul>li>span{
		color: white;
		display: inline-block;
	}
	ul{
		margin-top: 0.59rem;
	}
	ul>li{
		list-style: none;
		width: 4.16rem;
		height: 0.4rem;
		font-size: 0.16rem;
		padding-left: 0.51rem;
		margin-bottom: 0.32rem;
	}
	.report,.dispose{
		margin-right: 0.27rem;
	}
	.alert{
		margin-right:0.27rem;
	}
	.location{
		margin-left:0.29rem;
		margin-right: 0.27rem;
	}
	.alert-select{
		padding-left: 0.1rem;
		width: 2.35rem;
		height: 0.37rem;
		border-radius: 0.05rem;
		border: 3px solid rgb(131,219,255);
		background: transparent;
		color: white;
	}
	.alert-select option{
		background: rgb(22,44,71);
	}
	.location-input{
		padding-left: 0.1rem;
		width: 2.35rem;
		height: 0.37rem;
		border-radius: 0.05rem;
		border: 3px solid rgb(131,219,255);
	}
	.people{
		margin-left: 0.15rem;
		margin-right: 0.27rem;
	}
	.people-input{
		padding-left: 0.1rem;
		width: 1.73rem;
		height: 0.37rem;
		border-radius: 0.05rem;
		border: 3px solid rgb(131,219,255);
	}
	.peole-button{
		width: 0.52rem;
		height: 0.4rem;
		border-radius: 0.05rem;
		margin-left: 0.08rem;
		background: url(../../../images/call-noral.png);
	}
	.peole-button:hover{
		background: url(../../../images/call-hover.png);
	}
	.peole-button:hover{
		background: url(../../../images/call-active.png);
	}
</style>