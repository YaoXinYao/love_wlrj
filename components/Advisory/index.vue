<template>
  <div class="advisory">
    <div class="news">
      <div class="newstitle">热点新闻</div>
      <div class="newscontainer">
        <div
          class="newsleft"
          :style="{
            backgroundImage: `url(${news.newarr[curIndexnews].imgsrc})`,
          }"
        ></div>
        <div class="newsright">
          <div class="newsrighttop">
            <NuxtLink
              :to="`/articlemd/${item.descid}`"
              target="_blank"
              :class="`newsitem ${curIndexnews == index ? 'newshover' : ''}`"
              v-for="(item, index) in news.newarr"
              :key="index"
              @mouseenter="() => changenews(index)"
            >
              <div class="newsposotion">
                <div class="newsitemTime">{{ item.time }}</div>
                <div class="newitemContent">{{ item.title }}</div>
              </div>
              <div class="borderitem"></div>
            </NuxtLink>
          </div>
          <div class="newsrightbootom">
            <div class="bottomPrev">
              <i class="iconfont icon-xiangxia-copy"></i>
            </div>
            <div class="bottomNext">
              <i class="iconfont icon-xiangxia-copy"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//统一管理当前选项
const curIndexnews = ref(0);
const news = ref({
  newarr: [
    {
      imgsrc:
        "https://download.cocos.com/CocosPortal/image/2169866ba6074376beaa772389d813f8/2169866ba6074376beaa772389d813f8.jpg",
      descid: "1",
      title: "23级第一次考核",
      time: "2023.11.10",
    },
    {
      imgsrc:
        "https://download.cocos.com/CocosPortal/image/335b68eeb65f4cf983a507355cb287a8/335b68eeb65f4cf983a507355cb287a8.jpeg",
      descid: "2",
      title: "未来小组年会",
      time: "2023.11.10",
    },
    {
      imgsrc:
        "https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/1ff7894ef990fe71a5cf95febdfa226a_0.png",
      descid: "3",
      title: "宝宝喜提loopy",
      time: "2023.11.10",
    },
    {
      imgsrc:
        "https://download.cocos.com/CocosPortal/image/7aa2bd4db4f24d21bd359912648356ca/7aa2bd4db4f24d21bd359912648356ca.jpg",
      descid: "",
      title: "庆祝新中国成立",
      time: "1949.10.01",
    },
  ],
});
function changenews(value: number) {
  curIndexnews.value = value;
}
</script>

<style scoped lang="scss">
.advisory {
  width: 100%;
  min-height: 90vh;
  padding: 1rem 0;
  background-color: #f4f8fb;
  .news {
    width: 11.2rem;
    height: auto;
    margin: auto;
    .newstitle {
      font-size: 0.36rem;
      font-weight: bold;
      text-align: center;
    }
    .newscontainer {
      background-color: white;
      border-radius: 0.1rem;
      margin-top: 0.5rem;
      overflow: hidden;
      width: 100%;
      height: 4.6rem;
      display: flex;
      flex-direction: row;
      .newsleft {
        background-color: rgb(135, 135, 135);
        width: 60%;
        background-size: cover;
      }
      .newsright {
        width: 40%;
        display: flex;
        flex-direction: column;
        user-select: none;
        .newsrighttop {
          height: 85%;
          display: flex;
          align-items: center;
          flex-direction: column;
          .newshover {
            width: 110% !important;
            background-color: rgb(40, 77, 213);
            color: white;
            height: 30% !important;
          }
          .newsitem {
            opacity: 1;
            cursor: pointer;
            height: 25%;
            margin-inline: 5%;
            display: flex;
            justify-content: right;
            position: relative;
            border-radius: 10px;
            transition-duration: 0.3s;
            transition: 0.4s cubic-bezier(0, 0.7, 0.14, 0.93);

            width: 90%;
            .newsposotion {
              position: relative;
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: row;

              //background-color: saddlebrown;
              .newsitemTime {
                line-height: initial;
                border: none;
                word-break: break-all;
                font-size: 0.18rem;
                padding: 0.15rem;
                padding-top: 0.28rem;
                width: 0.8rem;
              }
              .newitemContent {
                display: flex;
                justify-content: left;
                align-items: center;
                line-height: initial;
                border: none;
                width: 3.2rem;
                font-size: 0.19rem;
                height: 0.505rem;
                margin: auto 0;
                min-height: 0.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
            }
            .borderitem {
              position: absolute;
              bottom: -0.01rem;
              width: 90%;
              height: 0.01rem;
              background-color: #e9e9e9;
              margin-inline: 0.2rem;
            }
          }
        }
        .newsrightbootom {
          height: 15%;
          display: flex;
          flex-direction: row;
          .bottomcomment {
            height: 100%;
            display: flex;
            justify-content: center;
            cursor: pointer;
            align-items: center;
            &:hover {
              background-color: rgb(231, 243, 251);
            }
          }
          .bottomPrev {
            @extend .bottomcomment;
            transform: rotateZ(180deg);
            width: 50%;
          }
          .bottomNext {
            @extend .bottomcomment;

            width: 50%;
          }
        }
      }
    }
  }
}
</style>
