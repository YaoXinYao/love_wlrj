<template>
  <div class="">
    <el-table
      :data="tableData"
      style="width: 90%; margin-left: 5%; margin-top: 10px; border-radius: 5px"
      :border="true"
      :header-cell-style="{
        background: '#fff !important',
        color: '#666',
        border: 'none !important',
        'text-align': 'center',
      }"
      :cell-style="cellStyle"
    >
      <el-table-column fixed prop="date" label="" width="80" />
      <el-table-column fixed prop="monday" label="星期一">
        <template #default="props">
          <textarea
            :value="props.row.monday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
      <el-table-column prop="tuesday" label="星期二">
        <template #default="props">
          <textarea
            :value="props.row.tuesday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
      <el-table-column prop="wednesday" label="星期三">
        <template #default="props">
          <textarea
            :value="props.row.wednesday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
      <el-table-column prop="thursday" label="星期四">
        <template #default="props">
          <textarea
            :value="props.row.thursday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
      <el-table-column prop="friday" label="星期五">
        <template #default="props">
          <textarea
            :value="props.row.friday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
      <el-table-column prop="saturday" label="星期六">
        <template #default="props">
          <textarea
            :value="props.row.saturday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
      <el-table-column prop="saturday" label="星期日">
        <template #default="props">
          <textarea
            :value="props.row.sunday"
            type="text"
            :readonly="!isEditable"
            class="inputCourse"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const handleClick = () => {
  console.log("click");
};

const isEditable = ref(true);
const tableData = [
  {
    date: "1-2",
    monday: "高数",
    tuesday: "物理",
    wednesday: "数据结构",
    thursday: "毛概",
    friday: "java",
    saturday: "c",
    sunday: "大学英语",
  },
  {
    date: "3-4",
    monday: "高数",
    tuesday: "物理",
    wednesday: "数据结构",
    thursday: "毛概",
    friday: "java",
    saturday: "c",
    sunday: "大学英语",
  },
  {
    date: "5-6",
    monday: "高数",
    tuesday: "物理",
    wednesday: "数据结构",
    thursday: "毛概",
    friday: "java",
    saturday: "c",
    sunday: "大学英语",
  },
  {
    date: "7-8",
    monday: "高数",
    tuesday: "物理",
    wednesday: "数据结构",
    thursday: "毛概",
    friday: "java",
    saturday: "c",
    sunday: "大学英语",
  },
  {
    date: "9-10",
    monday: "高数",
    tuesday: "物理",
    wednesday: "数据结构",
    thursday: "毛概",
    friday: "java",
    saturday: "c",
    sunday: "大学英语",
  },
];

const headerStyle = {
  "background-color": "rgba(36,130,108,0.6)",
};

const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    return {
      backgroundColor: "#fff",
      "text-align": "center",
      "font-weight": "700",
      color: "#666",
    };
  } else {
    return {
      backgroundColor: "#fff",
      "text-align": "center",
    };
  }
};
</script>

<style lang="scss" scoped>
.inputCourse {
  display: inline-block;
  width: 100%;
  border: 1px solid transparent;
  outline: none;
  height: auto;
  line-height: 30px;
  padding: 6px;
  color: #666;
  resize: none;
  border-radius: 5px;
  transition: border 0.3s;
  text-align: center;
  // background-color: rgb(183, 213, 245);
  &:hover {
    border: 1px solid rgb(201, 198, 198);
  }
}
</style>
