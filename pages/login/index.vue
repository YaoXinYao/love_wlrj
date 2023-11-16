<template>
  <div
    class="loginpage"
    style="
       {
        overflow: hidden;
      }
    "
  >
    <div class="container animate__zoomInDown animate__animated">
      <div :class="`loginbox ${isshow ? 'activebox' : ''}`">
        <div class="loginboxleft"></div>
        <div class="loginboxright">
          <h2 class="animate__animated animate__bounceInDown">登录</h2>
          <el-form
            ref="ruleFormRef"
            :model="loginmodel == 0 ? ruleForm : Emailrules"
            status-icon
            :rules="rules"
            style="width: 90%"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                class="elinput"
                v-model="ruleForm.username"
                :placeholder="loginmodel == 0 ? '请输入学号' : '请输入你的邮箱'"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item v-if="loginmodel == 0" prop="password">
              <!-- 密码输入框 -->
              <el-input
                class="elinput"
                v-model="ruleForm.password"
                type="password"
                prefix="密码"
                show-password
                @focus="() => changeback(true)"
                @blur="() => changeback(false)"
                placeholder="请输入密码"
                autocomplete="off"
              >
              </el-input>
            </el-form-item>
            <!-- 验证码输入框 -->
            <el-form-item v-if="loginmodel == 1" props="code">
              <el-input
                class="elinput"
                v-model="ruleForm.code"
                type="text"
                placeholder="请输入验证码"
                autocomplete="off"
              >
                <template v-slot:suffix>
                  <el-button type="primary">发送验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="loginbt" @click="login">
            <TransitionButton
              :class="
                !loginanimin
                  ? 'animate__animated animate__backInUp '
                  : 'animate__animated animate__hinge'
              "
              innertext="登录"
            />
          </div>
        </div>
      </div>
      <canvas style="position: fixed" ref="canvasRef"></canvas>
    </div>
  </div>
</template>
<script setup lang="ts">
import "animate.css";
import { Userloginany } from "~/service/homeApi";
import type { FormInstance, FormRules } from "element-plus";
import { useHomestore } from "~/store/home";
//定义登录的模板
definePageMeta({
  layout: "custom",
});
const Homestore = useHomestore();
const ruleFormRef = ref<FormInstance>();
const isshow = ref(false);
const loginanimin = ref(false);
const loginmodel = ref(0); // 0 账号密码登录，1邮箱验证码登录
const ruleForm = ref({
  username: "",
  password: "",
  code: "",
});
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length !== 11) {
    callback(new Error("请输入11位学号"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value == "") {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};
const EmaildatePass = (rule: any, value: string, callback: any) => {
  const emailreg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailreg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱格式不正确"));
  }
};
const Emaildatecode = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("验证码不能为空"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validatePass, trigger: "blur" }],
  password: [{ validator: validatePass2, trigger: "blur" }],
});
const Emailrules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: EmaildatePass, trigger: "blur" }],
  password: [{ validator: Emaildatecode, trigger: "blur" }],
});
function error() {
  loginanimin.value = true;
  setTimeout(() => {
    loginanimin.value = false;
  }, 2000);
}
function changeback(val: boolean) {
  isshow.value = val;
}
async function login() {
  if (!ruleFormRef) return;
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      const { username, password } = ruleForm.value;
      const res = await Userloginany({
        userAccount: username,
        userPassword: password,
      });
      const info = res.data.value;
      switch (info.code) {
        case 20000:
          Homestore.Changeuserinfo(info.data);
          ElMessage({
            message: "登录成功",
            type: "success",
          });
          //navigateTo("/");
          break;
        case 52002:
          error();
          ElMessage({
            message: "账号或密码错误",
            type: "error",
          });
          break;
        default:
          error();
          ElMessage({
            message: "登录失败",
            type: "error",
          });
          break;
      }
    } else {
      ElMessage({
        message: "信息不全",
        type: "warning",
      });
      return false;
    }
  });
}
const canvasRef = ref<HTMLCanvasElement>();
let CharIndex: any[] = [];
onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas == null) return;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  if (!ctx) return;

  const devicePixelRatio = window.devicePixelRatio || 1;

  function init() {
    canvas!.width = window.innerWidth * devicePixelRatio;
    canvas!.height = window.innerHeight * devicePixelRatio;
    CharIndex = new Array(
      Math.floor(canvas!.width / (12 * devicePixelRatio))
    ).fill(0);
  }
  init();
  const fontSize = 12 * devicePixelRatio;
  ctx.font = `${fontSize}px Cambria, Cochin, Georgia, Times, "Times New Roman", serif`;

  function getRandomChar() {
    const str =
      "✧☹︎☠︎☸︎☣︎☢︎☯︎♾♲✰❤︎✦⚛︎☭☮︎⚔︎⚒︎☄︎✵⚰︎☘︎⚘♨︎✞☺︎♘♞☆☃︎★☼☀︎☾◎☽☁︎™Ω℞№ℹ︎❂❁✡︎✣✶✺✷◦◉⦿☒✗☐☞◇☛⚙︎☑︎⌘✘✔︎";
    return str[Math.floor(Math.random() * str.length)];
  }
  function draw() {
    const newCharIndex = [...CharIndex];
    ctx.fillStyle = "rgba(251,251,251,0.1)";
    ctx.fillRect(0, 0, canvas!.width, canvas!.height);
    ctx.fillStyle = "rgba(127,155,229, 1)";
    ctx.textBaseline = "top";

    newCharIndex.forEach((index, i) => {
      const x = i * fontSize;
      const y = index * fontSize;
      ctx.fillText(getRandomChar(), x, y);
      if (y > canvas!.height && Math.random() > 0.99) {
        newCharIndex[i] = 0;
      } else {
        newCharIndex[i] = index + 1;
      }
    });
    CharIndex = newCharIndex;
  }

  const intervalId = setInterval(draw, 40);
  window.addEventListener("resize", function () {
    // 在窗口大小变化时执行的代码
    init();
  });
  return () => clearInterval(intervalId);
});
</script>
<style scoped lang="scss">
@media screen and (max-width: 760px) {
  .loginbox {
    width: 90% !important;
    height: 7rem !important;
    flex-direction: column;
    align-items: center;
  }
  .loginboxleft {
    width: 84% !important;
  }
  .loginboxright {
    width: 80% !important;
  }
}
.loginpage {
  z-index: 99999;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginbox {
      z-index: 999999;
      width: 8rem;
      height: 4rem;
      padding: 0.5rem;
      padding-top: 0.2rem;
      left: 50%;
      top: 50%;
      background-color: white;
      border-radius: 10px;
      background-image: url(/images/22_open.4ea5f239.png),
        url(/images/33_open.f7d7f655.png);
      box-shadow: 0 4px 14px 0 rgb(0 0 0 / 16%);
      background-position: 0 100%, 100% 100%;
      background-repeat: no-repeat, no-repeat;
      background-size: 14%;
      display: flex;
      backdrop-filter: blur(40px);

      .loginboxleft {
        width: 40%;
        height: 100%;
        background-image: url(/images/小组logo.png);
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
      }
      .loginboxright {
        padding-top: 0.2rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 60%;
        height: 100%;
        h2 {
          margin-bottom: 0.2rem;
          user-select: none;
        }
        .elinput {
          height: 0.5rem;
        }
        .loginbt {
          margin-top: 0.2rem;
          width: 90%;
        }
      }
    }
    .activebox {
      background-image: url("/images/22_close.9382a5a8.png"),
        url("/images/33_close.a8c18fc8.png") !important;
    }
  }
}
</style>
