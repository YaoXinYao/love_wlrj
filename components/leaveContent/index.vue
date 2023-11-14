<template>
    <ClientOnly>
      <el-table :data="tableData" border >
        <el-table-column prop="name" label="请假理由"  align="center" width="200" :cell-style="{'height':'80px','overflow':'auto'}" >
          <template #default="scope">
                  <span style="display: inline-block;height: max-content;white-space: wrap;line-height: 20px;width: 100%;">
                      {{ scope.row.name }}
                  </span>
          </template>
        </el-table-column>
        <el-table-column style=""  prop="state" label="请假类型"  align="center">
          <template #default>
              <el-tag class="ml-2">事假</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="date1" label="开始时间"  align="center">
          <template #default>
              {{ tableData[0].date1 }} <br>
              至  <br> 
              {{ tableData[0].date2  }}
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="date2" label="结束时间" align="center" /> -->
        <el-table-column prop="city" label="批准人" align="center" />
        <el-table-column prop="address" label="是否批准" align="center" width="80">
          <template #default="scope">
              <!-- {{ scope.row[5]}} -->
              <el-tag class="ml-2"  :type=" scope.row.address === '是' ? 'success' : 'danger'">{{ scope.row.address }}</el-tag>
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
fetchUserListData({pageIndex:1,pageSize:10,isDesc:true})

const {checkList,allCount,allPage,pageIndex,pageSize,currentQuery}  = storeToRefs(checklist)
console.log(checkList)


function fetchUserListData(query:any){

  checklist.getCheckList(query);
}


const tableData = [
  {
    date1: '2016-05-03 12:12',
    date2: '2016-05-03 12:30',
    name: '今天比较忙，都是事情，想请假',
    state: '事假',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: '44444444444444444444444444444444444444444',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '否',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
  {
    date1: '2016-05-03',
    date2: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: '是',
  },
]


const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
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