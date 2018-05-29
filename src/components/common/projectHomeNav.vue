<template>
	<div class="list">
		<ul>
			<li  :class="{add:index6==navData}" @click="routerLink('P_projectTote')" class="router">项目概览</li>
			<li  :class="{add:index1==navData}" @click="routerLink('P_financialData')" class="router">财务数据</li>
			<li  :class="{add:index2==navData}" @click="routerLink('P_secureEnvironment')" class="router">安防数据</li>
			<li  :class="{add:index3==navData}" @click="routerLink('P_engineeringData')" class="router">工程数据</li>
			<li  :class="{add:index4==navData}" @click="routerLink('P_environment')" class="router">环境数据</li>
			<li  :class="{add:index5==navData}" @click="routerLink('P_custom')" class="router">客服数据</li>		
		</ul>
	</div>	
</template>

<script>
export default {
		data () {
    	return {
      		hasThree: false,
      		Data:['财务数据','安防数据','工程数据','客服数据','人事数据'],
      		index6:'P_projectTote',
      		index1:'P_financialData',
      		index2:'P_secureEnvironment',
      		index3:'P_engineeringData',
      		index4:'P_environment',
      		index5:'P_custom'    		    		
   	 	}
	},
	methods: {
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
</style>