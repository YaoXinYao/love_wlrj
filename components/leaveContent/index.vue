<template>
    <ClientOnly>
      <el-table :data="checkList" border  >
        <el-table-column prop="leave.leaveReason" label="请假理由"  align="center" width="200" :cell-style="{'height':'80px','overflow':'auto'}" >
          <template #default="scope">
                  <span style="display: inline-block;height: max-content;white-space: wrap;line-height: 20px;width: 100%;">
                      {{ scope.row.leave.leaveReason }}
                  </span>
          </template>
        </el-table-column>
        <el-table-column style=""  label="请假类型"  align="center" width="100px">
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
        <el-table-column  prop="leaveBeginTime" label="开始时间"  align="center">
          <template #default="scope">
              {{ scope.row.leave.leaveBeginTime }}
              至  
              {{ scope.row.leave.leaveEndTime  }}
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="date2" label="结束时间" align="center" /> -->
        <el-table-column  label="批准人" align="center" width="100px">
          <template #default="scope">
            {{ scope.row.leave.leaveApprovalId == null ? '暂无' : scope.row.approvalUser.userName }}
          </template>
        </el-table-column>
        <el-table-column prop="leaveStatus" label="审批" align="center" width="100px">
          <template #default="scope">
              <!-- {{ scope.row[5]}} -->
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
import {useHomestore} from '@/store/home'

const checklist = checkStore()
const user = useHomestore()

const {userinfo}  = storeToRefs(user)
console.log(userinfo.value.userId)
fetchUserListData({userId:userinfo.value.userId,pageIndex:1,pageSize:5,idDesc:true})

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


defineExpose({fetchUserListData})


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