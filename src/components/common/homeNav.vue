<template>
	<div class="list">
		<ul>
			<li  :class="{add:index1==navData}" @click="routerLink('financialData')" class="router">财务数据</li>
			<li  :class="{add:index2==navData}" @click="routerLink('secureEnvironment_1')" class="router">安防数据</li>
			<li  :class="{add:index3==navData}" @click="routerLink('engineeringData')" class="router">工程数据</li>
			<li  :class="{add:index4==navData}" @click="routerLink('environment')" class="router">环境数据</li>
			<li  :class="{add:index5==navData}" @click="routerLink('custom')" class="router">客服数据</li>
			<li  :class="{add:index6==navData}" @click="routerLink('humanAffairs')" class="router">人事数据</li>
		</ul>
		<!--<span class="return" @click="Return">←</span>-->
	</div>	
</template>

<script>
export default {
		data () {
    	return {
      		hasThree: false,
      		Data:['财务数据','安防数据','工程数据','客服数据','人事数据'],
      		index1:'financialData',
      		index2:'secureEnvironment_1',
      		index3:'engineeringData',
      		index4:'environment',
      		index5:'custom',
      		index6:'humanAffairs',    		
   	 	}
	},
	methods: {
//		Return() {
//				this.$router.go('-1');
//		},
		routerLink(_router){
			this.$router.push({path:_router});
		}
	},
	props:['navData'],
}
	
</script>

<style lang="scss" scoped>
.list{
	width: 100%;
	height: 0.40rem;
	ul{
		display: inline-block;
		line-height: 0.40rem;
		height: 0.40rem;
		width: 7.30rem;
		background-image: url(../../images/homeNav.png);
		background-size: cover;
		background-position: center;		
		li{
			cursor: pointer;
			text-align: center;
			width: 1.20rem;
			float: left;
			color: #fff;
			font-size: 0.16rem;
			margin-left: 0.01rem;
		}
	}
}
.add{
	background-image: url(../../images/homeButton1.png);
	background-size: cover;
	background-position: center;
}
.router{
	color: white;
}
.return{
	width: 0.4rem;
	height: 0.4rem;
	line-height: 0.4rem;
	color: #fff;
	display: inline-block;
	text-align: center;
	border: 0.02rem solid #1BA4D1;
	border-radius: 0.05rem;
    float: left;
    font-size: 0.28rem;	
    font-weight: bold;
    cursor: pointer;
}
</style>