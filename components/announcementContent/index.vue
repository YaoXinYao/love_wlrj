import { reactive } from 'vue';
<template>
    <div class="announcement">
        <div class="content">
            <el-timeline>
                <template v-for="(item,index) in announcement" :key="index">
                    <el-timeline-item center placement="top" :timestamp="item.timestamp"  >
                        <el-card @click="con(item)">
                            <h2>{{ item.type }}</h2>
                        </el-card>
                    </el-timeline-item>
                </template>
            </el-timeline>
        </div>

    </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'

export interface anType {
    title:string,
    type:string,
    content: string,
    timestamp: string,
}


const announcement = reactive([
    {
        title:'考试',
        type:'考核通知',
        content: '这次将对你们进行学习计划的第一次考核',
        timestamp: '2018-04-15',
    },
    {
        title:'会议',
        type:'会议通知',
        content: 'Approved',
        timestamp: '2018-04-13',
    },
    {
        title:'讲课',
        type:'讲课通知',
        content: 'Success',
        timestamp: '2018-04-11',
    },
])


const isShow = ref(true)



const emit = defineEmits(['ShowClick'])


function handleAnnouncement(){
    
}

function con(Props:anType){
    // console.log(Props.content,Props.timestamp,Props.title)
    console.log(Props)
    emit('ShowClick',Props)
    // isShow.value = !isShow.value
    // console.log(isShow.value)
}
</script>

<style scoped lang="scss">
.announcement{
    overflow: hidden;
    padding: 24px;
    width: 90%;
    display: flex;
    flex-direction: column;
    border: 1px solid #e3e8f7;
    border-radius: 12px;
    background: white;
    .content{
        width:100%;
        height: 100%;
        overflow-y: auto;
    }
    .content::-webkit-scrollbar{
        width:0px
    }
    .show{

    }

}
</style>