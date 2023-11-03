<template>
  <div class="main">
    <div class="title">相关帖子</div>
    <ul class="posts">
      <li v-for="(item, index) in data" :key="index">
        <div class="cardTop">
          <div class="userInfo">
            <div>
              <img v-if="item.head" :src="item.head" />
            </div>
            <div>
              <p>{{ item.name }}</p>
              <p class="time">{{ item.timer }}</p>
            </div>
          </div>
          <div class="regard">
            {{ item.regard == "是" ? "已关注" : "关注" }}
          </div>
        </div>
        <div class="cardContent">{{ item.content }}</div>
        <div class="cardImage">
          <img v-for="(u, o) in item.photo" :key="o" :src="u" />
        </div>
        <div class="icon">
          <el-icon><ChatDotRound color="black" /></el-icon>
          <svg
            v-if="item.likes == true"
            @click="item.likes = false"
            t="1699003181186"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1536"
            width="18"
            height="18"
          >
            <path
              d="M981.714286 250.971429a297.188571 297.188571 0 0 0-65.028572-94.628572 302.171429 302.171429 0 0 0-96-63.428571A303.245714 303.245714 0 0 0 703.657143 69.714286c-56.342857 0-111.314286 15.428571-159.085714 44.571428-11.428571 6.971429-22.285714 14.628571-32.571429 22.971429-10.285714-8.342857-21.142857-16-32.571429-22.971429-47.771429-29.142857-102.742857-44.571429-159.085714-44.571428-40.571429 0-79.885714 7.771429-117.028571 23.2-35.885714 14.857143-68.228571 36.228571-96 63.428571a295.36 295.36 0 0 0-65.028572 94.628572c-15.885714 36.914286-24 76.114286-24 116.457142 0 38.057143 7.771429 77.714286 23.2 118.057143 12.914286 33.714286 31.428571 68.685714 55.085715 104 37.485714 55.885714 89.028571 114.171429 153.028571 173.257143 106.057143 97.942857 211.085714 165.6 215.542857 168.342857l27.085714 17.371429c12 7.657143 27.428571 7.657143 39.428572 0l27.085714-17.371429c4.457143-2.857143 109.371429-70.4 215.542857-168.342857 64-59.085714 115.542857-117.371429 153.028572-173.257143 23.657143-35.314286 42.285714-70.285714 55.085714-104 15.428571-40.342857 23.2-80 23.2-118.057143 0.114286-40.342857-8-79.542857-23.885714-116.457142z"
              p-id="1537"
              fill="#d81e06"
            ></path>
          </svg>
          <svg
            v-if="item.likes == false"
            @click="item.likes = true"
            t="1699003334612"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1743"
            width="18"
            height="18"
          >
            <path
              d="M510.663562 927.365102c-3.371794-0.022513-6.751774-0.654916-10.009981-2.096754-5.13802-2.270716-127.142725-56.824193-242.309698-160.071695-68.322062-61.251016-119.862925-126.960577-153.194055-195.305151-42.255383-86.644359-55.178717-177.434132-38.411844-269.847892 14.393825-79.334883 66.023716-147.431817 138.109497-182.160783 74.214259-35.754319 159.371754-31.628348 239.788272 11.617596 31.80845 17.105586 52.518121 35.221176 65.965387 51.980885 13.447267-16.759709 34.155914-34.875299 65.964365-51.980885 80.415494-43.245943 165.575036-47.371914 239.789294-11.617596C888.438535 152.611793 940.068426 220.709751 954.462251 300.04361c16.766872 92.413759 3.842515 183.203532-38.411845 269.847892-33.331129 68.344574-84.871993 134.054135-153.195078 195.305151-115.165949 103.247502-237.171678 157.799956-242.309698 160.071695a24.38948 24.38948 0 0 1-9.882068 2.096754z m-200.402239-784.52793c-29.217439 0-57.642838 6.357801-84.171028 19.138896-58.020438 27.951609-99.589183 82.832544-111.195522 146.804531-27.077705 149.247162 31.874965 290.276153 175.222767 419.167708 91.187839 81.993432 189.56645 132.928498 220.482577 147.919934 30.91715-14.991436 129.295761-65.926502 220.4836-147.919934C874.430496 599.056752 933.383166 458.027761 906.305461 308.780599 894.699122 244.808612 853.131401 189.9287 795.110963 161.976068c-59.727313-28.77537-129.108496-25.001417-195.365526 10.630105-59.891042 32.208563-80.505545 92.321662-89.14532 92.343151-8.653077 0.021489-29.253254-60.134589-89.146343-92.343151-36.827767-19.805068-74.627674-29.769001-111.192451-29.769001z"
              fill=""
              p-id="1744"
            ></path>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { ChatDotRound } from "@element-plus/icons-vue";
const data = reactive([
  {
    name: "迷雾",
    timer: "2021-10-09",
    regard: "是",
    content:
      '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。剧本杀的规则是，玩家先选择人物，阅读人物对应剧本，搜集线索后找出活动里隐藏的真凶。',
    head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390",
    photo: [
      "https://img1.baidu.com/it/u=2559867097,3726275945&fm=253&fmt=auto&app=138&f=JPEG?w=1333&h=500",
    ],
    likes: true,
  },
  {
    name: "迷雾",
    timer: "2021-10-09",
    regard: "否",
    content:
      '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。剧本杀的规则是，玩家先选择人物，阅读人物对应剧本，搜集线索后找出活动里隐藏的真凶。',
    head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F04%2F20200104211903_vFdtk.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=9c7f8590a7185503d81c12d1ad4e49af",
    photo: [
      "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
      "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
      "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
      "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
      "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
      "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
    ],
    likes: true,
  },
  {
    name: "迷雾",
    timer: "2021-10-09",
    regard: "是",
    content: "",
    head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F10%2F20210610232327_c1b93.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=31882182eabc65f519aa13e462154e2b",
    photo: [
      "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
    ],
    likes: false,
  },
  {
    name: "迷雾",
    timer: "2021-10-09",
    regard: "是",
    content:
      '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。剧本杀的规则是，玩家先选择人物，阅读人物对应剧本，搜集线索后找出活动里隐藏的真凶。',
    head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F04%2F20200104211903_vFdtk.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=9c7f8590a7185503d81c12d1ad4e49af",
    photo: [],
    likes: true,
  },
]);
</script>

<style lang="scss">
.main {
  width: 1000px;
  margin: 0 auto;
  .title {
    font-size: 24px;
    font-weight: 400;
    font-family: "阿里妈妈刀隶体";
  }
}
.posts {
  width: 100%;
  min-height: 100px;
  list-style: none;
  li {
    min-height: 150px;
    width: 98%;
    margin: auto;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: solid rgb(50, 49, 49) 1px;
    .cardTop {
      height: 50px;
      margin-bottom: 8px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .userInfo {
        display: flex;
        div {
          margin-right: 10px;
          font-size: 14px;
          p {
            margin-bottom: 0px;
            font-size: 12px;
          }
          .time {
            color: rgb(218, 213, 213);
          }
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .regard {
        width: 80px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border-radius: 15px;
        color: black;
        cursor: pointer;
        background-color: rgb(252, 174, 72);
      }
    }
    .cardContent {
      margin-bottom: 5px;
    }
    .cardImage {
      img {
        width: 300px;
        height: 200px;
        object-fit: cover;
      }
    }
    .icon {
      overflow: hidden;
      margin-top: 3px;

      i {
        font-size: 18px;
        margin-left: 15px;
        margin-right: 20px;
        margin-top: 5px;
        cursor: pointer;
      }
      svg {
        cursor: pointer;
      }
    }
  }
}
</style>
