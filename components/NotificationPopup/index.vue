<template >
    <ClientOnly>
        <div class="dialogs">
            <el-form>
                <el-form-item>
                    <el-input :placeholder="props.title" />
                </el-form-item>
            </el-form>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import type {anType} from '@/components/announcementContent/index.vue'
const props = defineProps<anType>()



</script>

<style scoped lang="scss">
</style>