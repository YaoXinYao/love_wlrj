import { defineStore } from "pinia";

interface infoType {
  courseName: string;
  courseWeek: string;
  courseStartTime: string;
  courseEndTime: string;
}

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
          courseWeek: "",
          courseStartTime: "",
          courseEndTime: "",
        },
        tuesday: {
          courseName: "高数02",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        wednesday: {
          courseName: "高数03",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        thursday: {
          courseName: "高数04",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        friday: {
          courseName: "高数05",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        saturday: {
          courseName: "高数06",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        sunday: {
          courseName: "高数07",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
      },
      {
        date: 1,
        monday: {
          courseName: "高数11",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        tuesday: {
          courseName: "高数12",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        wednesday: {
          courseName: "高数13",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        thursday: {
          courseName: "高数14",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        friday: {
          courseName: "高数15",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        saturday: {
          courseName: "高数16",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        sunday: {
          courseName: "高数17",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
      },
      {
        date: 2,
        monday: {
          courseName: "高数21",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        tuesday: {
          courseName: "高数22",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        wednesday: {
          courseName: "",
          courseWeek: "",
          courseStartTime: "",
          courseEndTime: "",
        },
        thursday: {
          courseName: "高数24",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        friday: {
          courseName: "高数25",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        saturday: {
          courseName: "高数26",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        sunday: {
          courseName: "高数27",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
      },
      {
        date: 3,
        monday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        tuesday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        wednesday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        thursday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        friday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        saturday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        sunday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
      },
      {
        date: 4,
        monday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        tuesday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        wednesday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        thursday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        friday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        saturday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
        },
        sunday: {
          courseName: "高数",
          courseWeek: "单周",
          courseStartTime: "",
          courseEndTime: "",
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
