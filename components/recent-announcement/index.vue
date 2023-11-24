<template>
    <div class="recent-announcement">
        <!-- 随机公告 -->
        <div class="barrage-container">
            <el-form
                :model="refForm"
                label-width="80px"
                label-position="left"
                :hide-required-asterisk="hide"
                size="large"
                :rules="rules"
                ref="ruleFormRef"
            >
                <el-form-item label="公告标题" prop="noticeTitle">
                    <el-input placeholder="填写公告标题" v-model="refForm.noticeTitle" />
                </el-form-item>
                <el-form-item label="公告类型" prop="noticeType">
                    <el-select  placeholder="请选择公告类型" v-model="refForm.noticeType" default="讲课通知" >
                        <el-option label="讲课通知" value="讲课通知"  />
                        <el-option label="会议通知" value="会议通知" />
                        <el-option label="违纪通知" value="违纪通知" />
                        <el-option label="考核通知" value="考核通知" />
                        <el-option label="其他" value="其他" />
                    </el-select>
                </el-form-item>
                <el-form-item label="上传图片" prop="noticeImgs">
                    <el-col>
                        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
                        <el-button type="primary" @click="handleFile">Click to upload</el-button>
                    </el-col>
                    <el-col  v-show="refForm.noticeImgs">
                        <div class="fileShow">
                            <img  :src="refForm.noticeImgs !== '' ? srcValue : ''" alt="上传图片" class="Pic">
                            <div class="imgName">
                                {{ refForm.noticeImgs.name }}
                            </div>
                            <div class="delPic" @click="handleDeletePic">
                                <el-icon :size="10">
                                    <CloseBold />
                                </el-icon>
                            </div>
                        </div>
                    </el-col>
                </el-form-item>
                <el-row>
                    <el-form-item label="公告范围" prop="noticeScope">
                        <el-select  placeholder="面向人员" v-model="refForm.noticeScope" >
                            <el-option label="全部" value="ALL"   @click="handleClearValue" />
                            <el-option label="年级" value="年级"  @click="handleClearValue" />
                            <el-option label="个人" value="个人"  @click="handleClearValue"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        v-show="refForm.noticeScope == '年级' || refForm.noticeScope === '个人'"
                        prop="grade"
                        :rules="refForm.noticeScope== '年级' || refForm.noticeScope === '个人'?
                        {
                            required:true,
                            message:'请选择年级',
                            trigger:'blur'
                        }: {}"
                    >
                        <el-select placeholder="年级" v-model="refForm.grade" >
                            <el-option v-for="(item,index) in grade" :label="item" :value="item" :key="index" @click="handleGetUsers(item)"  />
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        prop="user"
                        v-show="refForm.grade !== '' && refForm.noticeScope === '个人'"
                        :rules="refForm.noticeScope === '个人' && refForm.grade !== ''?{
                            required:true,
                            message:'请选择成员',
                            trigger:'blur'
                        }:{}"
                    >
                        <el-select   placeholder="用户" v-model="refForm.user" >
                            <el-option v-for="item in users" :label="item.userName" :value="item.userId" :key="item.userId" />
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-form-item label="公告内容" prop="noticeContent">
                    <el-input 
                        type="textarea" 
                        v-model="refForm.noticeContent" 
                        maxlength="100"
                        show-word-limit
                        class="el-textareaC"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
                    <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import type  { FormRules, FormInstance} from 'element-plus';
import {ElNotification, } from 'element-plus'
import { ref, reactive } from 'vue';
import type { UploadProps, } from 'element-plus'
import { getUser,getGrade } from '@/service/announcement/announcement'
import {postAffiche} from '@/service/announcement/announcement'
import { ElMessage, ElMessageBox } from 'element-plus'
import {CloseBold} from '@element-plus/icons-vue'


const hide = ref(true)

const grade = ref()
const users = ref()
const fileInput = ref()
const srcValue = ref('')


const emit = defineEmits(['newValue'])


getGrade().then(res=>{
    console.log(res.data.value)
    grade.value = res.data.value.data
})


console.log(grade)


const enum formEn{
    noticeTitle = "noticeTitle",
    noticeContent = "noticeContent",
    noticeImgs = "noticeImgs",
    noticeScope = "noticeScope",
    noticeType = "noticeType",
    grade = "grade",
    user = "user"
}



interface IProps {
    noticeTitle:string,
    noticeType:string,
    noticeContent:string,
    noticeScope:string,
    grade:string,
    user:string,
    noticeImgs:string
}

const refForm = reactive<IProps>({
    noticeTitle:'',
    noticeType:'',
    noticeContent:'',
    noticeScope:'',
    grade:'',
    user:'',
    noticeImgs:'',
})

