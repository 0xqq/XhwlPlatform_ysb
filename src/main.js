// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import '../theme/index.css'
import fliter from './script/filter'
import drag from './script/drag'
import func from './script/func'
import allPicker from '@/components/common/allPicker'
import bread from '@/components/common/bread'
import allTable  from  '@/components/common/allTable'

// import 'element-ui/lib/theme-default/index.css'
Vue.use(VueResource);
Vue.use(ElementUI);

Vue.component('all-picker', allPicker);
Vue.component('Bread', bread);
Vue.component('all-table',allTable);

Vue.config.productionTip = false;
Vue.prototype.$func = func
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
