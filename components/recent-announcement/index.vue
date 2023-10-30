<template>
    <div class="recent-announcement">
        <!-- 随机公告 -->
        <div class="barrage-container">
            <div  class="barrage-content">   
                <div v-for="message in messages.value" :style="{top:message.Styles.top,left:message.Styles.left}" :key="message.id" class="barrage">
                    <el-card body-style="width:200px;height:80px;border:none;padding:14px">
                        <template #default>
                            <h3>通报批评</h3>
                            <span>123123</span>
                        </template>
                    </el-card>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive,computed,} from 'vue'


const contents = ref();


const parentWidth = ref();
const parentHeight = ref();

onMounted(()=>{
    contents.value = document.getElementsByClassName('barrage-content')[0];
    updateParentDimensions();
})



function updateParentDimensions() {
  if (contents.value) {
    const parent = contents.value.parentElement;
    parentWidth.value = parent.clientWidth;
    parentHeight.value = parent.clientHeight;
  }
}

console.log(parentWidth.value)
// let parent =document.getElementsByClassName('barrage-content');
// console.log(parent[0].clientWidth,parent[0].clientHeight)

let messages = ref()

messages.value = computed(()=>{

    let arr =[
        {
            id:1,
            text:'弹幕一',
            Styles:{
                top:0,
                left: 0,
            }
        }
    ]

    // let 

    const addBarrage = ()=>{
        const top = Math.random() * (parentHeight.value - 92)
        const left = 0;
        const  isOverlap = arr.some((barrage)=>{
            return (
                top >= barrage.Styles.top - 92 && 
                top <= barrage.Styles.top - 92 &&
                barrage.Styles.left >= window.innerHeight - 200
            )
        })

        if(!isOverlap){

        }
    }


    return arr
})

console.log(messages.value)

</script>

<style scoped lang="scss">
.recent-announcement{
    display:flex;
    justify-content: flex-start;
    
    width: 100%;
    border: 1px solid #e3e8f7;
    border-radius: 12px;
    background: white;
    padding: 24px;
    .barrage-container {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        .barrage-content{
            width: 100%;
            height: 100%;
            animation: moveBarrage 10s linear infinite;
            .barrage {
                position: absolute;
                left: 0;
                white-space: nowrap;
                font-size: 20px;
                padding: 5px;
                border-radius: 5px;
                color: white;
                
            }
        }
        @keyframes moveBarrage {
            0% {
                transform: translateX(100%)
            }
            100% {
                transform: translateX(-100%);
            }
        }
    }




}
</style>