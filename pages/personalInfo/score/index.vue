<template>
  <div class="container">
    <div class="echarts"><Echarts /></div>

    <el-table :data="tableData" :border="parentBorder" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div class="accessInfo">
            <h3>成绩</h3>
            <el-table
              :data="props.row.sonTable"
              :border="childBorder"
              class="accessScore"
            >
              <el-table-column label="代码" prop="代码" />
              <el-table-column label="完成度" prop="完成度" />
              <el-table-column label="基础知识" prop="基础知识" />
              <el-table-column label="平时分" prop="平时分" />
            </el-table>
          </div>
          <div class="accessInfo">
            <h3>评语</h3>
            <div>
              <div
                class="commentItem"
                v-for="(c, index) in props.row.comments"
                :key="index"
              >
                <span class="reviewer"
                  ><img src="@/assets/image/评价.png" alt="" />评语{{
                    index + 1
                  }}</span
                >
                <p>{{ c.commentInfo }}</p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="考核名称" prop="name" />
      <el-table-column label="考核类型" prop="type">
        <template #default="scope"
          ><el-tag size="large">{{ scope.row.type }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="考核类别" prop="assessType">
        <template #default="scope"
          ><el-tag size="large" type="success">{{
            scope.row.assessType
          }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="考核时间" prop="date" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = [
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    sonTable: [
      {
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
      },
    ],
    comments: [
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
    ],
  },
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    sonTable: [
      {
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
      },
    ],
    comments: [
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
    ],
  },
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    sonTable: [
      {
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
      },
    ],
    comments: [
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
    ],
  },
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    sonTable: [
      {
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
      },
    ],
    comments: [
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
    ],
  },
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    sonTable: [
      {
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
      },
    ],
    comments: [
      {
        name: "person1",
        commentInfo:
          "这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
      {
        name: "person1",
        commentInfo: "这是评价这是评价这是评价这是评价这是评价",
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.echarts {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px 0;
}
.container {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}

.accessInfo {
  width: 90%;
  padding-left: 10%;
  margin-top: 5px;

  .accessScore {
    margin-left: 8px;
  }

  h3 {
    margin: 10px;
  }
}

.commentItem {
  font-family: "Times New Roman", Times, serif;
  margin-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  margin-left: 8px;
  .reviewer {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $groupColor;
    height: 30px;

    img {
      width: 25px;
    }
  }
  p {
    height: auto;
    line-height: 30px;
    margin-top: 5px;
  }
}
</style>
