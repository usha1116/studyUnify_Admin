import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "./standardSlice";
import subjectReducer from "./subjectSlice"; 
import batchReducer from "./batchSlice"
import managerIdReducer from "./managerIdSlice";
import teacherIdReducer from "./TeacherIdSlice";
import managerReducer from "./managerListSlice"
import teacherListReducer from './teacherListSlice'
import upcomingReducer from './upcomingSlice'
import studentIdCreaterReducer from './studentIdCreaterSlice'
import lectureScheduleReducer from './lectureScheduleSlice';
import studentListReducer from './studentListSlice'
import simplemessageReducer from './simplemessageSlice';
import feesinstallmentSliceReducer from './feesinstallmentSlice';

export const store = configureStore({
  reducer: {
     schools: schoolReducer,
    subjects: subjectReducer,
    batches: batchReducer,
    managerId: managerIdReducer,
    teacherId: teacherIdReducer,
    manager: managerReducer,
    upcoming: upcomingReducer,
    teacher: teacherListReducer,
    student : studentListReducer,
    studentIdCreater : studentIdCreaterReducer, 
    lectureSchedule: lectureScheduleReducer,
    simpleMessage: simplemessageReducer,
    fees :feesinstallmentSliceReducer,
  },
});

