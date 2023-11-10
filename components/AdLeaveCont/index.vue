<template>
    <div class="adLeaveContent">
        <el-table :border="true" :data="tableData">
            <el-table-column prop="application" label="申请人" align="center">

            </el-table-column>
            <el-table-column prop="content" label="请假理由" align="center">

            </el-table-column>
            <el-table-column prop="type" label="请假类型" align="center">
                
            </el-table-column>
            <el-table-column prop="timeStart" label="请假时间" align="center">
                
            </el-table-column>
            <el-table-column prop="approver" label="审批人" align="center">
                
            </el-table-column>
            <el-table-column prop="approvalStatus" label="审批状态" align="center">
                
            </el-table-column>
            <el-table-column label="审批" align="center" width="180px">
                <template #default="scope">
                    <template v-if="scope.row.approvalStatus === '审批通过'">
                        <el-button  type="primary" icon="Edit" size="small" text @click="handleEditBtnClick(scope.row)">
                        批准
                        </el-button>
                        <el-button  type="danger" icon="Delete" size="small" text @click="handleDeleteBtnClick(scope.row.id)">
                        驳回
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts" >

interface leave{
    id:string,
    application:string,
    content:string,
    type:string,
    timeStart:string,
    timeEnd:string,
    approvalStatus:string,
    approver:string
}

const tableData = ref<leave[]>([
    {
        id:'134132',
        application:"郑龙龙",
        content:"生病了",
        type:"病假",
        timeStart:"2023-11-10 08:00",
        timeEnd:"2024-11-10 08:00",
        approvalStatus:'审批通过',
        approver:"郑龙龙"
    }
])


function handleEditBtnClick(data:any){
    console.log(data)
}

function handleDeleteBtnClick(data:any){
    console.log(data)
}

</script>

<style scoped lang="scss">
.adLeaveContent{
    margin-top:20px;
    display:flex;
    flex:1;
    width:100%;
}
</style>