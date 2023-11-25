<template>
    <div class="doubleColumn">
        <div class="leftColumn">
            <MonacoEditor 
                v-model="value" 
                lang="markdown" 
                class="markdowns"
                :options="{
                    scrollBeyondLastColumn:0,
                    tabSize:10,
                    scrollbar:{
                        horizontal:'hidden'
                    }
                }"
            >
            </MonacoEditor>
        </div>
        <div class="nightColumn">
            <MarkdownDis :mark-text="value" style="height: 100%;">
            
            </MarkdownDis>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,watch} from 'vue'
const value = ref('')
function handleGetValue(){
    return value.value
}

defineExpose({handleGetValue})
</script>

<style scoped lang="scss">
.doubleColumn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width:100%;
    height: 100%;
    .leftColumn{
        
        height: 900px;
        width: 50%;
        border: 1px solid rgba(220,223,230);
        padding-top: 10px;
        border-radius: 12px;
        padding-bottom: 20px;
        .markdowns{
            height: 100%;
            width: 100%;
        }
    }
    .nightColumn{
        height: 900px;
        width: 49%;
        overflow: auto;
        border: 1px solid rgba(220,223,230);
        padding: 10px 20px;
        border-radius: 12px;
    }
    .nightColumn::-webkit-scrollbar{
        width: 0px;
    }
}
</style>