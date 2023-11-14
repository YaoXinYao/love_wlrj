<template>
    <ClientOnly>
      <el-table :data="checkList" border >
        <el-table-column prop="leaveReason" label="请假理由"  align="center" width="200" :cell-style="{'height':'80px','overflow':'auto'}" >
          <template #default="scope">
                  <span style="display: inline-block;height: max-content;white-space: wrap;line-height: 20px;width: 100%;">
                      {{ scope.row.leaveReason }}
                  </span>
          </template>
        </el-table-column>
        <el-table-column style=""  label="请假类型"  align="center" width="100px">
          <template #default="scope">
              <el-tag class="ml-2" v-if="scope.row.leaveType === 2">事假</el-tag>
              <el-tag class="ml-2" v-if="scope.row.leaveType === 1">病假</el-tag>
              <el-tag class="ml-2" v-if="scope.row.leaveType === 3">其他</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="leaveBeginTime" label="开始时间"  align="center">
          <template #default="scope">
              {{ scope.row.leaveBeginTime }} <br>
              至  <br> 
              {{ scope.row.leaveEndTime  }}
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="date2" label="结束时间" align="center" /> -->
        <el-table-column prop="city" label="批准人" align="center" width="100px">
          <template #default="scope">
            <span v-if="scope.row.leaveApprovalId">{{ scope.row.leaveApprovalId }}</span>
            <span v-else="scope.row.leaveApprovalId">暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaveStatus" label="审批" align="center" width="100px">
          <template #default="scope">
              <!-- {{ scope.row[5]}} -->
              <el-tag class="ml-2" v-if="scope.row.leaveStatus === 0" >审批中</el-tag>
              <el-tag class="ml-2" v-if="scope.row.leaveStatus === 1" >通过</el-tag>
              <el-tag class="ml-2" v-if="scope.row.leaveStatus === 2" >驳回</el-tag>
          </template>
        </el-table-column>

      </el-table>
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
    </ClientOnly>
</template>
  
<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import checkStore from '@/store/check'

const checklist = checkStore()
fetchUserListData({pageIndex:1,pageSize:5,idDesc:true})

const {checkList,allCount,allPage,pageIndex,pageSize,currentQuery}  = storeToRefs(checklist)
console.log(checkList)


function fetchUserListData(query:any){

  checklist.getCheckList(query);
}




const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  let current = currentQuery.value
  current.pageSize = val
  console.log(current)
  fetchUserListData(current)
}
const handleCurrentChange = (val: number) => {
  let current = currentQuery.value
  current.pageIndex = val
  console.log(current)
  fetchUserListData(current)
}



</script>
  
<style scoped lang="scss">
.el-pagination{
  margin-top: 20px;
  justify-content: flex-end;
}
</style>

<style>
.el-tooltip__popper{ max-width:200px}
</style>