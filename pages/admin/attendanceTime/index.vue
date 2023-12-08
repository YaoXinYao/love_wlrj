<template>
    <div class="attendance">
        <AttendanceHeader></AttendanceHeader>
        <AttendanceContent></AttendanceContent>
    </div>
</template>

<script setup lang="ts">
import  AttendanceHeader  from '@/components/attendanceHeader/index.vue';
import  AttendanceContent  from '@/components/attendanceContent/index.vue';

definePageMeta({
    roles:3
})
</script>

<style scoped>
.attendance{
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(227,232,247);
    border-radius: 12px;
    padding: 10px 20px;
}
</style>