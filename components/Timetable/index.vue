<template>
  <div class="container">
    <ClientOnly>
      <el-dialog v-model="isEdit" title="课程信息" width="30%" draggable>
        <el-form :model="currentEditCourse" label-position="top">
          <el-form-item label="课程名">
            <el-input v-model="currentEditCourse.info.courseName" />
          </el-form-item>
          <el-form-item label="单双周">
            <el-select
              v-model="currentEditCourse.info.courseWeek"
              placeholder="请选择"
            >
              <el-option label="连续周" value="连续周" />
              <el-option label="单周" value="单周" />
              <el-option label="双周" value="双周" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程开始时间（双周课则为第二周周一）">
            <el-date-picker
              v-model="currentEditCourse.info.courseStartTime"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
              placeholder="选择开课周周一日期"
            />
          </el-form-item>
          <el-form-item label="课程结束时间（结束周周日）">
            <el-date-picker
              v-model="currentEditCourse.info.courseEndTime"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
              placeholder="选择结束周周日日期"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isEdit = false">取消</el-button>
            <el-button type="primary" @click="editCourseFun"> 保存 </el-button>
          </span>
        </template>
      </el-dialog>
    </ClientOnly>
    <el-table
      :data="tableData"
      style="width: 90%; margin-left: 5%; margin-top: 10px; border-radius: 5px"
      :border="true"
      :header-cell-style="{
        height: '60px',
        background: 'rgb(136,187,240) !important',
        color: '#fff',
        border: 'none !important',
        'text-align': 'center',
      }"
      @cell-click="handleCellClick"
      :cell-style="cellContentStyle"
    >
      <el-table-column fixed prop="date" label="" width="80">
        <template #default="props">
          <span style="display: block; width: 100%; text-align: center"
            >{{ props.row.date * 2 + 1 }}-{{ (props.row.date + 1) * 2 }}节</span
          >
        </template>
      </el-table-column>
      <el-table-column fixed prop="monday" label="星期一">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.monday.courseName">{{
              props.row.monday.courseName
            }}</span
            ><br />
            <span v-if="props.row.monday.coursePlace">{{
              props.row.monday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.monday.courseWeek">{{
              props.row.monday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.monday.courseStartTime">{{
              `${props.row.monday.courseStartTime}
                -
                ${props.row.monday.courseEndTime}`
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="tuesday" label="星期二">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.tuesday.courseName">{{
              props.row.tuesday.courseName
            }}</span
            ><br />
            <span v-if="props.row.tuesday.coursePlace">{{
              props.row.tuesday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.tuesday.courseWeek">{{
              props.row.tuesday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.tuesday.courseStartTime">{{
              `${props.row.tuesday.courseStartTime}-${props.row.tuesday.courseEndTime}`
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="wednesday" label="星期三">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.wednesday.courseName">{{
              props.row.wednesday.courseName
            }}</span
            ><br />
            <span v-if="props.row.wednesday.coursePlace">{{
              props.row.wednesday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.wednesday.courseWeek">{{
              props.row.wednesday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.wednesday.courseStartTime">{{
              `${props.row.wednesday.courseStartTime}-${props.row.wednesday.courseEndTime}`
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="thursday" label="星期四">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.thursday.courseName">{{
              props.row.thursday.courseName
            }}</span
            ><br />
            <span v-if="props.row.thursday.coursePlace">{{
              props.row.thursday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.thursday.courseWeek">{{
              props.row.thursday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.thursday.courseStartTime">{{
              `${props.row.thursday.courseStartTime}-${props.row.thursday.courseEndTime}`
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="friday" label="星期五">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.friday.courseName">{{
              props.row.friday.courseName
            }}</span
            ><br />
            <span v-if="props.row.friday.courseName">{{
              props.row.friday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.friday.courseWeek">{{
              props.row.friday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.friday.courseStartTime">{{
              `${props.row.friday.courseStartTime}-${props.row.friday.courseEndTime}`
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="saturday" label="星期六">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.saturday.courseName">{{
              props.row.saturday.courseName
            }}</span
            ><br />
            <span v-if="props.row.saturday.coursePlace">{{
              props.row.saturday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.saturday.courseWeek">{{
              props.row.saturday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.saturday.courseStartTime">{{
              `${props.row.saturday.courseStartTime}-${props.row.saturday.courseEndTime}`
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sunday" label="星期日">
        <template #default="props">
          <div class="courseInfo">
            <span v-if="props.row.sunday.courseName">{{
              props.row.sunday.courseName
            }}</span
            ><br />
            <span v-if="props.row.sunday.coursePlace">{{
              props.row.sunday.coursePlace
            }}</span
            ><br />
            <span v-if="props.row.sunday.courseWeek">{{
              props.row.sunday.courseWeek
            }}</span
            ><br />
            <span v-if="props.row.sunday.courseStartTime">{{
              `${props.row.sunday.courseStartTime}-${props.row.sunday.courseEndTime}`
            }}</span>
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
const course = useCourseStore();
let isEdit = ref(false);

const props = defineProps({
  isEditCourse: Boolean,
  isOthers: Boolean,
  othersInfo: Array<Course>,
});
let tableData: Course[];
if (props.isOthers) {
  tableData = props.othersInfo as Course[];
} else {
  const { courseList } = storeToRefs(course);
  tableData = courseList.value as Course[];
}
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
  courseWeek: string;
  courseStartTime: string;
  courseEndTime: string;
}

let currentEditCourse = reactive({
  date: 0,
  week: "",
  info: {
    courseName: "",
    courseWeek: "",
    courseStartTime: "",
    courseEndTime: "",
  },
});
type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const handleCellClick = (row: Course, column: any, event: any) => {
  if (!props.isEditCourse) {
    return;
  }
  if (column.no != 0) {
    currentEditCourse.date = JSON.parse(JSON.stringify(row.date)) as number;
    currentEditCourse.week = JSON.parse(JSON.stringify(column.property));
    currentEditCourse.info = JSON.parse(
      JSON.stringify(tableData[row.date][column.property as DayOfWeek])
    );
    isEdit.value = true;
  }
};

const editCourseFun = () => {
  isEdit.value = false;
  course.editCourse(
    currentEditCourse.info,
    currentEditCourse.date,
    currentEditCourse.week as DayOfWeek
  );
};

const cellContentStyle = (row: any) => {
  if (row.columnIndex != 0) {
    return {
      backgroundColor: "#fff",
      color: "rgb(133,186,240)",
      cursor: "pointer",
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

.courseInfo {
  text-align: center;
}
</style>
