import { reactive } from 'vue';
<template>
    <div class="announcement" v-loading="loading">
        <div class="content">
            <el-timeline>
                    <el-timeline-item center placement="top" v-for="(item) in newList" :key="item.newsId" :timestamp="item.newsTime"  >
                        <el-card @click="con(item)" class="card">
                            <el-icon class="cardIcon" @click.stop="handleDelete(item)" size="20"><CircleCloseFilled /></el-icon>
                            <h2>{{ item.newsTitle }}</h2>
                        </el-card>
                    </el-timeline-item>
            </el-timeline>
        </div> 
        <div>
            <el-dialog :align-center="true" :center="true"  v-model="dialogTableVisible" width="60%">
                <template #header>
                    <h1>{{ newJournalism.newsTitle ? newJournalism.newsTitle: newJournalism.newsTitle }}</h1>
                </template>
                <template #footer>
                    <div class="dialogs">
                        <el-form>
                            <el-form-item>
                                <div class="announceContent">
                                    <MarkdownDis :mark-text="newJournalism.newsContent" style="height: 100%;"  />
                                </div>
                                <!-- <el-input :placeholder="announcementCon.content" /> -->
                            </el-form-item>
                            <el-form-item v-show="newJournalism.newsImg">
                                <div class="picContent">
                                    <img  ref="ImgRef" :src="newJournalism.newsImg" class="showPicture" @click="handleScale"  alt="">
                                </div>
                            </el-form-item>
                            <el-form-item  >
                                <div class="announceType">
                                    {{ newJournalism.newsTime }}
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {CircleCloseFilled}  from '@element-plus/icons-vue'
import { ElMessageBox, ElNotification  }  from 'element-plus'

import journalismStore from '@/store/journalism'
import MarkdownDis from '@/components/markdownDis/index.vue'
import {deleteNew} from '@/service/journalism/journalism'

export interface anType {
    newsId:number,
    newsImg:string,
    newsTitle: string,
    newsContent: string,
    newsTime:string,
}

let newJournalism = reactive<anType>({
    newsId:0,
    newsImg:'',
    newsTitle:'',
    newsContent:'',
    newsTime:'',
})


const JournalismStore = journalismStore()
handleAnnouncement({pageNo:1,pageSize:9999})

const {newList,loading} = storeToRefs(JournalismStore)
console.log(JournalismStore)

const dialogTableVisible = ref(false)



const emit = defineEmits(['ShowClick'])


function handleAnnouncement(query:any){
    JournalismStore.getNew(query)
}

function con(Props:any){
    // console.log(Props)
    dialogTableVisible.value=true
    newJournalism = Props

    // console.log(newJournalism.newsContent)
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
        deleteNew({ids:[item.newsId]}).then(res=>{
            // console.log(res.data.value)
            if(res.data.value.code == 20000){
                ElNotification({
                    type:'success',
                    message:'删除成功',
                    title:'删除新闻'
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


function handleScale(){

}



defineExpose({handleAnnouncement})
</script>

<style scoped lang="scss">
.announcement{
    margin-top:20px;
    overflow: hidden;
    padding: 24px;
    width: 100%;
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
    .dialogs{
        .announceContent{
            display: flex;
            height: 400px;
            width: 100%;
            overflow: auto;
        }
        .announceType{
            display: flex;
            flex: 1;
            justify-content: flex-end;
            text-align: left;
        }
        .picContent{
            display: flex;
            flex: 1;
            justify-content: center;
            .showPicture{
                width: 100px;
                height: 100px;
                object-fit: cover;
            }
        }
        
    }
}
</style>