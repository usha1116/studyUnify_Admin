import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { addSubmittedMarks } from "../../redux/upcomingSlice";
const PendingMark = () => {
  
  const markPendingTests = useSelector((state) => state.upcoming?.pendingTests || []);
  const students = useSelector((state) => state.student.students || []);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [studentMarks, setStudentMarks] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [testsData, setTestsData] = useState([]);

// When you assign marks:
const handleAssignMarks = (newTestData) => {
  setTestsData((prev) => [...prev, newTestData]);
};


  const columns = [
    "No.",
    "Standard",
    "Batch",
    "Subject",
    "Date",
    "Time",
    "Chapters",
    "Total Marks",
    "Actions",
  ];

  const handleOpenMarkModal = (test) => {
    const filteredStudents = students.filter(
      (s) => s.standard === test.standard && s.batch === test.batch
    );

    const initialMarks = {};
    filteredStudents.forEach((s) => {
      initialMarks[s.id] = "";
    });

    setSelectedTest(test);
    setStudentMarks(initialMarks);
    setOpenModal(true);
  };
  const dispatch = useDispatch();

  // const handleSendMarks = () => {
  //   // Normally you'd dispatch action to save marks here
  //   console.log("Submitted marks:", studentMarks);
  //   dispatch(addSubmittedMarks({
  //     testId: selectedTest.id,
  //     studentMarks,
  //   }));
  //   setOpenModal(false);
  //   setShowSuccess(true);
    

  //   setTimeout(() => {
  //     setShowSuccess(false);
  //   }, 2000);
  // };
  const handleSendMarks = () => {
   
  
    const allMarksAssigned = Object.values(studentMarks).every(
      (mark) => mark !== undefined && mark !== null && mark.toString().trim() !== ""
    );
  
    if (!allMarksAssigned) {
      alert("❗ Please assign marks to all students before submitting.");
      return;
    }
  
    dispatch(addSubmittedMarks({
      testId: selectedTest.id,
      testData: selectedTest,
      studentMarks,
     
    }));
    console.log(selectedTest)
    console.log("studentMarks before submit:", studentMarks);
    setOpenModal(false);
    setShowSuccess(true);
  
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
    
  };
  
  
  const renderActions = (item) => (
    <div className="flex items-center justify-center">
      <Button
        label="Send Mark"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenMarkModal(item);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      > Send Mark</Button>
    </div>
  );

  const tableData = markPendingTests.map((test, index) => ({
    id: test.id,
    marks: test.marks,
    values: [
      index + 1,
      test.standard,
      test.batch,
      test.subject,
      test.date,
      `${test.startTime} to ${test.endTime}`,
      test.chapters,
      test.totalMarks,
    ],
  }));

  const filteredStudents = selectedTest
    ? students.filter(
        (s) =>
          s.standard === selectedTest.standard &&
          s.batch === selectedTest.batch
          
      )
      
    : [];
    console.log("Submitted marks:", studentMarks);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pending Marks</h1>
      <Table
        columns={columns}
        data={tableData}
        renderActions={renderActions}
        standardId="pending"
      />

      {/* Main Modal */}
      {openModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Assign Marks</h2>
            {filteredStudents.map((student, index) => (
              <div key={student.id} className="flex justify-between mb-2">
                <span>{index + 1}.</span>
                <span className="flex-1 ml-2">{student.name}</span>
                <input
                  type="text"
                  value={studentMarks[student.id] || ""}
                  onChange={(e) =>
                    setStudentMarks({
                      ...studentMarks,
                      [student.id]: e.target.value,
                    })
                  }
                  className="border-b  p-1 rounded w-24 text-center"
                  placeholder="Marks"
                />
              </div>
            ))}
            <div className="mt-4 flex justify-end gap-2">
              <Button label="Cancel" onClick={() => setOpenModal(false)} >cancel</Button>
              <Button label="Send" onClick={handleSendMarks} variant="blue" > Send</Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Marks sent successfully!
        </div>
      )}

    </div>
  );
};

export default PendingMark;