JSON.stringify

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<IProps>>({
    noticeTitle:[
        {
            required:true,
            message:'请填写标题',
            trigger:'blur'
        },
    ],
    noticeType:[
        {
            required:true,
            message:'清选择类型',
            trigger:'blur'
        }
    ],
    noticeContent:[
        {
            required:true,
            message:'不能为空的',
            trigger:'blur'
        }
    ],
    noticeScope:[
        {
            required:true,
            message:'请选择人群',
            trigger:'blur'
        },
    ]
})

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}


const handleFile = ()=>{
    // fileInput.value.click()
    fileInput.value.value = null;
    fileInput.value.click()
    
}


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const result = await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      return true
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
  if(result){
    // console.log(refForm)
    // ruleFormRef.value?.resetFields()
    let form:any ={}
    let fileList = refForm.noticeImgs
    for(let item in refForm){
        if(refForm[item as formEn] !== '' && item !== 'noticeImgs'){
            form[item] = refForm[item as formEn]
        }
    }
    
    if(refForm.user !== ''){
        form.noticeScope = refForm.user
        delete form.grade
        delete form.user
    }
    if(refForm.user == '' && refForm.grade !== ''){
        form.noticeScope = refForm.grade
        delete form.grade
    }
    if(refForm.noticeImgs.length != 0){
        ElMessageBox.confirm(
            '确定发布公告嘛？',
            '发布公告',
            {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }
        ).then(()=>{
            postAffiche(form,fileList).then(res=>{
                console.log('上传图片')
                console.log(res.data)
                let data = res.data.value
                if(data.code === 20000){
                    ElNotification({
                        title:'发送成功',
                        message:`这是一条${refForm.noticeType}的公告`,
                        type:'success',
                        zIndex: 10000,
                    })
                    emit('newValue',{pageNo:1,pageSize:9999})
                    ruleFormRef.value?.resetFields()
                }
            })
        }).catch(()=>{
            ElNotification({
                title:'发送取消',
                message:`已经取消`,
                type:'error',
                zIndex: 10000,
            })
        })
    }else{
        ElMessageBox.confirm(
            '确定发布公告嘛？',
            '发布公告',
            {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }
        ).then(()=>{
            postAffiche(form).then(res=>{
                console.log(res.data.value)
                let data = res.data.value
                if(data.code === 20000){
                    ElNotification({
                        title:'发送成功',
                        message:`这是一条${refForm.noticeType}的公告`,
                        type:'success',
                        zIndex: 10000,
                    })
                    emit('newValue',{pageNo:1,pageSize:9999})
                    ruleFormRef.value?.resetFields()
                }
            })
        }).catch(()=>{
            ElNotification({
                title:'发送取消',
                message:`已经取消`,
                type:'error',
                zIndex: 10000,
            })
        })

    }
    console.log(form)
    console.log(fileList)
    // postAffiche()

  }
}


const resetForm = (forEl:FormInstance | undefined)=>{
    if(!forEl) return 
    forEl.resetFields()
    ElNotification({
        title:'发送取消',
        message:`请重新编辑公告`,
        type:'warning',
        zIndex: 10000,
    })
}



const handleGetUsers = (item:any)=>{
    console.log(item)
    refForm.user = ''
    getUser({grade:item}).then(res=>{
        console.log(res.data.value.data)
        users.value = res.data.value.data
    })
}

const handleClearValue = ()=>{
    refForm.grade = ''
    refForm.user = ''
}


function handleFileChange(event:any){
    console.log(event)
    const file = event.target.files[0]
    refForm.noticeImgs = file
    const value = URL.createObjectURL(file)
    srcValue.value = value
    console.log(value)
    console.log(refForm.noticeImgs)
}

function handleDeletePic(){
    fileInput.value.value = null;
    refForm.noticeImgs = ''
}


</script>

<style scoped lang="scss">
.recent-announcement{
    display:flex;
    justify-content: flex-start;
    width: 100%;
    border: 1px solid #e3e8f7;
    border-radius: 12px;
    background: white;
    padding: 24px;
    .barrage-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        .fileShow{
            margin-top: 20px;
            border: 1px solid #dcdfe6;
            background-color: #ffffff;
            width: 360px;
            display: flex;
            border-radius: 12px;
            padding: 10px 20px;
            position: relative;
            align-items: center;
            flex-direction: row;
            gap: 10px;
            .Pic{
                border-radius: 6px;
                width: 70px;
                height: 70px;
                object-fit: cover;
            }
            .imgName{
                width: 220px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .delPic{
                position: absolute;
                right: 10px;
                top: -5px;
                cursor: pointer;
            }
        }
    }
}
</style>
<style lang="scss">
.el-textareaC{
    textarea {
        min-height: 200px !important;
    }
}
</style>