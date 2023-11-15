import { getTimetable } from "~/service/user";
let weekDay = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

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
  courseIsDouble: string;
  courseIsDelete: boolean;
}
export const useGetTimetable = async (userId: string) => {
  let res = await getTimetable(userId);
  let timetableData: any = res.data.value.data;

  let tableInfo: any = reactive([{}, {}, {}, {}, {}]);
  for (let i = 0; i < timetableData.length; i++) {
    tableInfo[i].date = i;
    for (let j = 0; j < timetableData[i].length; j++) {
      tableInfo[i][weekDay[timetableData[i][j].courseWeek]] =
        timetableData[i][j];
    }

    for (let j = 0; j < weekDay.length; j++) {
      let flag = tableInfo[i].hasOwnProperty(weekDay[j]);
      if (flag == false) {
        tableInfo[i][weekDay[j]] = {
          courseId: "-1",
          courseUserId: -1,
          courseWeek: -1,
          courseName: "",
          courseOrder: -1,
          courseBeginDate: "",
          courseEndDate: "",
          courseIsDouble: false,
          courseIsDelete: false,
        };
      }
    }
  }

  return tableInfo;
};
