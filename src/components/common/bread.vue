<template>
	<div class="bread_nav">
		<ul>
			<li v-for="(b, index) in breadData"><span>{{index?'/ ':''}}{{b}}</span></li>
		</ul>
	</div>

</template>

<script>
import routerMap from '../../router/routerMap'

	export default {
		data () {
    		return {
      			breadData: [],
   	 		}
		},
		mounted(){
      // console.log('breadData', this.breadData)
			this.getUrl();
		},
		methods:{
			getUrl(){
				var bread = [];
				var url = this.$route.path;
				var urlArr = url.split('/');	//截取url字段保存到数组
				for(let i = 0; i<routerMap.length; i++){
					if(routerMap[i].word&&urlArr[1].indexOf(routerMap[i].word) != -1){
						this.$set(this.breadData, 0, routerMap[i].name);
						if(routerMap[i].submenu){
							var oneSub = routerMap[i].submenu;
							i = 1000;
							for(let j = 0; j<oneSub.length; j++){
								if(oneSub[j].word&&urlArr[2].indexOf(oneSub[j].word) != -1){
									this.$set(this.breadData, 1, oneSub[j].name);
									if(oneSub[j].submenu){
										var twoSub = oneSub[j].submenu;
										j = 1000;
										for(let k = 0; k<oneSub.length; k++){
											if(twoSub[k].word&&urlArr[3].indexOf(twoSub[k].word) != -1){
												this.$set(this.breadData, 2, twoSub[k].name);
												if(twoSub[k].submenu){
													var threeSub = twoSub[k].submenu;
													k = 1000;
													for(let m = 0; m<twoSub.length; m++){
														if(threeSub[m].word&&urlArr[4].indexOf(threeSub[m].word) != -1){
															this.breadData[3] = threeSub[m].name;
															this.$set(this.breadData, 3, threeSub[m].name);
															m = 1000;
														}
													}
												}
												return
											}
										}
									}
								}
							}
						}
					}
				}
				console.log('breadData', this.breadData);
			},
		}
	}
</script>

<style lang="scss" scoped>
.bread_nav{
	width: 14.12rem;
	height: 0.53rem;
}
.bread_nav li{
	text-align: center;
	line-height: 0.53rem;
	font-size: 0.15rem;
	float: left;
	color: #FFFFFF;
    margin:0 0.02rem;
	height: 0.53rem;
	margin-left: 0.05rem;
}
.bread_nav li{
	span{
		color: #fff;
		text-shadow: 0.02rem 0 0.2rem #fff;
	}
}

</style>
