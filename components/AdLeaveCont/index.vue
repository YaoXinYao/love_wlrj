<template>
    <ClientOnly>
        <div class="adLeaveContent">
            <el-table :border="true" :data="checkList" v-loading="loading">
                <el-table-column prop="user.userName" label="申请人" align="center" width="120px">

                </el-table-column>
                <el-table-column prop="leave.leaveReason" label="请假理由" align="center" >

                </el-table-column>
                <el-table-column prop="leave.leaveType" label="请假类型" align="center" width="100px">
                    <template #default="scope">
                        <el-tag  
                            class="ml-1" 
                            :type="scope.row.leave.leaveType == 1 ? '': (scope.row.leave.leaveType == 2 ? 'warning' : 'success')" 
                        >
                           {{ scope.row.leave.leaveType == 1 ? '病假':
                              (scope.row.leave.leaveType == 2 ? '事假' : '其他')
                           }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="leaveBeginTime" label="请假时间" align="center" >
                    <template #default="scope">
                        {{ scope.row.leave.leaveBeginTime  }}<br>
                        至 <br>
                        {{ scope.row.leave.leaveEndTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="approvalUser.userName" label="审批人" align="center" width="100px">
                    <template #default="scope">
                        {{ scope.row.leave.leaveApprovalId == null ? '暂无' : scope.row.approvalUser.userName }}
                    </template>
                </el-table-column>
                <el-table-column prop="leave.leaveStatus" label="审批状态" align="center" width="120px">
                    <template #default="scope">
                        <el-tag  
                            class="ml-1" 
                            :type="scope.row.leave.leaveStatus == 1 ? '': (scope.row.leave.leaveStatus == 2 ? 'warning' : 'success')" 
                        >
                           {{ scope.row.leave.leaveStatus == 1 ? '审核通过':
                              (scope.row.leave.leaveStatus == 2 ? '未通过' : '审核中')
                           }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="审批" align="center" width="180px">
                    <template #default="scope">
                            <el-button  
                                type="primary" 
                                :icon="CircleCheck" 
                                size="small" 
                                :disabled="scope.row.leave.leaveStatus == 1 || scope.row.leave.leaveUserId === userinfo.userId || scope.row.leave.leaveStatus == 2 ? true : false"  
                                @click="handleEditBtnClick(scope.row)"
                            >
                                通过
                            </el-button>
                            <el-button  
                                type="danger" 
                                :icon="CircleClose" 
                                size="small" 
                                :disabled="scope.row.leave.leaveStatus == 1 || scope.row.leave.leaveUserId === userinfo.userId || scope.row.leave.leaveStatus == 2 ? true : false"  
                                @click="handleDeleteBtnClick(scope.row)"
                            >
                                驳回
                            </el-button>
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
import {useHomestore} from '@/store/home'
import {CircleCheck,CircleClose} from '@element-plus/icons-vue'
import { ref } from 'vue'
import {updateLeave} from '@/service/check/check'
import {ElMessageBox } from 'element-plus'




const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const checklist = checkStore()
const user = useHomestore()

const {userinfo}  = storeToRefs(user)
console.log(userinfo.value.userId)
fetchUserListData({pageIndex:1,pageSize:5,idDesc:true})
const {allPage,allCount,checkList,pageSize,pageIndex,loading} = storeToRefs(checklist)
console.log(userinfo.value.userId)

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
    console.log(data.leave)
    let query = {
        leaveApprovalId:userinfo.value.userId,
        leaveId : data.leave.leaveId,
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
            console.log(res.data.value)
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
        leaveApprovalId:userinfo.value.userId,
        leaveId : data.leave.leaveId,
        leaveStatus: 2
    }
    console.log(query)
    ElMessageBox.confirm(
        '是否驳回此请假',
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
                    message: '驳回成功',
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