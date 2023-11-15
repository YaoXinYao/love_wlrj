<template>
    <ClientOnly>
        <div class="leaveing">
            <div>
                <el-form 
                    ref="formRef" 
                    :rules="rules" 
                    :model="form"  
                    label-width="120px" 
                    label-position="left"
                    :hide-required-asterisk="hide"
                >
                    <el-form-item prop="name" label="请假理由" >
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item prop="type" label="请假类型">
                    <el-select v-model="form.type" placeholder="请假类型">
                        <el-option label="事假" value="事假" />
                        <el-option label="病假" value="病假" />
                        <el-option label="其他" value="其他" />
                    </el-select>
                    </el-form-item>
                    <el-form-item label="请假时间">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker
                                    v-model="form.date1"
                                    type="datetime"
                                    placeholder="开始时间"
                                    style="width: 100%"
                                    format="YYYY-MM-DD HH:mm"
                                    @visible-change="handleCurrent"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="1" class="text-center">
                            <span class="text-gray-500">-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-date-picker
                                    v-model="form.date2"
                                    type="datetime"
                                    placeholder="结束时间"
                                    style="width: 100%"
                                    format="YYYY-MM-DD HH:mm"
                                    @visible-change="handles"
                                />
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
                    <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <leaveContent></leaveContent>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import leaveContent from '@/components/leaveContent/index.vue'
import { ElMessage } from 'element-plus'
import type {FormInstance, FormRules} from 'element-plus'

const curTime = ref(new Date());
const hide = ref(true)


interface IProps {
    name: string,
    date1: any,
    date2: any,
    type: '事假' | '病假' | '其他'
}

const formRef = ref<FormInstance>()
// do not use same name with ref
const form = reactive<IProps>({
  name: '',
  date1: new Date(curTime.value.getFullYear(),curTime.value.getMonth(),curTime.value.getDate(),curTime.value.getHours(),curTime.value.getMinutes()),
  date2: '',
  type: '事假',
})



const rules = reactive<FormRules<IProps>>({
    name:[
        {required:true,message:'请填写你的理由',trigger:'blur'},
        {min:3,message:'理由太过简短',trigger:'blur'}
    ],
    date1:[
        {required:true,message:'请选择开始时间',trigger:'blur'}
    ],
    date2:[
        {required:true,message:'请选择结束事件时间',trigger:'blur'}
    ],
    type:[
        {required:true,message:'选择请假类型',trigger:'blur'}
    ]
})


function handleCurrent(flag:boolean){
    const currentTime = new Date(curTime.value.getFullYear(),curTime.value.getMonth(),curTime.value.getDate(),curTime.value.getHours(),curTime.value.getMinutes())

    if((form.date1 < currentTime) && !flag){
        ElMessage({
            type:'error',
            message:'从当前时间开始',
            customClass: 'elmessage'
        })  
    }
}

function handles(flag:boolean){
    if(!flag){
        let startTIme = new Date(form.date1)
        let endTIme = new Date(form.date2)
        if(startTIme > endTIme){
            console.log('错误')
            ElMessage({
                type:'warning',
                message:'重新填写时间',
                customClass: 'elmessage'
            })   
        }
    }
}


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const result = await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      return true
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
  if(result){
    ElNotification({
        title:'请假完成',
        message:`请假理由：${form.name}`,
        type:'success',
        zIndex: 10000,
    })
    curTime.value = new Date();
    formRef.value?.resetFields()

  }
}

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped lang="scss">
.leaveing{
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
    margin-top: 2%;
    background-color: white;
    padding: 14px;
    border: 1px solid #9ca6c2;
    border-radius: 12px;
    .text-center{
        display: flex;
        justify-content: center;
    }
}
</style>

<style lang="scss">
.elmessage{
    z-index: 100000 !important;
}
</style>