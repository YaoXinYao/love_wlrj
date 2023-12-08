<template>
  <div class="app-footer">
    <div class="container">
      <div class="containerleft">
        <div class="containertop">
          <ul>
            <h6>小组荣誉</h6>
            <li>蓝桥杯获奖</li>
            <li>ACM算法竞赛</li>
            <li>国家级大学生创新创业项目</li>
          </ul>
          <ul>
            <h6>小组网盘</h6>
            <NuxtLink to="/networkdisk/uploadfile">
              <li>上传文件</li>
            </NuxtLink>
            <NuxtLink to="/networkdisk/documentcommunity">
              <li>文件社区</li>
            </NuxtLink>
            <NuxtLink to="/networkdisk/mylove">
              <li>我的收藏</li>
            </NuxtLink>
            <NuxtLink to="/networkdisk/myfile">
              <li>我的文件</li>
            </NuxtLink>
          </ul>
          <ul>
            <h6>文档服务</h6>
            <li>小组文档</li>
            <li>学习资料</li>
            <li>软件资源</li>
          </ul>
          <ul>
            <h6>公告</h6>
            <NuxtLink to="/proclamation">
              <li>讲课公告</li>
            </NuxtLink>
          </ul>
        </div>
        <div class="containerbottom">
          <span>2023 @ weilai.com 版权所有</span>
          <span> 增值电信业务经营许可证：豫B2-20160169</span>
          <span>豫ICP备14002653号</span>
          <span>
            <img src="/images/beian.0c57706.png" height="80%" alt="" />
            豫公网安备 35020302033941号
          </span>
        </div>
      </div>
      <div class="containerright">
        <div class="img">
          <img src="/images/logo2.png" height="100%" alt="" />
        </div>
        <div class="telinfo">
          <p class="telmy">联系我们:</p>
          <p class="tel">1090649095@qq.com</p>
          <p class="telmy">联系我们:</p>
          <p class="tel">1090649095@qq.com</p>
        </div>
        <div class="wetchat">
          <img src="/images/111112323.png" alt="" />
          <div class="popbox">
            <img src="/images/123213213.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
@media screen and (max-width: 998px) {
  .app-footer {
    .container {
      height: 100%;
      margin: auto;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      .containerleft {
        display: none !important;
      }
      .containerright {
        width: 100% !important;
        text-align: center;
      }
    }
  }
}
.app-footer {
  height: 40vh;
  overflow: hidden;
  width: 100%;
  padding: 0.2rem 0.8rem;
  background-color: #292929;
  .container {
    height: 100%;
    margin: auto;
    display: flex;

    .containerleft {
      width: 80%;
      display: flex;
      flex-direction: column;
      .containertop {
        padding: 0.1rem;
        height: 80%;
        display: flex;
        flex-direction: row;
        width: 100%;

        ul {
          color: hsla(0, 0%, 100%, 0.66);
          font-size: 0.14rem;
          line-height: 1.5;
          list-style: none;
          padding: 0 0.1rem;
          flex: 1;
          height: 100%;
          padding-inline: 0.2rem;

          li {
            color: hsla(0, 0%, 100%, 0.66);
            flex: 1;
            font-size: 0.14rem;
            line-height: 1.5;
            list-style: none;
            cursor: pointer;
            &:hover {
              color: white;
            }
          }
          h6 {
            color: #fff;

            font-size: 0.16rem;
            font-weight: 700;
            line-height: 0.24rem;
            margin-bottom: 0.16rem;
            white-space: nowrap;
          }
        }
      }
      .containerbottom {
        color: white;
        width: 100%;
        display: flex;
        height: 20%;
        padding-top: 0.15rem;
        span {
          position: relative;
          align-items: center;
          display: flex;
          height: 0.24rem;
          padding-right: 0.3rem;
          position: relative;
          flex-direction: row;
        }
        span:before {
          content: "";
          height: 0.12rem;
          position: absolute;
          background-color: rgb(204, 204, 204);
          right: 0.15rem;
          top: 7px;
          width: 1px;
        }
      }
    }
    .containerright {
      display: flex;
      padding-inline: 0.3rem;
      width: 20%;
      flex-direction: column;
      .img {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40%;
        transform: translateX(24px);
      }
      .telinfo {
        width: 100%;
        color: white;
        .telmy {
          font-size: 0.18rem;
          margin-bottom: 0.1rem;
          cursor: pointer;
        }
        .tel {
          color: rgb(8, 85, 249);
          margin-bottom: 0.1rem;
          cursor: pointer;
        }
      }
      .wetchat {
        position: relative;
        height: 0.3rem;
        img {
          height: 100%;
        }
        .popbox {
          height: 2rem;
          width: 2rem;
          position: absolute;
          top: -2.2rem;
          opacity: 0;
          visibility: hidden;
          transition-duration: 0.3s;
        }
        &:hover {
          .popbox {
            opacity: 1;
            visibility: visible;
            transition-duration: 0.3s;
          }
        }
      }
    }
  }
}
</style>
