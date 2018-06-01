<template>
<div class="main">
  <!--面包导航组件-->
  <Bread :breadData="abc"></Bread>
  <div class="video_content">
    <select name="" class="select_door" v-model="doorName">
				<option v-for="item in parkNames" :value="item" selected="selected">{{item}}</option>
			</select>
    <div class="video">
      <div></div>
      <span class="video_title">车行出入口监控视频</span>
      <div class="rel_video">
        <object id="singlePlayerVideoPlugin" type="application/x-svvideoctrl" data="">
					</object>
      </div>
    </div>
    <div class="photo">
      <div>
        <img :src="carNums[0].url" alt="">
      </div>
    </div>
    <button type="" class="talk" @click="snapPhoto(parkName)">拍照</button>
    <!-- <button type="" class="take_photo" @click="requestGate(localCno, token)">对讲</button> -->
    <!-- <button type="" class="player" @click="requestVideoPreview(localCno, token, equipmentId, StunAddr, TurnAddr, TurnName, TurnPwd)">播放</button> -->
    <div class="function_div">
      <input type="" placeholder="请输入关键字" name="">
      <button type="" class="check">查询</button>
      <button type="" class="fire_open" @click="threeBtn(3)" :class="{click_btn: clickBtn==3}">消防一键开闸</button>
      <button type="" class="car_num" @click="threeBtn(2)" :class="{click_btn: clickBtn==2}">远程车牌补录</button>
      <button type="" class="open_cut" @click="threeBtn(1)" :class="{click_btn: clickBtn==1}">远程开闸</button>
    </div>
    <div class="second_div">
      <div class="table">
        <div class="table_head">
          <span>车牌号</span>
          <span>车辆类型</span>
          <span class="flex_time1">地点</span>
          <span class="flex_time2">时间</span>
          <span class="flex_time">提示</span>
        </div>
        <ul>
          <li v-for="(item,index1) in carList">
            <span :class="{red_name: item.isBad==1}">{{item.车牌号}}</span>
            <span :class="{red_name: item.isBad==1}">{{item.车辆类型}}</span>
            <span :class="{red_name: item.isBad==1}" class="flex_time1">{{item.地点}}</span>
            <span :class="{red_name: item.isBad==1}" class="flex_time1">{{item.时间}}</span>
            <!-- <span class="flex_time2" :class="{red_name: item.isBad==1}" v-for="(n, index2) in all" v-if="index1 == index2">{{n}}</span> -->
            <span :class="{red_name: item.isBad==1}" class="flex_time">{{item.提示}}</span>
          </li>
        </ul>
      </div>
      <div class="open">
        <div class="open1" v-show="clickBtn==1">
          <div class="open_label">
            <span>设备</span>
            <span>放行类型</span>
            <span>备注</span>
          </div>
          <div class="open_content">
            <span>{{doorName}}</span><br>
            <div class="bus_selete">
              <el-select v-model="value" placeholder="车辆类型" class="el_place">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <textarea name=""></textarea><br>
            <button @click="OperateGate(localCno, token, parkId, personId, 1)">确认</button>
          </div>
        </div>
        <div class="open2" v-show="clickBtn==2">
          <section>
            <span class="label1">设备</span>
            <span>{{doorName}}</span>
          </section>
          <section>
            <span class="label2">放行类型</span>
            <select>
								<option value="">临时车</option>
								<option value="">月卡车</option>
								<option value="">网络预约车</option>
								<option value="">多位多车</option>}
							</select>
          </section>
          <section>
            <span class="label3">车牌号码</span>
            <!-- <span>粤</span> -->
            <input type="" name="" :value="carNums[0].number">
            <button>车牌矫正</button>
          </section>
          <section>
            <span class="label4">应收停车费</span>
            <span>{{'10.00'}}(元)</span>
          </section>
          <section>
            <span class="label5">备注</span>
            <textarea name=""></textarea>
          </section>
          <section>
            <button type="" class="sure_open">确认放行</button>
          </section>
        </div>
        <div class="open3" v-show="clickBtn==3">
          <div>
            <span>消防一键开闸确认</span>
          </div>
          <span>重要操作确认：您是否要进行一键开闸操作？</span><br>
          <span>点击确认则所有道闸全部开启且保持常开状态。</span>
          <section>
            <button type="" class="cancle">取消</button>
            <button type="" class="confirm" @click="OperateGate(localCno, token, parkId, personId, 1)">确认</button>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Bread from '@/components/common/bread'
