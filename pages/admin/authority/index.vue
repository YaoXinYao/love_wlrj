<template>
  <div class="authority" v-loading="loading">
    <div class="setshen">
      <div
        v-for="(item, index) in roles"
        :key="index"
        :class="`freshman-${index}`"
        :style="listcss"
      >
        <div class="title">角色信息</div>
        <ul class="roleInfo">
          <li>
            角色名称：<span>{{ item.roleName }}</span>
          </li>
          <li>
            管理者: <span>{{ item.managers }}</span>
          </li>
          <li>
            总人数: <span class="tag__content">{{ item.person }}</span>
          </li>
          <li>
            权限：<span>{{ item.level }}</span>
          </li>
          <li class="setAuthor" @click="lookAuthor(item.roleId, index)">
            权限管理
          </li>
        </ul>
      </div>
    </div>
    <Authoritydata />
    <el-dialog v-model="userAuthors" title="权限管理" width="500px">
      <div>
        <el-button type="primary" @click="addUserAuthor = true"
          >添加权限</el-button
        >
      </div>
      <el-table
        :data="roles[userIndex].authorities"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :style="inputcss"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column
          property="authorityName"
          label="权限名称"
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
          <el-button @click="userAuthors = false"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="addUserAuthor"
      title="添加权限"
      width="400px"
      :before-close="shutClose"
    >
      为用户添加：
      <el-select v-model="authorId" placeholder="请选择权限" clearable>
        <el-option
          v-for="item in authoritydata"
          :key="item.authorityId"
          :label="item.authorityName"
          :value="item.authorityId"
        /> </el-select
      >此权限
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addAuthor">添加</el-button>
          <el-button @click="shutClose"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="authorDelete" title="提示信息" width="400px">
      <span>确定要移除此权限？</span>
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
interface Role {
  roleId: number;
  roleName: string;
  roleDefault: number;
  authorities: any[];
  managers: string;
  person: number;
  level: string;
}
let author = authority();
let { authoritydata } = storeToRefs(author);
let roles = ref<Role[]>([]);
let userIndex = ref(0);
let authorId = ref("");
let deleteAuthorId = ref(0);
let roleId = ref(0);
let loading = ref(true);
let addUserAuthor = ref(false);
let userAuthors = ref(false);
let authorDelete = ref(false);
onMounted(() => {
  author.getAllRole().then(async (res) => {
    roles.value = new Array(3);
    let len = res.length;
    for (let i = 0; i < len; i++) {
      if (res[i].roleId == 1) {
        let level = "权限等级最低";
        let managers = "大二,管理员";
        let person = await author.getUseNum(res[i].roleId);
        roles.value[0] = { ...res[i], managers, person, level };
      } else if (res[i].roleId == 2) {
        let level = "权限等级中等";
        let managers = "管理员";
        let person = await author.getUseNum(res[i].roleId);
        roles.value[1] = { ...res[i], managers, person, level };
      } else {
        let level = "权限等级最高";
        let managers = "无上级管理者";
        let person = await author.getUseNum(res[i].roleId);
        roles.value[2] = { ...res[i], managers, person, level };
      }
    }
    loading.value = false;
  });
  author.getAuthority();
});
const listcss = {
  padding: "20px",
  border: "1px solid #9ca6c2",
  borderRadius: "14px",
};
let inputcss = {
  marginTop: "10px",
};
const sureDelete = (val: any) => {
  deleteAuthorId.value = val.authorityId;
  authorDelete.value = true;
};
const lookAuthor = (id: number, index: number) => {
  userIndex.value = index;
  roleId.value = id;
  userAuthors.value = true;
};
const addAuthor = () => {
  if (authorId.value != "") {
    let aid = Number(authorId.value);
    author.addRoleAuthor(aid, roleId.value).then((res) => {
      if (res == 20000) {
        ElMessage.success("添加成功");
        authorId.value = "";
        resetInter();
        author.getAllRole().then(async (res) => {
          let len = res.length;
          for (let i = 0; i < len; i++) {
            if (res[i].roleId == 1) {
              let level = "权限等级最低";
              let managers = "大二,管理员";
              let person = await author.getUseNum(res[i].roleId);
              roles.value[0] = { ...res[i], managers, person, level };
            } else if (res[i].roleId == 2) {
              let level = "权限等级中等";
              let managers = "管理员";
              let person = await author.getUseNum(res[i].roleId);
              roles.value[1] = { ...res[i], managers, person, level };
            } else {
              let level = "权限等级最高";
              let managers = "无上级管理者";
              let person = await author.getUseNum(res[i].roleId);
              roles.value[2] = { ...res[i], managers, person, level };
            }
          }
        });
      } else if (res == 52003) {
        ElMessage.warning("权限已存在");
      } else {
        ElMessage.error("添加失败");
      }
      addUserAuthor.value = false;
    });
  } else {
    ElMessage.warning("输入内容不能为空");
  }
};
const deleteAuthors = () => {
  author.deleteRoleAuthor(deleteAuthorId.value, roleId.value).then((res) => {
    if (res == 20000) {
      ElMessage.success("移除成功");
      resetInter();
      let index = roles.value[userIndex.value].authorities.findIndex((item) => {
        if (item.authorityId == deleteAuthorId.value) {
          return true;
        }
      });
      roles.value[userIndex.value].authorities.splice(index, 1);
    } else {
      ElMessage.error("移除失败");
    }
    authorDelete.value = false;
  });
};
const shutClose = () => {
  addUserAuthor.value = false;
  authorId.value = "";
};
//重新加载权限
const resetInter = () => {
  author.updateRoleAuthor().then((res) => {});
};
</script>

<style lang="scss" scoped>
.authority {
  width: 95%;
  margin: 0 auto;
}
.setshen {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #f0f8fff5;
  }
  .roleInfo {
    color: #f0f8fff5;
    list-style: none;
    li {
      display: inline-block;
      max-width: 100%;
      width: auto;
      padding-bottom: 12px;
      text-align: left;
      font-weight: 400;
      line-height: 23px;
      font-size: 14px;
      margin-right: 30px;
      span {
        margin-left: 2px;
      }
      .tag__content {
        display: inline-block;
        width: 60px;
        height: 23px;
        background-color: white;
        border-radius: 5px;
        color: #2785e2;
        text-align: center;
      }
    }
    .setAuthor {
      width: 100%;
      padding-bottom: 0px;
    }
    .setAuthor:hover {
      cursor: pointer;
      color: #baf309;
    }
  }
}
.freshman-0 {
  max-width: 32%;
  min-width: 240px;
  background-color: rgba(108, 141, 217);
  padding: 15px;
}
.freshman-1 {
  max-width: 32%;
  min-width: 240px;
  padding: 15px;
  background-color: rgba(93, 164, 226);
}
.freshman-2 {
  max-width: 32%;
  min-width: 240px;
  padding: 15px;
  background-color: rgba(76, 192, 237);
}
@media screen and (max-width: 768px) {
  .freshman-0 {
    max-width: none;
    min-width: none;
    width: 100%;
    margin-bottom: 20px;
  }
  .freshman-1 {
    max-width: none;
    min-width: none;
    width: 100%;
    margin-bottom: 20px;
  }
  .freshman-2 {
    max-width: none;
    min-width: none;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
