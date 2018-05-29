<template>
    <div class="infomation">
        <Bread :breadData="abc"></Bread>
        <div class="dealer-text">
            <section class="section">
                <span class="label1">发布日期</span>
                <textarea name=""></textarea>
            </section>
            </br>
            <section>
                <span class="label2">类型 &nbsp</span>
                <div class="set_Type">
                    <el-select v-model="value" placeholder="天气" class="set_weather">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </section>
            <section>
                <span class="label2">发布内容</span>
                <textarea name=""></textarea>
            </section>
            <div class="text_btn">
                <button class="btn1"  @click="addWeather">确认</button>
                <button class="btn2"  @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import Bread from '@/components/common/bread'
import { mapState} from 'vuex'
export default {
    data() {
        return {
            abc: ['物联监控', '信息发布中心', '新建信息发布'],
            options: [{
                value: '选项1',
                label: '民生'
            }, {
                value: '选项2',
                label: '政务'
            }, {
                value: '选项3',
                label: '物业'
            }],
            value: ''
        }
    },
    created() {

    },
    computed: {
        ...mapState(['mnUrl'])
    },
    components: {
        Bread
    },
    mounted() {
    },
    methods: {
       addWeather(){
           this.$router.push({ path: '/monit/msg/release'});
       },
       cancel(){
        this.$router.push({ path: '/monit/msg/release'});
       }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';
.infomation {
    width: 100%;
    height: 100%;
    position: relative;
    .dealer-text {
        display: inline-block;
        width: 4.6rem;
        height: 5rem;
        color: #fff;
        background-image: url(../../../images/kaimen.png);
        background-size: 100% 100%;
        padding: 0.2rem 0.2rem; // @include center;
        @include center;
        .section {
            .label1 {
                display: inline-block;
                width: 0.8rem;
                height: 0.25rem;
                text-align: right;
                margin-right: 0.12rem;
            }
            textarea {
                height: 0.36rem;
            }
        }
        .date_device {
            margin-top: 0.13rem;
            @include myselect(3.14rem); // margin-left: 0.85rem;
        }


        .label2 {
            color: #fff;
            display: inline-block;
            width: 0.8rem;
            height: 0.25rem;
            text-align: right;
            margin-right: 0.15rem;
        }
        .set_Type {
            display: inline-block;
            vertical-align: middle;
            margin-left: 0.02rem;
            width: 3.14rem;
            height: 0.36rem; // @include tare(3.14rem, 0.36rem);
            .set_weather {
                width: 3.14rem;
                height: 0.36rem;
                vertical-align: middle; // border:2px solid #83dbff;
            }
        }
        textarea {
            margin-left: 0.05rem;
            margin-top: 0.2rem;
            vertical-align: middle;
            @include tare(3.14rem, 2.23rem);
        }
        .text_btn{
            width: 100%;
            text-align:center;
            margin:0.3rem 0.5rem;
            .btn1{
                @include btn(1.2rem,0.36rem)
            }
            .btn2{
                margin-left:0.3rem;
                
                 @include btnX(1.2rem,0.36rem)
                 
            }
        }
    }
    textarea {
	overflow: hidden;
}

input::-ms-clear {
	display: none;
}

select {
	/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
	/*很关键：将默认的select选择框样式清除*/
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background: transparent;
	/*在选择框的最右侧中间显示小箭头图片*/
	background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
	/*为下拉小箭头留出一点位置，避免被文字覆盖*/
	padding-right: 14px;
}

select::-ms-expand {
	display: none;
}
}
</style>