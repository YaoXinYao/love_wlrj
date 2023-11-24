export interface CourseType {
  courseBeginDate: string;
  courseEndDate: string;
  courseIsDouble: boolean;
  courseIsDelete: boolean;
  courseName: string;
  courseOrder: number;
  courseUserId: number;
  courseWeek: number;
}

interface infoType {
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

export interface Course {
  date: number;
  monday: CourseDetail;
  tuesday: CourseDetail;
  wednesday: CourseDetail;
  thursday: CourseDetail;
  friday: CourseDetail;
  saturday: CourseDetail;
  sunday: CourseDetail;
}

export interface CourseDetail {
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

export interface Course {
  date: number;
  monday: CourseDetail;
  tuesday: CourseDetail;
  wednesday: CourseDetail;
  thursday: CourseDetail;
  friday: CourseDetail;
  saturday: CourseDetail;
  sunday: CourseDetail;
}

export type DayOfWeekString =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
