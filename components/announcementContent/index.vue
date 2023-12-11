
<template>
    <div class="announcement" v-loading="loading">
        <div class="content">
            <el-timeline>
                    <el-timeline-item center placement="top" v-show="announcementList.length === 0" timestamp="2023-11-29 00:00:00">
                        <el-card   class="card">
                            <el-icon class="cardIcon" size="20"><CircleCloseFilled /></el-icon>
                            <h2>暂无数据</h2>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item center placement="top" v-for="item in announcementList" :key="item.noticeId" :timestamp="item.noticeTime"  >
                        
                        <el-card @click="con(item)" class="card">
                            <el-icon class="cardIcon" @click.stop="handleDelete(item)" size="20"><CircleCloseFilled /></el-icon>
                            <h2>{{ item.noticeTitle }}</h2>
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
import {CircleCloseFilled}  from '@element-plus/icons-vue'
import { ElMessageBox, ElNotification  }  from 'element-plus'
import { deleteNotice } from '~/service/announcement/announcement'

export interface anType {
    title:string,
    type:string,
    content: string,
    timestamp: string,
}

const announceList = annoucementStore()
handleAnnouncement({pageNo:1,pageSize:9999})

const {announcementList,loading} = storeToRefs(announceList)
// console.log(announcementList)

const isShow = ref(true)



const emit = defineEmits(['ShowClick'])


function handleAnnouncement(query:any){
    announceList.getAnoucementAction(query)
}

function con(Props:any){
    // console.log(Props)
    emit('ShowClick',Props)
}

function handleDelete(item:any){
    // console.log('删除')
    // console.log(item)
    ElMessageBox.confirm(
    '确定删除此公告嘛?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        deleteNotice({ids:[item.noticeId]}).then(res=>{
            // console.log(res.data.value)
            if(res.data.value.code == 20000){
                ElNotification({
                    type:'success',
                    message:'删除成功',
                    title:'删除公告'
                })
                handleAnnouncement({pageNo:1,pageSize:9999})
            }

        })

    })
    .catch(() => {
        ElNotification({
            type:'warning',
            message:'删除取消',
            title:'取消'
        })
    })
}


defineExpose({handleAnnouncement})
</script>

<style scoped lang="scss">
.announcement{
    overflow: hidden;
    padding: 24px;
    width: 90%;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e3e8f7;
    border-radius: 12px;
    background: white;
    .content{
        width:100%;
        height: 100%;
        overflow-y: auto;
        .card{
            position: relative;
            .cardIcon{
                cursor: pointer;
                position: absolute;
                right: 10px;
                top:10px;
            }
        }
    }
    .content::-webkit-scrollbar{
        width:0px
    }
    .show{

    }

}
</style>