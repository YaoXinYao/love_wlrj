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
      @cell-click="handleCellClick"
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
import { storeToRefs } from "pinia";
const dialogVisible = ref(false);
const isEditable = ref(true);
const course = useCourseStore();

interface Course {
  date: number;
  monday: CourseDetail;
  tuesday: CourseDetail;
  wednesday: CourseDetail;
  thursday: CourseDetail;
  friday: CourseDetail;
  saturday: CourseDetail;
  sunday: CourseDetail;
}

interface CourseDetail {
  courseName: string;
  coursePlace: string;
  courseWeek: string;
  courseWeekLength: string;
}
const { courseList } = storeToRefs(course);
const tableData: Course[] = courseList.value;
console.log(tableData[0]);

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

// course.editCourse({ date: 0, week: "monday" });
type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
const handleCellClick = (row: Course, column: any, event: any) => {
  const rowData = Object.assign({}, row); // 将代理对象转换为普通对象
  console.log("Cell clicked row:", row);
  console.log("Cell clicked column:", column);
  console.log("Cell clicked event:", event);
  console.log(tableData[row.date][column.property as DayOfWeek]);

  // 在这里可以处理单元格点击事件的逻辑
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
