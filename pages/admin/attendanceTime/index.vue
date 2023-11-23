<template>
    <div class="attendance">
        <AttendanceHeader></AttendanceHeader>
        <AttendanceContent></AttendanceContent>
    </div>
</template>

<script setup lang="ts">
import  AttendanceHeader  from '@/components/attendanceHeader';
import  AttendanceContent  from '@/components/attendanceContent';
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