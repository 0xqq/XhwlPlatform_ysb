// http://xhmind.com:5051/tmp/config/iot/device
export default {
  "content": [
         {
             "序号": "1",
             "配置名称": "变压器电流监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "强电设备",
             "监控对象名称": "1#变压器",
             "报警阈值": "700MA",
             "触发动作": "电流超阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#变压器电流超阈值，请即刻前往机房检查。"
         },
         {
             "序号": "2",
             "配置名称": "变压器温度监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "强电设备",
             "监控对象名称": "1#变压器",
             "报警阈值": "75°",
             "触发动作": "温度超阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#变压器温度超阈值，请即刻前往机房检查。"
         },
         {
             "序号": "3",
             "配置名称": "变压器负载率监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "强电设备",
             "监控对象名称": "1#变压器",
             "报警阈值": 0.008,
             "触发动作": "负载率超阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#变压器负载率超阈值，请即刻前往机房检查。"
         },
         {
             "序号": "4",
             "配置名称": "发电机水温监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "强电设备",
             "监控对象名称": "柴油发电机1",
             "报警阈值": "70°",
             "触发动作": "冷却水温超阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#发电机冷却水温超阈值，请即刻前往机房检查。"
         },
         {
             "序号": "5",
             "配置名称": "消防水箱水位监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "强电设备",
             "监控对象名称": "消防泵1号",
             "报警阈值": "4米",
             "触发动作": "水位低于阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#消防水泵低水位超阈值，请即刻前往机房检查。"
         },
         {
             "序号": "6",
             "配置名称": "电梯故障监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "电梯",
             "监控对象名称": "A区1#电梯",
             "报警阈值": "1",
             "触发动作": "故障代码大于阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#电梯发生故障，请即刻前往电梯房检查。"
         },
         {
             "序号": "7",
             "配置名称": "电梯事件监控",
             "配置日期": "2017-10-11",
             "监控对象类型": "电梯",
             "监控对象名称": "A区1#电梯",
             "报警阈值": "40",
             "触发动作": "事件代码大于阈值",
             "推送方式": "APP推送,短信推送",
             "接收人": "工程部所有人",
             "推送内容": "1#电梯发生异常事件，请即刻前往电梯房检查。"
         }
     ]
}
