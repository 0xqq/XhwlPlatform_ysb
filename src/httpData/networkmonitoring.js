// http://xhmind.com:5051/tmp/config/iot/net
export default {
  "content": [
          {
              "序号": "1",
              "配置名称": "防火墙外网入流量监控",
              "配置日期": "2017-10-11",
              "监控对象类型": "网络流量",
              "监控对象名称": "防火墙1",
              "报警阈值": "90MB",
              "触发动作": "外网端口入流量超阈值",
              "推送方式": "APP推送，短信短信",
              "接收人": "工程部所有人",
              "推送内容": "1#防火墙外网端口入流量超阈值，请即刻检查网络运行状况。"
          },
          {
              "序号": "2",
              "配置名称": "防火墙外网出流量监控",
              "配置日期": "2017-10-11",
              "监控对象类型": "网络流量",
              "监控对象名称": "防火墙1",
              "报警阈值": "50MB",
              "触发动作": "外网端口出流量超阈值",
              "推送方式": "APP推送，短信短信",
              "接收人": "工程部所有人",
              "推送内容": "1#防火墙外网端口出流量超阈值，请即刻检查网络运行状况。"
          },
          {
              "序号": "3",
              "配置名称": "路由器外网入流量监控",
              "配置日期": "2017-10-11",
              "监控对象类型": "网络流量",
              "监控对象名称": "路由器1",
              "报警阈值": "90MB",
              "触发动作": "外网端口入流量超阈值",
              "推送方式": "APP推送，短信短信",
              "接收人": "工程部所有人",
              "推送内容": "1#路由器外网端口出流量超阈值，请即刻检查网络运行状况。"
          },
          {
              "序号": "4",
              "配置名称": "路由器外网出流量监控",
              "配置日期": "2017-10-11",
              "监控对象类型": "网络流量",
              "监控对象名称": "路由器1",
              "报警阈值": "50MB",
              "触发动作": "外网端口出流量超阈值",
              "推送方式": "APP推送，短信短信",
              "接收人": "工程部所有人",
              "推送内容": "1#路由器外网端口出流量超阈值，请即刻检查网络运行状况。"
          }
      ]
}
