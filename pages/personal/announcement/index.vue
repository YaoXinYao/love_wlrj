<template>
    <div class="content" >
        <div class="header">
            <Header></Header>
        </div>
        <div class="announcementl">
            <Content></Content>
        </div>
        
        announcement
    </div>
</template>

<script setup lang="ts">
import Header  from '@/components/recent-announcement/index.vue'
import Content from '@/components/announcementContent/index.vue'
// definePageMeta({
//     layout:'announcement'
// })

interface IProps {
    title: string
}
const props = withDefaults(defineProps<IProps>(),{
    title:'公告'
})

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
    .header{
        width: 90%;
        flex: 1;


        margin-bottom: 24px;
    }
    .announcementl{
        width: 100%;
        background-color: rgba(247,249,254,1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .el-timeline-item__tail{
        border-left: 2px solid black;
    }
}

</style>