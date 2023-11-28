
<template>
    <div class="journalism">
        <JournalismCont></JournalismCont>
        <JournalismNew></JournalismNew>
    </div>
</template>

<script setup lang="ts">

import  JournalismCont  from '@/components/journalismCont/index.vue';
import  JournalismNew  from '@/components/journalismNew/index.vue';

</script>

<style scoped lang="scss">
.journalism{
    height: 100%;
}
</style>