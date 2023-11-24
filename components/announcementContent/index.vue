import { reactive } from 'vue';
<template>
    <div class="announcement" v-loading="loading">
        <div class="content">
            <el-timeline>
                    <el-timeline-item center placement="top" v-for="item in announcementList" :key="item.noticeId" :timestamp="item.noticeTime"  >
                        <el-card @click="con(item)">
                            <h2>{{ item.noticeType }}</h2>
                        </el-card>
                    </el-timeline-item>
            </el-timeline>
        </div> 

    </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import annoucementStore from '@/store/announcement'
import {storeToRefs} from 'pinia'

export interface anType {
    title:string,
    type:string,
    content: string,
    timestamp: string,
}

const announceList = annoucementStore()
handleAnnouncement({pageNo:1,pageSize:9999})

const {announcementList,loading} = storeToRefs(announceList)
console.log(announcementList)

const isShow = ref(true)



const emit = defineEmits(['ShowClick'])


function handleAnnouncement(query:any){
    announceList.getAnoucementAction(query)
}

function con(Props:any){
    console.log(Props)
    emit('ShowClick',Props)
}


defineExpose({handleAnnouncement})
</script>

<style scoped lang="scss">
.announcement{
    overflow: hidden;
    padding: 24px;
    width: 90%;
    height: 600px;
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