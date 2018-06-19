export default
	[
		{
			"word": "monit",
			"name": "物联监控",
			"imgUrl": "/static/img/navCamera.png",
			"submenu": [
				{
					"word": "garden",
					"name": "园区电子地图",
					"submenu": [
						{
							"word": "map",
							"name": "电子地图",
							"url": "monit/garden/map",
						},
						{
							"word": "police",
							"name": "报警管理",
							"url": "monit/garden/police",
						}

					]
				},
				{
					"word": "call",
					"name": "云对讲呼叫台",
					"submenu": [
						{
							"word": "center",
							"name": "呼叫中心",
							"url": "monit/call/center",
						},
						{
							"word": "process",
							"name": "进度跟踪",
							"url": "monit/call/process",
						}

					]
				},
				{
					"word": "msg",
					"name": "信息发布中心",
					"submenu": [
						{
							"word": "weather",
							"name": "气象中心",
							"url": "monit/msg/weather",
						},
						{
							"word": "release",
							"name": "信息发布",
							"url": "monit/msg/release",
						}

					]
				},
				{
					"word": "inout",
					"name": "出入物联监控",
					"submenu": [
						{
							"word": "car",
							"name": "车行指挥调度",
							"submenu": [
								{
									"word": "guide",
									"name": "车行指挥调度",
									"url": "monit/inout/car/guide"
								},
								{
									"word": "record",
									"name": "车辆出入记录",
									"url": "monit/inout/car/record"
								}
							]
						},
						{
							"name": "人行指挥调度",
							"word": "person",
							"submenu": [
								{
									"name": "人行指挥调度",
									"word": "guide",
									"url": "monit/inout/person/guide"
								},
								{
									"name": "开门记录",
									"word": "record",
									"url": "monit/inout/person/record"
								},
							]
						},

					]
				},
				{
					"name": "视频物联监控",
					"word": "video",
					"submenu": [
						{
              "name": "巡检记录",
							"word": "patrolrecord",
							"url": "monit/video/patrolrecord",
						},
						{
							"name": "重点预览",
							"word": "ysVideo",
							"url": "monit/video/ysVideo",
						},
            {
              "name": "实时预览",
              "word": "prevideo",
              "url": "monit/video/prevideo"
            },
						{
							"name": "录像回放",
							"word": "",
						},
						{
							"name": "视频巡检",
							"word": "",
						},
						{
							"name": "巡检配置",
							"word": "patrolcfg",
							"url": "monit/video/patrolcfg",
						},
					]
				},
				{
					"name": "设备物联监控",
					"word": "equip",
					"url": "",
					"submenu": [
						{
							"name": "电梯系统",
							"word": "elevator",
							"url": "monit/equip/elevator"
						},
						{
							"name": "供配电系统",
							"word": "electric",
							"url": "monit/equip/electric"
						},
						{
							"name": "给排水系统",
							"word": "water",
							"url": "monit/equip/water"
						},
						{
							"name": "中央空调系统",
							"word": "airc",
							"url": "monit/equip/airc"
						},
						{
							"name": "公共照明系统",
							"url": ""
						},
					]
				},
				{
					"name": "环境物联监控",
					"word": "evrmt",
					"url": "",
					"submenu": [
						{
							"name": "空气质量监测",
							"word": "air",
							"url": "monit/evrmt/air",
						},
						{
							"name": "水质质量监测",
							"word": "water",
							"url": "",
							"submenu": [
								{
									"name": "泳池水",
									"word": "swim",
									"url": "monit/evrmt/water/swim",
								},
								{
									"name": "水箱水",
									"word": "box",
									"url": "monit/evrmt/water/box",
								},
								{
									"name": "景观水",
									"word": "sight",
									"url": "monit/evrmt/water/sight",
								},
							]
						},
						{
							"name": "土壤墒情监测",
							"url": "",
						},
						{
							"name": "自动喷灌",
							"url": "",
						},
					]
				},
				{
					"name": "消防物联监控",
					"word": "fire",
					"url": "",
					"submenu": [
						{
							"name": "消防监测系统",
							"word": "monitor",
							"url": "monit/fire/monitor",
						},
						{
							"name": "消防机电系统",
							"url": "",
						},
						{
							"name": "自动灭火系统",
							"url": "",
						},
						{
							"name": "消防排烟系统",
							"url": "",
						},
						{
							"name": "消防事故广播系统",
							"url": "",
						},
					]
				},
				{
					"name": "机房物联监控",
					"word": "machine",
					"url": "",
					"submenu": [
						{
							"name": "网络资源监控",
							"word": "net",
							"url": "monit/machine/net"
						},
						{
							"name": "服务器资源监控",
							"word": "server",
							"url": "monit/machine/server"
						},
						{
							"name": "数据库资源监控",
							"word": "data",
							"url": "monit/machine/data"
						},
					]
				},
				{
					"name": "人员物联监控",
					"word": "person",
					"url": "",
					"submenu": [
						{
							"name": "安防人员",
							"word": "safe",
							"url": "",
							"submenu": [
								{
									"name": "实时位置监控",
									"word": "site",
									"url": "monit/person/safe/site",
								},
								{
									"name": "历史轨迹查询",
									"word": "track",
									"url": "monit/person/safe/track"
								},
								{
									"name": "实时信息下发",
									"word": "msg",
									"url": "monit/person/safe/msg"
								},
								{
									"name": "当前任务监控",
									"url": "",
								},


							]
						},
						{
							"name": "工程人员",
							"url": "",
							"submenu": [
								{
									"name": "实时位置监控",
									// "url": "engineeringPosition",
								},
								{
									"name": "历史轨迹查询",
									// "url": "currentTask",
								},
								{
									"name": "实时信息下发",
									// "url": "engineeringinFormation",
								},
								{
									"name": "当前任务监控",
									// "url": "Engineeringpersonnel"
								},
							]
						},
						{
							"name": "环境人员",
							"url": "",
							"submenu": [
								{
									"name": "实时位置监控",
									// "url": "locationInformation",
								},
								{
									"name": "历史轨迹查询",
									"url": "",
								},
								{
									"name": "实时信息下发",
									// "url": "newEnvironmentMsg",
								},
								{
									"name": "当前任务监控",
									// "url": "environmentPersonnel"
								},
							]
						},
						{
							"name": "客服人员",
							"url": "",
							"submenu": [
								{
									"name": "实时位置监控",
									// "url": "customerLocation",
								},
								{
									"name": "历史轨迹查询",
									"url": "",
								},
								{
									"name": "实时信息下发",
									// "url": "realTime",
								},
								{
									"name": "当前任务监控",
									// "url": "Customerservice"
								},
							]
						},
					]
				},
			]
		},
		{
			"name": "管理应用",
			"word": "manage",
			"imgUrl": "/static/img/navBusi.png",
			"submenu": [
				{
					"name": "项目仪表盘",
					"url": "",
					"submenu": [
						{
							"name": "项目仪表盘",
							"url": "P_projectTote",
						},
						{
							"name": "重大事件管理",
							"url": "",
							"submenu": [
								{
									"name": "重大事件投诉管理",
									"url": "",
								},
								{
									"name": "重大事故管理",
									"url": "",
								},
								{
									"name": "滞留维修管理",
									"url": "",
								},
								{
									"name": "逾期报警管理",
									"url": "",
								},
								{
									"name": "品质稽核管理",
									"url": "",
								},
							]
						},
					]
				},
				{
					"name": "安管管理",
					"word": "safe",
					"url": "",
					"submenu": [
						{
							"name": "车行出入管理",
							"word": "cario",
							"url": "",
							"submenu": [
								{
									"name": "通行记录查询",
									"word": "record",
									"url": "manage/safe/cario/record",
								},
								{
									"name": "异常放行管理",
									"url": "",
								},
								{
									"name": "车牌补录管理",
									"url": "",
								},
								{
									"name": "一位多车管理",
									"url": "",
								},
								{
									"name": "停车投诉管理",
									"url": "",
								},
								{
									"name": "车场稽核管理",
									"url": "",
								},
							]
						},
						{
							"name": "人行出入管理",
							"url": "",
							"submenu": [
								{
									"name": "异常放行管理",
									"url": "",
								},
								{
									"name": "访客滞留人员管理",
									"url": "",
								},
								{
									"name": "红名单出入管理",
									"url": "",
								},

							]
						},
						{
							"name": "巡更管理",
							"url": "",
						},
						{
							"name": "报事管理",
							"url": "",
						},
						{
							"name": "消防管理",
							"url": "",
							"submenu": [
								{
									"name": "报警记录",
									"url": "",
								},
								{
									"name": "安全演练管理",
									"url": "",
								}

							]
						},
						{
							"name": "门岗签到管理",
							"url": "",
						},

					]
				},
				{
					"name": "工程管理",
					"word": "project",
					"url": "",
					"submenu": [
						{
							"name": "维修管理",
							"word": "record",
							"url": "manage/project/record",
						},
						{
							"name": "巡检管理",
							"word": "patrol",
							"url": "manage/project/patrol",
						},
						{
							"name": "保养管理",
							"word": "upkeep",
							"url": "manage/project/upkeep",
						},
						{
							"name": "巡查抄表",
							"url": "",
						},
					]
				},
				{
					"name": "环境管理",
					"word": "envir",
					"url": "",
					"submenu": [
						{
							"name": "环境管理",
							"word": "detection",
							"url": "manage/envir/detection",
						},
						{
							"name": "绿化管理",
							"url": "",
						}
					]
				},
				{
					"name": "客服管理",
					"word": "service",
					"url": "manage/service",
					"submenu": [
						{
							"name": "日常服务管理",
							"url": "",
							"submenu": [
								{
									"name": "客户满意度调查",
									"url": "",
								},
								{
									"name": "库存管理",
									"url": "",
								},
								{
									"name": "停车场服务",
									"url": "",
								},
								{
									"name": "门禁服务",
									"url": "",
								},
								{
									"name": "信息发布",
									"url": "",
								},
								{
									"name": "背景音乐",
									"url": "",
								},
								{
									"name": "大件物品放行登记",
									"url": "",
								},
								{
									"name": "装修申请受理",
									"url": "",
								},
								{
									"name": "代收款",
									"url": "",
								},
								{
									"name": "场馆使用管理",
									"url": "",
								},
							]
						},
						{
							"name": "报修管理",
							"url": "",
							"submenu": [
								{

								},
							]
						},
						{
							"name": "投诉管理",
							"url": "",
							"submenu": [
								{

								},
							]
						},
						{
							"name": "名单管理",
							"url": "",
							"submenu": [
								{
									"name": "白名单",
									"url": "",
								},
								{
									"name": "红名单",
									"url": "",
								},
								{
									"name": "周期性访客登记",
									"url": "",
								},
							]
						},
					]
				},
				{
					"name": "财务管理",
					"url": "",
					"submenu": [
						{
							"name": "停车场收费管理",
							"url": "",
						},
					]
				},
				{
					"name": "舆情分析",
          "url": "",
          "word": "situation",
					"submenu": [
						{
							"name": "舆情监测",
              "word": "history",
							"url": "manage/situation/history",
						},
						{
							"name": "舆情收藏",
              "word": "collection",
							"url": "manage/situation/collection",
						}
					]
				},

			]
		},
		{
			"name": "业务配置",
			"word": "config",
			"imgUrl": "/static/img/navPei.png",
			"submenu": [
				{
					"name": "安防业务配置",
					"word": "safe",
					"url": "",
					"submenu": [
						{
							"name": "车行出入配置",
							"word": "personcfg",
							"url": "",
							"submenu": [
								{
									"name": "车行联动配置",
									"word": "visitor",
									"url": "config/safe/personcfg/visitor"
								},
								{
									"name": "停车场名单配置",
									"url": ""
								},
								{
									"name": "车辆类型配置",
									"url": ""
								}
							]
						},
						{
							"name": "人行出入配置",
							"word": "personcfg",
							"url": "",
							"submenu": [
								{
									"name": "人行名单配置",
									"url": ""
								},

								{
									"name": "人行联动配置",
									"word": "personlink",
									"url": "config/personcfg/personlink"
								},
								{
									"name": "访客配置",
									"word": "visitor",
									"url": "config/personcfg/visitor"
								},
							]
						},
						{
							"name": "巡更配置",
							"url": "",
							"submenu": [
								{
									"name": "巡更点位配置",
									"url": ""
								},
								{
									"name": "巡更线路配置",
									"url": ""
								},
								{
									"name": "巡更任务配置",
									"url": ""
								}

							]
						},
						{
							"name": "摄像头分组配置",
							"url": "",
							"submenu": [
								{
									"name": "",
									"url": ""
								},
							]
						}
					]
				},
				{
					"name": "工程业务配置",
					"word": "projectcfg",
					"url": "",
					"submenu": [
						{
							"name": "设备监控阀值配置",
							"word": "device",
							"url": "config/projectcfg/device"
						},
						{
							"name": "能耗监控阀值配置",
							"word": "energyset",
							"url": "config/projectcfg/energyset"
						},
						{
							"name": "资源监控阀值配置",
							"word": "resource",
							"url": "config/projectcfg/resource"
						},
					]
				},
				{
					"name": "环境业务配置",
					"url": "",
					"submenu": [
						{
							"name": "环境人员配置",
							"url": ""
						},
						{
							"name": "环境监控阀值配置",
							"url": ""
						},
						{
							"name": "日常清洁配置",
							"url": "",
							"submenu": [
								{
									"name": "清洁配置",
									"url": ""
								},
								{
									"name": "消杀配置",
									"url": ""
								},
								{
									"name": "清运配置",
									"url": ""
								},
							]
						},
						{
							"name": "绿化养护配置",
							"url": ""
						},
					]
				},
				{
					"name": "客服业务配置",
					"url": "",
					"submenu": [
						{
							"name": "项目信息配置",
							"url": ""
						},
						{
							"name": "人员信息配置",
							"url": ""
						},
						{
							"name": "停车场收费标准配置",
							"url": "",
						},
					]
				},
				{
					"name": "推送机制配置",
					"url": "",
					"submenu": [
						{
							"name": "推送任务配置",
							"url": ""
						},
						{
							"name": "推送级别配置",
							"url": ""
						},
					]
				},
			]
		},
		{
			"name": "数据分析",
			"word": "data",
			"imgUrl": "/static/img/navData.png",
			"submenu": [
				{
					"name": "数据概览",
					"word": "overview",
					"url": "data/overview",
				},
				{
					"name": "财务数据",
					"word": "finance",
					"url": "",
					"submenu": [
						{
							"name": "出纳收支分析",
							"word": "incomeanlz",
							"url": "",
							"submenu": [
								{
									"name": "停车场收费",
									"word": "park",
									"url": "data/finance/incomeanlz/park"
								},
								{
									"name": "其他收费",
									"word": "other",
									"url": "data/finance/incomeanlz/other"
								},
								{
									"name": "支出收费",
									"word": "cost",
									"url": "data/finance/incomeanlz/cost"
								},
							]
						},
						{
							"name": "会计账目分析",
							"word": "accountanlz",
							"url": "data/finance/accountanlz"
						},
						{
							"name": "财务稽查",
							"word": "financecheck",
							"url": "",
							"submenu": [
								{
									"name": "收费稽查",
									"word": "income",
									"url": "data/finance/financecheck/income"
								},
								{
									"name": "支出稽查",
									"word": "pay",
									"url": "data/finance/financecheck/pay"
								}
							]
						},
						{
							"name": "支出收纳查询",
							"word": "expendcheck",
							"url": "",
							"submenu": [
								{
									"name": "停车场临停收费",
									"word": "parktemp",
									"url": "data/finance/expendcheck/parktemp"
								},
								{
									"name": "停车场储值卡收费",
									"word": "valuecard",
									"url": "data/finance/expendcheck/valuecard"
								},
								{
									"name": "停车场月卡收费",
									"word": "monthcard",
									"url": "data/finance/expendcheck/monthcard"
								},
								{
									"name": "物业管理费收费",
									"word": "mngincome",
									"url": "data/finance/expendcheck/mngincome"
								},
								{
									"name": "物业管理费欠费",
									"word": "mngowe",
									"url": "data/finance/expendcheck/mngowe"
								},
								{
									"name": "装修押金收费",
									"word": "decorate",
									"url": "data/finance/expendcheck/decorate"
								},
								{
									"name": "代收费收费",
									"word": "replace",
									"url": "data/finance/expendcheck/replace"
								},
								{
									"name": "备用金核发",
									"word": "backup",
									"url": "data/finance/expendcheck/backup"
								},
								{
									"name": "费用报销支出",
									"word": "reimburse",
									"url": "data/finance/expendcheck/reimburse"
								},
								{
									"name": "退款支出",
									"word": "refund",
									"url": "data/finance/expendcheck/refund"
								},
							]
						},
						{
							"name": "财务稽查查询",
							"word": "financequery",
							"url": "",
							"submenu": [
								{
									"name": "停车场临停收费",
									"word": "park",
									"url": "data/finance/financequery/park"
								},
								{
									"name": "停车场月卡收费",
									"word": "monthcard",
									"url": "data/finance/financequery/monthcard"
								},
								{
									"name": "物业管理费收费",
									"word": "property",
									"url": "data/finance/financequery/property"
								},
								{
									"name": "备用金支出",
									"word": "backup",
									"url": "data/finance/financequery/backup"
								},
								{
									"name": "报销费用支出",
									"word": "reimburse",
									"url": "data/finance/financequery/reimburse"
								},
							]
						},
					]
				},
				{
					"name": "安防数据",
					"word": "security",
					"url": "secureEnvironment_1",
					"submenu": [
						{
							"name": "行为数据分析",
							"word": "action",
							"url": "",
							"submenu": [
								{
									"name": "停车出入行为数据",
									"word": "park",
									"url": "data/security/action/park"
								},
								{
									"name": "门禁出入行为数据",
									"word": "access",
									"url": "data/security/action/access"
								},
							]
						},
						{
							"name": "故障数据分析",
							"word": "hitch",
							"url": "",
							"submenu": [
								{
									"name": "车行故障数据",
									"word": "car",
									"url": "data/security/hitch/car"
								},
								{
									"name": "人行故障数据",
									"word": "person",
									"url": "data/security/hitch/person"
								},
								{
									"name": "安防故障数据",
									"word": "security",
									"url": "data/security/hitch/security"
								},
								{
									"name": "巡更故障数据",
									"word": "patrol",
									"url": "data/security/hitch/patrol"
								},
							]
						},
					]
				},
				{
					"name": "工程数据",
					"word": "projdata",
					"url": "engineeringData",
					"submenu": [
						{
							"name": "工程运营数据分析",
							"word": "projrun",
							"url": "",
							"submenu": [
								{
									"name": "巡查工作分析",
									"word": "patrol",
									"url": "data/projdata/projrun/patrol",

								},
								{
									"name": "维修服务统计",
									"word": "repair",
									"url": "data/projdata/projrun/repair",

								},
								{
									"name": "装修及监管统计",
									"word": "decoration",
									"url": "data/projdata/projrun/decoration",

								},
								{
									"name": "公区设备设施统计",
									"word": "equipment",
									"url": "data/projdata/projrun/equipment",
								},
							]
						},
						{
							"name": "能耗数据分析",
							"word": "energy",
							"url": "data/projdata/energy",

						},
						{
							"name": "设备设施台账查询",
							"word": "equipment",
							"url": "data/projdata/equipment",

						},
					]
				},
				{
					"name": "环境数据",
					"url": "environment",
					"submenu": [
						{
							"name": "环境工作完成率统计",
							"url": "",
						},
						{
							"name": "生活水质统计",
							"url": "",
						},
						{
							"name": "泳池水质统计",
							"url": "",
						},
						{
							"name": "景观水质统计",
							"url": "",
						},
						{
							"name": "空气质量统计",
							"url": "",
						},
					]

				},
				{
					"name": "客服数据",
					"url": "custom",
					"submenu": [
						{
							"name": "停车场催缴率统计",
							"url": "",
						},
						{
							"name": "客户满意度统计",
							"url": "",
						},
						{
							"name": "投诉统计",
							"url": "",
						},
					]
				},
				{
					"name": "人事数据",
					"word": "psndata",
					"url": "humanAffairs",
					"submenu": [
						{
							"name": "考勤数据分析",
							"word": "attendanceData",
							"url": "data/psndata/attendanceData",
						},
						{
							"name": "考勤数据查询",
							"word": "attenddata",
							"url": "",
							"submenu": [
								{
									"name": "员工出勤数据",
									"word": "attend",
									"url": "data/psndata/attenddata/attend",
								},
								{
									"name": "员工绩效评分",
									"word": "grade",
									"url": "data/psndata/attenddata/grade",
								},
							]
						},
					]
				}
			]
		},
		{
			"name": "系统管理",
			"url": "",
			"imgUrl": "/static/img/navSet.png",
			"submenu": [
				{
					"name": "组织管理",
					"url": ""
				},
				{
					"name": "项目管理",
					"url": ""
				},
				{
					"name": "路址管理",
					"url": ""
				},
				{
					"name": "空间管理",
					"url": ""
				},
				{
					"name": "设备设施管理",
					"url": ""
				},
				{
					"name": "人员管理",
					"url": ""
				},
				{
					"name": "账号管理",
					"url": ""
				},
				{
					"name": "权限管理",
					"url": ""
				},
			]
		},
	]
