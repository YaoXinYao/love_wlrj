<template>
    <ClientOnly>
        <div class="leaveling">
            <div class="leaveling-search">
                <el-form ref="formRef" :inline="true" :model="formInline" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="请假类型"  prop="leaveType">
                                <el-select placeholder="请假类型" clearable v-model="formInline.leaveType">
                                    <el-option label="病假" value="1"  />
                                    <el-option label="事假" value="2"  />
                                    <el-option label="其他" value="3"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名" prop="username" >
                                <el-input v-model="formInline.username" placeholder="请输入姓名" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="审核状态" prop="leaveStatus">
                                <el-select
                                placeholder="审核状态"
                                clearable
                                v-model="formInline.leaveStatus"
                                >
                                <el-option label="未审批" value="0" />
                                <el-option label="审批通过" value="1" />
                                <el-option label="驳回" value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <!-- <el-col :span="8">
                            <el-form-item label="学号">
                                <el-input placeholder="请输入学号"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="请假时间" prop="queryDate">
                                <el-date-picker
                                v-model="formInline.queryDate"
                                type="date"
                                placeholder="Pick a date"
                                clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btns">
                    <el-button size="large" :icon="Refresh" @click="handleResetClick"
                        >重置</el-button
                    >
                    <el-button
                        size="large"
                        type="primary"
                        :icon="Search"
                        @click="handleQueryClick"
                        >查询</el-button
                    >
                </div>
            </div>
            <leaveContent ref="leaveContentRef" />
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import leaveContent from '@/components/AdLeaveCont/index.vue'
import {Refresh,Search} from '@element-plus/icons-vue'
import checkStore from '@/store/check'
import type {FormInstance} from 'element-plus'
import {storeToRefs} from 'pinia'

interface formConfig {
    username:string,
    leaveStatus:string,
    leaveType:string,
    region:string,
    queryDate:string,
}

definePageMeta({
    roles:2
})

const leaveContentRef = ref<InstanceType<typeof leaveContent>>()
const formRef = ref<FormInstance>()
const checklist = checkStore()
const {pageSize,pageIndex} = storeToRefs(checklist)

const formInline = reactive<formConfig>({
    username: '',
    leaveStatus:'',
    leaveType:'',
    region: '',
    queryDate: '',
})


function handleResetClick(){
    leaveContentRef.value?.fetchUserListData({pageSize:5,pageIndex:1,idDesc:true})
    formRef.value?.resetFields() 
}

enum formEn{
    UserName = 'username',
    leaveStatus = 'leaveStatus',
    leaveType = 'leaveType',
    region =  'region',
    queryDate = 'queryDate'
}

// typeingor
function handleQueryClick(){
    let form:any = {}
    // console.log(formInline)
    for(let item in formInline){
        if(formInline[item as formEn] !== ''){
            if(item === 'queryDate'){
                let data = new Date(formInline[item as formEn])
                form[item as formEn] = data.getFullYear() + '-' + (data.getMonth() + 1).toString().padStart(2, '0') +'-' + data.getDate().toString().padStart(2, '0');
            }else{
                form[item as formEn] = formInline[item as formEn]
            }
        }
    }
    // console.log(form)
    leaveContentRef.value?.fetchUserListData({...form,pageSize:pageSize.value,pageIndex:pageIndex.value,idDesc:true})
}
</script>

<style>
.leaveling{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 1494px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #9ca6c2;
    border-radius: 14px;
    .leaveling-search{
        width: 100%;
        .btns{
            text-align: right;
            margin-right: 100px;
        }
    }
}
.demo-form-inline .el-input {
--el-input-width: 220px;
}
</style>