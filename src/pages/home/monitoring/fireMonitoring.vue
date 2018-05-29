<template>
	<div class="peoplePlace">
		<Bread :breadData="abcd"></Bread>
		<div class="box_img">
            <img src="../../../images/monitoring.png" alt="">
        </div>		
	</div>
</template>
<script>
import Bread from '@/components/common/bread'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			abcd: ['物联监控', '消防物联监控','消防监测系统'],
		}
	},
	components: {
		Bread
	},
	computed: {		
	},
	mounted() {
		
	},
	methods: {		
		}	
}
</script>
<style lang="scss" scoped>
	@import 'src/style/mixin';
    .peoplePlace{
        width: 100%;
        height: 100%;
        margin:0 auto;
         .box_img{
         width: 100%;
        height: 100%;
        position: relative;;
       img{
           margin-top:-0.5rem;
            width: 12.58rem;
           height: 6.09rem;
           @include center;
       }
    }
    }
</style>