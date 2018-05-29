<template>
	<div class="main">
    	<div class="container">
    		<div class="bg_top">
	    		<div class="bg_img4"><img src="../../images/bg_4.png" /></div>
	    		<div class="bg_icon"><img src="../../images/bg_icon.png"/></div>
	    		<div class="bg_img4"><img src="../../images/bg_4.png" /></div>
    		</div>
    		<div class="bg_sorry"><img src="../../images/bg_sorry.png"/></div>
    		<div class="bg_backhome" @click="backhome">
    			<img src="../../images/bg-backhome.png"/>
    		</div>
    	</div>
	</div>
	
</template>

<script>
	
	export default {
		data () {
	    	return {
	      		hasThree: false,
	   	 		}
		},
		methods:{
			backhome() {
				this.$router.go('-1');
			}
		},
	  	props:['breadData'],
	}
	
</script>

<style lang="scss" scoped>
	*{
		margin: 0;
		padding: 0;
	}
    .main{
        background: url(../../images/bg_bgckground.png);
        width: 100%;
       	height: 10.8rem;
        background-size: cover; 
        position: relative;
        background-repeat:no-repeat;  
        overflow: hidden;  
    }
    .container {
    	height: 3rem;
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%,-50%);
    }
    .bg_top div{
    	display: inline-block;
    }
    .bg_img4 img{
    	width: 0.84rem;
    	height: 1.19rem;
    }
    .bg_icon img{
    	margin: 0 0.27rem;
    	width: 1.41rem;
    	height: 0.91rem;
    }
    .bg_sorry div img{
    	width: 3.05rem;
    	height: 0.21rem;
    }
    .bg_sorry {
    	margin-top: 0.54rem;
    }
     .bg_backhome{
     	margin-top: 0.51rem;
     }
    .bg_backhome img{
    	width: 1.47rem;
    	height: 0.54rem;
    }
    .bg_backhome:hover{
    	cursor:pointer;
    }
</style>