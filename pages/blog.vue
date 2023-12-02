<template>
  <div class="blog">
    <div class="blogcontainer">
      <div class="blogcontarinerleft">
        <div
          v-for="(item, key) in newblog!.data"
          :key="key"
          @click="() => changegrade(key as string)"
          :class="`gradeitem ${curGrade == key ? 'activegrade' : ''}`"
        >
          {{ key + "级" }}
        </div>
      </div>
      <div class="blogcontarinerright">
        <div v-for="(item, index) in newblog!.data[curGrade]">
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
useHeader();
import gsap from "gsap";
import type { IResultData } from "~/service/forum";
import type { blogRoot, blogitem } from "~/types/Home";
const newblog = ref<blogRoot>({
  data: {},
});
const fetchdate = async () => {
  const { data } = await useFetch<
    IResultData<{
      [key: string]: blogitem[];
    }>
  >("/zinfo/user/user/selectBlog");
  newblog.value.data = data.value!.data;
};
const curGrade = ref<string>("2021");
onMounted(async () => {
  await nextTick();
  await fetchdate();
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
