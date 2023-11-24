<template>
    <div class="attendHeader">
        <el-table
            :data="timer"
            border
            style="width: 100%;"
            v-loading="loading"
            @cell-click="handleCell"
        >
            <el-table-column prop="grade" label="年级" width="100" align="center" >

            </el-table-column>
            <el-table-column prop="morningStart" label="上午开始时间" align="center" >
              <template #default="scope">
                <el-tag :type="scope.row.morningStart ? 'success': 'warning'" >{{  scope.row.morningStart ?  scope.row.morningStart : '暂无时间' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="morningEnd" label="上午结束时间" align="center"  >
              <template #default="scope">
                <el-tag :type="scope.row.morningEnd ? '': 'warning'" >{{  scope.row.morningEnd ?  scope.row.morningEnd : '暂无时间' }}</el-tag>
              </template>
            </el-table-column>       
            <el-table-column prop="afternoonStart" label="下午开始时间" align="center"  >
              <template #default="scope">
                <el-tag :type="scope.row.afternoonStart ? 'success': 'warning'" >{{  scope.row.afternoonStart ?  scope.row.afternoonStart : '暂无时间' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="afternoonEnd" label="下午结束时间" align="center"  >
              <template #default="scope">
                <el-tag :type="scope.row.afternoonEnd ? '': 'warning'" >{{  scope.row.afternoonEnd ?  scope.row.afternoonEnd : '暂无时间' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="nightStart" label="晚上开始时间" align="center"  >
              <template #default="scope">
                <el-tag :type="scope.row.nightStart ? 'success': 'warning'" >{{  scope.row.nightStart ?  scope.row.nightStart : '暂无时间' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="nightEnd" label="晚上结束时间" align="center"  >
              <template #default="scope">
                <el-tag :type="scope.row.nightEnd ? '': 'warning'" >{{  scope.row.nightEnd ?  scope.row.nightEnd : '暂无时间' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column  label="操作" align="center" width="180px" >
              <template #default="scope">
                <el-button type="danger" @click="handleClearAll(scope.row)" size="small" round>清空</el-button>
              </template>
            </el-table-column>                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        </el-table>
        <el-dialog 
          id="dialog" 
          style="border-radius: 12px;" 
          v-model="dialog" 
          align-center 
          width="35%"
        >
          <el-form 
            label-width="120px" 
            label-position="left" 
            :model="form" 
            ref="ruleFormRef"
            :hide-required-asterisk="true"
          >
            <el-form-item label="年级" prop="grade" >
              <el-input type="primary" disabled  v-model="form.grade" style="width: 50%;" />
            </el-form-item>
            <el-form-item 
              :label="form.label" 
              prop="labelValue" 
              label-width="120px"   
              :rules="[
                {
                  required:true,
                  message:'请选择时间',
                  trigger:'blur',
                }
              ]"
            >
              <el-time-picker  
                placeholder="选择开始时间" 
                v-model="form.labelValue" 
                format="HH:mm:ss"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialogFooter">
              <el-button type="primary" @click="handleClose">
                取消
              </el-button>
              <el-button type="success" @click="handleSubmit" >
                确定
              </el-button>
            </div>
          </template>
        </el-dialog>

        <el-dialog
          v-model="dialogVisible"
          width="30%"
        >
          <el-form
          
            label-position="left"
          >
            <el-form-item label="年级">
              <el-input disabled v-model="deleteForm.grade" style="width:60%" />
            </el-form-item>
            <el-form-item label="清除的时间">
              <el-select >
                <el-option v-for="(item,index) in deleteForm.time" :key="index" :label="item.label" :value="item.value"     />
              </el-select>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import AttendanceStore from '@/store/attendance'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import type {FormInstance} from 'element-plus'
import {saveSchedule} from '@/service/attendance/attendance'
import {ElMessageBox, ElNotification  } from 'element-plus'


const attendanceStore = AttendanceStore()

attendanceStore.getAllSchedule()

const {timer,loading}  = storeToRefs(attendanceStore)

const dialog = ref(false)
const dialogVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

watch(dialog,(newValue)=>{
  console.log(newValue)
  if(!newValue){
    ruleFormRef.value?.resetFields()
  }
})


interface formType {
  grade:string,
  labelType:string,
  labelValue:any,
  label:string,
}


enum formDefault {
  grade = 'grade',
  morningStart = 'morningStart',
  morningEnd = 'morningEnd',
  afternoonStart = 'afternoonStart',
  afternoonEnd = 'afternoonEnd',
  nightStart = 'nightStart',
  nightEnd = 'nightEnd',
}



const form = reactive<formType>({
  grade:'',
  labelType:'',
  labelValue:'',
  label:''
})

const deleteForm = reactive({
  grade:'',
  time:[
    {
      value:'10',
      label:'上午开始时间'
    },
    {
      value:'11',
      label:'上午结束时间'
    },
    {
      value:'1',
      label:'上午开始时间'
    },
  ]
})





function handleClose(){
  // dialogRef.value.close()
  dialog.value = false
}

function handleClearAll(data:any){
  console.log(data)
  dialogVisible.value = true
  // ElMessageBox.confirm(
  //   '你确定要清空时间嘛?',
  //   '清空时间',
  //   {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }
  // ).then(() => {
  //   ElNotification({
  //       title: 'success',
  //       type: 'success',
  //       message: '清空成功',
  //     })
  //   })
  //   .catch(() => {
  //     ElNotification({
  //       title: 'warning',
  //       type: 'warning',
  //       message: '清空取消',
  //     })
  //   })
}

function handleSubmit(){
  console.log('确定')
  let query = {
    gradeLevel : '',
    order:'',
    status: '',
    time: '',
  }

  ruleFormRef.value?.validate((valid:any) => {
    if (valid) {
      console.log('submit!')
      query.gradeLevel = form.grade
      if(form.labelType === 'morningStart'){
        query.order = "1"
        query.status = "0"
      }else if(form.labelType === 'morningEnd'){
        query.order = "1"
        query.status = "1"
      }else if(form.labelType === 'afternoonStart'){
        query.order = "2"
        query.status = "0"
      }else if(form.labelType === 'afternoonEnd'){
        query.order = "2"
        query.status = "1"
      }else if(form.labelType === 'nightStart'){
        query.order = "3"
        query.status = "0"
      }else if(form.labelType === 'morningnightEndStart'){
        query.order = "3"
        query.status = "1"
      }

      let time = form.labelValue.getHours().toString().padStart(2, '0') + ':' + form.labelValue.getMinutes().toString().padStart(2, '0') + ':' + form.labelValue.getSeconds().toString().padStart(2, '0')
      query.time = time
      console.log(query)
      saveSchedule(query).then(res=>{
        console.log(res.data.value)
        if(res.data.value.code === 20000){
          dialog.value = false;
          attendanceStore.getAllSchedule()
        }
      })
      
    } else {
      console.log('error submit!')
      return false
    }
  })
  // dialog.value = fal

  
  


}

function handleCell(row:any,column:any,cell:any,event:any){
  console.log(row,column,cell,event)
  if(column.label !== '操作' && column.label !== '年级'){
    let label = column.property
    console.log(label)
    form.grade = row.grade
    form.labelType = label
    form.label = column.label
    
    let value = row[label]

    console.log(value)
    if(value == ''){
      form.labelValue = value
    }else{
      let time  = new Date()
      let arr = value.split(':')
      time.setHours(arr[0])
      time.setMinutes(arr[1])
      time.setSeconds(arr[2])
      form.labelValue = time
    }
    dialog.value = true
  }

  
}



</script>

<style scoped>
.attendHeader{
  #dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid rgba(227,232,247);
    width: 200px;
    height: 200px;
    border-radius: 12px;
    padding: 10px 20px;
    display: flex;
    flex: 1;
    gap: 12px;
    flex-direction: column;
  }
}
</style>
