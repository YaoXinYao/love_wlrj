<template>
  <div class="head">
    <div class="content">
      <div class="text">
        <p><span>下午好</span> TOM</p>
        <div>欢迎来到未来论坛</div>
      </div>
      <div class="search">
        <el-input
          v-model="postSource"
          class="cardInput"
          size="large"
          placeholder="请输入关键词"
          :prefix-icon="Search"
        />
        <el-button type="primary" round @click="selectCards">搜索</el-button>
        <div class="subfield">
          <div>
            <p class="tagtitle">
              <span>分栏：</span>
              <el-input
                v-model="subValue"
                placeholder="可以分栏搜索"
                disabled
              />
            </p>
            <div class="tag">
              <el-tag
                v-for="(tag, index) in subfields"
                :key="index"
                :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
                @click="handleLabel(tag.subId, tag.subName)"
                >{{ tag.subName }}</el-tag
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { forumStore, forumManage } from "~/store/forum";
const forumData = forumStore();
const manage = forumManage();
let { subfields } = storeToRefs(manage);
let { uploadRender,postSource,postSubId } = storeToRefs(forumData);
const tagTypes = ["success", "info", "warning", "danger", ""];
let subValue = ref("");
onMounted(() => {
  manage.subfieldInfo(1, 100);
});
//颜色随机
function getRandomTagType() {
  return tagTypes[Math.floor(Math.random() * tagTypes.length)] as
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "";
}
//选中分栏
function handleLabel(id: number, name: string) {
  if (!subValue.value) {
    subValue.value = name;
    postSubId.value = id;
    ElMessage.success("分栏选中成功");
  } else if (subValue.value == name) {
    subValue.value = "";
    postSubId.value = 0;
    ElMessage.success("取消分栏成功");
  } else {
    subValue.value = name;
    postSubId.value = id;
    ElMessage.success("已替换成此分栏");
  }
}
//搜索帖子
function selectCards() {
  uploadRender.value = true;
  if (postSource.value && subValue.value) {
    forumData.selectPost(1, 4, postSource.value, postSubId.value);
  } else if (!postSource.value && subValue.value) {
    forumData.selectPost(1, 4, "", postSubId.value);
  } else if (postSource.value && !subValue.value) {
    forumData.selectPost(1, 4, postSource.value);
  } else {
    forumData.selectPost(1, 4);
    console.log("加载全部");
  }
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  width: 100%;
  height: 450px;
  padding-top: 175px;
  justify-content: center;
  background-image: url("/public/img/back1.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: 0.6s ease-in 0s 1 normal forwards running bgShow;
}
@keyframes bgShow {
  100% {
    opacity: 0.85;
    transform: scale(1);
  }
}
.content {
  width: 1000px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.text {
  p {
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 400;
    span {
      color: rgb(138 141 144);
    }
  }
  div {
    font-size: 30px;
    color: black;
    font-weight: 500;
  }
}
.search {
  max-width: 500px;
  .el-input--large {
    width: 250px;
    border-radius: 8px;
    margin-right: 7px;
  }
  .subfield {
    div {
      width: 100%;
    }
  }
  .tagtitle {
    margin: 20px 0px 10px;
    font-size: 18px;
    font-family: "阿里妈妈刀隶体";
    font-weight: 500px;
    span {
      width: 60px;
    }
    .el-input {
      width: 140px;
    }
  }

  .tag {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-tag {
      display: inline-block;
      width: max-content;
      height: 30px;
      font-size: 15px;
      text-align: center;
      line-height: 30px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
    }
    .el-tag:hover {
      transform: translate(2px, -3px);
    }
  }
}
</style>
