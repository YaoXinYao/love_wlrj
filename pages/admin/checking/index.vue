<template>
    <div class="checking">
        <div class="search">
            <el-form
            >
                <el-row >
                    <el-col :span="6" style="margin-right: 20px;">
                        <el-form-item label="时间"  >
                            <el-input  />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="margin-right: 20px;">
                        <el-form-item label=""  >
                            <el-input  />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="margin-right: 20px;">
                        <el-form-item label="时间"  >
                            <el-input  />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item>
                        <input type="file" style="display: none;" ref="inputRef" @click="handleUpdate">
                        <el-button type="primary" @click="handleOpen" >上传文件</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="content">
                <checkingContent></checkingContent>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import checkingContent  from '@/components/checking/index.vue'


const inputRef = ref()

interface formType {
    file:any
}


const formData = reactive<formType>({
    file:'',

})


function handleUpdate(event:any){
    console.log(event)
}
function handleOpen(){
    inputRef.value.click()
}
</script>

<style scoped lang="scss">
.checking{
    position: relative;
    display: flex;
    flex-direction: column;
    .search{
        border: 1px solid rgba(227,232,247);
        border-radius: 12px;
        padding: 10px 20px;
    }
}
</style>