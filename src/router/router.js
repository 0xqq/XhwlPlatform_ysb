import Vue from 'vue'
import Router from 'vue-router'

// 引入两个组件
// import device from "./pages/home/serviceConfig/device.vue"
// import newdevice from "./pages/home/serviceConfig/newdevice.vue"
//统一用懒加载方式

//公用
const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const pages404 = r => require.ensure([], () => r(require('@/pages/404/pages404')), 'pages404')
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const main = r => require.ensure([], () => r(require('@/pages/home/other/main')), 'main')
const test = r => require.ensure([], () => r(require('@/pages/home/other/test')), 'test')
const videoTest = r => require.ensure([], () => r(require('@/pages/home/other/videoTest')), 'videoTest')
const realHome = r => require.ensure([], () => r(require('@/pages/home/other/realHome')), 'realHome') //真·首页

//集团级首页
const financialData = r => require.ensure([], () => r(require('@/pages/home/homePage/financialData')), 'financialData') //财务数据(停车场)
const secureEnvironment_1 = r => require.ensure([], () => r(require('@/pages/home/homePage/secureEnvironment_1')), 'secureEnvironment_1') //安防数据(概览)
const secureEnvironment_2 = r => require.ensure([], () => r(require('@/pages/home/homePage/secureEnvironment_2')), 'secureEnvironment_2') //安防数据(停车场)
const secureEnvironment_3 = r => require.ensure([], () => r(require('@/pages/home/homePage/secureEnvironment_3')), 'secureEnvironment_3') //安防数据(门禁)
const engineeringData = r => require.ensure([], () => r(require('@/pages/home/homePage/engineeringData')), 'engineeringData')
const custom = r => require.ensure([], () => r(require('@/pages/home/homePage/custom')), 'custom')
const humanAffairs = r => require.ensure([], () => r(require('@/pages/home/homePage/humanAffairs')), 'humanAffairs')
const environment = r => require.ensure([], () => r(require('@/pages/home/homePage/environment')), 'environment')
    //分公司级首页
const M_financialData = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_financialData')), 'M_financialData') //财务数据(停车场)
const M_secureEnvironment_1 = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_secureEnvironment_1')), 'M_secureEnvironment_1') //安防数据(概览)
const M_secureEnvironment_2 = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_secureEnvironment_2')), 'M_secureEnvironment_2') //安防数据(停车场)
const M_secureEnvironment_3 = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_secureEnvironment_3')), 'M_secureEnvironment_3') //安防数据(门禁)
const M_engineeringData = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_engineeringData')), 'M_engineeringData')
const M_custom = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_custom')), 'M_custom')
const M_humanAffairs = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_humanAffairs')), 'M_humanAffairs')
const M_environment = r => require.ensure([], () => r(require('@/pages/home/homePage/managerRank/M_environment')), 'M_environment')
    //项目级首页
const P_secureEnvironment = r => require.ensure([], () => r(require('@/pages/home/homePage/projectRank/P_secureEnvironment')), 'P_secureEnvironment')
const P_financialData = r => require.ensure([], () => r(require('@/pages/home/homePage/projectRank/P_financialData')), 'P_financialData')
const P_engineeringData = r => require.ensure([], () => r(require('@/pages/home/homePage/projectRank/P_engineeringData')), 'P_engineeringData')
const P_custom = r => require.ensure([], () => r(require('@/pages/home/homePage/projectRank/P_custom')), 'P_custom')
const P_projectTote = r => require.ensure([], () => r(require('@/pages/home/homePage/projectRank/P_projectTote')), 'P_projectTote')
const P_environment = r => require.ensure([], () => r(require('@/pages/home/homePage/projectRank/P_environment')), 'P_environment')
    //城市级首页
