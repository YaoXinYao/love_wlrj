import { defineStore } from "pinia";

interface infoType {
  courseName: string;
  coursePlace: string;
  courseWeek: string;
  courseWeekLength: Array<number>;
}

// interface RootState {
//   date: number;
//   monday: infoType;
//   tuesday: infoType;
//   wednesday: infoType;
//   thursday: infoType;
//   friday: infoType;
//   saturday: infoType;
//   sunday: infoType;
// }
type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const useCourseStore = defineStore("course", {
  state: () => ({
    courseList: [
      {
        date: 0,
        monday: {
          courseName: "",
          coursePlace: "",
          courseWeek: "",
          courseWeekLength: [],
        },
        tuesday: {
          courseName: "高数02",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        wednesday: {
          courseName: "高数03",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        thursday: {
          courseName: "高数04",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        friday: {
          courseName: "高数05",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        saturday: {
          courseName: "高数06",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        sunday: {
          courseName: "高数07",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
      },
      {
        date: 1,
        monday: {
          courseName: "高数11",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        tuesday: {
          courseName: "高数12",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        wednesday: {
          courseName: "高数13",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        thursday: {
          courseName: "高数14",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        friday: {
          courseName: "高数15",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        saturday: {
          courseName: "高数16",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        sunday: {
          courseName: "高数17",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
      },
      {
        date: 2,
        monday: {
          courseName: "高数21",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        tuesday: {
          courseName: "高数22",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        wednesday: {
          courseName: "",
          coursePlace: "",
          courseWeek: "",
          courseWeekLength: [],
        },
        thursday: {
          courseName: "高数24",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        friday: {
          courseName: "高数25",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        saturday: {
          courseName: "高数26",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        sunday: {
          courseName: "高数27",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
      },
      {
        date: 3,
        monday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        tuesday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        wednesday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        thursday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        friday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        saturday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        sunday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
      },
      {
        date: 4,
        monday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        tuesday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        wednesday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        thursday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        friday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        saturday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
        sunday: {
          courseName: "高数",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: [1, 19],
        },
      },
    ],
  }),

  actions: {
    editCourse(info: infoType, date: number, week: DayOfWeek) {
      this.courseList[date][week] = info;
    },
  },
});
