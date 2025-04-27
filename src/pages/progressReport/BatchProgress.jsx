// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Formik, Form, Field } from "formik";
// import Table from "../../component/Table";
// import Button from "../../component/Button";

// const BatchProgress = () => {
//   const completedTests = useSelector((state) => state.upcoming?.completedTests || []);
//   console.log("completed test",completedTests); // Debug: Check the structure of completedTests

//   const students = useSelector((state) => state.student?.students || []);
//   const standards = useSelector((state) => state.schools?.schools || []);
//   const batches = useSelector((state) => state.batches?.batches || []);
//   const subjects = useSelector((state) => state.subjects.subjects);

//   const [studentList, setStudentList] = useState([]);
//   const [filters, setFilters] = useState(null);

//   const columns = [
//     { header: "No.", accessor: (_, index) => index + 1 },
//     { header: "Student Name", accessor: "name" },
//     { header: "Marks", accessor: "mark" },
//   ];

//   const handleSubmit = (values) => {
//     const cleanedValues = {
//       standard: values.standard.trim(),
//       subject: values.subject.trim(),
//       batch: values.batch.trim(),
//       startDate: values.startDate,
//       endDate: values.endDate,
//     };

//     setFilters(cleanedValues);

//     // Convert completedTests with values array into usable objects
//     const mappedTests = completedTests.map((test) => ({
//       ...test,
//       no: test.values?.[0],
//       standard: test.values?.[1],
//       batch: test.values?.[2],
//       subject: test.values?.[3],
//       date: test.values?.[4],
//       time: test.values?.[5],
//       chapterCount: test.values?.[6],
//       totalMarks: test.values?.[7],
//       studentMarks: test.studentMarks, // Keep the studentMarks array
//     }));

//     // Filter tests based on selected filters
//     const matchedTests = mappedTests.filter(
//       (test) =>
//         test.standard === cleanedValues.standard &&
//         test.subject === cleanedValues.subject &&
//         test.batch === cleanedValues.batch &&
//         test.date >= cleanedValues.startDate &&
//         test.date <= cleanedValues.endDate
//     );

//     if (matchedTests.length === 0) {
//       setStudentList([]);
//       return;
//     }

//     const relatedStudents = students.filter(
//       (s) =>
//         s.standard === cleanedValues.standard &&
//         s.subject === cleanedValues.subject &&
//         s.batch === cleanedValues.batch
//     );

//     const studentMarkMap = matchedTests[0]?.studentMarks || [];

//     console.log("related student ",relatedStudents); 

//     const listWithMarks = relatedStudents.map((student) => {
//       // Find the student mark in the studentMarks array
//       const studentMark = studentMarkMap.find((mark) => mark.studentId === student.id);

//       // Debug: Check the student mark
//       console.log("Student Mark: ", studentMark);

//       return {
//         ...student,
//         mark: studentMark ? studentMark.marks : "N/A", // Show "N/A" if no marks found
//       };
//     });
//     console.log("Student List before setting:", studentList);

//     setStudentList(listWithMarks);
//   };

  

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Batch Progress Report</h1>

//       <Formik
//         initialValues={{
//           standard: "",
//           subject: "",
//           batch: "",
//           startDate: "",
//           endDate: "",
//         }}
//         onSubmit={handleSubmit}
//       >
//         {() => (
//           <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label>Standard</label>
//               <Field as="select" name="standard" className="w-full border p-2 rounded">
//                 <option value="">Select Standard</option>
//                 {standards.map((std) => (
//                   <option key={std.id} value={std.standardName}>
//                     {std.standardName}
//                   </option>
//                 ))}
//               </Field>
//             </div>

//             <div>
//               <label>Subject</label>
//               <Field as="select" name="subject" className="w-full border p-2 rounded">
//                 <option value="">Select Subject</option>
//                 {subjects.map((sub) => (
//                   <option key={sub.id} value={sub.subjectName}>
//                     {sub.subjectName}
//                   </option>
//                 ))}
//               </Field>
//             </div>

//             <div>
//               <label>Batch</label>
//               <Field as="select" name="batch" className="w-full border p-2 rounded">
//                 <option value="">Select Batch</option>
//                 {batches.map((b) => (
//                   <option key={b.id} value={b.name}>
//                     {b.name}
//                   </option>
//                 ))}
//               </Field>
//             </div>

