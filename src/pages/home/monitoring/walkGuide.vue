<template>
	<div class="main">
		<!--面包导航组件-->
		<Bread :breadData="abc"></Bread>
		<div class="content">
			<div class="head">
				<div class="select_group">
				<select class="date_device" v-model="doors">
					<!--<option value="volvo">{{datas.监控对像类型}}</option>-->
					<option value="1697" selected="selected">东大门</option>
					<option value="1670">北区门</option>
					<option value="1699">南区门</option>
					<option value="1595">车场门</option>
				</select>
					<iframe class="hide_iframe" frameborder="0" src="about:blank"></iframe>
				</div>

				<div class="catch_photo">
					<!-- <button type="" @click="">抓拍</button> -->
				</div>
				<span class="one_key">
					<button class="open" type="">远程开门</button>
					<button class="close" type="">远程锁门</button>
				</span>

			</div>
			<div class="video">
				<div class="flex_video">
		            <object classid="clsid:AC036352-03EB-4399-9DD0-602AB1D8B6B9" class="video_obj" id="PreviewOcx"  name="ocx" >
		                </object>
		        </div>
			</div>
		</div>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'
import $ from 'jquery'
import md5 from 'md5'

export default {
	data() {
		return {
			abc: ['物联监控', '出入物联监控', '人行指挥调度'],
			// 调试代码，正常情况下，euqipID应该在本页面生成时由外部获得， 
			equipmentId: "31bc4538c7594d3f85d4edc3fb08b7cf",
			// 道闸名称
			parkName: "呵呵",
			value: '',
			doors: '1670',
			// 播放状态标识
			playingStatus: false,
			// StunAddr,TurnAddr,TurnName, TurnPwd应该在Server中配置使用
			StunAddr: "119.23.240.42:3478",
			TurnAddr: "119.23.240.42:3478",
			TurnName: "ling",
			TurnPwd: "ling1234",
			equipmentArray: [],
			equipmentArrayIndex: 0,
			// 连接捷顺平台http接口
			requestGateUrl: "http://202.105.104.105:8089/equipment/gate",
			loginUrl: "http://202.105.104.105:8089/login",
			playUrl: "http://202.105.104.105:8089/video/begin",
			endUrl: "http://202.105.104.105:8089/video/end",
			logoutUrl: "http://202.105.104.105:8089/logout",
			equipmentId: "",

			// "c7fde235283442e69afc68c1b2acbf18"
			// "e2209e9cd8454418b23baad95e482abe"
			// "6b1facedfd7349a68050be562fc8cee3"
			// "044834679ce640b48b136e0d2bbd83d1"
			// "78527a8a50444b7e9f286ec61e4b716a"

			operationUrl: "http://202.105.104.105:8089/equipment/operator",
			// 登录捷顺平台帐号信息
			cno: "jieshun",
			usr: "ff",
			pwd: "123456",
			token: 0,
			G_Video_Handle: null,
			options: [{
				value: '选项1',
				label: '西门岗'
			}, {
				value: '选项2',
				label: '南门岗'
			}, {
				value: '选项3',
				label: '北门岗'
			}],
			value: ''
		}
	},
	computed: {

	},
	components: {
		Bread
	},
	mounted() {
		var refThis = this;
		setTimeout(function(){
            console.log("3s运行");
            refThis.loginCMS();
            refThis.SetlocalParam();    //设置拍照和录像参数
        },1000);
	},
	watch:{
		doors:function(){
			var OCXobj = document.getElementById("PreviewOcx");
			OCXobj.StartTask_Preview_InWnd(this.doors,0);
		}
	},
	methods: {
		loginCMS(){
            console.log("登陆程序");
            var userName= 'yanfa';
            var pw='yf1234567';
            var ipAdd= '202.105.104.109';
            var port= '80';
            // console.log(userName);
            if(!(parseInt(port)>=0 && parseInt(port)<=2147483647)){
                return;
            }
            var OCXobj = document.getElementById("PreviewOcx");
            var ret=OCXobj.Login(ipAdd,port,userName,pw);
            switch(ret){
                case 0:
                    // this.initTree();
                    this.loading = false;
                    break;
                case -1:
                    // clearTree();
                    this.loading = false;
                    alert("登录失败！");
                    break;
                default:
                    break;
       		}
            OCXobj.SetWndNum(1);
            OCXobj.StartTask_Preview_InWnd("1670",0);
        },
        SetlocalParam(){
                var PicType = '0';
                var PicPath = "C:"+ "\\"+ "CapPic";
                var PicCapType = '0';
                var PicSpanTime = '500';
                var PicCounts = '3';
                var RecordType = '0';
                var MaxRecordTimes = '7200';
                var RecordTimes = '3600';
                var RecordPath = 'C:\\Record';
                var RecordSize = '512000000';

                if(PicPath=="" || RecordPath==""){
                    // alert("保存路径不能为空！");
                    return;
                }
                
                var OCXobj = document.getElementById("PreviewOcx");

                //设置图片保存路径和格式
                if (PicCapType == 1) {
                    if (PicCounts == "") {
                        // alert("设置张数不能为空！");
                        return;
                    }
                    var iRet = OCXobj.SetCaptureParam(PicType, PicPath, PicCapType, 0, PicCounts);
                    switch (iRet) {
                        case -1:
                            // alert("SetCaptureParam接口调用失败！错误码：" + OCXobj.GetLastError());
                            break;
                        case 0:
                            // alert("SetCaptureParam接口调用成功！");
                            break;
                        default:
                            break;
                    }
                }
                else if (PicCapType == 0) {
                    if (PicCounts == "" || PicSpanTime == "") {
                        // alert("设置张数和抓拍时间间隔不能为空！");
                        return;
                    }
                    var iRet = OCXobj.SetCaptureParam(PicType, PicPath, PicCapType, PicSpanTime, PicCounts);
                    switch (iRet) {
                        case -1:
                            // alert("SetCaptureParam接口调用失败！错误码：" + OCXobj.GetLastError());
                            break;
                        case 0:
                            // alert("SetCaptureParam接口调用成功！");
                            break;
                        default:
                            break;
                    }
                }
                //设置保存图片磁盘空间最小值
                //OCXobj.SetPicDiskMinSize(minSpace4Pic);               //0813 zdy
                //showMethodInvokedInfo("SetPicDiskMinSize接口调用成功！"); //0813 zdy
                   //设置录像保存路径和文件大小
                    if (RecordType == 0) {
                        if (MaxRecordTimes == "" || RecordTimes == "") {
                        // alert("设置分包时间和最大录像时间不能为空");
                        return;
                    }
                    var iRet = OCXobj.SetRecordParam(RecordPath, 10, RecordTimes, RecordType);
                        switch(iRet) {
                            case -1:
                                // alert("SetRecordParam接口调用失败！错误码：" + OCXobj.GetLastError());
                                break;
                            case 0:
                                // alert("SetRecordParam接口调用成功！");
                                break;
                            default:
                                break;
                        }
                    }
                    else if (RecordType == 1) {
                        if (MaxRecordTimes == "") {
                            // alert("设置最大录像时间不能为空");
                            return;
                        }
                        var iRet = OCXobj.SetRecordParam(RecordPath, RecordSize, 10, RecordType);
                        switch (iRet) {
                            case -1:
                                // alert("SetRecordParam接口调用失败！错误码：" + OCXobj.GetLastError());
                                break;
                            case 0:
                                // alert("SetRecordParam接口调用成功！");
                                break;
                            default:
                                break;
                        }
                    }
            }
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

span,
button,
select {
	color: #fff;
}

.main {
	vertical-align: top;
	width: 100%;
	height: 100%;
	display: inline-block;
}

.content {
	width: 13.4rem;
	margin: 0 auto;
	.head {
		height: 0.6rem;
		width: 100%;
		display: flex;
		align-items: center;
		background-image: url(../../../images/head_nav.png);
		.select_group {
			padding-left: 0.1rem;
			flex: 1;
			.date_device{
				width: 2rem;
				height: 0.36rem;
				border-radius: 0.05rem;
				border:2px solid #83dbff;
				padding-left:0.1rem;
				color:#fff;
				option{
					background-color: #154777;
				}
			}
			.hide_iframe {
				position: absolute;
				z-index: -1;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				scrolling: no;
			}
		}


		span {
			text-align: right;
			flex: 1;
			.open {
				@include btn(1.25rem, 0.36rem);
				margin-right: 0.2rem;
			}
			.close {
				@include btnR(1.25rem, 0.36rem);
				margin-right: 0.2rem;
			}
		}
		.catch_photo {
			flex: 1;
			text-align: center;
			button {
				@include btn(1.25rem, 0.36rem);
			}
		}
	}
	.video {
		height: 7rem;
		object {
			height: 7rem;
			width: 100%;
		}
		button {
			background-color: pink;
			@include aa;
			@include btn(1.25rem, 0.36rem);
		}
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

// 去除textarea右边的样式
textarea {
	overflow: hidden;
}
</style>