<template>
    <div class="content" >
        <div class="header">
            <Header></Header>
        </div>
        <div class="announcementl">
            <Content @show-click="handleChangesClick" ></Content>
        </div>
        
        <ClientOnly>
            <el-dialog :align-center="true" :center="true"  v-model="isShow" width="40%">
                <template #header>
                    <h1>{{ announcementCon.title }}</h1>
                    <h4 style="margin-top: 20px;">{{ announcementCon.type }}</h4>
                </template>
                <template #footer>
                    <div class="dialogs">
                        <el-form>
                            <el-form-item>
                                <div class="announceContent">
                                    {{ announcementCon.content }}
                                </div>
                                <!-- <el-input :placeholder="announcementCon.content" /> -->
                            </el-form-item>
                            <el-form-item>
                                <div>
                                    
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
import NotificationPopup  from '@/components/NotificationPopup/index.vue'
import {ref } from 'vue'
import type {anType} from '@/components/announcementContent/index.vue'

const isShow = ref(false)
const popupRef = ref<InstanceType<typeof NotificationPopup>>()

let announcementCon = ref<anType>({
    title:'',
    type:'',
    content:'',
    timestamp:'',
})

// announcementCon = handleChangesClick


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



useHead({
    title:props.title
})

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
    }
}



</style>
<style  scoped lang="scss">

</style>