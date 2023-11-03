<template>
  <div class="container">
    <AddAccessInfo :dialogVisible="dialogVisible" @addAlert="addAlertHandle" />
    <el-form :inline="true" :model="searchKeys">
      <el-form-item label="考核名称"
        ><el-input
          v-model="searchKeys.accessName"
          placeholder="考核名称"
          clearable
      /></el-form-item>
      <el-form-item label="考核类型"
        ><el-select v-model="searchKeys.accessType" placeholder="类型">
          <el-option
            v-for="item in searchKeys.accessType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          /> </el-select
      ></el-form-item>
      <el-form-item label="考核类别"
        ><el-select v-model="searchKeys.accessType" placeholder="类别">
          <el-option
            v-for="item in searchKeys.accessType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          /> </el-select
      ></el-form-item>
      <el-form-item label="考核时间">
        <el-date-picker
          v-model="searchKeys.accessTime"
          type="datetime"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="考核发起人"
        ><el-input
          v-model="searchKeys.accessPromoter"
          placeholder="考核发起人"
          clearable
      /></el-form-item>
      <el-form-item label="考核对象"
        ><el-input
          v-model="searchKeys.accessTarget"
          placeholder="考核对象"
          clearable
      /></el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="warning">重置</el-button>
        <el-button type="success" @click="addAlert">新增</el-button>
      </el-form-item>
    </el-form>
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
              <el-table-column type="expand">
                <template #default="accessComment">
                  <div class="accessInfo">
                    <h3>评语</h3>
                    <div>
                      <div
                        class="commentItem"
                        v-for="(c, index) in accessComment.row.comments"
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
              <el-table-column label="姓名" prop="姓名" />
              <el-table-column label="代码" prop="代码" />
              <el-table-column label="完成度" prop="完成度" />
              <el-table-column label="基础知识" prop="基础知识" />
              <el-table-column label="平时分" prop="平时分" />
            </el-table>
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
      <el-table-column label="考核发起者" prop="accessPromoter" />
      <el-table-column label="考核对象" prop="accessTarget" />
      <el-table-column label="考核时间" prop="date" />
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :small="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
definePageMeta({
  layout: "manag",
});

const dialogVisible = ref(false);
const currentPage = ref(4);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

let searchKeys = reactive({
  accessName: "",
  accessPromoter: "",
  accessTarget: "",
  accessTime: "",
  accessType: [
    {
      value: "Option1",
      label: "Option1",
    },
    {
      value: "Option2",
      label: "Option2",
      disabled: true,
    },
    {
      value: "Option3",
      label: "Option3",
    },
  ],
});

const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = [
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    accessTarget: "2023级",
    accessPromoter: "2022级",
    sonTable: [
      {
        姓名: "张三",
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
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
        姓名: "张三",
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
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
        姓名: "张三",
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
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
        姓名: "张三",
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
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
    ],
  },
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    accessTarget: "2023级",
    accessPromoter: "2022级",
    sonTable: [
      {
        代码: 0,
        完成度: 0,
        基础知识: 0,
        平时分: 0,
      },
    ],
  },
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    accessTarget: "2023级",
    accessPromoter: "2022级",
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
    accessTarget: "2023级",
    accessPromoter: "2022级",
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
    accessTarget: "2023级",
    accessPromoter: "2022级",
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
];

const addAlert = () => {
  dialogVisible.value = !dialogVisible.value;
};

const addAlertHandle = (props: boolean) => {
  dialogVisible.value = props;
};
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.container {
  padding: 20px 20px;
}
.accessInfo {
  width: 90%;
  padding-left: 5%;
  margin-top: 5px;

  .accessScore {
    margin-left: 8px;
  }

  h3 {
    margin: 10px;
    line-height: 30px;
    img {
      width: 20px;
    }
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
      width: 20px;
    }
  }
  p {
    height: auto;
    line-height: 25px;
  }
}
</style>
