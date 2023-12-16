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
                            <el-icon 
                                size="90" 
                                class="el-icon--upload" 
                                @dragover.prevent="allowDrop" 
                                @drop.prevent="handleDrop"
                            >
                                <upload-filled />
                            </el-icon>

                            <div>
                                拖拽到这里或者点击上传
                            </div>
                            <input type="file" ref='inputRef' style="display: none;"  @change="handleUpdate">
                            <div class="fileAll" v-show="showFile">
                                <div>
                                    每日统计表_20231111_20231111 (2).xlsx
                                </div>
                                <div class="filesCont">
                                    <el-icon class="iconFile" size="20"><Document /></el-icon>
                                    <el-progress   :percentage="percentage" color="#409eff" />
                                </div>
                            </div>
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
                        <el-input  v-model="formData.unsignUsername"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" label-width="80" prop="unsignStudentId">
                        <el-input  v-model="formData.unsignStudentId"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" label-width="80" prop="unsignDate">
                        <el-date-picker
                            v-model="formData.unsignDate"
                            type="date"
                            placeholder="选择日期"
                        />
                    </el-form-item>
                    <el-form-item label="时间段" label-width="80" prop="unsignPeriod">
                        <el-select v-model="formData.unsignPeriod" placeholder="请选择时间段">
                            <el-option label="上午" value="1" />
                            <el-option label="下午" value="2" />
                            <el-option label="晚上" value="3" />
                        </el-select>
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
import { UploadFilled, Document } from '@element-plus/icons-vue'
import { updateUnSign, inserUnSign} from '@/service/sign/sign'
import { ElNotification  } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import signStore from '@/store/checking'
import {storeToRefs} from 'pinia'

definePageMeta({
    roles:3
})

const inputRef = ref()
const isHighlighted = ref(false)
const dialogTableVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const checkingRef = ref<InstanceType<typeof checkingContent>>()
const percentage = ref(0)
const signstore = signStore()
const showFile = ref(false)

const {currentQuery} = storeToRefs(signstore)

watch(dialogTableVisible,(newValue)=>{
    if(newValue == false){
        ruleFormRef.value?.resetFields()
    }
})



interface formType {
    unsignDate:string,
    unsignUsername:string,
    unsignTime?:any,
    unsignStudentId:string,
    unsignId?:string,
    unsignPeriod:string,
}


const formData = reactive<formType>({
    unsignDate:'',
    unsignUsername:'',
    unsignTime:'',
    unsignStudentId:'',
    unsignPeriod:'',
})


function validateNumber(rule:any,value:any,callback:any){
    // 判断是否是数字
    const isNumeric = /^\d+$/.test(value);
    // 判断长度是否为11位
    const isCorrectLength = value.length === 11;

    if (isNumeric && isCorrectLength) {
        // 验证通过
        callback();
    } else {
        // 验证失败，返回错误信息
        callback(new Error('必须是11位数字'));
    }
}

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
        },

    ],
    unsignPeriod:[
        {
            required:true,
            message:'选择时间段',
            trigger:'blur'
        }
    ],
    unsignStudentId:[{validator:validateNumber,trigger:'blur'}],
})

function handleUpdate(event:any){
    // console.log(event)
    const files =  inputRef.value.files
    let nameArr = files[0].name.split('.')
    if(nameArr[nameArr.length-1] === 'xlsx' || nameArr[nameArr.length-1] === 'xls'){
        handleFiles(files);
        showFile.value = true;
        // console.log(files)
    }else{
        ElNotification({
            title: '上传失败',
            message: '格式不对',
            type:'warning'
        })
    }
    // handleFiles(files);
    // inputRef.value = null;
}
function handleOpen(){
    inputRef.value.click()
}

function highlight(){
    // console.log('进来了');
    
    isHighlighted.value=true
}

function light(){
    // console.log('出来了');
    isHighlighted.value = false
}


function handleNew(){
    dialogTableVisible.value = true

}


function handleDrop(event:any) {
    // console.log(event)
    const files = event.dataTransfer.files;
    // console.log(files)
    // handleFiles(files);
    let nameArr = files[0].name.split('.')
    if(nameArr[nameArr.length-1] === 'xlsx' || nameArr[nameArr.length-1] === 'xls'){
        handleFiles(files);
        showFile.value = true;
        // console.log(files)
    }else{
        ElNotification({
            title: '上传失败',
            message: '格式不对',
            type:'warning'
        })
    }

}

function handleUploadProgress(event:any){
    // console.log(event)
    // console.log(event.lengthComputable)
    const percentages = (event.loaded / event.total) * 100;
    // console.log(event.loaded, event.total)
    // console.log(event.total)
    percentage.value = Math.floor(percentages);
}


