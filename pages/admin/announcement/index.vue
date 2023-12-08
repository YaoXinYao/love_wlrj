<template>
    <div class="content" >
        <div class="header">
            <Header @new-value="handleNewValueClick"></Header>
        </div>
        <div class="announcementl">
            <Content @show-click="handleChangesClick" ref="contentRef" ></Content>
        </div>
        
        <ClientOnly>
            <el-dialog :align-center="true" :center="true"  v-model="isShow" width="40%" @keydown="handleKeyDown">
                <template #header>
                    <h1>{{ announcementCon.noticeTitle ? announcementCon.noticeTitle: announcementCon.noticeType }}</h1>
                    <h4 style="margin-top: 20px;">{{ announcementCon.noticeType }}</h4>
                </template>
                <template #footer>
                    <div class="dialogs">
                        <el-form>
                            <el-form-item>
                                <div class="announceContent">
                                    {{ announcementCon.noticeContent }}
                                </div>
                                <!-- <el-input :placeholder="announcementCon.content" /> -->
                            </el-form-item>
                            <el-form-item v-show="announcementCon.noticeImg">
                                <div class="picContent">
                                    <div 
                                        :class="{'full-screen':isFullScreen}" 
                                        @click="toggleFullscrent"
                                        @wheel.passive="handleWheel"
                                        
                                    >
                                        <img  
                                            ref="ImgRef" 
                                            :src="announcementCon.noticeImg" 
                                            :style="isFullScreen ? { transform: `scale(${scale})`} : ''"
                                            :class="{showPicture:true,'full-screen-img':isFullScreen}" 
                                            alt=""
                                        >
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item >
                                <div class="announceType">
                                    {{ announcementCon.noticeScope === 'ALL' ? "全体成员":announcementCon.noticeScope }}
                                </div>
                            </el-form-item>
                            <el-form-item  >
                                <div class="announceType">
                                    {{ announcementCon.noticeTime }}
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-dialog>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import Header  from '@/components/recent-announcement/index.vue'
import Content from '@/components/announcementContent/index.vue'
import {ref } from 'vue'
import type {annoucement} from '@/store/store'

const isShow = ref(false)
const ImgRef = ref()
const isFullScreen = ref(false)
const scale = ref(1)
const minScale = ref(0.5)
const maxScale = ref(2)
const scaleStep = ref(0.1)

definePageMeta({
    roles:2
})


let announcementCon = ref<annoucement>({
    noticeTitle: '',
    noticeContent: '',
    noticeType: '',
    noticeImg:'',
    noticeTime:'',
    noticeId:0,
    noticeScope:'',
})


// announcementCon = handleChangesClick
const contentRef = ref<InstanceType<typeof Content>>()

interface IProps {
    title: string
}
const props = withDefaults(defineProps<IProps>(),{
    title:'公告'
})

function handleChangesClick(flag:any){
    announcementCon.value = flag
    isShow.value = !isShow.value
    
    // console.log(isShow.value)
    // return flag
}

function handleNewValueClick(query:any){
    // console.log(query)
    contentRef.value?.handleAnnouncement(query)
}


function handleWheel(event:any){
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

useHead({
    title:props.title
})

function toggleFullscrent(){
    // console.log(ImgRef.value)
    isFullScreen.value = !isFullScreen.value
}


function handleKeyDown(e:any){
    console.log(e)
    if(e.key == 'Escape'){
        isFullScreen.value = false
    }
}


</script>

<style scoped lang="scss">

.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position:relative;
    .header{
        width: 90%;
        flex: 1;
        margin-bottom: 24px;
    }
    .announcementl{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .el-timeline-item__tail{
        border-left: 2px solid black;
    }
    :deep(.el-dialog){
        border-radius: 10px;
        header{
            padding-top: 20px !important;   
        }
        .el-dialog_body{
            padding: 20px !important;
        }
    }
    :deep(.el-dialog--center){
        .el-dialog__body{
            padding: 10px;
        }
    }
    :deep(.el-dialog__footer){
        padding: 10px 30px
    }
    .dialogs{
        .announceContent{
            display: flex;
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
                cursor: pointer;
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
<style  scoped lang="scss">

</style>