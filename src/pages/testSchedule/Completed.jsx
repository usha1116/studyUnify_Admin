// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Table from "../../component/Table";

// const Completed = () => {
//   const completedTests = useSelector((state) => state.upcoming?.completedTests || []);
//   console.log("Completed Tests: ", completedTests);

//   const students = useSelector((state) => state.student?.students || []);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [studentList, setStudentList] = useState([]);

//   const columns = [
//     { header: "No.", accessor: (_, index) => index + 1 },
//     { header: "Standard", accessor: "standard" },
//     { header: "Batch", accessor: "batch" },
//     { header: "Subject", accessor: "subject" },
//     { header: "Date", accessor: "date" },
//     { header: "Time", accessor: (row) => row.Time },
//     { header: "Chapters", accessor: "chapterCount" },
//     { header: "Marks", accessor: "totalMarks" },
//   ];

//   const dataWithIndex = completedTests.map((item, i) => ({
//     ...item,
//     _index: i,
//   }));

//   // const handleRowClick = (e) => {
//   //   const row = e.target.closest("tr");
//   //   if (!row || row.rowIndex === 0) return; // skip header row

//   //   const index = row.rowIndex - 1;
//   //   const test = dataWithIndex[index];
//   //   if (!test) return;

//   //   setSelectedTest(test);

//   //   const relatedStudents = students.filter(
//   //     (s) => s.schools === test.schools && s.batches === test.batches
//   //   );

//   //   // ✅ Create a lookup for marks using studentId
//   //   const marksLookup = {};
//   //   test.studentMarks?.forEach(({ studentId, marks }) => {
//   //     marksLookup[studentId] = marks;
//   //   });

//   //   setStudentList(
//   //     relatedStudents.map((student) => ({
//   //       ...student,    
//   //       mark: marksLookup[student.id] || "N/A",
//   //     }))
      
//   //   );
//   //   console.log("Related Students:", relatedStudents);

//   //   setOpenModal(true);
//   // };
  
//   const handleRowClick = (e) => {
//     const row = e.target.closest("tr");
//     if (!row || row.rowIndex === 0) return; // skip header row
  
//     const index = row.rowIndex - 1;
//     const test = dataWithIndex[index];
//     if (!test) return;
  
//     setSelectedTest(test);
  
//     const relatedStudents = students.filter(
//       (s) => s.schools === test.schools && s.batches === test.batches
//     );
  
//     const marksLookup = {};
//     test.studentMarks?.forEach(({ studentId, marks }) => {
//       marksLookup[studentId] = marks;
//     });
  
//     const newStudentList = relatedStudents.map((student) => ({
//       ...student,
//       mark: marksLookup[student.id] || "N/A",
//     }));
  
//     setStudentList(newStudentList);
//     setOpenModal(true);
//   };
  
//   console.log("Students Data:", students);
  

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Completed Test Schedule</h1>

//       <div onClick={handleRowClick}>
//         <Table columns={columns} data={dataWithIndex} />
//       </div>

//       {/* Modal for viewing student marks */}
//       {openModal && selectedTest && (
//         <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">
//               Marks for: {selectedTest.subject} ({selectedTest.schools} {selectedTest.batches})
//             </h2>
//             <div className="space-y-2">
//               {studentList.length > 0 ? (
//                 console.log("student List",studentList),
//                 studentList.map((student, index) => (
//                   <div key={student.id} className="flex justify-between border-b py-1">
//                     <span>{index + 1}. {student.name}</span>
//                     <span>Marks: {student.mark}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p>No students found for this test.</p>
//               )}
//             </div>
//             <div className="mt-4 text-right">
//               <button
//                 onClick={() => setOpenModal(false)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Completed;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../component/Table";

const Completed = () => {
  const completedTests = useSelector((state) => state.upcoming?.completedTests || []);
  const students = useSelector((state) => state.student?.students || []);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [studentList, setStudentList] = useState([]);

  const columns = [
    { header: "No.", accessor: (_, index) => index + 1 },
    { header: "Standard", accessor: "standard" },
    { header: "Batch", accessor: "batch" },
    { header: "Subject", accessor: "subject" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Chapters", accessor: "chapterCount" },
    { header: "Marks", accessor: "totalMarks" },
  ];

  const dataWithIndex = completedTests.map((item, i) => ({
    ...item,
    _index: i,
  }));

  const handleRowClick = (e) => {
    const row = e.target.closest("tr");
    if (!row || row.rowIndex === 0) return;

    const index = row.rowIndex - 1;
    const test = dataWithIndex[index];
    if (!test) return;

    setSelectedTest(test);

    const relatedStudents = students.filter(
      (s) => s.standard === test.standard && s.batch === test.batch
    );

    const marksLookup = {};
    test.studentMarks?.forEach(({ studentId, marks }) => {
      marksLookup[studentId] = marks;
    });

    const newStudentList = relatedStudents.map((student) => ({
      ...student,
      mark: marksLookup[student.id] || "N/A",
    }));

    setStudentList(newStudentList);
    setOpenModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Completed Test Schedule</h1>

      <div onClick={handleRowClick} style={{ cursor: 'pointer' }}>
        <Table columns={columns} data={dataWithIndex} />
      </div>

      {openModal && selectedTest && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Marks for: {selectedTest.subject} ({selectedTest.standard} {selectedTest.batch})
            </h2>
            <div className="space-y-2">
              {studentList.length > 0 ? (
                studentList.map((student, index) => (
                  <div key={student.id} className="flex justify-between border-b py-1">
                    <span>{index + 1}. {student.name}</span>
                    <span>Marks: {student.mark}</span>
                  </div>
                ))
              ) : (
                <p>No students found for this test's standard and batch.</p>
              )}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Completed;