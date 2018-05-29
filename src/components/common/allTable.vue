<template>
    <div class="StopintheCharge">
        <!--底部每页显示-->
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
    },
    created() {

    },
    components: {
    },
    mounted(tableData) {
        console.log(this.tableData)
    },
    props: [],
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.StopintheCharge {
    width: 100px;
    height: 100px;
    //底部换页框
 
}
</style>

