import { reactive } from 'vue';
<template>
    <div class="announcement" v-loading="loading">
        <div class="content">
            <el-timeline>
                    <el-timeline-item center placement="top" v-show="newList.length === 0" timestamp="2023-11-29 00:00:00"  >
                        <el-card class="card">
                            <el-icon class="cardIcon" size="20"><CircleCloseFilled /></el-icon>
                            <h2>暂无数据</h2>
                        </el-card>
                    </el-timeline-item>
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

                    <div class="dialogs">
                        <el-form>
                            <el-form-item>
                                <div   class="announceContent">
                                    <MarkdownDis :mark-text="newJournalism.newsContent"   />
                                </div>
                                <!-- <el-input :placeholder="announcementCon.content" /> -->
                            </el-form-item>
                            <el-form-item v-show="newJournalism.newsImg">
                                <div class="picContent">
                                    <div 
                                        :class="{'full-screen':isFullScreen}" 
                                        @click="toggleFullscrent"
                                        @wheel.passive="handleWheel"
                                    >
                                        <img  
                                            ref="ImgRef" 
                                            :src="newJournalism.newsImg" 
                                            :style="{ transform: `scale(${scale})` }"
                                            :class="{showPicture:true,'full-screen-img':isFullScreen}" 
                                            alt=""
                                        >
                                    </div>
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
                <template #footer>
                    
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

const newJournalism = reactive<anType>({
    newsId:0,
    newsImg:'',
    newsTitle:'',
    newsContent:'',
    newsTime:'',
})

watch(()=>newJournalism.newsImg,(newValue)=>{
    console.log(newValue)
})


const JournalismStore = journalismStore()
handleAnnouncement({pageNo:1,pageSize:9999})

const {newList,loading} = storeToRefs(JournalismStore)
const dialogTableVisible = ref(false)
const isFullScreen = ref(false)
const scale = ref(1)
const minScale = ref(0.5)
const maxScale = ref(2)
const scaleStep = ref(0.1)


const emit = defineEmits(['ShowClick'])


function handleAnnouncement(query:any){
    JournalismStore.getNews(query)
}

function con(Props:any){
    // console.log(Props)
    dialogTableVisible.value=true
    newJournalism.newsId = Props.newsId
    newJournalism.newsImg = Props.newsImg
    newJournalism.newsTitle = Props.newsTitle
    newJournalism.newsContent = Props.newsContent
    newJournalism.newsTime = Props.newsTime

    // console.log(newJournalism)
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

function handleWheel(event:any){
    // console.log(event)
    if (isFullScreen.value) {
        // 阻止滚动事件的默认行为
        // event.preventDefault();

        // 计算缩放比例
        const delta = event.deltaY > 0 ? -scaleStep.value : scaleStep.value;
        const newScale = scale.value + delta;

        // 限制缩放范围
        scale.value = Math.min(Math.max(newScale, minScale.value), maxScale.value);
      }
}

function toggleFullscrent(){
    // console.log(ImgRef.value)
    isFullScreen.value = !isFullScreen.value
}


defineExpose({handleAnnouncement})
</script>

<style scoped lang="scss">
.announcement{
    margin-top:20px;
    overflow: hidden;
    padding: 24px;
    width: 100%;
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
    .dialogs{
        .announceContent{
            display: flex;
            max-height: 400px;
            width: 100%;
            overflow: auto;
        }
        .fixedHeight{
            height: 400px;
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
            .full-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.8); /* 半透明黑色遮罩层 */
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: zoom-out;
                z-index: 9999;
                .full-screen-img {
                    width: 100vw;
                    height: 100vh;
                    object-fit: contain; /* 保持图片比例 */
                }
            }
        }
        
    }
}
</style>