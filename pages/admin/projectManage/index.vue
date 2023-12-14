<template>
  <div class="projectManage">
    <div class="porjectControl">
      <el-button type="primary" @click="openNew">添加新的项目</el-button>
    </div>
    <div class="projectDis">
      <div class="sliderbox">
        <swiper
          :slides-per-view="3"
          :navigation="true"
          :modules="[Navigation]"
          :space-between="50"
          :autoplay="true"
          :loop="true"
          id="swipertran"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, index) in MyProjectDis"
            :key="item.projectId"
          >
            <div class="img">
              <img :src="item.projectImage" alt="" />
            </div>
            <div class="swipertext">
              <div class="title">{{ item.projectName }}</div>
              <div class="desc">
                {{ item.projectIntroduce }}
              </div>
            </div>
            <div class="deleteProject">
              <el-button
                :key="item.projectId"
                @click="() => deleteProjectFun(item.projectId as number)"
                type="danger"
                >删除</el-button
              >
            </div>
            <div class="editProejct">
              <el-button
                :key="item.projectId"
                @click="() => openEdit(item)"
                type="primary"
                >编辑</el-button
              >
            </div>
          </swiper-slide>
          ...
        </swiper>
        <!--  <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="添加的新项目"
      width="50%"
      :before-close="handleClose"
    >
      <div
        class="uploadFlag"
        :style="{ backgroundImage: `url(${imgUrl || '/images/上传图片.png'})` }"
      >
        <input
          class="fileinput"
          @change="changeImg"
          type="file"
          accept="image/*"
        />
      </div>
      <el-form
        ref="ruleFormRef"
        v-loading.fullscreen.lock="loading"
        element-loading-background="rgb(20,20,20,0.5)"
        element-loading-text="正在处理中......"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="项目名称" prop="projectName">
          <slot> </slot>
          <el-input default="" v-model="form.projectName" />
        </el-form-item>
        <el-form-item label="团队名称" prop="projectTeams">
          <slot> </slot>
          <el-input default="" v-model="form.projectTeams" />
        </el-form-item>
        <el-form-item label="开发时间 " prop="projectTime">
          <slot> </slot>
          <el-date-picker
            v-model="form.projectTime"
            type="daterange"
            default=""
            unlink-panels
            range-separator="To"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="default"
          />
        </el-form-item>
        <el-form-item label="项目简介" prop="projectIntroduce">
          <slot> </slot>
          <el-input
            default=""
            v-model="form.projectIntroduce"
            type="textarea"
          />
        </el-form-item>
        <el-form-item default="" label="项目地址" prop="projectUrl">
          <el-input v-model="form.projectUrl" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addProject"
            >{{ editFlag ? "修改" : "添加" }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import "swiper/css";
import type { FormInstance, FormRules } from "element-plus";
import {
  ProjectAdd,
  deleteProject,
  updataCover,
  updateProject,
} from "~/service/disk";
import type { ProjectDesc } from "~/types/Home";
import { useDiskstore } from "~/store/disk";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { storeToRefs } from "pinia";
import type { ProjectDesType } from "~/types/disk";
useHead({
  title: "项目展示管理",
});
const form = reactive<ProjectDesc>({
  projectName: "",
  projectTime: [new Date(), new Date()],
  projectIntroduce: "",
  projectUrl: "",
  projectTeams: "",
});
const diskStore = useDiskstore();
const { MyProjectDis } = storeToRefs(diskStore);
await diskStore.GetDisProject();
const curProID = ref(0);
const loading = ref(false);
const editFlag = ref(false);
const ruleFormRef = ref<FormInstance>(); //表单数据
const dialogVisible = ref(false);
const imgUrl = ref("");
const file = ref<File>();

const validatePassURL = (rule: any, value: string, callback: any) => {
  const reg = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确的网址(https || https 开头)"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof form>>({
  projectName: [
    { validator: generateRules("项目名称不能为空", 0), trigger: "blur" },
  ],
  projectIntroduce: [
    { validator: generateRules("项目介绍不能为空", 0), trigger: "blur" },
  ],
  projectUrl: [{ validator: validatePassURL, trigger: "blur" }],
  projectTime: [{ validator: generateRules("请选择时间", 1), trigger: "blur" }],
  projectTeams: [
    { validator: generateRules("团队名称不能为空", 0), trigger: "blur" },
  ],
});
const handleClose = (done: () => void) => {
  done();
};
const addProject = () => {
  const timeStart = (form.projectTime[0] as Date)?.getTime();
  const timeEnd = (form.projectTime[1] as Date)?.getTime();
  ruleFormRef.value?.validate(async (vaild) => {
    if (vaild && imgUrl.value) {
      loading.value = true;
      //发送请求
      const info = {
        projectName: form.projectName,
        projectStartTime: dayjs(timeStart).format("YYYY-MM-DD"),
        projectIntroduce: form.projectIntroduce,
        projectCompletionTime: dayjs(timeEnd).format("YYYY-MM-DD"),
        file: file.value,
        projectUrl: form.projectUrl,
        projectTeams: form.projectTeams,
      };
      if (editFlag.value) {
        //编辑模式,
        const editinfo = { ...info, projectId: curProID.value };
        delete editinfo.file;
        const res = await updateProject(editinfo);
        if (res.data.value.code == 20000) {
          ElMessage({ message: "修改成功", type: "success" });
          diskStore.updataProjectinfo(editinfo);
        } else {
          ElMessage({ message: "修改失败", type: "error" });
        }
      } else {
        const res = await ProjectAdd(info);
        if (res.data.value.code == 20000) {
          ruleFormRef.value?.resetFields();
          await diskStore.GetDisProject();
          // bindingSlide();
          imgUrl.value = "";
          ElMessage({ message: "添加成功", type: "success" });
        } else {
          ElMessage({ message: "添加失败", type: "error" });
        }
      }
      loading.value = false;
      dialogVisible.value = false;
    } else {
      ElMessage({ message: "信息不完善", type: "warning" });
    }
  });
};
const changeImg = async (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files) {
    const fileraw = inputElement.files[0];
    if (fileraw.size >= 1024 * 1024 * 5) {
      return ElMessage({ message: "图片不能大于5Mb", type: "warning" });
    }
    //限制选择文件类型
    if (!ExamImage(fileraw)) {
      return ElMessage({ message: "请选择图片格式的文件", type: "warning" });
    }
    const fileBase64 = URL.createObjectURL(fileraw);
    if (editFlag.value) {
      loading.value = true;
      const res = await updataCover(fileraw, curProID.value);
      console.log(res.data.value);
      if (res.data.value.code == 20000) {
        ElMessage({ message: "更新成功", type: "success" });
        await diskStore.updataCoverstore(curProID.value, fileBase64);
      } else {
        ElMessage({ message: "更新失败", type: "error" });
      }
      loading.value = false;
    }
    file.value = fileraw;
    imgUrl.value = fileBase64;
  }
};
const deleteProjectFun = async (id: number) => {
  ElMessageBox.confirm("确定要删除吗").then(async () => {
    const res = await deleteProject(id);
    if (res.data.value.code === 20000) {
      ElMessage({ message: "删除成功", type: "success" });
      diskStore.deleteProjectID(id);
    } else {
      ElMessage({ message: "删除失败", type: "error" });
    }
  });
};
//编辑状态,弹窗
const openEdit = (item: ProjectDesType) => {
  editFlag.value = true;
  dialogVisible.value = true;
  const startTime = new Date(item.projectStartTime as string);
  const endTime = new Date(item.projectCompletionTime as string);
  form.projectTime[0] = startTime;
  form.projectTime[1] = endTime;
  form.projectIntroduce = item.projectIntroduce;
  form.projectName = item.projectName;
  form.projectTeams = item.projectTeams;
  imgUrl.value = item.projectImage || "";
  form.projectUrl = item.projectUrl;
  curProID.value = item.projectId as number;
};
const openNew = () => {
  imgUrl.value = "";
  //恢复初始值
  const keys = Object.keys(form);
  for (let key of keys) {
    if (key == "projectTime") form[key] = [new Date(), new Date()];
    else {
      //@ts-ignore
      form[key] = "";
    }
  }
  dialogVisible.value = true;
  editFlag.value = false;
};
</script>

