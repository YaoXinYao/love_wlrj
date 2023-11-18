<template>
  <div class="home">
    <ul class="discuss">
      <li v-for="(item, index) in props.cimmentData" :key="index">
        <div class="cardTop">
          <div class="userInfo">
            <div>
              <img
                :src="
                  item.head
                    ? item.head
                    : 'https://img0.baidu.com/it/u=1435639120,2241364006&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
                "
                alt=""
              />
            </div>
            <div>
              <p>{{ item.comUserName }}</p>
              <p class="time">{{ item.comTime }}</p>
            </div>
          </div>
        </div>
        <div class="cardContent">
          {{ item.comContent }}
        </div>
        <div class="cardImage">
          <img v-for="(u, o) in item.photos" :key="o" :src="u" />
        </div>
        <div class="icon">
          <svg
            t="1699003334612"
            class="icons"
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
const props = defineProps({
  cimmentData: {
    type: Array as () => any[],
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.discuss {
  width: 100%;
  min-height: 100px;
  list-style: none;
  margin-top: 20px;
  margin-left: 25px;
  li {
    min-height: 90px;
    width: 98%;
    margin: auto;
    padding-bottom: 15px;
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
            color: rgb(210 146 26);
            margin-top: 10px;
          }
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .cardContent {
      margin-bottom: 5px;
    }
    .cardImage {
      img {
        width: 300px;
        max-height: 500px;
        object-fit: cover;
      }
    }
    .icon {
      overflow: hidden;
      margin-top: 3px;
      width: 70px;

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
