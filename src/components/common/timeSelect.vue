<template>
	<div>
		<ul class="ul_time">
			<li class="li_year"  @click="develop(1)"><span :class="{pitchNo:indexof==1}"></span><p>2013</p></li>
			<li class="li_month">
				<ul class="ul_month" v-for="(month,index) in 12" :class="{showMonth:indexof==1}" @click.stop="show(1,index)"><li  :class="{showLight:indexNow==index}" ><p>{{month}}月</p></li></ul>			
			</li>
			<li class="li_year" @click="develop(2)"><span :class="{pitchNo:indexof==2}"></span><p>2014</p></li>
			<li class="li_month">
				<ul class="ul_month" v-for="(month,index) in 12" :class="{showMonth:indexof==2}" @click="show(2,index)"><li @click="monthLight(index)" :class="{showLight:indexNow==index}"><p>{{month}}月</p></li></ul>			
			</li>
			<li class="li_year"  @click="develop(3)"><span :class="{pitchNo:indexof==3}"></span><p>2015</p></li>
			<li class="li_month">
				<ul class="ul_month" v-for="(month,index) in 12" :class="{showMonth:indexof==3}" @click="show(3,index)"><li @click="monthLight(index)" :class="{showLight:indexNow==index}"><p>{{month}}月</p></li></ul>			
			</li>
			<li class="li_year"  @click="develop(4)"><span :class="{pitchNo:indexof==4}"></span><p>2016</p></li>
			<li class="li_month">
				<ul class="ul_month" v-for="(month,index) in 12" :class="{showMonth:indexof==4}" @click="show(4,index)"><li @click="monthLight(index)" :class="{showLight:indexNow==index}"><p>{{month}}月</p></li></ul>			
			</li>
			<li class="li_year"  @click="develop(5)"><span :class="{pitchNo:indexof==5}"></span><p>2017</p></li>
			<li class="li_month">
				<ul class="ul_month" v-for="(month,index) in 12" :class="{showMonth:indexof==5}" @click="show(5,index)"><li @click="monthLight(index)" :class="{showLight:indexNow==index}"><p>{{month}}月</p></li></ul>			
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data () {
	return {
  		yearData:["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017"],
		indexof:"5",
		indexNow:'8'
 		}
	},
	methods: {
		develop(year){
			this.indexNow='-2';
			this.indexof=year;
			var Year = year+2012+'';
			this.$emit('my-year',Year);
		},
		show(year,index){
			this.indexNow=index;
			this.indexof=year;
			var month = index+1;
			var Year = year+2012
			this.$emit('my-year',Year+'-'+month);
		},
		monthLight(index){
			this.indexNow=index;
		}
	}
}
</script>

<style lang="scss" scoped>
.ul_time{
	position: absolute;
	bottom: 0.28rem;
	left: 20%;
	width: 7.5rem;
	height: 0.3rem;
	background-image: url(../../images/time_bar.png);
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
}
.ul_time>.li_year{
	color:white;
	height: 0.30rem;
	line-height: 0.3rem;	
    float: left;
    cursor: pointer;
    margin-right:0.2rem ;
    span{
    	width: 0.3rem;
    	height: 0.3rem;    	    	
    	display: inline-block;
    	background-image:url(../../images/yearLight.png);
    	background-position: center;
    	background-size: cover;
    	border-radius: 50%;
    	-moz-user-select:none;
    	-webkit-user-select: none;       
    	-ms-user-select: none; 	  
    }
    p{
    	-moz-user-select:none;
        -webkit-user-select: none;       
        -ms-user-select: none;
    	color:#fff;
    	font-size: 0.14rem;
    	text-align: center;
    }
}
.li_year>p:hover{
	color: yellow;
}
.ul_month{
	float: left;
	display: none;
}
.ul_month>li{					
	width: 0.20rem;
	height: 0.20rem;		
	margin-right:0.2rem ;
	border-radius: 50%;
	background-image:url(../../images/month.png);
	background-position: center;
    background-size: cover;
	display: inline-block;
	margin-top: 0.05rem;
	cursor: pointer;
	-moz-user-select:none;
	-webkit-user-select: none;       
	-ms-user-select: none;		
    p{  	
    	margin-top: 0.2rem;
    	width: 0.40rem;
    	height: 0.3rem;
    	line-height: 0.3rem;
    	cursor: pointer;
    	color:white;
    	font-size: 0.14rem;
		-moz-user-select:none;
    	-webkit-user-select: none;       
    	-ms-user-select: none;
    }
}
.showMonth{
	display: block;
}
.pitchNo{
    	background-image:url(../../images/year.png) !important; 
    }
.ul_month>li>p:hover{
	color: yellow;
}
.showLight{
	background-image:url(../../images/monthLight.png) !important;
}
</style>