import $ from 'jquery'
import md5 from 'md5'
import carGUide from '@/httpData/carGuide.js'
import { format, gapTime } from '@/script/timeFormat.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      sum1: [],
      sum2: [],
      all: [],
      clickBtn: '2', //判断右下角卡片选中哪个
      carList: [],
      abc: ['物联监控', '出入物联监控', '车行指挥调度'],
      doors: [{
          'doorName': '1号停车场入口',
          'ID': '1'
        },
        {
          'doorName': '1号停车场出口',
          'ID': '2'
        },
        {
          'doorName': '2号停车场入口',
          'ID': '3'
        },
        {
          'doorName': '2号停车场出口',
          'ID': '4'
        },
        {
          'doorName': '3号停车场入口',
          'ID': '5'
        },
        {
          'doorName': '3号停车场出口',
          'ID': '6'
        }
      ],
      doorName: "出口",
      choisDoor: '',
      options: [{
        value: '选项1',
        label: '临时车'
      }, {
        value: '选项2',
        label: '月卡车'
      }, {
        value: '选项3',
        label: '网络预约车'
      }, {
        value: '选项4',
        label: '多位多车'
      }],
      value: '',
      carNums: [{
        "number": "粤BV4025",
        "url": "http://xhmind.com:5051/faker/停车场抓拍图片/20171011/2、粤BV4025.jpg"
      }, ],

      localCno: "jieshun",
      localUsr: "ff",
      localPwd: "123456",
      token: 0,
      requestGateUrl: "http://202.105.104.105:8089/equipment/gate",
      loginUrl: "http://202.105.104.105:8089/login",
      playUrl: "http://202.105.104.105:8089/video/begin",
      endUrl: "http://202.105.104.105:8089/video/end",
      logoutUrl: "http://202.105.104.105:8089/logout",

      // 三期入口:"044834679ce640b48b136e0d2bbd83d1"
      // 入口:"6b1facedfd7349a68050be562fc8cee3"
      // 出口:"e2209e9cd8454418b23baad95e482abe"
      // 西门单出口:"78527a8a50444b7e9f286ec61e4b716a"
      // 速通版II型_26131221:"c7fde235283442e69afc68c1b2acbf18"
      // equipmentId: "c7fde235283442e69afc68c1b2acbf18",  //这是有闸道的办公室ID

      equipmentId: "e2209e9cd8454418b23baad95e482abe",
      operationUrl: "http://202.105.104.105:8089/equipment/operator",
      parkName: "出口",
      parkId: "311f0c5694f64789bccc56327db813fd",
      parkNames: ["出口", "入口", "三期入口", "西门单出口"],
      parkList: {},
      playingStatus: false,
      StunAddr: "119.23.240.42:3478",
      TurnAddr: "119.23.240.42:3478",
      TurnName: "ling",
      TurnPwd: "ling1234",
      personId: "13bf113562624ae9aa6567d4bc59b727",
      G_Video_Handle: null,
      // 所有的摄像头ID集合
      equipmentArray: [],
      // 集合索引
      equipmentArrayIndex: 0,
    }
  },
  computed: {
    ...mapState(['mnUrl'])
  },
  components: {
    Bread
  },
  mounted() {
    this.getData();
    this.login(this.localCno, this.localUsr, this.localPwd);
    // for(let i = 0;)
    // this.login();

  },
  watch: {
    doorName: function() {
      var parkList = this.parkList;
      var door = this.doorName;
      var willId = parkList[door];
      this.stopVideoPreview(this.localCno, this.token, this.equipmentId, willId);
      // this.requestVideoPreview(this.localCno, this.token, willId, this.StunAddr, this.TurnAddr, this.TurnName, this.TurnPwd)
      // alert("停止了哦");
      // alert(this.doorName);

    }
  },
  methods: {
    getData() {
      this.carList = carGUide.content
      this.carList.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 上报时间
        item.时间 = format(time1, 'yyyy-MM-dd HH:mm:ss')
      })
      this.carNums = carGUide.carPhoto
    },
    threeBtn(num) {
      this.clickBtn = num;
    },
    requestVideoPreview(localCno, localToken, equipId, StunAddr, TurnAddr, TurnName, TurnPwd) {
      var refThis = this;
      console.log('播放函数参数： ' + localCno + ' ' + localToken + ' ' + equipId + ' ' + StunAddr + ' ' + TurnAddr + ' ' + TurnName + ' ' + TurnPwd);
      var videoObj = document.getElementById("singlePlayerVideoPlugin");
      if (!videoObj.valid) {
        alert("视频插件无效!");
      }
      // 插件初始化
      videoObj.InitPeerResource(StunAddr, TurnAddr, TurnName, TurnPwd);
      // 获取本机SDP
      var cuSdp = videoObj.GetLocalSdp();
      // json生成url参数
      var playType = 'REALTIME';
      var linkMode = '1';
      var command = '1';
      var jsonBase = {};
      var dataBase = {};
      dataBase.requestType = "DATA";
      var dataItemsArray = [];
      var dataElement = {};
      dataElement.itemId = equipId;
      dataElement.playType = playType;
      dataElement.command = command;
      dataElement.linkMode = linkMode;
      dataElement.CU_SDP = cuSdp;
      dataItemsArray.push(dataElement);
      dataBase.dataItems = dataItemsArray;
      jsonBase.cno = localCno;
      jsonBase.tn = localToken;
      jsonBase.p = dataBase;
      var requestInfoJson = JSON.stringify(jsonBase);
      var messageHead = md5(requestInfoJson + "sign").toUpperCase();
      $.ajax({
        type: "post",
        url: refThis.playUrl,
        cache: false,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("sn", messageHead)
        },
        dataType: "json",
        data: requestInfoJson,
        success: function(respJson) {
          // 显示返回内容
          var playInfo = JSON.stringify(respJson);
          var resultCode = respJson.resultCode;
          var message = respJson.message;
          var dataItems = respJson.dataItems;
          // 保存A对方SDP，开始协商
          var videoObj = document.getElementById("singlePlayerVideoPlugin");
          if (!videoObj.valid) {
            return;
          }
          // resultCode ？ 时错误
          if (resultCode == undefined || message == undefined || dataItems == undefined) {
            // 返回参数异常
            videoObj.ReleasePeerResource();
            return;
          }

          var equipId = dataItems[0].equipmentId;
          var playType = dataItems[0].playType;
          var command = dataItems[0].command;
          var pluginName = dataItems[0].pluginName;
          // 此为全局
          refThis.G_Video_Handle = dataItems[0].videoHandle;
          var asuSdp = dataItems[0].ASU_SDP;

          if (equipId == undefined || pluginName == undefined || refThis.G_Video_Handle == undefined || asuSdp == undefined) {
            videoObj.ReleasePeerResource();
            return;
          }
          videoObj.PlayVideoByP2P(equipId, asuSdp, pluginName);
          refThis.playingStatus = true;
          refThis.equipmentId = equipId; //我想让当前播放的视频有个ID;
          // console.log("当前播放的id是："  + refThis.equipmentId);
          console.log("播放" + equipId + "应该成功");
        },
        error: function(err) {
          // 返回参数异常
          console.log("播放失败");
          var videoObj = document.getElementById("singlePlayerVideoPlugin");
          if (!videoObj.valid) {
            return;
          }
          videoObj.ReleasePeerResource();
        },
        complete: function(XMLHttpRequest, status) {

        }
      });
    },
    requestGate(localCno, localToken) {
      var refThis = this;
      if (localToken == undefined || localCno == undefined) {
        alert("有些东西未定义");
        return;
      }
      var jsonBase = {};
      jsonBase.cno = localCno;
      jsonBase.tn = localToken;

      var dataBase = {};
      dataBase.requestType = "DATA";
      jsonBase.p = dataBase;

      var requestInfoJson = JSON.stringify(jsonBase);

      var messageHead = md5(requestInfoJson + "sign").toUpperCase();

      $.ajax({
        type: "post",
        cache: false,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("sn", messageHead);
        },
        dataType: "json",
        data: requestInfoJson,
        url: refThis.requestGateUrl,
        success: function(respJson) {
          var resultCode = respJson.resultCode;
          var message = respJson.message;
          // 道闸集合
          var gateItems = respJson.dataItems;
          var ii = 0;
          // console.log(JSON.stringify(gateItems));
          for (var i = 0; i < gateItems.length; ++i) {
            var gateItem = gateItems[i];
            // 子系统单元ID
            var gateItemSystemId = gateItem.systemId;
            // 道闸编号
            var gateItemCode = gateItem.code;
            // 道闸名称
            var gateItemName = gateItem.name;
            var gateItemEquipItems = gateItem.equipItems;
            for (var j = 0; j < gateItemEquipItems.length; ++j) {
              var parkItem = gateItemEquipItems[j];
              // 道闸名称
              refThis.parkName = parkItem.equipmentName;
              // 道闸ID
              // console.log("开闸id是：" + parkItem.equipmentId);
              // 摄像头ID，此ID为视频播放所需
              var cameraId = parkItem.videoId;
              // alert("车场道闸: " + refThis.parkName + " , 关联的摄像头ID : " + cameraId);
              if (cameraId != "") {
                // console.log(JSON.stringify(gateItems));
                // alert("车场道闸: " + refThis.parkName + " , 关联的摄像头ID : " + cameraId);
                //              console.log("车场道闸: " + refThis.parkName + " , 关联的摄像头ID : " + cameraId);
                // refThis.equipmentId = cameraId;
                // 放入集合
                refThis.equipmentArray[refThis.equipmentArrayIndex] = cameraId;
                refThis.equipmentArrayIndex = refThis.equipmentArrayIndex;
                //闸道名称存放到列表数组
                refThis.parkNames[ii] = refThis.parkName;
                // console.log(refThis.parkNames);
                //闸道名称、id值对象存放
                var parkList = refThis.parkList;
                var parkName = refThis.parkNames[ii];
                // console.log(parkName);
                var obj = {};
                obj[parkName] = cameraId;
                parkList = Object.assign(parkList, obj);
                refThis.parkList = parkList;
                // console.log(parkList);
                console.log("获取闸道成功：" + JSON.stringify(refThis.parkList));
                ii++;
              }
            }
          }
        }
      });
      // refThis.requestVideoPreview(localCno, refThis.token, refThis.equipmentId, refThis.StunAddr, refThis.TurnAddr, refThis.TurnName, refThis.TurnPwd, refThis);
    },
    login(localCno, localUsr, localPwd) {
      // 构造登录json
      var jsonBase = {};
      jsonBase.cno = localCno;
      jsonBase.usr = localUsr;
      jsonBase.psw = localPwd;
      var loginInfoJson = JSON.stringify(jsonBase);
      var refThis = this;
      // 发送登录请求
      $.ajax({
        type: "post",
        url: refThis.loginUrl,
        cache: false,
        dataType: "json",
        data: loginInfoJson,
        success: function(respJson) {
          // 显示返回内容
          var loginInfo = JSON.stringify(respJson);
          // alert(loginInfo);
          var resultCode = respJson.resultCode;
          if (resultCode != 0) {
            return;
          }
          var message = respJson.message;
          // 全局变量保存token
          refThis.token = respJson.token;
          var timeout = respJson.timeOut;
          console.log("登陆成功");
          refThis.requestVideoPreview(localCno, refThis.token, refThis.equipmentId, refThis.StunAddr, refThis.TurnAddr, refThis.TurnName, refThis.TurnPwd);
          refThis.requestGate(localCno, refThis.token);
          console.log("登陆后已执行播放和获取闸道");
        }
      });
    },
    stopVideoPreview(localCno, localToken, equipId, willId) {
      var refThis = this;
      if (localToken == undefined || localCno == undefined || equipId == undefined) {
        return;
      }
      // json生成url参数
      var playType = 'REALTIME';
      var command = '2';
      var jsonBase = {};

      var dataBase = {};
      dataBase.requestType = "DATA";
      var dataItemsArray = [];
      var dataElement = {};
      dataElement.itemId = equipId;
      dataElement.playType = playType;
      dataElement.command = command;
      dataElement.videoHandle = refThis.G_Video_Handle;
      dataItemsArray.push(dataElement);
      dataBase.dataItems = dataItemsArray;

      jsonBase.cno = localCno;
      jsonBase.tn = localToken;
      jsonBase.p = dataBase;
      var requestInfoJson = JSON.stringify(jsonBase);
      var messageHead = md5(requestInfoJson + "sign").toUpperCase();
      $.ajax({
        type: "post",
        url: refThis.endUrl,
        cache: false,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("sn", messageHead)
        },
        dataType: "json",
        data: requestInfoJson,
        success: function(respJson) {
          // 显示返回内容
          var stopInfo = JSON.stringify(respJson);
          var resultCode = respJson.resultCode;
          var message = respJson.message;
          var dataItems = respJson.dataItems;
        },
        error: function(err) {
          // alert("关闭请求返回失败")
        },
        complete: function(XMLHttpRequest, status) {}
      });

      // 关闭播放资源
      var videoObj = document.getElementById("singlePlayerVideoPlugin");
      if (!videoObj.valid) {
        alert("视频插件无效!");
      }
      videoObj.StopVideoPreviewByP2P();
      videoObj.ReleasePeerResource();
      refThis.requestVideoPreview(refThis.localCno, refThis.token, willId, refThis.StunAddr, refThis.TurnAddr, refThis.TurnName, refThis.TurnPwd)
    },
    /*
    	截图，默认保存到C:\
    	parkName : 道闸名称，或摄像头名称，由调用者自定义能区分区域内的某个设备
		*/
    snapPhoto(parkName) {
      if (parkName == undefined) {
        alert("")
        return;
      }

      // 关闭播放资源
      var videoObj = document.getElementById("singlePlayerVideoPlugin");
      if (!videoObj.valid) {
        alert("视频插件无效!");
      }

      // if (!playingStatus)
      // {
      // 	alert("未播放视频，无法截图!");
      // }
      videoObj.SnapPhoto(parkName);
    },
    OperateGate(localCno, localToken, parkId, personId, command) {
      parkId = "311f0c5694f64789bccc56327db813fd";
      var refThis = this;
      if (parkId == "" || personId == "") {
        alert("ParkId or PersonId 不能为空");
        return;
      }

      if (localToken == undefined || localCno == undefined) {
        return;
      }

      // json生成url参数
      var jsonBase = {};

      var dataBase = {};
      dataBase.requestType = "DATA";
      var dataItemsArray = [];
      var dataElement = {};
      dataElement.itemId = parkId;
      dataElement.personId = personId;
      dataElement.command = command;

      dataItemsArray.push(dataElement);
      dataBase.dataItems = dataItemsArray;

      jsonBase.cno = localCno;
      jsonBase.tn = localToken;
      jsonBase.p = dataBase;
      var requestInfoJson = JSON.stringify(jsonBase);

      // alert("操控闸门请求： " + requestInfoJson);

      var messageHead = md5(requestInfoJson + "sign").toUpperCase();

      $.ajax({
        type: "post",
        url: refThis.operationUrl,
        cache: false,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("sn", messageHead)
        },
        dataType: "json",
        data: requestInfoJson,
        success: function(respJson) {
          // 显示返回内容
          var respInfo = JSON.stringify(respJson);
          // alert("开闸成功响应: " + respInfo);
        },
        error: function(err) {

          alert("开闸失败：" + JSON.stringify(err))
        },
        complete: function(XMLHttpRequest, status) {}
      });

    }

  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$padding_top: 0.1rem;