const C_financialData = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_financialData')), 'C_financialData')
const C_secureEnvironment_1 = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_secureEnvironment_1')), 'C_secureEnvironment_1')
const C_secureEnvironment_2 = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_secureEnvironment_2')), 'C_secureEnvironment_2')
const C_secureEnvironment_3 = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_secureEnvironment_3')), 'C_secureEnvironment_3')
const C_engineeringData = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_engineeringData')), 'C_engineeringData')
const C_environment = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_environment')), 'C_environment')
const C_humanAffairs = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_humanAffairs')), 'C_humanAffairs')
const C_custom = r => require.ensure([], () => r(require('@/pages/home/homePage/cityRank/C_custom')), 'C_custom')
//物联监控
const openRecord = r => require.ensure([], () => r(require('@/pages/home/monitoring/openRecord')), 'openRecord')
const walkGuide = r => require.ensure([], () => r(require('@/pages/home/monitoring/walkGuide')), 'walkGuide')
const carGuide = r => require.ensure([], () => r(require('@/pages/home/monitoring/carGuide')), 'carGuide')
const photoRecord = r => require.ensure([], () => r(require('@/pages/home/monitoring/photoRecord')), 'photoRecord')
const newMsg = r => require.ensure([], () => r(require('@/pages/home/monitoring/newMsg')), 'newMsg')
const sendMsg = r => require.ensure([], () => r(require('@/pages/home/monitoring/sendMsg')), 'sendMsg')
const sceneconDition = r => require.ensure([], () => r(require('@/pages/home/monitoring/sceneconDition')), 'sceneconDition')
const personnelHistory = r => require.ensure([], () => r(require('@/pages/home/monitoring/personnelHistory')), 'personnelHistory')
const abnormityWarning = r => require.ensure([], () => r(require('@/pages/home/monitoring/abnormityWarning')), 'abnormityWarning')
const naswerNormal = r => require.ensure([], () => r(require('@/pages/home/monitoring/naswerNormal')), 'naswerNormal')
const cruise = r => require.ensure([], () => r(require('@/pages/home/monitoring/cruise')), 'cruise')
const proDuction = r => require.ensure([], () => r(require('@/pages/home/monitoring/proDuction')), 'proDuction')
const ysVideo = r => require.ensure([], () => r(require('@/pages/home/monitoring/ysVideo')), 'ysVideo')
const preVideo = r => require.ensure([], () => r(require('@/pages/home/monitoring/preVideo')), 'preVideo')
const patrolManagement = r => require.ensure([], () => r(require('@/pages/home/monitoring/patrolManagement')), 'patrolManagement')
const mainTenancecare = r => require.ensure([], () => r(require('@/pages/home/monitoring/mainTenancecare')), 'mainTenancecare')
const maintenanceManagement = r => require.ensure([], () => r(require('@/pages/home/monitoring/maintenanceManagement')), 'maintenanceManagement')
const netreSource = r => require.ensure([], () => r(require('@/pages/home/monitoring/netreSource')), 'netreSource')
const locationInformation = r => require.ensure([], () => r(require('@/pages/home/monitoring/locationInformation')), 'locationInformation')
const vehiCleaccess = r => require.ensure([], () => r(require('@/pages/home/monitoring/vehiCleaccess')), 'vehiCleaccess')
const serverResources = r => require.ensure([], () => r(require('@/pages/home/monitoring/serverResources')), 'serverResources')
const databaseResource = r => require.ensure([], () => r(require('@/pages/home/monitoring/databaseResource')), 'databaseResource')
const siteCheck = r => require.ensure([], () => r(require('@/pages/home/monitoring/siteCheck')), 'siteCheck') //现场情况查看
const newEnvironmentMsg = r => require.ensure([], () => r(require('@/pages/home/monitoring/newEnvironmentMsg')), 'newEnvironmentMsg') //环境人员实时信息下发
const electric = r => require.ensure([], () => r(require('@/pages/home/monitoring/electric')), 'electric')
const centrerAirconditioning = r => require.ensure([], () => r(require('@/pages/home/monitoring/centrerAirconditioning')), 'centrerAirconditioning')
const waterSupply = r => require.ensure([], () => r(require('@/pages/home/monitoring/waterSupply')), 'waterSupply')
const intelliGent = r => require.ensure([], () => r(require('@/pages/home/monitoring/intelliGent')), 'intelliGent') //智能化设备监控
const elevator = r => require.ensure([], () => r(require('@/pages/home/monitoring/elevator')), 'elevator') //电梯监控
const electronicMap = r => require.ensure([], () => r(require('@/pages/home/monitoring/electronicMap')), 'electronicMap') //物联电子地图
const engineeringPosition = r => require.ensure([], () => r(require('@/pages/home/monitoring/engineeringPosition')), 'engineeringPosition')//工程人员位置信息
const customerLocation = r => require.ensure([], () => r(require('@/pages/home/monitoring/customerLocation')), 'customerLocation')//客服人员位置信息
const engineeringinFormation = r => require.ensure([], () => r(require('@/pages/home/monitoring/engineeringinFormation')), 'engineeringinFormation')
const realTime = r => require.ensure([], () => r(require('@/pages/home/monitoring/realTime')), 'realTime')//客服人员实时信息下发
const engineeringPersonnel = r => require.ensure([], () => r(require('@/pages/home/monitoring/engineeringPersonnel')), 'engineeringPersonnel')
const environmentPersonnel = r => require.ensure([], () => r(require('@/pages/home/monitoring/environmentPersonnel')), 'environmentPersonnel')//环境人员人员历史轨迹监控
const custoMerservice = r => require.ensure([], () => r(require('@/pages/home/monitoring/custoMerservice')), 'custoMerservice')//客服人员人员历史轨迹监控
const entranceGuard = r => require.ensure([], () => r(require('@/pages/home/monitoring/entranceGuard')), 'entranceGuard')//门禁系统
const currentTask = r => require.ensure([], () => r(require('@/pages/home/monitoring/currentTask')), 'currentTask')//当前任务
const weatherForecast = r => require.ensure([], () => r(require('@/pages/home/monitoring/weatherForecast')), 'weatherForecast')
const informationRelease = r => require.ensure([], () => r(require('@/pages/home/monitoring/informationRelease')), 'informationRelease')//信息发布
const newinformationRelease = r => require.ensure([], () => r(require('@/pages/home/monitoring/newinformationRelease')), 'newinformationRelease')//新建信息发布
const callPolice = r => require.ensure([], () => r(require('@/pages/home/monitoring/callPolice')), 'callPolice')//报警管理
const airQuality = r => require.ensure([], () => r(require('@/pages/home/monitoring/airQuality')), 'airQuality')//空气质量监控
const swimmingPoolwater = r => require.ensure([], () => r(require('@/pages/home/monitoring/swimmingPoolwater')), 'swimmingPoolwater')//泳池水质量监控
const sightWater = r => require.ensure([], () => r(require('@/pages/home/monitoring/sightWater')), 'sightWater')//景观水监控
const waterBox = r => require.ensure([], () => r(require('@/pages/home/monitoring/waterBox')), 'waterBox')//水箱水
const fireMonitoring = r => require.ensure([], () => r(require('@/pages/home/monitoring/fireMonitoring')), 'fireMonitoring')//消防监测系统
const callCenter = r => require.ensure([], () => r(require('@/pages/home/monitoring/callCenter')), 'callCenter')//呼叫中心
//业务应用
//舆情分析
const situationHistory = r => require.ensure([], () => r(require('@/pages/home/application/situation/situationHistory')), 'situationHistory')//舆情历史
const situationCollection = r => require.ensure([], () => r(require('@/pages/home/application/situation/situationCollection')), 'situationCollection')//舆情收藏

