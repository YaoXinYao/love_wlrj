<template>
    <ClientOnly>
        <div class="leaveling">
            <div class="leaveling-search">
                <el-form ref="formRef" :inline="true" :model="formInline" class="demo-form-inline">
                    <el-row :gutter="20">

                        <el-col :span="8">
                            <el-form-item label="请假类型"  >
                                <el-select placeholder="选择请假类型" clearable v-model="formInline.leaveType">
                                    <el-option label="病假" value="1"  />
                                    <el-option label="事假" value="2"  />
                                    <el-option label="其他" value="3"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名" >
                                <el-input v-model="formInline.user" placeholder="请输入姓名" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="审核状态" >
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
                            <el-form-item label="请假时间">
                                <el-date-picker
                                v-model="formInline.date"
                                type="date"
                                placeholder="Pick a date"
                                clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btns">
                    <el-button size="large" :icon="Refresh" @click="handleResetClick(formRef)"
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
import type {FormInstance} from 'element-plus'

interface formConfig {
    user:string,
    leaveStatus:string,
    leaveType:string,
    region:string,
    date:string,
}


const leaveContentRef = ref<InstanceType<typeof leaveContent>>()
const formRef = ref<FormInstance>()

const formInline = reactive<formConfig>({
    user: '',
    leaveStatus:'',
    leaveType:'',
    region: '',
    date: '',
})


function handleResetClick(formEl: FormInstance | undefined){
    if(!formEl) return 
    formEl.resetFields()
    console.log(formEl.resetFields())
}



// typeingor
function handleQueryClick(){
    leaveContentRef.value?.fetchUserListData(formInline)
}
</script>

<style>
.leaveling{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 90%;
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