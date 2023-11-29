
<template>
    <div class="journalism">
        <JournalismCont @new-value="handleNew"></JournalismCont>
        <JournalismNew ref="newRef"></JournalismNew>
    </div>
</template>

<script setup lang="ts">

import  JournalismCont  from '@/components/journalismCont/index.vue';
import  JournalismNew  from '@/components/journalismNew/index.vue';

const newRef = ref<InstanceType<typeof JournalismNew>>()

function handleNew(data:any){
    // console.log(data)
    newRef.value?.handleAnnouncement(data)
}

</script>

<style scoped lang="scss">
.journalism{
    height: 100%;
}
</style>