const Entryandexitbusiness = r => require.ensure([], () => r(require('@/pages/home/application/Entryandexitbusiness')), 'Entryandexitbusiness') //出入业务应用
const commercialization = r => require.ensure([], () => r(require('@/pages/home/application/commercialization')), 'commercialization') //工程业务应用
const Securityapplication = r => require.ensure([], () => r(require('@/pages/home/application/Securityapplication')), 'Securityapplication') //安防业务应用
const envirBusiness = r => require.ensure([], () => r(require('@/pages/home/application/envirBusiness')), 'envirBusiness') //环境业务应用
const electronicNum = r => require.ensure([], () => r(require('@/pages/home/monitoring/electronicNum')), 'electronicNum') //园区电子地图

const environmentalMmonitoring = r => require.ensure([], () => r(require('@/pages/home/application/environmentalMmonitoring')), 'environmentalMmonitoring')//环境监测报警管理
const serviceManagement = r => require.ensure([], () => r(require('@/pages/home/application/serviceManagement')), 'serviceManagement')//客服管理
const Carout = r => require.ensure([], () => r(require('@/pages/home/application/Carout')), 'Carout')
//数据分析
//const Finance = r => require.ensure([], () => r(require('@/pages/home/dataApplication/Finance')), 'Finance')

// 数据分析->人事数据
const employeeEttendance = r => require.ensure([], () => r(require('@/pages/home/dataApplication/personnelDdata/employeeEttendance')), 'employeeEttendance')//员工出勤
const employeePerformance = r => require.ensure([], () => r(require('@/pages/home/dataApplication/personnelDdata/employeePerformance')), 'employeePerformance')//员工绩效
const attendanceData = r => require.ensure([], () => r(require('@/pages/home/dataApplication/personnelDdata/attendanceData')), 'attendanceData')//考勤数据分析
//数据分析（集团级）
const cost = r => require.ensure([], () => r(require('@/pages/home/dataApplication/groupRank/cost')), 'cost')
const otherCharges = r => require.ensure([], () => r(require('@/pages/home/dataApplication/groupRank/otherCharges')), 'otherCharges')
const parking = r => require.ensure([], () => r(require('@/pages/home/dataApplication/groupRank/parking')), 'parking')
const accountingAccounts = r => require.ensure([], () => r(require('@/pages/home/dataApplication/groupRank/accountingAccounts')), 'accountingAccounts')
const collectFeesCheck = r => require.ensure([], () => r(require('@/pages/home/dataApplication/groupRank/collectFeesCheck')), 'collectFeesCheck')
const payCheck = r => require.ensure([], () => r(require('@/pages/home/dataApplication/groupRank/payCheck')), 'payCheck')
//数据分析->安防数据
const parkOut = r => require.ensure([], () => r(require('@/pages/home/dataApplication/SecurityData/parkOut')), 'parkOut')
const accessControl = r => require.ensure([], () => r(require('@/pages/home/dataApplication/SecurityData/accessControl')), 'accessControl')
const carHitch = r => require.ensure([], () => r(require('@/pages/home/dataApplication/SecurityData/carHitch')), 'carHitch')
const personHitch = r => require.ensure([], () => r(require('@/pages/home/dataApplication/SecurityData/personHitch')), 'personHitch')
const securityHitch = r => require.ensure([], () => r(require('@/pages/home/dataApplication/SecurityData/securityHitch')), 'securityHitch')
const patrolHitch = r => require.ensure([], () => r(require('@/pages/home/dataApplication/SecurityData/patrolHitch')), 'patrolHitch')

