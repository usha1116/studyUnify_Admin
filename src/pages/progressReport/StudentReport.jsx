// import  React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Button from "../../component/Button";

// const StudentReport = () => {
//     const students = useSelector((state) => state.student?.students || []);
//     const completedTests = useSelector((state) => state.upcoming?.completedTests || []);
//     const standards = useSelector((state) => state.schools?.schools || []);

//     const subjects = useSelector((state) => state.subjects.subjects);

//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [studentId, setStudentId] = useState("");
//     const [standard, setStandard] = useState("");
//     const [subject, setSubject] = useState("");

//     const filteredStudents = students.filter(
//         (stu) =>
//             (!standard || stu.standard === standard) &&
//             (!studentId || stu.id === studentId)
//     );

//     const selectedStudent = students.find((stu) => stu.id === studentId);

//     const report = (() => {
//         if (!studentId) return null;

//         return completedTests
//             .filter((test) => {
//                 const testDate = new Date(test.date);
//                 const isInDateRange =
//                     (!startDate || new Date(startDate) <= testDate) &&
//                     (!endDate || new Date(endDate) >= testDate);

//                 const isSubjectMatch = !subject || test.subject === subject;
//                 const hasStudent = test.studentMarks?.some((m) => m.studentId === studentId);

//                 return isInDateRange && isSubjectMatch && hasStudent;
//             })
//             .map((test) => {
//                 const studentMark = test.studentMarks.find((m) => m.studentId === studentId);
//                 return {
//                     marks: parseInt(studentMark?.marks || 0, 10),
//                 };
//             });
//     })();

//     const totalMarks = report?.reduce((sum, r) => sum + r.marks, 0) || 0;
//     const testCount = report?.length || 0;

//     return (
//         <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-xl">
//             <h2 className="text-2xl font-bold text-center text-black-800 mb-6"> Student Progress Report</h2>

//             {/* Filters */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-6">

//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700">Standard</label>
//                     <select
//                         value={standard}
//                         onChange={(e) => setStandard(e.target.value)}
//                         className="w-full p-3 mt-2 border rounded-md shadow-sm"
//                     >
//                         <option value="">Select Standard</option>
//                         {standards.map((std) => (
//                             <option key={std.id} value={std.standardName}>
//                                 {std.standardName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700">Subject</label>
//                     <select
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                         className="w-full p-3 mt-2 border rounded-md shadow-sm"
//                     >
//                         <option value="">Select Subject</option>
//                         {subjects.map((sub) => (
//                             <option key={sub.id} value={sub.subjectName}>
//                                 {sub.subjectName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
                
//                 <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700">Student</label>
//                     <select
//                         value={studentId}
//                         onChange={(e) => setStudentId(e.target.value)}
//                         className="w-full p-3 mt-2 border rounded-md shadow-sm"
//                     >
//                         <option value="">Select Student</option>
//                         {filteredStudents.map((stu) => (
//                             <option key={stu.id} value={stu.id}>
//                                 {stu.name} ({stu.id})
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700">Start Date</label>
//                     <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="w-full p-3 mt-2 border rounded-md shadow-sm"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700">End Date</label>
//                     <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="w-full p-3 mt-2 border rounded-md shadow-sm"
//                     />
//                 </div>
//             </div>

//             {/* Result Section */}
//             {selectedStudent && (
//                 <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md">
//                     <p className="text-lg font-semibold text-blue-800 mb-4">Student Summary</p>
//                     <p className="text-gray-700 mb-2">
//                         <strong>Name:</strong> {selectedStudent.name}
//                     </p>
//                     <p className="text-gray-700 mb-2">
//                         <strong>Total Tests Taken:</strong> {testCount}
//                     </p>
//                     <p className="text-gray-700 mb-2">
//                         <strong>Total Marks Scored:</strong> {totalMarks}
//                     </p>
//                 </div>
//             )}
//             <Button label="submit" color="blue" > Submit </Button>
//         </div>
//     );
// };

// export default StudentReport;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../component/Button";

const StudentReport = () => {
    // Getting data from Redux state
    const students = useSelector((state) => state.student?.students || []);
    const completedTests = useSelector((state) => state.upcoming?.completedTests || []);
    const standards = useSelector((state) => state.schools?.schools || []);
    const subjects = useSelector((state) => state.subjects.subjects);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [studentId, setStudentId] = useState(""); // Selected student ID
    const [standard, setStandard] = useState(""); // Standard for filtering
    const [subject, setSubject] = useState(""); // Subject for filtering

    // Filter students based on selected standard
    const filteredStudents = students.filter(
        (stu) => !standard || stu.standardId === standard
    );
console.log(filteredStudents, "filteredStudents")
    // Find the selected student based on studentId
    const selectedStudent = students.find((stu) => stu.id === studentId);

    // Get the report based on selected filters and student
    const report = (() => {
        if (!studentId) return []; // No student selected

        return completedTests
            .filter((test) => {
                const testDate = new Date(test.date);
                const isInDateRange =
                    (!startDate || new Date(startDate) <= testDate) &&
                    (!endDate || new Date(endDate) >= testDate);

                const isSubjectMatch = !subject || test.subject === subject;
                const hasStudent = test.studentMarks?.some((m) => m.studentId === studentId);

                return isInDateRange && isSubjectMatch && hasStudent;
            })
            .map((test) => {
                const studentMark = test.studentMarks.find((m) => m.studentId === studentId);
                return {
                    testName: test.name,
                    marks: studentMark?.marks || 0,
                    date: test.date,
                };
            });
    })();

    const totalMarks = report?.reduce((sum, r) => sum + r.marks, 0) || 0;
    const testCount = report?.length || 0;

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle any form logic here (if needed)
        alert("Form Submitted!");
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-center text-black-800 mb-6">Student Progress Report</h2>

            {/* Filters Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-6">
                    {/* Standard Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Standard</label>
                        <select
                            value={standard}
                            onChange={(e) => setStandard(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-md shadow-sm"
                        >
                            <option value="">Select Standard</option>
                            {standards.map((std) => (
                                <option key={std.id} value={std.standardId}>
                                    {std.standardName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-md shadow-sm"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((sub) => (
                                <option key={sub.id} value={sub.subjectName}>
                                    {sub.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Student Dropdown */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700">Student</label>
                        <select
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-md shadow-sm"
                        >
                            <option value="">Select Student</option>
                            {filteredStudents.map((stu) => (
                                <option key={stu.id} value={stu.id}>
                                    {stu.name} ({stu.id})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Start Date Picker */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-md shadow-sm"
                        />
                    </div>

                    {/* End Date Picker */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-md shadow-sm"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-4">
                    <Button label="Submit" color="blue" > submit </Button>
                </div>
            </form>

            {/* Report Table - Display Student's Test Marks */}
            {selectedStudent && report.length > 0 ? (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Test Results for {selectedStudent.name}</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border border-gray-300">Test Name</th>
                                <th className="px-4 py-2 border border-gray-300">Marks</th>
                                <th className="px-4 py-2 border border-gray-300">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((test, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-4 py-2 border border-gray-300">{test.testName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{test.marks}</td>
                                    <td className="px-4 py-2 border border-gray-300">{test.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <p>
                            <strong>Total Marks Scored:</strong> {totalMarks}
                        </p>
                        <p>
                            <strong>Total Tests Taken:</strong> {testCount}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-6 text-center text-gray-500">
                    <p>No results available. Please adjust your filters or select a student.</p>
                </div>
            )}
        </div>
    );
};

export default StudentReport;
