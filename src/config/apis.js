/*
	返回本环境下对应的api的结果
*/
const apis = {
	dev: {
		analyze: 'https://yq.xhmind.com:8089',
		waringURl:'https://seven.xy-mind.com:8443',
		main: 'https://xymind.net:3000',
    ysUrl: 'http://192.168.200.117:8082'
	},

	test: {
		analyze: 'https://yq.xhmind.com:8089',
		waringURl:'https://seven.xy-mind.com:8443',
		main: 'https://xymind.net:3000',
    ysUrl: 'http://192.168.200.117:8082'
	},

	production: {
		analyze: 'https://yq.xhmind.com:8089',
		waringURl:'https://seven.xhmind.com:8443',
		main: 'https://iot.xhmind.com',
    ysUrl: 'http://192.168.200.117:8082'
	}
}
export default  apis[process.env.API_TYPE]
