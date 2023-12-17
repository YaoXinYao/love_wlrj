
<template>
    <div class="journalism" v-loading.fullscreen="loading">
        <JournalismCont @new-value="handleNew" @load="handleLoading"></JournalismCont>
        <JournalismNew ref="newRef"></JournalismNew>
    </div>
</template>

<script setup lang="ts">

import  JournalismCont  from '@/components/journalismCont/index.vue';
import  JournalismNew  from '@/components/journalismNew/index.vue';

const loading = ref(false)
const newRef = ref<InstanceType<typeof JournalismNew>>()

definePageMeta({
    roles:2
})

function handleNew(data:any){
    // console.log(data)
    newRef.value?.handleAnnouncement(data)
}

function handleLoading(data:any){
    console.log(data)
    loading.value = data
    console.log(loading.value)
}

</script>

<style scoped lang="scss">
.journalism{
    height: 100%;
    width: 1670px;
}
</style>