import { getTimetable } from "~/service/user";
let weekDay = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const useGetTimetable = async (userId: number) => {
  let res = await getTimetable(userId);
  let timetableData: any = res.data.value.data;

  let tableInfo: any = reactive([{}, {}, {}, {}, {}]);
  for (let i = 0; i < timetableData.length; i++) {
    tableInfo[i].date = i;
    for (let j = 0; j < timetableData[i].length; j++) {
      tableInfo[i][weekDay[timetableData[i][j].courseWeek-1]] =
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
