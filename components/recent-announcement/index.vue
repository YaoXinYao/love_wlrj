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
                <el-form-item label="公告标题" prop="title">
                    <el-input placeholder="填写公告标题" v-model="refForm.title" />
                </el-form-item>
                <el-form-item label="公告类型" prop="type">
                    <el-select  placeholder="请选择公告类型" v-model="refForm.type" >
                        <el-option label="讲课通知" value="讲课通知" />
                        <el-option label="会议通知" value="会议通知" />
                        <el-option label="违纪通告" value="违纪通告" />
                        <el-option label="考核通告" value="考核通告" />
                        <el-option label="其他" value="其他" />
                    </el-select>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input 
                        type="textarea" 
                        v-model="refForm.content" 
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


const hide = ref(true)


interface IProps {
    title:string,
    type:string,
    content:string,
}

const refForm = reactive<IProps>({
    title:'',
    type:'',
    content:''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<IProps>>({
    title:[
        {
            required:true,
            message:'请填写标题',
            trigger:'blur'
        },
    ],
    type:[
        {
            required:true,
            message:'清选择类型',
            trigger:'blur'
        }
    ],
    content:[
        {
            required:true,
            message:'不能为空的',
            trigger:'blur'
        }
    ]
})


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
    ruleFormRef.value?.resetFields()
    ElNotification({
        title:'发送成功',
        message:`这是一条${refForm.type}的公告`,
        type:'success',
        zIndex: 10000,
    })
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