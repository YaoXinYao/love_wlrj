<template>
    <div class="content" >
        <div class="header">
            <Header></Header>
        </div>
        <div class="announcementl">
            <Content @show-click="handleChangesClick" ></Content>
        </div>
        
        <el-dialog :align-center="true" :center="true"  v-model="isShow" width="40%">
            <template #header>
                <h1>{{ announcementCon.value.title }}</h1>
                <h4 style="margin-top: 20px;">{{ announcementCon.value.type }}</h4>
            </template>
            <template #footer>
                <NotificationPopup ref="popupRef" />
            </template>
        </el-dialog>
       
    </div>
</template>

<script setup lang="ts">
import Header  from '@/components/recent-announcement/index.vue'
import Content from '@/components/announcementContent/index.vue'
import NotificationPopup  from '@/components/NotificationPopup/index.vue'
import {ref, reactive,toRefs, toRef, nextTick, watch } from 'vue'
import type {anType} from '@/components/announcementContent/index.vue'

const isShow = ref(false)
const popupRef = ref<InstanceType<typeof NotificationPopup>>()

let announcementCon = reactive<anType>({
    title:'',
    type:'',
    content:'',
    timestamp:'',
})

announcementCon.value = handleChangesClick


interface IProps {
    title: string
}
const props = withDefaults(defineProps<IProps>(),{
    title:'公告'
})

function handleChangesClick(flag:anType){
    announcementCon.value = flag
    isShow.value = !isShow.value
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
}



</style>
<style  scoped lang="scss">

</style>