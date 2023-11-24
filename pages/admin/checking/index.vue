<template>
    <ClientOnly>
        <div class="checking">
            <div class="search">
                <el-form
                >
                    <el-row >
                        <el-form-item>
                            <el-button type="primary" @click="handleNew" >新增</el-button>
                        </el-form-item>
                    </el-row>
                    <!-- <el-row>
                        <el-form-item>
                            <input type="file" style="display: none;" ref="inputRef" @click="handleUpdate">
                            <el-button type="primary" @click="handleOpen" >上传文件</el-button>
                        </el-form-item>
                    </el-row> -->
                    <el-row>
                        <div 
                            class="iconDiv" 
                            @dragover.prevent="allowDrop" 
                            @dragenter="highlight"
                            @dragleave="light"
                            @drop.prevent="handleDrop"
                            @click="handleOpen"
                            :class="{ 'highlight': isHighlighted }"
                        >
                            <el-icon size="90" class="el-icon--upload"><upload-filled /></el-icon>

                            <div>
                                拖拽到这里或者点击上传
                            </div>
                            <input type="file" ref='inputRef' style="display: none;"  @change="handleUpdate">
                        </div>
                    </el-row>
                </el-form>
                <div class="content" ref="uploadRef" >
                    <checkingContent ref="checkingRef" @change-click="handleChangeClick"></checkingContent>
                </div>
            </div>
            <el-dialog v-model="dialogTableVisible" width="30%">
                <el-form
                    :model="formData"
                    label-position="left"
                    ref="ruleFormRef"
                    :rules="rules"
                    :hide-required-asterisk="true"
                >
                    <el-form-item label="姓名"  label-width="80" prop="unsignUsername">
                        <el-input style="width:65%;" v-model="formData.unsignUsername"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" label-width="80" prop="unsignStudentId">
                        <el-input style="width:65%;" v-model="formData.unsignStudentId"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" label-width="80" prop="unsignDate">
                        <el-date-picker
                            v-model="formData.unsignDate"
                            type="date"
                            placeholder="选择日期"
                        />
                    </el-form-item>
                    <el-form-item label="签到时间" label-width="80" prop="unsignTime">
                        <el-time-picker v-model="formData.unsignTime" placeholder="Arbitrary time" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitNew">确定</el-button>
                        <el-button type="danger" @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import checkingContent  from '@/components/checking/index.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import {upload,inserUnSign} from '@/service/sign/sign'
import { ElNotification,ElMessageBox  } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import signStore from '@/store/checking'
import {storeToRefs} from 'pinia'



const inputRef = ref()
const isHighlighted = ref(false)
const dialogTableVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const checkingRef = ref<InstanceType<typeof checkingContent>>()


const signstore = signStore()


const {currentQuery} = storeToRefs(signstore)





interface formType {
    unsignDate:string,
    unsignUsername:string,
    unsignTime:any,
    unsignStudentId:string,
}


const formData = reactive<formType>({
    unsignDate:'',
    unsignUsername:'',
    unsignTime:'',
    unsignStudentId:'',
})

const rules = reactive<FormRules<typeof formData>>({
    unsignDate:[
        {
            required:true,
            message:'请填写日期',
            trigger:'blur'
        }
    ],
    unsignUsername:[
        {
            required:true,
            message:'请填写姓名',
            trigger:'blur'
        }
    ],
    unsignTime:[
        {
            required:true,
            message:'请填写时间',
            trigger:'blur'
        }
    ],
    unsignStudentId:[
        {
            required:true,
            message:'请填写学号',
            trigger:'blur'
        }
    ],
})

function handleUpdate(event:any){
    console.log(event)
    const files =  inputRef.value.files
    handleFiles(files);
    inputRef.value = null;
}
function handleOpen(){
    inputRef.value.click()
}

function highlight(){
    isHighlighted.value=true
}

function light(){
    isHighlighted.value = false
}


function handleNew(){
    dialogTableVisible.value = true
}


function handleDrop(event:any) {
    console.log(event)
    const files = event.dataTransfer.files;
    handleFiles(files);
}


function handleFiles(files:any){
    console.log(files)
    upload(files[0]).then(res=>{
        console.log(res.data.value)
        if(res.data.value.code === 20000){
            ElNotification({
                title:'成功',
                message:'上传成功',
                type:'success'
            })
        }
    })
}

function allowDrop(event:any){
    // console.log(event)
    event.preventDefault();
}


function submitNew(){
    ruleFormRef.value?.validate((valid) => {
        if (valid) {
            // console.log('submit!')
            // console.log(formData)
            let time = new Date(formData.unsignDate)
            let times = new Date(formData.unsignTime)
            formData.unsignDate = time.getFullYear().toString() + '-' + (time.getMonth() + 1).toString().padStart(2, '0') + '-' + time.getDate().toString().padStart(2,'0');
            formData.unsignTime = times.getHours().toString().padStart(2,'0') + ':'+ times.getMinutes().toString().padStart(2,'0') + ':'+times.getSeconds().toString().padStart(2,'0')
            console.log(formData)
            inserUnSign({...formData}).then(res=>{
                console.log(res.data.value)
                if(res.data.value.code === 20000){
                    ElNotification({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    dialogTableVisible.value = false
                    let current = currentQuery.value
                    checkingRef.value?.getUnSign({...current})
                }
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

function cancel(){
    dialogTableVisible.value = false;
    ruleFormRef.value?.resetFields()
}

function handleChangeClick(data:any){
    console.log(data)

    formData.unsignDate = data.unsignDate
    formData.unsignStudentId = data.unsignStudentId
    let time = new Date()
    let arr = data.unsignTime.split(':')
    time.setHours(arr[0])
    time.setMinutes(arr[1])
    time.setSeconds(arr[2])
    formData.unsignTime = time
    formData.unsignUsername = data.unsignUsername

    dialogTableVisible.value = true
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
        justify-content: center;
        align-items: center;
        .iconDiv{
            display: flex;
            flex: 1;
            padding:30px 20px ;
            flex-direction: column;
            justify-content: center;
            border-radius: 12px;
            align-items: center;
            border: 1px dashed #dcdfe6;
            margin-bottom: 20px;
            font-size: 12px;
            cursor: pointer;
            :deep(.el-icon){
                color:#a8abb2 !important;
            }
        }
        .iconDiv.highlight{
            border-color: rgba(64,158,255);
        }
        .iconDiv:hover{
            border-color: rgba(64,158,255);
        }
    }
}
</style>