function handleFiles(files:any){
    // console.log(files)
    let formData = new FormData()
    formData.append('file',files[0])

    const xhr = new XMLHttpRequest()


    xhr.upload.addEventListener('progress',handleUploadProgress)

    xhr.open('POST','/check/attendance/unsign/uploadExcel',true)
    xhr.withCredentials = true;

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            
            ElNotification({
                title: '成功',
                message: '上传成功',
                type:'success'
            })
            if(percentage.value == 100){
                // console.log(1)
                percentage.value = 0;
                showFile.value = false
                let current = currentQuery.value
                checkingRef.value?.getUnSign({...current})
            }
            
        } else {
            // console.error('Upload failed');
        }
        }
    };
    xhr.send(formData)

}

function allowDrop(event:any){
    event.preventDefault();
}


function submitNew(){
    ruleFormRef.value?.validate((valid) => {
        if (valid) {
            if(formData.unsignId){
                let time = new Date(formData.unsignDate)
                let times = new Date(formData.unsignTime)
                formData.unsignDate = time.getFullYear().toString() + '-' + (time.getMonth() + 1).toString().padStart(2, '0') + '-' + time.getDate().toString().padStart(2,'0');
                let object = {}
                if(formData.unsignTime){
                    object = {
                        unsignDate:formData.unsignDate,
                        unsignTime:times.getHours().toString().padStart(2,'0') + ':'+ times.getMinutes().toString().padStart(2,'0') + ':'+times.getSeconds().toString().padStart(2,'0'),
                        unsignUsername:formData.unsignUsername,
                        unsignStudentId:formData.unsignStudentId,
                        unsignId:formData.unsignId,
                        unsignPeriod:formData.unsignPeriod
                    }
                }else{
                        object = {
                        unsignDate:formData.unsignDate,
                        unsignUsername:formData.unsignUsername,
                        unsignStudentId:formData.unsignStudentId,
                        unsignId:formData.unsignId,
                        unsignPeriod:formData.unsignPeriod
                    }
                }
                //  console.log(object)
                 updateUnSign(object).then(res=>{
                    // console.log(res.data.value)
                    if(res.data.value.code === 20000){
                        ElNotification({
                            title:'成功',
                            message:'修改成功',
                            type:'success'
                        })
                        
                        let current = currentQuery.value
                        checkingRef.value?.getUnSign({...current})
                    }
                })
                dialogTableVisible.value = false
            }else{
                let time = new Date(formData.unsignDate)
                let times = new Date(formData.unsignTime)
                formData.unsignDate = time.getFullYear().toString() + '-' + (time.getMonth() + 1).toString().padStart(2, '0') + '-' + time.getDate().toString().padStart(2,'0');
                let object = {}
                if(formData.unsignTime){
                    object = {
                        unsignDate:formData.unsignDate,
                        unsignTime:times.getHours().toString().padStart(2,'0') + ':'+ times.getMinutes().toString().padStart(2,'0') + ':'+times.getSeconds().toString().padStart(2,'0'),
                        unsignUsername:formData.unsignUsername,
                        unsignStudentId:formData.unsignStudentId,
                        unsignPeriod:formData.unsignPeriod
                    }
                }else{
                        object = {
                        unsignDate:formData.unsignDate,
                        unsignUsername:formData.unsignUsername,
                        unsignStudentId:formData.unsignStudentId,
                        unsignPeriod:formData.unsignPeriod
                    }
                }
                // console.log(object)
                inserUnSign(object).then(res=>{
                    // console.log(res.data.value)
                    if(res.data.value.code === 20000){
                        ElNotification({
                            title:'成功',
                            message:'添加成功',
                            type:'success'
                        })
                        let current = currentQuery.value
                        checkingRef.value?.getUnSign({...current})
                    }
                })
                dialogTableVisible.value = false
            }

        } else {
            // console.log('error submit!')
            return false
        }
    })
}

function cancel(){
    dialogTableVisible.value = false;
    ruleFormRef.value?.resetFields()
}



function handleChangeClick(data:any){
    // console.log(data)
    dialogTableVisible.value = true
    formData.unsignDate = data.unsignDate
    formData.unsignStudentId = data.unsignStudentId
    formData.unsignUsername = data.unsignUsername
    formData.unsignId = data.unsignId
    if(data.unsignTime !== null){
        let time = new Date()
        let arr = data.unsignTime.split(':')
        time.setHours(arr[0])
        time.setMinutes(arr[1])
        time.setSeconds(arr[2])
        formData.unsignTime = time
        
    }else{
        formData.unsignTime = ''
    }
    // console.log(formData)
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
            position: relative;
            flex: 1;
            padding:30px 20px 60px 20px ;
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
            .fileAll{
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom:15px;
                left: 40%;
                .filesCont{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .iconFile{
                        position: absolute;
                        left: -25px;
                    }
                }
                .filesCont .el-progress--line {
                    width: 350px;
                }
            }

        }
        .iconDiv.highlight{
            border:2px dashed  #79bbff;
            background-color: #ecf5ff;
        }
        .iconDiv:hover{
            border-color: rgba(64,158,255);
        }
    }
}
</style>