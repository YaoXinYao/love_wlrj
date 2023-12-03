<template>
  <div class="modules">
    <NuxtLink
      to="/personalInfoPage/updateBaseInfo"
      class="userInfoModule animate__animated animate__lightSpeedInLeft"
    >
      <div class="classInfo">
        <span>账号</span>
        <span>{{ userinfo.userAccount }}</span>
      </div>
      <div class="qqAccount">
        <span>qq</span>
        <span>{{ userinfo.userQq }}</span>
      </div>

      <div class="levelInfo">
        <span>级别</span>
        <span>{{ userinfo.userGrade }}</span>
      </div>

      <div class="otherInfo">
        <span>其它</span>
        <span
          ><el-icon><Right /></el-icon
        ></span>
      </div>
    </NuxtLink>
    <div class="newNoticeModule animate__animated animate__lightSpeedInRight">
      <h3>
        <img src="@/assets/image/公告.png" class="noticeIcon" /><span
          >公告</span
        >
      </h3>
      <p v-if="newNotice">{{ newNotice.noticeContent }}</p>
      <p v-if="!newNotice">暂无公告</p>
    </div>
    <NuxtLink
      to="/personalInfoPage/userTimetable"
      class="userTimetableModule animate__animated animate__fadeInUp"
    >
      <div class="moduleName">我的课表</div>
      <img src="@/assets/image/课程表.png" alt="" />
    </NuxtLink>
    <NuxtLink
      to="/personalInfoPage/score"
      class="userScoreModule animate__animated animate__fadeInUp"
    >
      <div class="moduleName">我的成绩</div>
      <img src="@/assets/image/成绩管理.png" alt="" />
    </NuxtLink>
    <NuxtLink
      to="/personalInfoPage/leaveling"
      class="leaveModule animate__animated animate__fadeInUp"
    >
      <div class="moduleName">我的请假</div>
      <img src="@/assets/image/我的请假记录.png" alt="" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Right } from "@element-plus/icons-vue";
import "animate.css";
import { useHomestore } from "../../../store/home";
import { storeToRefs } from "pinia";
import { getNewNotice } from "~/service/message";
const homeStore = useHomestore();
const { userinfo } = storeToRefs(homeStore);

//公告
let noticeInfoRes = await getNewNotice();
let newNotice = noticeInfoRes.data.value.data.records[0];
</script>

<style lang="scss" scoped>
.modules {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px 10px;
  width: 100%;
  padding: 0 15px;
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow: hidden;
}
.userInfoModule {
  display: flex;
  justify-content: space-between;
  grid-column: 1/3;
  cursor: pointer;
  background-image: linear-gradient(to right bottom, #0acffe 0%, #495aff 100%);
  color: #fff;
  border: 1px solid #e3e8f7;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;

  .classInfo,
  .levelInfo,
  .qqAccount,
  .otherInfo {
    display: flex;
    flex-direction: column;

    :first-child {
      font-size: 13px;
    }

    :last-child {
      font-size: 22px;
      margin-top: 8px;
      font-weight: 700;
      line-height: 40px;
    }
  }
}

.newNoticeModule {
  background-color: #fff;
  grid-column: 3/4;
  box-shadow: 4px 5px 3px #e3e8f7;
  border: 1px solid #e3e8f7;
  padding: 10px;
  border-radius: 10px;
  h3 {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 30px;
    }
  }
}
@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(15deg);
  }
  30% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(10deg);
  }
  70% {
    transform: rotate(-4deg);
  }
  90% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.noticeIcon {
  animation: swing 1.5s ease-in-out infinite;
  transform-origin: top center;
  margin-right: 5px;
}

.userScoreModule,
.userTimetableModule,
.leaveModule {
  height: 200px;
  background-image: linear-gradient(
    -225deg,
    #5d9fff 0%,
    #b8dcff 48%,
    #6bbbff 100%
  );
  box-shadow: 4px 5px 3px #e3e8f7;
  border: 1px solid #e3e8f7;
  padding: 10px;
  border-radius: 10px;
  position: relative;

  img {
    width: 35%;
    opacity: 0.3;
    position: absolute;
    right: 30px;
  }
}

.leaveModule {
  background-image: linear-gradient(-225deg, #eaccf8 48%, #6654f1 100%);
}

.userTimetableModule {
  background-image: linear-gradient(
    -225deg,
    #77ffd2 0%,
    #659fec 48%,
    #1eecff 100%
  );
}

.moduleName {
  font-size: 30px;
  line-height: 50px;
  font-family: "阿里妈妈黑体";
  color: #fff;
  letter-spacing: 6px;
}

@media screen and (max-width: 850px) {
  .userInfoModule,
  .newNoticeModule {
    grid-column: 1/4;
  }
}

@media screen and (max-width: 750px) {
  .qqAccount {
    display: none !important;
  }
}
</style>
