import{
	GET_TIME,
	UP_CITY,
	UP_TEMP,
	UP_WEATHER,
	UP_WORKER,
	UP_COMMUNITY,
	UP_DOOR,
	CHANGE_SIZE,
	CHANGE_CITY,
	GET_TOKEN,
	CHANGE_LOADING,
	HAS_CALL,
} from './mutation-types.js'

import {setStore, getStore, setSession, getSession} from '../script/func'

export default{

	//记录当前时间
	[GET_TIME](state){
		var t = new Date();
		var h = t.getHours();
		var m = t.getMinutes();
		if(h<10){
			h = '0'+h;
		}
		if(m<10){
			m = '0'+m;
		}
		state.nowTime ='' + h + ':' + m ;
	},
	[UP_TEMP](state,temp){

	},
	[UP_CITY](state,city){

	},
	[UP_WEATHER](state,weather){

	},
	[UP_WORKER](state,worker){

	},
	[UP_COMMUNITY](state,community){

	},
	[UP_DOOR](state,door){

	},
	[CHANGE_SIZE](state){
		state.contentSize= !state.contentSize;
	},
	[CHANGE_CITY](state,city){
		state.cityName= city.cityName;
	},
	[CHANGE_LOADING](state,state1){
		state.loading= state1;
	},
	[GET_TOKEN](state,token){
		state.token = token;
		setSession("token", token);
	},
	[HAS_CALL](state, opra){
		if(opra == 0){
			state.unHold = state.unHold+1;
		}else if(opra == 1){
			state.hasHold = state.hasHold+1;
		}
	},
}