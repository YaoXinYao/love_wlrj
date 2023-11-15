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
              v-model="currentEditCourse.info.courseIsDouble"
              placeholder="Select"
            >
              <el-option label="连续周" value="false" />
              <el-option label="单双周" value="true" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程开始时间（双周课则为第二周周一）">
            <el-date-picker
              v-model="currentEditCourse.info.courseBeginDate"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="选择开课周周一日期"
            />
          </el-form-item>
          <el-form-item label="课程结束时间（结束周周日）">
            <el-date-picker
              v-model="currentEditCourse.info.courseEndDate"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="选择结束周周日日期"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="deleteCourseFun">删除</el-button>
            <el-button type="primary" @click="editCourseFun"> 保存 </el-button>
          </span>
        </template>
      </el-dialog>

      <el-table
        :data="timetableList"
        style="
          width: 90%;
          margin-left: 5%;
          margin-top: 10px;
          border-radius: 5px;
        "
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
              >{{ props.row.date * 2 + 1 }}-{{
                (props.row.date + 1) * 2
              }}节</span
            >
          </template>
        </el-table-column>
        <el-table-column fixed prop="monday" label="星期一">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.monday.courseName">
              <span>{{ props.row.monday.courseName }}</span
              ><br />
              <span>{{
                props.row.monday.courseIsDouble == false ? "连续周" : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.monday.courseBeginDate}
                -
                ${props.row.monday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.monday.courseName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="tuesday" label="星期二">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.tuesday.courseName">
              <span>{{ props.row.tuesday.courseName }}</span
              ><br />
              <span>{{
                props.row.tuesday.courseIsDouble == false ? "连续周" : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.tuesday.courseBeginDate}-${props.row.tuesday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.tuesday.courseName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="wednesday" label="星期三">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.wednesday.courseName">
              <span>{{ props.row.wednesday.courseName }}</span
              ><br />
              <span>{{
                props.row.wednesday.courseIsDouble == false
                  ? "连续周"
                  : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.wednesday.courseBeginDate}-${props.row.wednesday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.wednesday.courseName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="thursday" label="星期四">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.thursday.courseName">
              <span>{{ props.row.thursday.courseName }}</span
              ><br />
              <span>{{
                props.row.thursday.courseIsDouble == false ? "连续周" : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.thursday.courseBeginDate}-${props.row.thursday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.thursday.courseName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="friday" label="星期五">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.friday.courseName">
              <span>{{ props.row.friday.courseName }}</span
              ><br />
              <span>{{
                props.row.friday.courseIsDouble == false ? "连续周" : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.friday.courseBeginDate}-${props.row.friday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.friday.courseName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="saturday" label="星期六">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.saturday.courseName">
              <span>{{ props.row.saturday.courseName }}</span
              ><br />
              <span>{{
                props.row.saturday.courseIsDouble == false ? "连续周" : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.saturday.courseBeginDate}-${props.row.saturday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.saturday.courseName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="sunday" label="星期日">
          <template #default="props">
            <div class="courseInfo" v-if="props.row.sunday.courseName">
              <span>{{ props.row.sunday.courseName }}</span
              ><br />
              <span>{{
                props.row.sunday.courseIsDouble == false ? "连续周" : "单双周"
              }}</span
              ><br />
              <span>{{
                `${props.row.sunday.courseBeginDate}-${props.row.sunday.courseEndDate}`
              }}</span>
            </div>
            <span v-if="!props.row.sunday.courseName"></span>
          </template>
        </el-table-column>
      </el-table>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useCourseStore } from "@/store/course";
import { storeToRefs } from "pinia";
import { useGetTimetable } from "@/hooks/useGetTimetable";
import {
  addTimetable,
  deleteTimetable,
  getTimetable,
  updateTimetable,
} from "~/service/user";

const course = useCourseStore();
let isEdit = ref(false);

const props = defineProps({
  isEditCourse: Boolean,
  isOthers: Boolean,
  othersInfo: Array<CourseDetail[]>,
});

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
  courseId: string;
  courseUserId: number;
  courseWeek: number;
  courseName: string;
  courseOrder: number;
  courseBeginDate: string;
  courseEndDate: string;
  courseIsDouble: boolean;
  courseIsDelete: boolean;
}

let timetableList: Course[] = await useGetTimetable("4");

let currentEditCourse = reactive({
  courseOrder: 0,
  week: "",
  info: {
    courseId: "-1",
    courseUserId: -1,
    courseWeek: -1,
    courseName: "",
    courseOrder: -1,
    courseBeginDate: "",
    courseEndDate: "",
    courseIsDouble: false,
    courseIsDelete: false,
  },
});
type DayOfWeekString =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";
const handleCellClick = (row: any, column: any, event: any) => {
  console.log(column.property);

  if (!props.isEditCourse) {
    return;
  }
  if (column.no != 0) {
    currentEditCourse.courseOrder = JSON.parse(
      JSON.stringify(row.date)
    ) as number;
    currentEditCourse.week = JSON.parse(JSON.stringify(column.property));
    currentEditCourse.info = JSON.parse(
      JSON.stringify(
        timetableList[row.date][column.property as DayOfWeekString]
      )
    );
    isEdit.value = true;
  }
};
let weekDay = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const editCourseFun = () => {
  isEdit.value = false;
  course.editCourse(
    currentEditCourse.info,
    currentEditCourse.courseOrder,
    currentEditCourse.week
  );

  let { courseBeginDate, courseEndDate, courseIsDouble, courseName } =
    currentEditCourse.info;

  let courseWeek = weekDay.indexOf(currentEditCourse.week) as number;
  let props = {
    courseId: null,
    courseBeginDate,
    courseEndDate,
    courseIsDouble,
    courseIsDelete: false,
    courseName,
    courseOrder: currentEditCourse.courseOrder * 1 + 1,
    courseWeek,
    courseUserId: "4",
  };
  if (currentEditCourse.info.courseId == "-1") {
    addTimetable(props).then((res) => {
      console.log(res);
    });
  } else {
    updateTimetable({ ...currentEditCourse.info, courseUserId: "4" }).then(
      async (res) => {
        if (res.data.value.code === 20000) {
          ElMessage({
            type: "success",
            message: "添加成功",
          });
          timetableList = await useGetTimetable("4");
        }
      }
    );
  }
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

const deleteCourseFun = () => {
  ElMessageBox.confirm("确认要删除该课程吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      let courseId = currentEditCourse.info.courseId;
      if (courseId == "-1") {
        ElMessage({
          type: "warning",
          message: "暂无课程",
        });
        isEdit.value = false;
      } else {
        deleteTimetable(courseId).then(async (res) => {
          console.log(res);
          if (res.data.value.code === 20000) {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            timetableList = await useGetTimetable("4");
          } else {
            ElMessage({
              type: "error",
              message: "删除失败",
            });
          }
          isEdit.value = false;
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
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
