<template>
    <div class="adLeaveContent">
        <el-table :border="true" :data="checkList">
            <el-table-column prop="leaveUserId" label="申请人" align="center">

            </el-table-column>
            <el-table-column prop="leaveReason" label="请假理由" align="center">

            </el-table-column>
            <el-table-column prop="leaveStatus" label="请假类型" align="center">
                <template #default="scope">
                    {{ scope.row.leaveType == 1 ? '病假' : scope.row.leaveType === 2 ? "事假" : "其他" }}
                </template>
            </el-table-column>
            <el-table-column prop="leaveBeginTime" label="请假时间" align="center">
                
            </el-table-column>
            <el-table-column prop="leaveApprovalId" label="审批人" align="center">
                
            </el-table-column>
            <el-table-column prop="leaveType" label="审批状态" align="center">
                <template #default="scope">
                    <el-tag v-show="scope.row.leaveStatus == 1" class="ml-1" type="info">审核通过</el-tag>
                    <el-tag v-show="scope.row.leaveStatus == 2" class="ml-1" type="danger">未通过</el-tag>
                    <el-tag v-show="scope.row.leaveStatus == 0" class="ml-1" type="success">审核中</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="审批" align="center" width="180px">
                <template #default="scope">
                    <template v-if="scope.row.leaveStatus === 0">
                        <el-button  type="primary" :icon="CircleCheck" size="small" text @click="handleEditBtnClick(scope.row)">
                            通过
                        </el-button>
                        <el-button  type="danger" :icon="CircleClose" size="small" text @click="handleDeleteBtnClick(scope.row.leaveId)">
                        驳回
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                v-model:current-page="currentPage4"
                v-model:page-size="pageSize4"
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
</template>

<script setup lang="ts" >

import {storeToRefs} from 'pinia'
import checkStore from '@/store/check'
import {CircleCheck,Edit,Delete,CircleClose} from '@element-plus/icons-vue'
import { ref } from 'vue'


const currentPage4 = ref(1)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const checklist = checkStore()
fetchUserListData({pageIndex:1,pageSize:5})
const {allPage,allCount,checkList} = storeToRefs(checklist)
console.log(checkList.value)


function fetchUserListData(query:any){

checklist.getCheckList(query);
}



function handleEditBtnClick(data:any){
    console.log(data)
}

function handleDeleteBtnClick(data:any){
    console.log(data)
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