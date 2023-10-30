<template>
  <div class="container">
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
      @cell-click="editCourse(1)"
    >
      <el-table-column fixed prop="date" label="" width="80" />
      <el-table-column fixed prop="monday" label="星期一">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.monday.courseName }}</span
            ><br />
            <span>{{ props.row.monday.coursePlace }}</span
            ><br />
            <span>{{ props.row.monday.courseWeek }}</span
            ><br />
            <span>{{ props.row.monday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="tuesday" label="星期二">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.tuesday.courseName }}</span
            ><br />
            <span>{{ props.row.tuesday.coursePlace }}</span
            ><br />
            <span>{{ props.row.tuesday.courseWeek }}</span
            ><br />
            <span>{{ props.row.tuesday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="wednesday" label="星期三">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.wednesday.courseName }}</span
            ><br />
            <span>{{ props.row.wednesday.coursePlace }}</span
            ><br />
            <span>{{ props.row.wednesday.courseWeek }}</span
            ><br />
            <span>{{ props.row.wednesday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="thursday" label="星期四">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.thursday.courseName }}</span
            ><br />
            <span>{{ props.row.thursday.coursePlace }}</span
            ><br />
            <span>{{ props.row.thursday.courseWeek }}</span
            ><br />
            <span>{{ props.row.thursday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="friday" label="星期五">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.friday.courseName }}</span
            ><br />
            <span>{{ props.row.friday.coursePlace }}</span
            ><br />
            <span>{{ props.row.friday.courseWeek }}</span
            ><br />
            <span>{{ props.row.friday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="saturday" label="星期六">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.saturday.courseName }}</span
            ><br />
            <span>{{ props.row.saturday.coursePlace }}</span
            ><br />
            <span>{{ props.row.saturday.courseWeek }}</span
            ><br />
            <span>{{ props.row.monday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="saturday" label="星期日">
        <template #default="props">
          <div class="CourseInfo">
            <span>{{ props.row.saturday.courseName }}</span
            ><br />
            <span>{{ props.row.saturday.coursePlace }}</span
            ><br />
            <span>{{ props.row.saturday.courseWeek }}</span
            ><br />
            <span>{{ props.row.saturday.courseWeekLength }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCourseStore } from "@/store/course";
const handleClick = () => {
  console.log("click");
};
const dialogVisible = ref(false);
const isEditable = ref(true);
const tableData = [
  {
    date: "1-2",
    monday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    tuesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    wednesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    thursday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    friday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    saturday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    sunday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
  },
  {
    date: "3-4",
    monday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    tuesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    wednesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    thursday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    friday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    saturday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    sunday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
  },
  {
    date: "1-2",
    monday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    tuesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    wednesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    thursday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    friday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    saturday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    sunday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
  },
  {
    date: "5-6",
    monday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    tuesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    wednesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    thursday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    friday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    saturday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    sunday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
  },
  {
    date: "7-8",
    monday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    tuesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    wednesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    thursday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    friday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    saturday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    sunday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
  },
  {
    date: "9-10",
    monday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    tuesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    wednesday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    thursday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    friday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    saturday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
    sunday: {
      courseName: "高数",
      coursePlace: "0#2",
      courseWeek: "单周",
      courseWeekLength: "1-19周",
    },
  },
];

const { editCourse } = useCourseStore();
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

interface infoType {
  courseName: string;
  coursePlace: string;
  courseWeek: string;
  courseWeekLength: string;
}
const props = defineProps(["editCourse"]);
props.editCourse("我是子组件的函数");
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
