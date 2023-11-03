<template>
  <div class="blog">
    <div class="blogcontainer">
      <div class="blogcontarinerleft">
        <div :class="`gradeitem ${curGrade == 0 ? 'activegrade' : ''}`">
          2023级
        </div>
        <div class="gradeitem">2022级</div>
        <div class="gradeitem">2021级</div>
        <div class="gradeitem">2020级</div>
      </div>
      <div class="blogcontarinerright">
        <h2 class="blogtarget">前端🎣(6)</h2>
        <div class="blogitembox">
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">遥遥领先</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
        </div>
        <h2 class="blogtarget">后端(8)</h2>
        <div class="blogitembox">
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://tse1-mm.cn.bing.net/th/id/OIP-C.30Ri-r8Y7dBxlWeaX4o35QHaE2?w=239&h=180&c=7&r=0&o=5&pid=1.7"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">张三</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://tse1-mm.cn.bing.net/th/id/OIP-C.PtvTUNA8Je2YgjbFDQcz5gHaEK?w=384&h=182&c=7&r=0&o=5&pid=1.7"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">李四</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">赵子豪</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">遥遥领先</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">遥遥领先</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">遥遥领先</div>
            </div>
            <div class=""></div>
          </a>
          <a class="blogitem">
            <img
              class="avaterimg"
              src="https://img02.anheyu.com/adminuploads/1/2022/12/27/63aa5649a4cbc.webp!linkavatar"
              alt=""
            />
            <div class="avtername">
              <div class="avtertitle">无敌霸王龙无敌霸王龙无敌霸王龙</div>
            </div>
            <div class=""></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHeader();
const activities = [
  {
    content: "Custom icon",
    timestamp: "2018-04-12 20:46",
    size: "large",
    type: "primary",
    icon: "#0bbd87",
  },
  {
    content: "Custom color",
    timestamp: "2018-04-03 20:46",
    color: "#0bbd87",
  },
  {
    content: "Custom size",
    timestamp: "2018-04-03 20:46",
    size: "large",
  },
  {
    content: "Custom hollow",
    timestamp: "2018-04-03 20:46",
    type: "primary",
    hollow: true,
  },
  {
    content: "Default node",
    timestamp: "2018-04-03 20:46",
  },
];
//保存选中年级
const curGrade = ref(0);
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
    width: 14rem;
    height: 5rem;
    margin: auto;
    .blogcontarinerleft {
      padding-inline: 0.1rem;
      padding-block: 0.2rem;
      border-radius: 5px;
      background-color: white;
      height: 100%;
      width: 20%;
      .gradeitem {
        width: 100%;
        cursor: pointer;
        height: 0.7rem;
        border-radius: 10px;
        background-color: rgb(232, 233, 234);
        font-size: 0.2rem;
        display: flex;
        margin-bottom: 0.1rem;
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
