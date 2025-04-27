import './App.css'
// import SchoolList from './pages/SchoolList'
// import SubjectPage from './pages/SubjectPage'
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Batch from "./pages/Batch";
import Standard from './pages/Standard';
import Subject from './pages/Subject';
import StudentIdCreater from './pages/idCreation/StudentIdCreater';
import ManagerId from './pages/idCreation/ManagerId';
import TeacherId from './pages/idCreation/TeacherId';
import ManagerList from './pages/idCreation/ManagerList';
import TeacherList from './pages/idCreation/TeacherList';
import Advertisement from './pages/Notice/Advertisement';

import Upcoming from './pages/testSchedule/Upcoming';
import PendingMark from './pages/testSchedule/pendingMark';
import Completed from './pages/testSchedule/Completed';

import StudentList from './pages/idCreation/StudentList';
import LectureSchedule from './pages/LectureShcedule';
import Holiday from './pages/holiday/Holiday';
import Simplemessage from './pages/Message/Simplemessage';
import Feesinstallment from './pages/Fees/Feesinstallment';
import BatchProgress from './pages/progressReport/BatchProgress';
import StudentReport from './pages/progressReport/StudentReport';
import MarkMessage from './pages/Message/MarkMessage';

function App() {

  return (

    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4 overflow-x-auto overflow-y-hidden ">
        <Routes>
          <Route path="/subject" element={<Subject />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/standard" element={<Standard />} />
          <Route path="/student-id-creator" element={<StudentIdCreater />} />
          <Route path="/managerid" element={<ManagerId />} />
          <Route path="/teacherid" element={<TeacherId />} />
          <Route path="/manager-list" element={<ManagerList />} />
          <Route path='/teacher-id-list' element={<TeacherList />} />
          <Route path='/student-id-list' element={<StudentList />} />
          <Route path='advertisement' element={<Advertisement />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/mark-pending" element={<PendingMark />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/holiday-schedule" element={<Holiday />} />
          <Route path='/lecture-schedules' element={<LectureSchedule />} />
          <Route path='/simple-message' element={<Simplemessage />} />
          <Route path='/installment-creation' element={<Feesinstallment />} />
          <Route path='/batch-progress-report' element={<BatchProgress />} />
          <Route path='/student-progress-report' element={<StudentReport/>}></Route>
          <Route path='/mark-message' element={<MarkMessage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