//             <div>
//               <label>Start Date</label>
//               <Field type="date" name="startDate" className="w-full border p-2 rounded" />
//             </div>

//             <div>
//               <label>End Date</label>
//               <Field type="date" name="endDate" className="w-full border p-2 rounded" />
//             </div>

//             <div className="md:col-span-2">
//               <Button text="Submit">Submit</Button>
//             </div>
//           </Form>
//         )}
//       </Formik>

//       {filters && (
//         console.log("student List",studentList),
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold mb-2">Student Marks</h2>
//           {studentList.length > 0 ? (
//             <Table columns={columns} data={studentList} />
//           ) : (
//             <p className="text-gray-500">No data found for selected filters.</p>
//           )}
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchProgress;import React, { useState } from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import Table from "../../component/Table";
import Button from "../../component/Button";

const BatchProgress = () => {
  const completedTests = useSelector((state) => state.upcoming?.completedTests || []);
  const students = useSelector((state) => state.student?.students || []);
  const standards = useSelector((state) => state.schools?.schools || []);
  const batches = useSelector((state) => state.batches?.batches || []);
  const subjects = useSelector((state) => state.subjects.subjects);

  const [studentList, setStudentList] = useState([]);
  const [filters, setFilters] = useState(null);
 console.log("completed", completedTests)
  const columns = [
    { header: "No.", accessor: (_, index) => index + 1 },
    { header: "Student Name", accessor: "name" },
    { header: "Marks", accessor: "mark" },
  ];

  const handleSubmit = (values) => {
    const cleanedValues = {
      standard: values.standard.trim(),
      subject: values.subject.trim(),
      batch: values.batch.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
    };
    
    setFilters(cleanedValues);

    const matchedTests = completedTests.filter(
      (test) =>
        test.standard === cleanedValues.standard &&
        test.subject === cleanedValues.subject &&
        test.batch === cleanedValues.batch &&
        (cleanedValues.startDate ? test.date >= cleanedValues.startDate : true) &&
        (cleanedValues.endDate ? test.date <= cleanedValues.endDate : true)
    );
 console.log("match test",matchedTests)
    if (matchedTests.length === 0) {
      setStudentList([]);
      return;
    }

    const relevantStudents = students.filter(
      (student) =>
        student.standard === cleanedValues.standard &&
        student.batch === cleanedValues.batch
    );
 
    const allStudentMarks = {};
    matchedTests.forEach((test) => {
      test.studentMarks?.forEach(({ studentId, marks }) => {
        if (!allStudentMarks[studentId]) {
          allStudentMarks[studentId] = [];
        }
        allStudentMarks[studentId].push(marks);
      });
    });

    const listWithMarks = relevantStudents.map((student) => {
      const marksForStudent = allStudentMarks[student.id] || [];
      const averageMark =
        marksForStudent.length > 0
          ? marksForStudent.reduce((sum, mark) => sum + parseFloat(mark), 0) / marksForStudent.length
          : "N/A";

      return {
        ...student,
        mark: averageMark,
      };
    });
console.log("relevent student",relevantStudents)
    setStudentList(listWithMarks);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Batch Progress Report</h1>

      <Formik
        initialValues={{
          standard: "",
          subject: "",
          batch: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="standard">Standard</label>
              <Field as="select" id="standard" name="standard" className="w-full border p-2 rounded">
                <option value="">Select Standard</option>
                {standards.map((std) => (
                  <option key={std.id} value={std.standardName}>
                    {std.standardName}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="subject">Subject</label>
              <Field as="select" id="subject" name="subject" className="w-full border p-2 rounded">
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.subjectName}>
                    {sub.subjectName}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="batch">Batch</label>
              <Field as="select" id="batch" name="batch" className="w-full border p-2 rounded">
                <option value="">Select Batch</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="startDate">Start Date</label>
              <Field type="date" id="startDate" name="startDate" className="w-full border p-2 rounded" />
            </div>

            <div>
              <label htmlFor="endDate">End Date</label>
              <Field type="date" id="endDate" name="endDate" className="w-full border p-2 rounded" />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" text="Submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>

      {filters && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Student Marks</h2>
          {studentList.length > 0 ? (
            <Table columns={columns} data={studentList} />
          ) : (
            <p className="text-gray-500">No data found for selected filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BatchProgress;