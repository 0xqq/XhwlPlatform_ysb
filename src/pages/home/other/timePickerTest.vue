<template>
	<div class="picker">
		<div id="myDiv">  
			<table id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0">  
			    <tr>  
			        <td colspan="5" align="center">html 表格导出道Excel</td>  
			    </tr>  
			    <tr>  
			        <td>列标题1</td>  
			        <td>列标题2</td>  
			        <td>类标题3</td>  
			        <td>列标题4</td>  
			        <td>列标题5</td>  
			    </tr>  
			    <tr>  
			        <td>aaa</td>  
			        <td>bbb</td>  
			        <td>ccc</td>  
			        <td>ddd</td>  
			        <td>eee</td>  
			    </tr>  
			    <tr>  
			        <td>AAA</td>  
			        <td>BBB</td>  
			        <td>CCC</td>  
			        <td>DDD</td>  
			        <td>EEE</td>  
			    </tr>  
			    <tr>  
			        <td>FFF</td>  
			        <td>GGG</td>  
			        <td>HHH</td>  
			        <td>III</td>  
			        <td>JJJ</td>  
			    </tr>  
			</table>  
		</div> 
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {

		}
	},
	computed: {

	},
	mounted() {

	},
	watch: {

    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

</style>