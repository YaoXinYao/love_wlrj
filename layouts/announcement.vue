<template>
    <div class="announcementl">
        <Content></Content>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import Content from '@/components/announcementContent/index.vue'

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
.announcementl{
    width: 100%;
    height: 100vh;
    background-color: rgba(247,249,254,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>