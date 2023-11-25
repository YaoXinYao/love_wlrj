<template>
  <div class="authority">
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
            管理者: <span>{{ item.str }}</span>
          </li>
          <li>
            总人数: <span class="tag__content">{{ item.person }}</span>
          </li>
          <li>
            权限：<span v-if="item.k != 0">权限等级低于下{{ item.k }}级</span>
            <span v-if="item.k == 0">权限等级最高，是最高管理者</span>
          </li>
          <li class="setAuthor">权限管理</li>
        </ul>
      </div>
    </div>
    <authoritydata></authoritydata>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { authority } from "~/store/authority";
let author = authority();
let roles = ref<any[]>([]);
onMounted(() => {
  author.getAllRole().then((res) => {
    let len = res.length;
    for (let i = 0; i < len; i++) {
      let k = len - 1 - i;
      let str = "";
      if (i != len - 1) {
        for (let j = i; j < len; j++) {
          if (j != len - 1) str = str + res[j].roleName + ",";
          else str = str + res[j].roleName;
        }
      } else {
        str = "已是最高管理者";
      }
      let person = 10;
      roles.value[i] = { ...res[i], k, str, person };
    }
  });
});
const listcss = {
  padding: "20px",
  border: "1px solid #9ca6c2",
  borderRadius: "14px",
  marginBottom: "16px",
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
      cursor: pointer;
    }
    .setAuthor:hover {
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
  background-color: rgba(93, 164, 226);
}
.freshman-2 {
  max-width: 32%;
  min-width: 240px;
  background-color: rgba(76, 192, 237);
}
@media screen and (max-width: 768px) {
  .freshman-0 {
    max-width: none;
    min-width: none;
    width: 100%;
  }
  .freshman-12 {
    max-width: none;
    min-width: none;
    width: 100%;
  }
  .freshman-2 {
    max-width: none;
    min-width: none;
    width: 100%;
  }
}
</style>
