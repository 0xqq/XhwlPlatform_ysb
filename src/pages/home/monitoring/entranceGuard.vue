<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        
        <!--中间内容部分-->
        <div class="intelligent_center">
            <!--顶部导航-->
            <div class="device_nav">
                <p class="p_text">电梯系统</p>
            </div> 
            <div class="intelligent_two">
                <p class="read_first">读头</p>
                <div class="intelligent_all">
                    <div class="offline" v-for="(key,index) in ferRy" >
                        <p>{{key.gate}}</p>
                        <img :src="key.myurl" alt="">
                        <p>{{key.offlines}}</p>
                    </div>
                </div>  
            </div>
        </div>    
        <div class="ends"></div>
    </div>
</template>

<script>
import Bread from '@/components/common/bread'
import intelligent3 from "../../../images/intelligent3.png"
import intelligent4 from "../../../images/intelligent4.png"
export default {
    data() {
        return {
            abc: ['物联监控', '设备物联监控','设备监控','门禁系统'],
              ferRy:[{
                 "gate":"东门读头",
                 "myurl":intelligent3,
                 "offlines":"离线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            },{
                 "gate":"东门读头",
                 "myurl":intelligent4,
                 "offlines":"在线"
            }]


        }
    },
    computed: {
    },
    components: {
        Bread
    },
    mounted() {
       
    },
    // 组件销毁前调用
    beforeDestory() { },
    methods: {
      
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// element_ui样式
.el-select .el-input {
    width: 110px;
}

// 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 100%; // display: inline-block;
    margin: 0 auto;
    position: relative;
  
    .intelligent_center{
        width: 100%;
        height: 100%;
        overflow: auto;
         .device_nav {
          height: 0.6rem;
          width: 100%;
          background: url(../../../assets/kaimenNav.png)no-repeat;
          background-size: cover;
          padding-bottom: 0.5rem;
          margin-bottom: 0.05rem;
          p {
            // display: inline-block;
            line-height: 0.6rem;
          }
           .p_text {
            color: #fff;
            margin: 0 0.2rem;
            }
              
        }
     
          .intelligent_two{
            background:url(../../../images/blue.png) no-repeat;
            background-size:cover;
            width: 100%;
            height: 7.9rem;
            padding-top:0.2rem;
            // padding:0.15rem 0 0 0.20rem;
            margin-bottom:0.05rem;
            .read_first{
                padding:0 0 0.2rem 0.2rem;
                font-size:0.18rem;
            }
            .intelligent_all{
                height: 100%;
                width: 100%;
                display:flex; 
                flex-wrap:wrap;   
                margin:0 auto;        
                .offline{
                width: 1.8rem;
                height: 1.4rem;
                margin:0 auto;
                text-align:center;
                p{}
                img{
                    width: 1.06rem;
                    height: 0.72rem;
                    margin:0.3rem 0;
                }
            }
            }     
        }
         .ends{
            width: 100%;
            height: 10rem;
            
        }  
        
    }
       
       
         
    
  
    }

</style>