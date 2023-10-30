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
  state: () => {
    return {
      course: [
        {
          date: 0,
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
          date: 1,
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
          date: 2,
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
    };
  },

  actions: {
    editCourse(date: number, week: string) {
      let courseItem: RootState = this.course[date];
      if (courseItem) {
        console.log(courseItem[week]);
      }
    },
  },
});
