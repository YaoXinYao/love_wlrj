
<template>
    <div class="check">
        <el-table 
            border
            :data="signList"
            v-loading="loading"
        >
            <el-table-column label="姓名" align="center" prop="unsignUsername" >
                <template #default="scope">
                    {{ scope.row.unsignUsername ? scope.row.unsignUsername : '数据错误' }}
                </template>
            </el-table-column>
            <el-table-column label="学号" align="center" prop="unsignStudentId">
                <template #default="scope">
                    {{ scope.row.unsignStudentId ? scope.row.unsignStudentId : '数据错误' }}
                </template>
            </el-table-column>
            <el-table-column label="日期" align="center" prop="unsignDate">
                <template #default="scope">
                    {{ scope.row.unsignDate ? scope.row.unsignDate : '数据错误' }}
                </template>
            </el-table-column>
            <el-table-column label="签到时间" align="center" prop="unsignTime">
                <template #default="scope">
                    {{ scope.row.unsignTime ? scope.row.unsignTime : 
                        scope.row.unsignPeriod ? 
                        scope.row.unsignPeriod == 1 ? '上午未打卡' 
                        : scope.row.unsignPeriod == 2 ? '下午未打卡'
                        : '晚上未打卡'
                        : '数据错误'
                    }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" @click="handleChange(scope.row)">修改</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                v-model:current-page="pageIndex"
                v-model:page-size="size"
                :page-sizes="[5, 10, 15, 25]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import signStore from '@/store/checking'
import {storeToRefs} from 'pinia'
import { ElMessageBox, ElNotification } from 'element-plus'
import {deleteUnSign} from '@/service/sign/sign'

const signstore = signStore()

getUnSign({pageIndex:1,size:5})

const {loading,signList,allCount,allPage,pageIndex,size,currentQuery} = storeToRefs(signstore)

const emit = defineEmits(['changeClick'])


function getUnSign(query:any){
    signstore.getSign(query)
}

function handleSizeChange(val:number){
    // console.log(val)
    let current = currentQuery.value
    current.size = val
    getUnSign({...current})
}

function handleCurrentChange(val:number){
    // console.log(val)
    // console.log(size.value)
    let current = currentQuery.value
    current.pageIndex = val
    getUnSign({...current})
}

function handleDelete(data:any){
    // console.log(data)
    ElMessageBox.confirm(
        '确定删除嘛？',
        'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        deleteUnSign({unsignId:data.unsignId}).then(res=>{
            // console.log(res.data.value)
            if(res.data.value.code === 20000){
                ElNotification({
                    title:'成功',
                    message:'删除成功',
                    type:'success'
                })
                let current = currentQuery.value
                getUnSign({...current})
            }
        })
    })
    .catch(() => {

    })
}

function handleChange(data:any){
    // console.log(data)
    emit('changeClick',data)
}




defineExpose({getUnSign})


</script>

<style scoped lang="scss">
.check{


    .pagination{
        margin-top: 20px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    }
}
</style>