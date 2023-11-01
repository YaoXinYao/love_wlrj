import { defineStore } from "pinia";

interface infoType {
  courseName: string;
  coursePlace: string;
  courseWeek: string;
  courseWeekLength: string;
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

interface RootState {
  date: number;
  [key: string]: infoType | number;
}
export const useCourseStore = defineStore("course", {
  state: () => ({
    courseList: [
      {
        date: 0,
        monday: {
          courseName: "高数01",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        tuesday: {
          courseName: "高数02",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        wednesday: {
          courseName: "高数03",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        thursday: {
          courseName: "高数04",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        friday: {
          courseName: "高数05",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        saturday: {
          courseName: "高数06",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        sunday: {
          courseName: "高数07",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
      },
      {
        date: 1,
        monday: {
          courseName: "高数11",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        tuesday: {
          courseName: "高数12",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        wednesday: {
          courseName: "高数13",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        thursday: {
          courseName: "高数14",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        friday: {
          courseName: "高数15",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        saturday: {
          courseName: "高数16",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        sunday: {
          courseName: "高数17",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
      },
      {
        date: 2,
        monday: {
          courseName: "高数21",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        tuesday: {
          courseName: "高数22",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        wednesday: {
          courseName: "高数23",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        thursday: {
          courseName: "高数24",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        friday: {
          courseName: "高数25",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        saturday: {
          courseName: "高数26",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
        sunday: {
          courseName: "高数27",
          coursePlace: "0#2",
          courseWeek: "单周",
          courseWeekLength: "1-19周",
        },
      },
      {
        date: 3,
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
        date: 4,
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
        date: 5,
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
    ],
  }),

  actions: {
    editCourse(props: { date: number; week: string }) {
      let courseItem: RootState = this.courseList[props.date];

      if (courseItem) {
        console.log(courseItem[props.week]);
      }
    },
  },
});