//数据分析->工程数据
const repairCount = r => require.ensure([], () => r(require('@/pages/home/dataApplication/engineeringData/repairCount')), 'repairCount')        //维修服务统计
const equipmentStatistics = r => require.ensure([], () => r(require('@/pages/home/dataApplication/engineeringData/equipmentStatistics')), 'equipmentStatistics')//设备设施统计
const energyConsumption = r => require.ensure([], () => r(require('@/pages/home/dataApplication/engineeringData/energyConsumption')), 'energyConsumption')//能耗数据
const ledgerQuery = r => require.ensure([], () => r(require('@/pages/home/dataApplication/engineeringData/ledgerQuery')), 'ledgerQuery')//设备设施台账查询
const engineeringSupervision = r => require.ensure([], () => r(require('@/pages/home/dataApplication/engineeringData/engineeringSupervision')), 'engineeringSupervision')//二次装修及工程监管
const patrolAnalysis = r => require.ensure([], () => r(require('@/pages/home/dataApplication/engineeringData/patrolAnalysis')), 'patrolAnalysis')//巡查分析
// 数据分析->财务数据
const parkingCharges = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/parkingCharges')), 'parkingCharges')//停车场临停收费查询
const savingsCard = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/savingsCard')), 'savingsCard')//停车场储值卡收费查询
const monthCard = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/monthCard')), 'monthCard')//停车场月卡收费查询
const manageMentFee = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/manageMentFee')), 'manageMentFee')//物业管理费欠费查询
const decorateTheDeposit = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/decorateTheDeposit')), 'decorateTheDeposit')//装修押金收费查询
const collectionCharges = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/collectionCharges')), 'collectionCharges')//代收费收费查询
const ashotinThelocker = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/ashotinThelocker')), 'ashotinThelocker')//备用金核发
const expenseReimbursement = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/expenseReimbursement')), 'expenseReimbursement')//费用报销支出
const refundSpending = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/refundSpending')), 'refundSpending')//退款支出
const financialAudit = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/financialAudit')), 'financialAudit')//财务稽查查询->停车场临停收费
const checkMonthly = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/checkMonthly')), 'checkMonthly')//财务稽查查询->停车场月卡收费
const auditFee = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/auditFee')), 'auditFee')//财务稽查查询->物业管理费收费
const expendituresFsorparecash = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/expendituresFsorparecash')), 'expendituresFsorparecash')//财务稽查查询->备用金支出
const reimbursementCharges = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/reimbursementCharges')), 'reimbursementCharges')//财务稽查查询->报销费用支出
const claimExpense = r => require.ensure([], () => r(require('@/pages/home/dataApplication/financialData/claimExpense')), 'claimExpense')//财务稽查查询->物业管理费收费


