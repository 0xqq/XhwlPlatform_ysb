<template>
	<div class="bread_div">
	 <!--面包导航组件-->	
	<Bread :breadData="abc"></Bread>
	<!--顶部标题-->
		<ul class="content_divNav">
				<li class="order">序号</li>
				<li>门设备</li>
				<li>抓拍时间</li>
				<li>操作人</li>
				<li>关联开门事件</li>
				<li>操作</li>				
		</ul>
			<!--主体内容-->
		<div class="content_div">
			<transition name="router-fade" mode="out-in">
				<div class="hide_div" v-if="showImg">
					<img :src="showUrl" alt="">
					<i class="el-icon-circle-close" @click="hideImg"></i>
				</div>
			</transition>
			<ul class="ul_list" v-for='d in value'>
				<li>{{d.order}}</li>
				<li>{{d.doorEquipment}}</li>
				<li>{{d.time}}</li>
				<li>{{d.name}}</li>
				<li>{{d.event}}</li>
				<li class="operation"><span @click="show">{{d.operate}}</span></li>
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
            	<img src="../../../images/be.jpg"/>
            	<span>1/1</span>
            	<img src="../../../images/show.jpg"/>
            </div>
            
		</div>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'

export default {
 data () {
    return {
    	showImg: false,
    	showUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg',
		abc: ['物联监控','出入指挥调度','人员指挥调度','抓拍记录'],
		value:[
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
			{
				'order':'1',
				'doorEquipment':'东大门岗亭1',
				'time':'2017-08-15 14:00:11',
				'name':'张三',
				'event':'KM001',
				'operate':'查看照片',
				'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504872683198&di=920d99b81866a6c05ee6949206d3b228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1603%2F01%2Fc27%2F18759164_1456813932253_mthumb.jpg'
			},
		]
    }
  },
  computed:{
	
  },
  components: {
	Bread
  },
  mounted(){
  },
  methods: {
  	show(){
  		this.showImg = true;
  	},
  	hideImg(){
  		this.showImg = false;
  	}
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
/*整个大框*/
.bread_div{
	vertical-align: top;	
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	position: relative;
}
.content_div{
	background-image: url(../../../images/kaimen.png);
	width: 100%;
	height: 7rem;
	overflow-y: scroll;
	//遮罩
	.hide_div{
		@include shade;
		text-align: right;
		img{
			@include center;
			@include wh(60%, 80%);
		}
		i{
			margin: 0.2rem;
			@include cl(0.2rem);
		}
	}
}
/*顶部标题部分*/
.content_divNav{
	flex: 1;
	display: flex;
	height: 0.5rem;
	width: 100%;
	background-image: url(../../../images/kaimenNav.png);
	.order{
		border-left:none;
	}
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
	flex: 1;
	text-align: center;
	line-height: 1.166rem;
	color: white;
	border-bottom: 2px solid #698499;
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
	width: 3.1rem;
	height: 0.88rem;
	background-image: url(../../../images/page.png);
	background-position: center;
	float: right;
	line-height: 0.88rem;
}
.page>span{
	color: #70ccfc;
	margin-left: 0.4rem;
}
//淡入淡出
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}

/*下拉框*/
.select{
	text-align: center;
	width: 0.61rem;
	height: 0.35rem;
	background: darkgray;
	background-image: url(../../../images/kaimen.png);
	color: white;
}
.pageDiv{
	display: inline-block;
	margin-left: 0.15rem;
}
</style>