<style scoped lang="scss">
.projectManage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .porjectControl {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.3rem;
    height: 1.5rem;
    width: 100%;
  }
  .projectDis {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    .sliderbox {
      position: relative;
      width: 11.6rem;
      height: 60vh;
      .swiper-button-prev:after {
        display: none;
      }
      .swiper-button-next:after {
        display: none;
      }
      .swiperbtcommont {
        background-color: white;
        border-radius: 50%;
        box-shadow: 5px 5px 0.16rem 0 rgba(0, 0, 0, 0.16);
        width: 0.35rem;
        height: 0.35rem;
        bottom: 0.15rem;
        position: absolute;
        transition-duration: 0.3s;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 40%;
        top: 50%;
        &:hover {
          background-color: rgb(55, 112, 229);
        }
      }
      .swiper-button-prev {
        @extend .swiperbtcommont;
        background-image: url("/images/targetleft.png");
        left: -0.5rem;
        &:hover {
          background-image: url("/images/targetleftwhite.png");
        }
      }
      .swiper-button-next {
        @extend .swiperbtcommont;
        background-image: url("/images/targetright.png");
        background-position: center;
        right: -0.5rem;
        &:hover {
          background-image: url("/images/targetrightwhite.png");
        }
      }
    }
    #swipertran {
      position: relative;
      width: 11.6rem;
      height: 60vh;
      padding-block: 5vh;
      .swiper {
        width: 100%;
        height: 60vh;
        padding-block: 5vh;
      }
      .swiper-slide {
        box-shadow: 0.1rem 0.1rem 0.3rem rgba(40, 77, 213, 0.1);
        position: relative;
        width: 1.92rem;
        display: flex;
        justify-content: center;
        border-radius: 10px;
        overflow: hidden;
        flex-direction: column;
        .img {
          overflow: hidden;
          width: 100%;
          height: 50%;
          img {
            width: 100%;
            object-fit: cover;
          }
        }
        .swipertext {
          box-sizing: border-box;
          height: 50%;
          transition-duration: 0.3s;
          width: 100%;
          padding: 0.2rem;
          background-color: white;
          display: flex;
          flex-direction: column;
          .title {
            padding-left: 0.1rem;
            padding-top: 0.2rem;
            font-size: 0.2rem;
            height: auto;
            font-weight: 700;
            margin-bottom: 0.16rem;
          }
          .desc {
            width: 100%;
            user-select: none;
            font-size: 0.18rem;
            max-height: 0.72rem; /* 设置div的最大高度 */
            overflow-y: hidden;
            color: #999;
            text-overflow: ellipsis;
            padding: 0.1rem; /* 添加内边距用于示例 */
          }
        }
        &:hover {
          .swipertext {
            height: 100%;
            background-color: #0093e9;
            color: white;
            background-image: linear-gradient(
              160deg,
              rgb(50, 100, 224) 0%,
              rgb(76, 159, 252) 100%
            );

            .desc {
              color: white;
              font-size: 0.14rem;
              max-height: 1.3rem;
            }
          }
          .deleteProject,
          .editProejct {
            opacity: 1;
          }
        }
        .deleteProject {
          position: absolute;
          opacity: 0;
          transition-duration: 0.3s;
          top: 0.1rem;
          right: 0.1rem;
          height: 0.3rem;
          cursor: pointer;
          width: 0.6rem;
        }
        .editProejct {
          position: absolute;
          opacity: 0;
          transition-duration: 0.3s;
          top: 0.1rem;
          left: 0.1rem;
          height: 0.3rem;
          cursor: pointer;
          width: 0.6rem;
        }
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      // 去掉左右箭头默认样式

      // 定义新的样式
    }
  }
}
.uploadFlag {
  width: 100%;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px dashed #0093e9;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 0.2rem;
  .fileinput {
    width: 100%;
    cursor: pointer;
    height: 100%;
    opacity: 0;
  }
}
</style>
