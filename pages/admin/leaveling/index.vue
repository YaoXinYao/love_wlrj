<template>
    <div class="leaveling">
        <div class="leaveling-search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名" >
                            <el-input v-model="formInline.user" placeholder="Approved by" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="请假类型" >
                            <el-input v-model="formInline.user" placeholder="Approved by" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审核状态" >
                            <el-input v-model="formInline.user" placeholder="Approved by" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="请假时间">
                            <el-select
                            v-model="formInline.region"
                            placeholder="Activity zone"
                            clearable
                            >
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Activity time">
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
                <el-button size="large" icon="Refresh" @click="handleResetClick"
                    >重置</el-button
                >
                <el-button
                    size="large"
                    type="primary"
                    icon="Search"
                    @click="handleQueryClick"
                    >查询</el-button
                >
            </div>
        </div>
        <leaveContent />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import leaveContent from '@/components/AdLeaveCont/index.vue'
  
  const formInline = reactive({
    user: '',
    region: '',
    date: '',
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }

  function handleResetClick(){

  }

  function handleQueryClick(){

  }
  </script>
  
  <style>
  .leaveling{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 80%;
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