<template>
  <div class="table">
    <div>
      <el-button class="addAutor" type="success" @click="autorModel = true"
        >添加权限</el-button
      >
      <el-button class="statusCourse" type="primary" @click="editCourse">{{
        courseStatus != "1" ? "禁止修改课表" : "允许修改课表"
      }}</el-button>
    </div>
    <el-table
      :data="authoritydata"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="80px"></el-table-column>
      <el-table-column
        property="authorityName"
        label="权限名称"
      ></el-table-column>
      <el-table-column #default="scope" label="接口管理">
        <el-button type="primary" @click="openInterface(scope.row)"
          >接口管理</el-button
        >
      </el-table-column>
      <el-table-column #default="scope" label="操作">
        <el-button type="danger" @click="moveAuthor(scope.row)">删除</el-button>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="autorModel"
      title="添加权限"
      width="350px"
      :before-close="handleClose"
    >
      权限名称：<el-input
        v-model="authorName"
        placeholder="请输入权限名称"
        clearable
        :style="inputcss"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addAuthority">添加</el-button>
          <el-button @click="handleClose"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="interfaceModel" title="接口管理" width="500px">
      <div>
        <el-button type="primary" @click="addinterModel = true"
          >添加接口</el-button
        >
      </div>
      <el-table
        :data="interfaceData"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :style="inputcss"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column
          property="interfacePath"
          label="接口路径"
          width="200"
        />
        <el-table-column #default="scope" label="操作" width="150">
          <el-button type="danger" @click="sureDelete(scope.row)"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="interClose"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="addinterModel"
      title="添加接口"
      width="350px"
      :before-close="shutClose"
    >
      接口路径：<el-input
        v-model="interfacePath"
        placeholder="请输入接口路径"
        clearable
        :style="inputcss"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addInterface">添加</el-button>
          <el-button @click="shutClose"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="interDelete" title="提示信息" width="400px">
      <span>确定要删除此接口？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deleteInters">确定</el-button>
          <el-button @click="interDelete = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="authorDelete" title="提示信息" width="400px">
      <span>确定要删除此权限？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deleteAuthors">确定</el-button>
          <el-button @click="authorDelete = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { authority } from "~/store/authority";
let authors = authority();
let { authoritydata } = storeToRefs(authors);
let authorName = ref("");
let interfaceData = ref<any[]>([]);
let interfacePath = ref("");
let authorId = ref(0);
let deleInterId = ref(0);
let deleteAuthorId = ref(0);
let autorModel = ref(false);
let interfaceModel = ref(false);
let addinterModel = ref(false);
let interDelete = ref(false);
let authorDelete = ref(false);
let courseStatus = ref("");
let inputcss = {
  marginTop: "10px",
};
onMounted(() => {
  authors.getCourseStatus().then((res) => {
    courseStatus.value = res.data;
  });
  authors.getAuthority();
});
//修改课表
const editCourse = () => {
  if (courseStatus.value == "1") {
    authors.editCourseStatus("0").then((res) => {
      if (res.code == 20000) {
        courseStatus.value = "0";
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    });
  } else {
    authors.editCourseStatus("1").then((res) => {
      console.log("修改课表", res);
      if (res.code == 20000) {
        courseStatus.value = "1";
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    });
  }
};
//添加权限
const addAuthority = () => {
  if (authorName.value.trim()) {
    authors.postAuthority(authorName.value).then((res) => {
      if (res == 20000) {
        ElMessage.success("添加成功");
        authors.getAuthority();
        autorModel.value = false;
        authorName.value = "";
      } else if (res == 52003) {
        ElMessage.warning("权限已存在");
      } else {
        ElMessage.error("添加失败");
      }
    });
  } else {
    ElMessage.warning("输入内容不能为空");
  }
};
//删除权限
const moveAuthor = (val: any) => {
  deleteAuthorId.value = val.authorityId;
  authorDelete.value = true;
};
const deleteAuthors = () => {
  authors.deleteAuthor(deleteAuthorId.value).then((res) => {
    if (res == 20000) {
      ElMessage.success("删除成功");
      let index = authoritydata.value.findIndex((item) => {
        if (item.authorityId == deleteAuthorId.value) {
          return true;
        }
      });
      authoritydata.value.splice(index, 1);
    } else {
      ElMessage.warning("删除失败");
    }
    authorDelete.value = false;
  });
};
//接口管理
const openInterface = (val: any) => {
  authorId.value = val.authorityId;
  authors.getInterfaces(authorId.value).then((res) => {
    interfaceData.value = res;
  });
  interfaceModel.value = true;
};
//添加接口
const addInterface = () => {
  if (interfacePath.value.trim()) {
    authors.postInterface(authorId.value, interfacePath.value).then((res) => {
      if (res == 20000) {
        ElMessage.success("添加成功");
        authors.getInterfaces(authorId.value).then((res) => {
          interfaceData.value = res;
        });
        addinterModel.value = false;
        interfacePath.value = "";
      } else if (res == 52003) {
        ElMessage.warning("接口已存在");
      } else {
        ElMessage.error("添加失败");
      }
    });
  } else {
    ElMessage.warning("输入内容不能为空");
  }
};
//删除接口
const sureDelete = (val: any) => {
  deleInterId.value = val.interfaceId;
  interDelete.value = true;
};
const deleteInters = () => {
  authors.deleteInter(deleInterId.value).then((res) => {
    if (res == 20000) {
      ElMessage.success("删除成功");
      let index = interfaceData.value.findIndex((item) => {
        if (item.interfaceId == deleInterId.value) {
          return true;
        }
      });
      interfaceData.value.splice(index, 1);
    } else {
      ElMessage.warning("删除失败");
    }
    interDelete.value = false;
  });
};

//关闭弹窗
const handleClose = () => {
  autorModel.value = false;
  authorName.value = "";
};
const shutClose = () => {
  addinterModel.value = false;
  interfacePath.value = "";
};
const interClose = () => {
  interfaceModel.value = false;
};
</script>

<style lang="scss" scoped>
.table {
  padding: 18px 20px 0px 0px;
  border-radius: 5px;
  background-color: white;
  min-height: 200px;
  min-width: 1000px;
  max-width: 1200px;
  td {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.addAutor {
  cursor: pointer;
}
</style>
