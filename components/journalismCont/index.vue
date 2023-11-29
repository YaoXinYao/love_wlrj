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
                <el-form-item label="新闻标题" prop="newsTitle">
                    <el-input placeholder="填写新闻标题" v-model="refForm.newsTitle" />
                </el-form-item>
                <el-form-item label="上传图片" prop="newsImgs">
                    <el-col>
                        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
                        <el-button type="primary" @click="handleFile">Click to upload</el-button>
                    </el-col>
                    <el-col  v-show="refForm.newsImgs">
                        <div class="fileShow">
                            <img  :src="refForm.newsImgs !== '' ? srcValue : ''" alt="上传图片" class="Pic">
                            <div class="imgName">
                                {{ refForm.newsImgs.name }}
                            </div>
                            <div class="delPic" @click="handleDeletePic">
                                <el-icon :size="10">
                                    <CloseBold />
                                </el-icon>
                            </div>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item label="新闻内容" prop="newsContent">
                    <Markdown ref="markRef" :isClear="isClear" ></Markdown>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import {CloseBold} from '@element-plus/icons-vue'
import  Markdown  from '@/components/markdown/index.vue';
import {insertNew} from '@/service/journalism/journalism'


const hide = ref(true)
const isClear = ref(false)
const fileInput = ref()
const srcValue = ref('')
const markRef = ref<InstanceType<typeof Markdown>>()

const emit = defineEmits(['newValue'])



const enum formEn{
    newsTitle = "newsTitle",
    newsContent = "newsContent",
    newsImgs = "newsImgs",
}



interface IProps {
    newsTitle:string,
    newsContent:string,
    newsImgs:string
}

const refForm = reactive<IProps>({
    newsTitle:'',
    newsContent:'',
    newsImgs:'',
})



const ruleFormRef = ref<FormInstance>()

function validateTitle(rule:any,value:any,callback:any){
    if (value.length < 3 || value.length > 10) {
        callback(new Error('长度必须在3到10之间'));
    } else {
        // 检查开头和结尾是否有空格
        if (value.trim() !== value) {
          callback(new Error('开头和结尾不能有空格'));
        } else {
          // 验证通过
          callback();
        }
    }
}


const rules = reactive<FormRules<IProps>>({
    newsTitle:[{validator:validateTitle,trigger:'blur'}],
    newsContent:[
        {
            required:true,
            message:'不能为空的',
            trigger:'blur'
        }
    ],
    newsImgs:[
        {
            required:true,
            message:'请选择图片',
            trigger:'blur'
        }
    ]
})



const handleFile = ()=>{
    // fileInput.value.click()
    fileInput.value.value = null;
    fileInput.value.click()
    
}


const submitForm = async (formEl: FormInstance | undefined) => {
    let content = markRef.value.handleGetValue()
    // console.log(content)
    refForm.newsContent = content
    if (!formEl) return
    const result = await formEl.validate((valid, fields) => {
        if (valid) {
        // console.log('submit!')
        return true
        } else {
        // console.log('error submit!', fields)
        return false
        }
    })
    if(result){
        // console.log(refForm)
        // ruleFormRef.value?.resetFields()
        let form:any ={}
        let fileList = refForm.newsImgs
        for(let item in refForm){
            if(refForm[item as formEn] !== '' && item !== 'newsImgs'){
                form[item] = refForm[item as formEn]
            }
        }
        // console.log(form,fileList)        
        ElMessageBox.confirm(
            '确定发布新闻嘛？',
            '发布新闻',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(()=>{
            insertNew(form,fileList).then(res=>{
                // console.log('上传图片')
                // console.log(res.data)
                // console.log(res)
                let data = res.data.value
                if(data.code === 20000){
                    ElNotification({
                        title:'发送成功',
                        message:`这是一条${refForm.newsTitle}的新闻`,
                        type:'success',
                        zIndex: 10000,
                    })
                    emit('newValue',{pageNo:1,pageSize:9999})
                    isClear.value = true;
                    fileInput.value.value = null;
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
        // console.log(form)
        // console.log(fileList)
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





function handleFileChange(event:any){
    // console.log(event)
    const file = event.target.files[0]
    console.log(file)
    let nameArr = file.name.split('.')
    if(nameArr[nameArr.length-1] === 'png' || nameArr[nameArr.length-1] === 'jpg' || nameArr[nameArr.length-1] === 'webp' || nameArr[nameArr.length-1] === 'jpeg'){
        refForm.newsImgs = file
        const value = URL.createObjectURL(file)
        srcValue.value = value
        // console.log(value)
        // console.log(refForm.newsImgs)
    }else{
        ElNotification({
            title:'上传失败',
            message:`格式不正确`,
            type:'warning',
            zIndex: 10000,
        })
    }
}

function handleDeletePic(){
    fileInput.value.value = null;
    refForm.newsImgs = ''
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