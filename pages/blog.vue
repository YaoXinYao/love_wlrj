<template>
  <div class="blog">
    <div class="blogcontainer">
      <div class="blogcontarinerleft">
        <div
          v-for="(item, key) in newblog.data"
          :key="key"
          @click="() => changegrade(key as string)"
          :class="`gradeitem ${curGrade == key ? 'activegrade' : ''}`"
        >
          {{ key + "级" }}
        </div>
      </div>
      <div class="blogcontarinerright">
        <div v-for="(item, index) in newblog.data[curGrade]">
          <template v-for="(item2, index) in item">
            <h2 class="blogtarget">{{ index }}({{ item2.length }})</h2>
            <div class="blogitembox">
              <NuxtLink
                :href="item.userBlog"
                target="_blank"
                v-for="(item, index) in item2"
                :key="Math.random() * 10"
                class="blogitem"
              >
                <img class="avaterimg" :src="item.userPicture" alt="" />
                <div class="avtername">
                  <div class="avtertitle">{{ item.userName }}</div>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { getAllblog } from "~/service/homeApi";
import { useHomestore } from "~/store/home";
import type { blogRoot } from "~/types/Home";
//保存选中年级
const curGrade = ref<string>("2021");
const homestore = useHomestore();
const { Allblog } = storeToRefs(homestore);
const res = await getAllblog();
homestore.updateblog();
const newblog = ref<blogRoot>({
  data: {
    "2021": [
      {
        "前端": [
          {
            "userId": 4,
            "userAccount": "20211514126",
            "userName": "姚欣瑶",
            "userSexVal": "女",
            "userQq": "3190493163",
            "userEmail": "3190493163@qq.com",
            "userPicture": "未设置",
            "userClass": "计科211",
            "userGrade": "2021",
            "userBlog": "https://www.neflibata.cn/",
            "groupId": 1,
            "groupName": "前端",
            "roleId": 2,
            "roleName": "大二",
          },
          {
            "userId": 6,
            "userAccount": "20211524220",
            "userName": "郑龙龙",
            "userSexVal": "男",
            "userQq": "1878856344",
            "userEmail": "1878856344@qq.com",
            "userPicture": "未设置",
            "userClass": "信工212",
            "userGrade": "2021",
            "userBlog": "未设置",
            "groupId": 1,
            "groupName": "前端",
            "roleId": 2,
            "roleName": "大二",
          },
          {
            "userId": 7,
            "userAccount": "20211544112",
            "userName": "赵子豪",
            "userSexVal": "男",
            "userQq": "1090649095",
            "userEmail": "1090649095@qq.com",
            "userPicture": "未设置",
            "userClass": "通信211",
            "userGrade": "2021",
            "userBlog": "未设置",
            "groupId": 1,
            "groupName": "前端",
            "roleId": 2,
            "roleName": "大二",
          },
          {
            "userId": 8,
            "userAccount": "20211514330",
            "userName": "张方方",
            "userSexVal": "女",
            "userQq": "2794957189",
            "userEmail": "2794957189@qq.com",
            "userPicture": "未设置",
            "userClass": "计科213",
            "userGrade": "2021",
            "userBlog": "未设置",
            "groupId": 1,
            "groupName": "前端",
            "roleId": 2,
            "roleName": "大二",
          },
        ],
      },
      {
        "后端": [
          {
            "userId": 5,
            "userAccount": "20211574205",
            "userName": "赵容庆",
            "userSexVal": "男",
            "userQq": "1002800982",
            "userEmail": "1002800982@qq.com",
            "userPicture": "未设置",
            "userClass": "数据212",
            "userGrade": "2021",
            "userBlog": "未设置",
            "groupId": 2,
            "groupName": "后端",
            "roleId": 2,
            "roleName": "大二",
          },
        ],
      },
    ],
    "2023": [
      {
        "第一组": [
          {
            "userId": 3,
            "userAccount": "20211514319",
            "userName": "李孟瑶",
            "userSexVal": "女",
            "userQq": "2801256650",
            "userEmail": "2801256650@qq.com",
            "userPicture": "未设置",
            "userClass": "计科213",
            "userGrade": "2023",
            "userBlog": "未设置",
            "groupId": 3,
            "groupName": "第一组",
            "roleId": 2,
            "roleName": "大二",
          },
        ],
      },
    ],
  },
});
newblog.value.data = Allblog?.value as any;
onMounted(() => {
  loading();
});
function loading() {
  const line = gsap.timeline();
  line
    .fromTo(
      ".blogtarget",
      { translateY: 50, opacity: 0 },
      { translateY: 0, opacity: 1 }
    )
    .fromTo(
      ".blogitem",
      { opacity: 0, scale: 0.1 },
      {
        opacity: 1,
        scale: 1,
        stagger: {
          from: "center",
          amount: 1,
        },
      }
    );
}
function changegrade(index: string) {
  if (index == curGrade.value) return;
  curGrade.value = index;
  //等待DOM 渲染完成，在进行动画
  nextTick(() => {
    loading();
  });
}
useHeader();
</script>
<style scoped lang="scss">
@media screen and (max-width: 998px) {
  .blogcontainer {
    padding-inline: 0.3rem !important;
    flex-direction: column !important;
  }
  .blogcontarinerleft {
    width: 100% !important;
  }
  .blogcontarinerright {
    width: 100%;
  }
  .blogcontarinerright {
    width: 100% !important;
  }
  .blogitem {
    width: 1.5rem !important;
  }
}
.blog {
  padding: 1rem 0;
  min-height: 90vh;
  background-color: rgb(244, 248, 251);
  width: 100%;
  .blogcontainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    margin: auto;
    padding-inline: 1rem;
    .blogcontarinerleft {
      padding-inline: 0.1rem;
      padding-block: 0.2rem;
      border-radius: 5px;
      height: 100%;
      width: 20%;
      .gradeitem {
        width: 100%;
        cursor: pointer;
        transition-duration: 0.3s;
        height: 0.7rem;
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        box-shadow: 5px 5px 15px rgb(201, 198, 198), -5px -5px 10px #fff;
        font-size: 0.2rem;
        display: flex;
        margin-bottom: 0.2rem;
        justify-content: center;
        align-items: center;
      }
      .activegrade {
        background-color: rgb(66, 90, 239);
        color: white;
      }
    }
    .blogcontarinerright {
      border-radius: 5px;
      height: 100%;
      padding-inline: 0.2rem;
      margin-left: 0.3rem;
      width: 78%;
      .blogtarget {
        position: relative;
        margin: 20px 0 14px;
        color: black;
        font-weight: 700;
      }
      .blogitembox {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .blogitem {
          cursor: pointer;
          position: relative;
          justify-content: center;
          align-items: center;
          display: flex;
          border-radius: 10px;
          background-color: rgb(255, 255, 255);
          width: 2.5rem;
          margin-right: 0.1rem;
          margin-bottom: 0.1rem;
          height: 0.7rem;
          box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
          border: 1px solid rgb(208, 208, 208);
          transition-duration: 0.5s;
          transition: cubic-bezier(0, 0.69, 0.66, 0.94);
          .avaterimg {
            width: 0.5rem;
            height: 0.5rem;
            transform: scale(0.8);
            border-radius: 50%;
            object-fit: cover;
            margin: 0.1rem;
            transition: cubic-bezier(0, 0.69, 0.66, 0.94);
            transition-duration: 0.3s;
          }
          .avtername {
            transition: cubic-bezier(0, 0.69, 0.66, 0.94);
            display: flex;
            align-items: center;
            transition-duration: 0.5s;
            width: 1.65rem;
            height: 100%;

            .avtertitle {
              font-size: 0.19rem;
              font-weight: 700;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          &:hover {
            background-color: rgb(66, 90, 239);
            color: white;
            .avaterimg {
              transform: scale(0);
              width: 0;
              height: 0;
            }
            .avtername {
              width: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>