//业务配置
const newDevice = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/newDevice')), 'newDevice')
const device = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/device')), 'device')
const networKmonitoring = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/networKmonitoring')), 'networKmonitoring')
const newNetworkmonitoring = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/newNetworkmonitoring')), 'newNetworkmonitoring')
const resourceMonitor = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/resourceMonitor')), 'resourceMonitor')
const newResourcemonitor = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/newResourcemonitor')), 'newResourcemonitor')
const energMonitoring = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/energMonitoring')), 'energMonitoring')
const newEnergmonitoring = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/newEnergmonitoring')), 'newEnergmonitoring')
const dealerShiplinkage = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/dealerShiplinkage')), 'dealerShiplinkage')
const pedestRianlinkage = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/pedestRianlinkage')), 'pedestRianlinkage')
const visitorConfiguration = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/visitorConfiguration')), 'visitorConfiguration')
const warningMessage = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/warningMessage')), 'warningMessage')
const newAlarm = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/newAlarm')), 'newAlarm')
    // const EventInformation = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/EventInformation')), 'EventInformation')
const newEventInformation = r => require.ensure([], () => r(require('@/pages/home/serviceConfig/newEventInformation')), 'newEventInformation')

//系统管理
Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            redirect: '/login', //重定向默认页
            component: home, //不变的外层框架
            name: 'home',
            //嵌套路由为变化的内容区，要添加内容区的页面都在此children路由下写,备注页面中文名对应原型
            children: [
            //无家可归的
                { path: '/sceneconDition', component: sceneconDition, name: 'sceneconDition' },
                { path: '/naswerNormal', component: naswerNormal, name: 'naswerNormal' }, //接听处理
                { path: '/locationInformation', component: locationInformation, name: 'locationInformation' }, //人员位置信息
                { path: '/Entryandexitbusiness', component: Entryandexitbusiness, name: 'Entryandexitbusiness' }, //出入业务应用
                { path: '/commercialization', component: commercialization, name: 'commercialization' }, //工程业务应用
                { path: '/Securityapplication', component: Securityapplication, name: 'Securityapplication' }, //安防业务应用
                { path: '/intelliGent', component: intelliGent, name: 'intelliGent' }, //智能化设备监控
                { path: '/electronicNum', component: electronicNum, name: 'electronicNum' }, // 物联电子地图1
                { path: '/envirBusiness', component: envirBusiness, name: 'envirBusiness' }, // 环境业务应用
                { path: '/engineeringPosition', component: engineeringPosition, name: 'engineeringPosition' },
                { path: '/customerLocation', component: customerLocation, name: 'customerLocation' },
                { path: '/engineeringinFormation', component: engineeringinFormation, name: 'engineeringinFormation' },
                { path: '/realTime', component: realTime, name: 'realTime' },
                { path: '/engineeringPersonnel', component: engineeringPersonnel, name: 'engineeringPersonnel' },//工程人员人员历史轨迹监控
                { path: '/environmentPersonnel', component: environmentPersonnel, name: 'environmentPersonnel' },//环境人员人员历史轨迹监控
                { path: '/custoMerservice', component: custoMerservice, name: 'custoMerservice' },//客服人员人员历史轨迹监控
                { path: '/entranceGuard', component: entranceGuard, name: 'entranceGuard' },//门禁系统
                { path: '/currentTask', component: currentTask, name: 'currentTask' },//当前任务

            //物联监控
                //园区电子地图
                { path: '/monit/garden/map', component: electronicMap, name: 'electronicMap' }, // 物联电子地图
                { path: '/monit/garden/police', component: callPolice, name: 'callPolice' },
                //云对讲呼叫台
                { path: '/monit/call/center', component: callCenter, name: 'callCenter' },//呼叫中心
                { path: '/monit/call/process', component: abnormityWarning, name: 'abnormityWarning' }, //异常报警
                //信息发布中心
                { path: '/monit/msg/weather', component: weatherForecast, name: 'weatherForecast' },
                { path: '/monit/msg/release', component: informationRelease, name: 'informationRelease' },//信息发布
                { path: '/monit/msg/release/new', component: newinformationRelease, name: 'newinformationRelease' },//新建信息发布
                //出入物联监控
                    //车行指挥调度
                    { path: '/monit/inout/car/guide', component: carGuide, name: 'carGuide' }, //车行指挥调度
                    { path: '/monit/inout/car/record', component: vehiCleaccess, name: 'vehiCleaccess' },//车辆出入记录
                    //人行指挥调度
                    { path: '/monit/inout/person/guide', component: walkGuide, name: 'walkGuide' }, //人行指挥调度
                    { path: '/monit/inout/person/record', component: openRecord, name: 'openRecord' }, //开门记录
                //视频物联监控
                { path: '/monit/video/patrolrecord', component: proDuction, name: 'proDuction' },
                { path: '/monit/video/ysVideo', component: ysVideo, name: 'ysVideo' },     //巡检记录
                { path: '/monit/video/prevideo', component: preVideo, name: 'preVideo' },           //实时预览
                { path: '/monit/video/patrolcfg', component: cruise, name: 'cruise' },                 //巡检配置
                //设备物联监控
                { path: '/monit/equip/elevator', component: elevator, name: 'elevator' },           //电梯监控
                { path: '/monit/equip/electric', component: electric, name: 'electric' },           //供配电页面
                { path: '/monit/equip/water', component: waterSupply, name: 'waterSupply' },  //给排水页面
                { path: '/monit/equip/airc', component: centrerAirconditioning, name: 'centrerAirconditioning' }, //中央空调案列
                //环境物联监控
                { path: '/monit/evrmt/air', component: airQuality, name: 'airQuality' },//空气质量监控
                	//水质质量监测
                	{ path: '/monit/evrmt/water/swim', component: swimmingPoolwater, name: 'swimmingPoolwater' },//泳池水
                	{ path: '/monit/evrmt/water/box', component: waterBox, name: 'waterBox' },							//水箱水
                	{ path: '/monit/evrmt/water/sight', component: sightWater, name: 'sightWater' },						//景观水
                //消防物联监控
            	{ path: '/monit/fire/monitor', component: fireMonitoring, name: 'fireMonitoring' },		//消防监测系统
                //机房物联监控
                { path: '/monit/machine/net', component: netreSource, name: 'netreSource' },				//网络资源监控
                { path: '/monit/machine/server', component: serverResources, name: 'serverResources' }, //服务器资源管理
                { path: '/monit/machine/data', component: databaseResource, name: 'databaseResource' }, //数据库资源管理
                //人员物联监控
                	//安防人员
                	{ path: '/monit/person/safe/site', component: siteCheck, name: 'siteCheck' }, 	//现场情况查看
                	{ path: '/monit/person/safe/track', component: personnelHistory, name: 'personnelHistory' },	//历史轨迹查询
                	{ path: '/monit/person/safe/msg', component: newMsg, name: 'newMsg' },						//实时信息下发
                	{ path: '/monit/person/safe/msg/new', component: sendMsg, name: 'sendMsg' },

            //管理应用
            //舆情分析
             { path: '/manage/situation/history', component: situationHistory, name: 'situationHistory' },	//舆情历史
             { path: '/manage/situation/collection', component: situationCollection, name: 'situationCollection' },	//舆情历史
            	//项目仪表盘
        		// { path: '/manage/panel/panel', component: P_projectTote, name: 'P_projectTote' },	//项目仪表盘
            		//重大事件管理
        		//安管管理
            		//车行出入管理
        			{ path: '/manage/safe/cario/record', component: Carout, name: 'Carout' },			//通行记录查询
            	//工程管理
                { path: '/manage/project/record', component: maintenanceManagement, name: 'maintenanceManagement' },	//维修管理
                { path: '/manage/project/patrol', component: patrolManagement, name: 'patrolManagement' },    //巡检管理
                { path: '/manage/project/upkeep', component: mainTenancecare, name: 'mainTenancecare' },		//保养管理
                //环境管理
                { path: '/manage/envir/detection', component: environmentalMmonitoring, name: 'environmentalMmonitoring' },//环境监测报警管理
                //客服管理
                { path: '/manage/service', component: serviceManagement, name: 'serviceManagement' },//客服管理
            //业务配置
            	//安防业务配置
            		//车行出入配置
            		{ path: '/config/safe/carcfg/carlink', component: dealerShiplinkage, name: 'dealerShiplinkage' },	//车行联动配置
            		//人行出入配置
            		{ path: '/config/safe/personcfg/personlink', component: pedestRianlinkage, name: 'pedestRianlinkage' },		//人行联动配置
            		{ path: '/config/safe/personcfg/visitor', component: visitorConfiguration, name: 'visitorConfiguration' },		//访客配置
            	//工程业务配置
            	{ path: '/config/projectcfg/device', component: device, name: 'device' },			//设备监控阀值配置
            	{ path: '/config/projectcfg/energyset', component: energMonitoring, name: 'energMonitoring' },	//能耗监控阀值配置
            	{ path: '/config/projectcfg/resource', component: resourceMonitor, name: 'resourceMonitor' },	//资源监控阀值配置
            	{ path: '/config/projectcfg/device/new', component: newDevice, name: 'newDevice' },
            	{ path: '/config/projectcfg/energy/new', component: newEnergmonitoring, name: 'newEnergmonitoring' },
            	{ path: '/config/projectcfg/resource/new', component: newResourcemonitor, name: 'newResourcemonitor' },
            	//环境业务配置
            		//日常清洁配置

            //数据分析
            	//数据概览
            	{ path: '/data/overview', component: main, name: 'main' },	//数据概览
            	//财务数据
            		//出纳收支分析
            		{ path: '/data/finance/incomeanlz/park', component: parking, name: 'parking' },	//停车场收费
            		{ path: '/data/finance/incomeanlz/other', component: otherCharges, name: 'otherCharges' },
            		{ path: '/data/finance/incomeanlz/cost', component: cost, name: 'cost' },
            	{ path: '/data/finance/accountanlz', component: accountingAccounts, name: 'accountingAccounts' },//会计账目分析
            		//财务稽查
            		{ path: '/data/finance/financecheck/income', component: collectFeesCheck, name: 'collectFeesCheck' },		//收费稽查
                	{ path: '/data/finance/financecheck/pay', component: payCheck, name: 'payCheck' },							//支出稽查
                	//支出收纳查询
                	{ path: '/data/finance/expendcheck/parktemp', component: parkingCharges, name: 'parkingCharges' },//停车场临停收费
                	{ path: '/data/finance/expendcheck/valuecard', component: savingsCard, name: 'savingsCard' },//停车场储值卡收费查询
                	{ path: '/data/finance/expendcheck/monthcard', component: monthCard, name: 'monthCard' },//停车场月卡收费查询
                	{ path: '/data/finance/expendcheck/mngincome', component: claimExpense, name: 'claimExpense' },//财务稽查查询->物业管理费收费
                	{ path: '/data/finance/expendcheck/mngowe', component: manageMentFee, name: 'manageMentFee' },//物业管理费欠费
                	{ path: '/data/finance/expendcheck/decorate', component: decorateTheDeposit, name: 'decorateTheDeposit' },//装修押金收费
                	{ path: '/data/finance/expendcheck/replace', component: collectionCharges, name: 'collectionCharges' },//代收费收费
                	{ path: '/data/finance/expendcheck/backup', component: ashotinThelocker, name: 'ashotinThelocker' },//备用金核发
                	{ path: '/data/finance/expendcheck/reimburse', component: expenseReimbursement, name: 'expenseReimbursement' },//费用报销支出
                	{ path: '/data/finance/expendcheck/refund', component: refundSpending, name: 'refundSpending' },//退款支出
                	//财务稽查查询
                	{ path: '/data/finance/financequery/park', component: financialAudit, name: 'financialAudit' },//财务稽查查询->停车场临停收费
                	{ path: '/data/finance/financequery/monthcard', component: checkMonthly, name: 'checkMonthly' },//财务稽查查询->停车场月卡收费
                	{ path: '/data/finance/financequery/property', component: auditFee, name: 'auditFee' },//财务稽查查询->物业管理费收费
                	{ path: '/data/finance/financequery/backup', component: expendituresFsorparecash, name: 'expendituresFsorparecash' },//财务稽查查询->备用金支出
                	{ path: '/data/finance/financequery/reimburse', component: reimbursementCharges, name: 'reimbursementCharges' },//财务稽查查询->报销费用支出
                //安防数据
                	//行为数据分析
                	{ path: '/data/securitydata/action/park', component: parkOut, name: 'parkOut' },//停车出入行为数据
                	{ path: '/data/securitydata/action/access', component: accessControl, name: 'accessControl'},//门禁出入行为数据
                	//故障数据分析
                	{ path: '/data/securitydata/hitch/car', component: carHitch, name: 'carHitch' },					//车行故障数据
                	{ path: '/data/securitydata/hitch/person', component: personHitch, name: 'personHitch' },			//人行故障数据
                	{ path: '/data/securitydata/hitch/security', component: securityHitch, name: 'securityHitch' },		//安防故障数据
                	{ path: '/data/securitydata/hitch/patrol', component: patrolHitch, name: 'patrolHitch' },			//巡更故障数据
                //工程数据
                	//工程运营数据分析
                	{ path: '/data/projdata/projrun/patrol', component: patrolAnalysis, name: 'patrolAnalysis' },						//巡查分析
                	{ path: '/data/projdata/projrun/repair', component: repairCount, name: 'repairCount' },								//维修服务统计
                	{ path: '/data/projdata/projrun/decoration', component: engineeringSupervision, name: 'engineeringSupervision' },	//二次装修及工程监管
                	{ path: '/data/projdata/projrun/equipment', component: equipmentStatistics, name: 'equipmentStatistics' },			//设备设施统计
                { path: '/data/projdata/energy', component: energyConsumption, name: 'energyConsumption' },//能耗数据
                { path: '/data/projdata/equipment', component: ledgerQuery, name: 'ledgerQuery' },							//设备设施台账查询
                //人事数据
                { path: '/data/psndata/attendanceData', component: attendanceData, name: 'attendanceData' },//出勤数据分析
                	//考勤数据分析
                	{ path: '/data/psndata/attenddata/attend', component: employeeEttendance, name: 'employeeEttendance'},//员工出勤
                	{ path: '/data/psndata/attenddata/grade', component: employeePerformance, name: 'employeePerformance' },//员工绩效


                //BI首页系列
                { path: '/financialData', component: financialData, name: 'financialData' }, //集团级首页
                { path: '/secureEnvironment_1', component: secureEnvironment_1, name: 'secureEnvironment_1' },
                { path: '/secureEnvironment_2', component: secureEnvironment_2, name: 'secureEnvironment_2' },
                { path: '/secureEnvironment_3', component: secureEnvironment_3, name: 'secureEnvironment_3' },
                { path: '/engineeringData', component: engineeringData, name: 'engineeringData' },
                { path: '/custom', component: custom, name: 'custom' },
                { path: '/humanAffairs', component: humanAffairs, name: 'humanAffairs' },
                { path: '/environment', component: environment, name: 'environment' },

                { path: '/M_financialData', component: M_financialData, name: 'M_financialData' }, //分公司级首页
                { path: '/M_secureEnvironment_1', component: M_secureEnvironment_1, name: 'M_secureEnvironment_1' },
                { path: '/M_secureEnvironment_2', component: M_secureEnvironment_2, name: 'M_secureEnvironment_2' },
                { path: '/M_secureEnvironment_3', component: M_secureEnvironment_3, name: 'M_secureEnvironment_3' },
                { path: '/M_engineeringData', component: M_engineeringData, name: 'M_engineeringData' },
                { path: '/M_custom', component: M_custom, name: 'M_custom' },
                { path: '/M_humanAffairs', component: M_humanAffairs, name: 'M_humanAffairs' },
                { path: '/M_environment', component: M_environment, name: 'M_environment' },

                { path: '/P_secureEnvironment', component: P_secureEnvironment, name: 'P_secureEnvironment' }, //项目级首页
                { path: '/P_financialData', component: P_financialData, name: 'P_financialData' },
                { path: '/P_engineeringData', component: P_engineeringData, name: 'P_engineeringData' },
                { path: '/P_custom', component: P_custom, name: 'P_custom' },
                { path: '/P_projectTote', component: P_projectTote, name: 'P_projectTote' },
                { path: '/P_environment', component: P_environment, name: 'P_environment' },


                { path: '/C_financialData', component: C_financialData, name: 'C_financialData' }, //城市级首页
                { path: '/C_secureEnvironment_1', component: C_secureEnvironment_1, name: 'C_secureEnvironment_1' },
                { path: '/C_secureEnvironment_2', component: C_secureEnvironment_2, name: 'C_secureEnvironment_2' },
                { path: '/C_secureEnvironment_3', component: C_secureEnvironment_3, name: 'C_secureEnvironment_3' },
                { path: '/C_engineeringData', component: C_engineeringData, name: 'C_engineeringData' },
                { path: '/C_environment', component: C_environment, name: 'C_environment' },
                { path: '/C_humanAffairs', component: C_humanAffairs, name: 'C_humanAffairs' },
                { path: '/C_custom', component: C_custom, name: 'C_custom' },
                { path: '/newEnvironmentMsg', component: newEnvironmentMsg, name: 'newEnvironmentMsg' }, //现场情况查看

            ]
        },
        {
            path: '/login', //登陆界面
            name: 'login',
            component: login
        },
        {
            path: '/test', //测试界面
            name: 'test',
            component: test
        },
        {
            path: '/videoTest',
            name: 'videoTest',
            component: videoTest
        },
        {
            path: '/realHome', //真·首页
            name: 'realHome',
            component: realHome
        },
        {
            path: '*',
            name: '404',
            component: pages404
        },
    ]
})
