import { reactive } from 'vue';
<template>
    <div class="announcement">
        <div class="content">
            <el-timeline>
                <template v-for="(item,index) in announcement" :key="index">
                    <el-timeline-item center placement="top" :timestamp="item.timestamp"  >
                        <el-card @click="con(item)">
                            <h2>{{ item.title }}</h2>
                            <p>{{ item.content }}</p>
                        </el-card>
                    </el-timeline-item>
                </template>
            </el-timeline>
        </div>

    </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'


const announcement = reactive([
    {
        title:'考试通知',
        content: 'Event start',
        timestamp: '2018-04-15',
    },
    {
        title:'会议通知',
        content: 'Approved',
        timestamp: '2018-04-13',
    },
    {
        title:'讲课通知',
        content: 'Success',
        timestamp: '2018-04-11',
    },
])


const isShow = ref(true)



const emit = defineEmits(['ShowClick'])


function handleAnnouncement(){
    
}

function con(Props:any){
    console.log(Props.content,Props.timestamp,Props.title)
    console.log(isShow.value)
    emit('ShowClick',isShow)
    isShow.value = !isShow.value
    console.log(isShow.value)
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