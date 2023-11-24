<template>
    <div class="content" >
        <div class="header">
            <Header @new-value="handleNewValueClick"></Header>
        </div>
        <div class="announcementl">
            <Content @show-click="handleChangesClick" ref="contentRef" ></Content>
        </div>
        
        <ClientOnly>
            <el-dialog :align-center="true" :center="true"  v-model="isShow" width="40%">
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
                                    <img  ref="ImgRef" :src="announcementCon.noticeImg" class="showPicture" @click="toggleFullscrent"  alt="">
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
import type {anType} from '@/components/announcementContent/index.vue'
import type {annoucement} from '@/store/store'

const isShow = ref(false)
const ImgRef = ref()

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
    
    console.log(isShow.value)
    // return flag
}

function handleNewValueClick(query:any){
    console.log(query)
    contentRef.value?.handleAnnouncement(query)
}


useHead({
    title:props.title
})

function toggleFullscrent(){
    console.log(ImgRef.value)
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
        }
        
    }
    
}



</style>
<style  scoped lang="scss">

</style>