span,
button,
select,
input {
	color: #fff;
}

.main {
	vertical-align: top;
	width: 100%;
	height: 100%; // display: inline-block;
	// border: 1px solid green;
}

.video_content {
	width: 14.18rem;
	margin: 0 auto;
	margin-top: 0.15rem; // border: 1px solid #fff;
	font-size: 0;
	position: relative;
	.select_door {
		position: absolute;
		right: 0.2rem;
		top: -0.5rem;
		font-size: 0.18rem;
		background-color: #154777;
		@include myselect(1.5rem);
		option {
			background-color: #154777;
			padding-top: 0.1rem;
		}
	}
	&>div {
		width: 6.93rem;
	}
	.video,
	.photo {
		height: 3.9rem;
		background-image: url(../../../images/monit_video.png);
		background-size: cover;
		position: relative;
		display: inline-block;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.video {
		margin-right: 0.08rem;
		div {
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			// background-color: #154777;
			width: 1.85rem;
			height: 0.5rem;
		}
		.rel_video {
			@include center;
			width: 6.45rem;
			height: 3.39rem;
			object-fit: fill;
			object{
				width: 6.45rem;
				height: 3.39rem;
			}
		}
	}
	.video_title {
		position: absolute;
		left: 50%;
		display: block;
		background-image: url(../../../images/monit_tt.png);
		background-size: cover;
		width: 2.33rem;
		height: 0.96rem;
		text-align: center;
		line-height: 0.96rem;
		color: #94e0ff;
		transform: translate(-50%, -50%);
	}
	.photo {
		float: right;
	}
	.photo>div {
		background-color: blue;
		@include center;
		width: 6.45rem;
		height: 3.39rem;
	}
	.function_div {
		display: block;
		width: 100%;
		margin-top: 0.65rem;
		input {
			@include ip(3.17rem);
		}
	}
	.talk {
		@include btn(0.93rem, 0.36rem);
		margin-top: 4rem;
		margin-left: 0rem;
		position: absolute;
		left: 0;
		top: 0;
	}
	.take_photo {
		@include btn(0.93rem, 0.36rem);
		margin-left: 6rem;
		position: absolute;
		margin-top: 4rem;
		left: 0;
		top: 0;
	}
	.open_cut,
	.car_num,
	.fire_open {
		@include btn(1.16rem, 0.36rem);
		float: right;
		margin-right: 0.86rem;
	}
	.check {
		@include btnG(0.93rem, 0.36rem);
	}
	.second_div {
		width: 100%;
		margin-top: 0.1rem;
		position: relative;
		.table {
			span {
				color: #9bffff;
			}
			margin-right: 0.08rem;
			background-image: url(../../../images/monit_table.png);
			.table_head {
				height: 0.35rem;
				display: flex;
				span {
					flex: 1;
					text-align: center;
					line-height: 0.35rem;
				}

			}
			ul {
				height: 2.69rem;
				width: 100%;
				overflow-y: scroll;
				li {
					display: flex;
					height: 0.5rem;
					align-items: center;
					span {
						flex: 1;
						text-align: center;
					}

				}

			}
		}
		.flex_time{
			flex: 1.5!important;
		}
		.flex_time1{
			flex: 1.2!important;
		}
		.flex_time2 {
			flex: 1.6!important;
		}
		.open {
			background-image: url(../../../images/monit_open.png);
			background-size: cover;
			background-position: bottom;
			background-repeat: no-repeat;
			position: absolute;
			right: 0;
			top: 0;
			.open1 {
				.open_label {
					margin-left: 1.5rem;
					margin-top: 0.24rem;
					span {
						display: block;
					}
					span:nth-child(2) {
						margin-top: 0.18rem;
					}
					span:nth-child(3) {
						margin-top: 0.2rem;
					}
				}

				.open_content {
					@include center;
					text-align: center;
					span {
						margin-top: $padding_top;
					}
					button {
						@include btnG(0.93rem, 0.36rem);
						margin-top: $padding_top;
					}
					select {
						@include myselect(2.24rem);
						margin-top: $padding_top;
					}
					textarea {
						@include tare(2.24rem, 1.25rem);
						margin-top: $padding_top;
					}
					.bus_selete {
						margin-top: $padding_top;

						.el_place {
							width: 2.24rem;
						}
					}
				}
			}
			.open2 {
				padding-left: 1rem;
				section {
					margin-top: 0.1rem;
				}
				textarea {
					@include tare(2.24rem, 0.6rem);
				}
				button {
					@include btn(1rem, 0.36rem);
				}
				select {
					@include myselect(2.24rem);
				}
				input {
					@include ip(2.24rem);
				}
				.label1 {
					margin-right: 1.6rem;
				}
				.label2 {
					margin-right: 0.6rem;
				}
				.label3 {
					margin-right: 0.6rem;
				}
				.label4 {
					margin-right: 1.3rem;
				}
				.label5 {
					margin-right: 0.9rem;
				}
				.sure_open {
					margin-left: 2rem;
				}
			}
			.open3 {
				text-align: center;
				span {
					color: red;
					font-size: 0.2rem;
				}
				div {
					margin-top: 0.2rem;
					margin-bottom: 0.5rem;
					span {
						font-weight: bold; // color: #fff;
					}
				}
				.cancle {
					margin-top: 0.5rem;
					@include btnR(0.93rem, 0.36rem);
				}
				.confirm {
					margin-top: 0.5rem;
					margin-left: 0.5rem;
					@include btnG(0.93rem, 0.36rem);
				}
			}
		}
	}
	.table,
	.open {
		height: 3.07rem;
		width: 6.95rem;
		background-size: cover;
		background-position: bottom;
		background-repeat: no-repeat;
	} //优先级最高的特殊样式
	.red_name {
		color: red!important;
	}
	.click_btn {
		// border-bottom: 0.05rem solid blue;
		box-shadow: 0 0.03rem 0 0 #fff;
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
	textarea {
    overflow: hidden;
}
}
.player{
	@include btn(0.93rem, 0.36rem);
	position: absolute;
	left: 3rem;
	top: 4rem;
}
</style>
