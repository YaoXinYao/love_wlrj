<template>
  <ClientOnly>
    <ReturnPersonalPage />
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
          <el-form-item prop="leaveReason" label="请假理由">
            <el-input v-model="form.leaveReason" />
          </el-form-item>
          <el-form-item prop="leaveType" label="请假类型">
            <el-select v-model="form.leaveType" placeholder="请假类型">
              <el-option label="事假" value="2" />
              <el-option label="病假" value="1" />
              <el-option label="其他" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="请假时间">
            <el-col :span="11">
              <el-form-item prop="leaveBeginTime">
                <el-date-picker
                  v-model="form.leaveBeginTime"
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
              <el-form-item prop="leaveEndTime">
                <el-date-picker
                  v-model="form.leaveEndTime"
                  type="datetime"
                  placeholder="结束时间"
                  style="width: 100%"
                  format="YYYY-MM-DD HH:mm"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  @visible-change="handles"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)"
              >确定</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <leaveContent ref="contentRef"></leaveContent>
      </div>
    </div>
  </ClientOnly>
    <!-- <ClientOnly>
        <div class="leaveing">
            <div>
                <el-form 
                    ref="formRef" 
                    :rules="rules" 
                    :model="form"  
                    label-width="80px" 
                    label-position="left"
                    :hide-required-asterisk="hide"
                >
                    <el-form-item prop="leaveReason" label="请假理由" >
                        <el-input v-model="form.leaveReason" />
                    </el-form-item>
                    <el-form-item prop="leaveType" label="请假类型">
                    <el-select v-model="form.leaveType" placeholder="请假类型">
                        <el-option label="事假" value="2" />
                        <el-option label="病假" value="1" />
                        <el-option label="其他" value="3" />
                    </el-select>
                    </el-form-item>
                    <el-form-item label="请假时间">
                        <el-col :span="11">
                            <el-form-item prop="leaveBeginTime">
                                <el-date-picker
                                    v-model="form.leaveBeginTime"
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
                            <el-form-item prop="leaveEndTime">
                                <el-date-picker
                                    v-model="form.leaveEndTime"
                                    type="datetime"
                                    placeholder="结束时间"
                                    style="width: 100%"
                                    format="YYYY-MM-DD HH:mm"
                                    value-format="YYYY-MM-DD HH:mm:ss"
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
                <leaveContent ref="contentRef"></leaveContent>
            </div>
        </div>
    </ClientOnly> -->
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import leaveContent from "@/components/leaveContent/index.vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { createLeave } from "@/service/check/check";
import { dateFormat, dateFormatReverse } from "@/utils/formats";
import { storeToRefs } from "pinia";
import { useHomestore } from "@/store/home";
import checkStore from "@/store/check";

const curTime = ref(new Date());
const hide = ref(true);
const user = useHomestore();
const checklist = checkStore();
const { userinfo } = storeToRefs(user);
const { currentQuery } = storeToRefs(checklist);
const contentRef = ref<InstanceType<typeof leaveContent>>();
const timeRef = ref(true)
console.log(userinfo.value.userId);

interface IProps {
  leaveUserId: number;
  leaveReason: string;
  leaveBeginTime: any;
  leaveEndTime: any;
  leaveType: string;
  leaveStatus: number;
}

const formRef = ref<FormInstance>();
// do not use same name with ref
const form = reactive<IProps>({
  leaveUserId: userinfo.value.userId,
  leaveReason: "",
  leaveBeginTime: dateFormatReverse(curTime.value),
  leaveEndTime: "",
  leaveType: "",
  leaveStatus: 0,
});

const rules = reactive<FormRules<IProps>>({
  leaveReason: [
    { required: true, message: "请填写你的理由", trigger: "blur" },
    { min: 3, message: "理由太过简短", trigger: "blur" },
  ],
  leaveBeginTime: [
    { required: true, message: "请选择开始时间", trigger: "blur" },
  ],
  leaveEndTime: [
    { required: true, message: "请选择结束时间", trigger: "blur" },
  ],
  leaveType: [{ required: true, message: "选择请假类型", trigger: "blur" }],
});

function handleCurrent(flag: boolean) {
  const currentTime = dateFormatReverse(curTime.value);

  if (form.leaveBeginTime < currentTime && !flag) {
    ElMessage({
      type: "error",
      message: "从当前时间开始",
      customClass: "elmessage",
    });
    return;
  }
}

function handles(flag: boolean) {
  if (!flag) {
    let startTIme = new Date(form.leaveBeginTime);
    let endTIme = new Date(form.leaveEndTime);
    if (startTIme > endTIme) {
      console.log("错误");
      timeRef.value = false
      ElMessage({
        type: "warning",
        message: "重新填写时间",
        customClass: "elmessage",
      });
    }
  }else{
    timeRef.value = true
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const result = await formEl.validate((valid, fields) => {
    if (valid) {
      return true;
    } else {
      console.log("error submit!", fields);
      return false;
    }
  });
  if (result) {
    if(timeRef.value){
      let forms = form;
      let beginTime = new Date(forms.leaveBeginTime);
      for (let item in forms) {
        if (item === "leaveBeginTime") {
          forms[item] = dateFormat(beginTime);
        }
      }
      // console.log(forms)
      // console.log(currentQuery)
      createLeave(forms).then((res) => {
        let code = res.data.value.code;
        console.log(code);
        if (code === 20000) {
          ElNotification({
            title: "请假完成",
            message: `请假理由：${form.leaveReason}`,
            type: "success",
            zIndex: 10000,
          });
          contentRef.value?.fetchUserListData(currentQuery);
          formRef.value?.resetFields()
        }
      });
    }else{
      ElMessage({
        type: "warning",
        message: "时间错误",
        customClass: "elmessage",
      });
    }

    // curTime.value = new Date();
    
  }
};

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style scoped lang="scss">
.leaveing {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 14px;
  border-radius: 12px;
  .text-center {
    display: flex;
    justify-content: center;
  }
}


</style>

<style lang="scss">
.elmessage {
  z-index: 100000 !important;
}
</style>
