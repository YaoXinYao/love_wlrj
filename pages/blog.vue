<template>
  <div class="blog">
    <div class="blogcontainer">
      <div class="blogcontarinerleft">
        <div
          v-for="(item, index) in blogdata"
          :key="index"
          @click="() => changegrade(index)"
          :class="`gradeitem ${curGrade == index ? 'activegrade' : ''}`"
        >
          {{ item.grade + "级" }}
        </div>
      </div>
      <div class="blogcontarinerright">
        <h2 class="blogtarget">
          前端🎣({{ blogdata[curGrade].forword.length }})
        </h2>
        <div class="blogitembox">
          <NuxtLink
            :href="item.link"
            target="_blank"
            v-for="(item, index) in blogdata[curGrade].forword"
            :key="Math.random() * 10"
            class="blogitem"
          >
            <img class="avaterimg" :src="item.img" alt="" />
            <div class="avtername">
              <div class="avtertitle">{{ item.name }}</div>
            </div>
          </NuxtLink>
        </div>
        <h2 class="blogtarget">后端({{ blogdata[curGrade].back.length }})</h2>
        <div class="blogitembox">
          <NuxtLink
            v-for="(item, index) in blogdata[curGrade].back"
            :key="Math.random() * 10"
            class="blogitem"
          >
            <img class="avaterimg" :src="item.img" alt="" />
            <div class="avtername">
              <div class="avtertitle">{{ item.name }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
//保存选中年级
const curGrade = ref(0);
const blogdata = ref([
  {
    grade: "2023",
    forword: [
      {
        name: "赵子豪",
        link: "https://www.zzh.fyi",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "张三",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "王五",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
    back: [
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
  },
  {
    grade: "2022",
    forword: [
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "张三",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "王五",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
    back: [
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
  },
  {
    grade: "2021",
    forword: [
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "张三",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "王五",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
    back: [
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
  },
  {
    grade: "2020",
    forword: [
      {
        name: "赵子豪",
        link: "https://www.zzh.fyi",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "张三",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "王五",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
    back: [
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        name: "赵子豪",
        link: "",
        img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7",
      },
    ],
  },
]);
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
function changegrade(index: number) {
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
.blog {
  padding: 1rem 0;
  height: auto;
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
