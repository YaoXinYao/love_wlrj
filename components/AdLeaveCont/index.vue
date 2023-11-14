<template>
    <ClientOnly>
        <div class="adLeaveContent">
            <el-table :border="true" :data="checkList">
                <el-table-column prop="leaveUserId" label="申请人" align="center" width="120px">

                </el-table-column>
                <el-table-column prop="leaveReason" label="请假理由" align="center" >

                </el-table-column>
                <el-table-column prop="leaveStatus" label="请假类型" align="center" width="100px">
                    <template #default="scope">
                        <el-tag v-show="scope.row.leaveType == 1" class="ml-1" >病假</el-tag>
                        <el-tag v-show="scope.row.leaveType == 2" class="ml-1" type="warning">事假</el-tag>
                        <el-tag v-show="scope.row.leaveType == 3" class="ml-1" type="success">其他</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="leaveBeginTime" label="请假时间" align="center" >
                    <template #default="scope">
                        {{ scope.row.leaveBeginTime  }}<br>
                        至 <br>
                        {{ scope.row.leaveEndTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="leaveApprovalId" label="审批人" align="center" width="100px">
                    
                </el-table-column>
                <el-table-column prop="leaveType" label="审批状态" align="center" width="120px">
                    <template #default="scope">
                        <el-tag v-show="scope.row.leaveStatus == 1" class="ml-1" >审核通过</el-tag>
                        <el-tag v-show="scope.row.leaveStatus == 2" class="ml-1" type="danger">未通过</el-tag>
                        <el-tag v-show="scope.row.leaveStatus == 0" class="ml-1" type="success">审核中</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="审批" align="center" width="180px">
                    <template #default="scope">
                        <template v-if="scope.row.leaveStatus == 1">
                            <el-button  type="primary" :icon="CircleCheck" size="small" disabled  @click="handleEditBtnClick(scope.row)">
                                通过
                            </el-button>
                            <el-button  type="danger" :icon="CircleClose" size="small" disabled  @click="handleDeleteBtnClick(scope.row)">
                                驳回
                            </el-button>
                        </template>
                        <template v-if="scope.row.leaveStatus == 0">
                            <el-button  type="primary" :icon="CircleCheck" size="small"   @click="handleEditBtnClick(scope.row)">
                                通过
                            </el-button>
                            <el-button  type="danger" :icon="CircleClose" size="small"   @click="handleDeleteBtnClick(scope.row)">
                                驳回
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    v-model:current-page="pageIndex"
                    v-model:page-size="pageSize"
                    :page-sizes="[5, 10, 20, 50]"
                    :small="small"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="allCount"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts" >

import {storeToRefs} from 'pinia'
import checkStore from '@/store/check'
import {CircleCheck,CircleClose} from '@element-plus/icons-vue'
import { ref } from 'vue'
import {updateLeave} from '@/service/check/check'
import {ElMessageBox } from 'element-plus'


const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const checklist = checkStore()
fetchUserListData({pageIndex:1,pageSize:5,idDesc:true})
const {allPage,allCount,checkList,pageSize,pageIndex} = storeToRefs(checklist)
console.log(checkList.value)


const handleSizeChange = (val: number) => {
    let checkList = checklist.currentQuery
    checkList.pageSize = val;
    console.log(checkList)
  fetchUserListData({...checkList})
}
const handleCurrentChange = (val: number) => {
    let checkList = checklist.currentQuery
    checkList.pageIndex = val;
    console.log(checkList)
    fetchUserListData({...checkList})
}




function fetchUserListData(query:any){

checklist.getCheckList(query);
}



function handleEditBtnClick(data:any){
    console.log(data.leaveId)
    let query = {
        leaveApprovalId:1,
        leaveId : data.leaveId,
        leaveStatus: 1
    }
    ElMessageBox.confirm(
        '是否通过此请假',
        "审批请假",
        {
            confirmButtonText:'通过',
            cancelButtonText: '取消',
            type:'warning'
        }
    ).then(()=>{
        updateLeave(query).then(res=>{
            // console.log(res.data.value.message)
            if(res.data.value.code === 20000){
                ElMessage({
                    type: 'success',
                    message: '审核通过',
                })
                fetchUserListData(checklist.currentQuery)
            }
        })

    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '审核取消',
      })
    })
}

function handleDeleteBtnClick(data:any){
    console.log(data)
    let query = {
        leaveApprovalId:1,
        leaveId : data.leaveId,
        leaveStatus: 2
    }
    console.log(query)
    ElMessageBox.confirm(
        '是否通过此请假',
        "审批请假",
        {
            confirmButtonText:'通过',
            cancelButtonText: '取消',
            type:'warning'
        }
    ).then(()=>{
        updateLeave(query).then(res=>{
            // console.log(res.data.value.message)
            if(res.data.value.code === 20000){
                ElMessage({
                    type: 'success',
                    message: '审核通过',
                })
                fetchUserListData(checklist.currentQuery)
            }
        })

    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '审核取消',
      })
    })

}


defineExpose({fetchUserListData})

</script>

<style scoped lang="scss">
.adLeaveContent{
    margin-top:20px;
    display:flex;
    flex-direction: column;
    gap: 20px;
    flex:1;
    width:100%;
    .pagination{
        display: flex;
        align-items: center;
        justify-content: right;
    }
}
</style>