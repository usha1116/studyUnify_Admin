// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Button from "../../component/Button";
// import Table from "../../component/Table"; // reusable table

// const MarkMessage = () => {
//     const dispatch = useDispatch();

//     // Redux state selectors
//     const standards = useSelector(state => state.schools?.schools || []);
//     const batches = useSelector(state => state.batches?.batches || []);
//     const subjects = useSelector(state => state.subjects?.subjects || []);
//     const upcomingTests = useSelector(state => state.upcoming?.upcomingTests || []);
//     const students = useSelector((state) => state.student.students || []);

//     // Local states
//     const [selectedStandard, setSelectedStandard] = useState("");
//     const [selectedBatch, setSelectedBatch] = useState("");
//     const [selectedSubject, setSelectedSubject] = useState("");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedTest, setSelectedTest] = useState(null);
//     const [marks, setMarks] = useState({});

//     // Convert 'YYYY-MM-DD' to 'YYYY-MM-DD' (already in good format)
//     const formatDate = (dateStr) => {
//         const [year, month, day] = dateStr.split("-");
//         return `${year}-${month}-${day}`; // Keeping date as YYYY-MM-DD
//     };

//     const filteredTests =
//         selectedStandard &&
//             selectedBatch &&
//             selectedSubject &&
//             selectedDate
//             ? upcomingTests.filter(
//                 (test) =>
//                     test.standard === selectedStandard &&
//                     test.batch === selectedBatch &&
//                     test.subject === selectedSubject &&
//                     test.date === formatDate(selectedDate)
//             )
//             : upcomingTests; // Show all tests if no filters are applied

//     const handleMarksChange = (studentId, value) => {
//         setMarks(prev => ({
//             ...prev,
//             [studentId]: value
//         }));
//     };

//     const handleSend = () => {
//         const marksToSend = students
//             .filter(s => s.standard === selectedStandard && s.batch === selectedBatch)
//             .map(s => ({
//                 studentId: s.id,
//                 studentName: s.name,
//                 obtainedMarks: marks[s.id] || 0,
//                 testId: selectedTest?.id,
//                 totalMarks: selectedTest?.totalMarks
//             }));

//         console.log("Sending these marks:", marksToSend);
//         // dispatch(sendMarks(marksToSend)); // Uncomment once action is defined
//     };

//     const filteredStudents = students.filter(
//         (s) => s.standard === selectedDate.standard && s.Batch === selectedBatch.Batch
//     )
//         .map((s) => ({
//             id: s.id, // Ensure each student has a unique ID
//             name: s.name, // Only return the student name
//             obtainedMarks: <input type='text' className="border-b"/>, 
//         }));

//     console.log("Selected Test:", selectedTest);
//     console.log("filter Student ", filteredStudents)
//     console.log(students, "students")
//     return (
//         <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">Assign Marks to Students</h1>

//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
//                 <select onChange={e => setSelectedStandard(e.target.value)} className="border p-2 rounded">
//                     <option value="">Select Standard</option>
//                     {standards.map(std => (
//                         <option key={std.id} value={std.standardName}>{std.standardName}</option>
//                     ))}
//                 </select>

//                 <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={e => setSelectedDate(e.target.value)}
//                     className="border p-2 rounded"
//                 />

//                 <select onChange={e => setSelectedBatch(e.target.value)} className="border p-2 rounded">
//                     <option value="">Select Batch</option>
//                     {batches.map(batch => (
//                         <option key={batch.id} value={batch.name}>{batch.name}</option>
//                     ))}
//                 </select>

//                 <select onChange={e => setSelectedSubject(e.target.value)} className="border p-2 rounded">
//                     <option value="">Select Subject</option>
//                     {subjects.map(sub => (
//                         <option key={sub.id} value={sub.subjectName}>{sub.subjectName}</option>
//                     ))}
//                 </select>
//                 <select
//                     onChange={(e) => {
//                         const testId = Number(e.target.value); // Convert to number
//                         const found = upcomingTests.find(test => test.id === testId);
//                         setSelectedTest(found);
//                     }}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">Select Test</option>
//                     {filteredTests.map(test => (
//                         <option key={test.id} value={test.id}>
//                             {test.chapters} Chapters
//                         </option>
//                     ))}
//                 </select>


//                 <input
//                     type="text"
//                     value={selectedTest?.totalMarks || ""}
//                     readOnly
//                     placeholder="Total Marks"
//                     className="border p-2 rounded"

//                 />
//             </div>
//             {filteredStudents.length > 0 && selectedTest?.standard && selectedTest?.batch && selectedTest?.subject && (
//                 <>
//                     <Table
//                         columns={[
//                             { header: "Sr. No", accessor: (_, i) => i + 1 },
//                             { header: "Student Name", accessor: "name" },
//                             {
//                                 header: "Obtained Marks",
//                                 accessor: (row) => (
//                                     <input
//                                         type="number"
//                                         min={0}
//                                         max={selectedTest.totalMarks}
//                                         className="border p-1 rounded w-20"
//                                         value={marks[row.id] || ""}
//                                         onChange={(e) => handleMarksChange(row.id, e.target.value)}
//                                     />
//                                 ),
//                             },
//                         ]}
//                         data={filteredStudents}
//                     />
//                     {filteredStudents.length === 0 && (
//                         <p>No students found for the selected filters.</p>
//                     )}
//                     <div className="mt-4 text-right">
//                         <Button label="Send Marks" onClick={handleSend} color="green" > Send </Button>
//                     </div>
//                 </>
//             )}

//         </div>
//     );
// };

// export default MarkMessage;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../component/Button";
import Table from "../../component/Table"; // reusable table

const MarkMessage = () => {
    const dispatch = useDispatch();

    // Redux state selectors
    const standards = useSelector(state => state.schools?.schools || []);
    const batches = useSelector(state => state.batches?.batches || []);
    const subjects = useSelector(state => state.subjects?.subjects || []);
    const upcomingTests = useSelector(state => state.upcoming?.upcomingTests || []);
    const students = useSelector((state) => state.student.students || []);

    // Local states
    const [selectedStandard, setSelectedStandard] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTest, setSelectedTest] = useState(null);
    const [marks, setMarks] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Convert 'YYYY-MM-DD' to 'YYYY-MM-DD' (already in good format)
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${year}-${month}-${day}`; // Keeping date as YYYY-MM-DD
    };

    const filteredTests =
        selectedStandard &&
            selectedBatch &&
            selectedSubject &&
            selectedDate
            ? upcomingTests.filter(
                (test) =>
                    test.standard === selectedStandard &&
                    test.batch === selectedBatch &&
                    test.subject === selectedSubject &&
                    test.date === formatDate(selectedDate)
            )
            : upcomingTests; // Show all tests if no filters are applied

    const handleMarksChange = (studentId, value) => {
        setMarks(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    const handleSend = () => {
        const marksToSend = students
            .filter(s => s.standard === selectedStandard && s.batch === selectedBatch)
            .map(s => ({
                studentId: s.id,
                studentName: s.name,
                obtainedMarks: marks[s.id] || 0,
                testId: selectedTest?.id,
                totalMarks: selectedTest?.totalMarks
            }));

        console.log("Sending these marks:", marksToSend);
        // dispatch(sendMarks(marksToSend)); // Uncomment once action is defined
        setIsModalOpen(true); // Show the modal when marks are sent
    };

    const filteredStudents = students.filter(
        (s) => s.standard === selectedDate.standard && s.Batch === selectedBatch.Batch
    )
        .map((s) => ({
            id: s.id, // Ensure each student has a unique ID
            name: s.name, // Only return the student name
            obtainedMarks: <input type='text' className="border-b"/>, 
        }));

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Assign Marks to Students</h1>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                <select onChange={e => setSelectedStandard(e.target.value)} className="border p-2 rounded">
                    <option value="">Select Standard</option>
                    {standards.map(std => (
                        <option key={std.id} value={std.standardName}>{std.standardName}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="border p-2 rounded"
                />

                <select onChange={e => setSelectedBatch(e.target.value)} className="border p-2 rounded">
                    <option value="">Select Batch</option>
                    {batches.map(batch => (
                        <option key={batch.id} value={batch.name}>{batch.name}</option>
                    ))}
                </select>

                <select onChange={e => setSelectedSubject(e.target.value)} className="border p-2 rounded">
                    <option value="">Select Subject</option>
                    {subjects.map(sub => (
                        <option key={sub.id} value={sub.subjectName}>{sub.subjectName}</option>
                    ))}
                </select>
                <select
                    onChange={(e) => {
                        const testId = Number(e.target.value); // Convert to number
                        const found = upcomingTests.find(test => test.id === testId);
                        setSelectedTest(found);
                    }}
                    className="border p-2 rounded"
                >
                    <option value="">Select Test</option>
                    {filteredTests.map(test => (
                        <option key={test.id} value={test.id}>
                            {test.chapters} Chapters
                        </option>
                    ))}
                </select>


                <input
                    type="text"
                    value={selectedTest?.totalMarks || ""}
                    readOnly
                    placeholder="Total Marks"
                    className="border p-2 rounded"
                />
            </div>
            {filteredStudents.length > 0 && selectedTest?.standard && selectedTest?.batch && selectedTest?.subject && (
                <>
                    <Table
                        columns={[
                            { header: "Sr. No", accessor: (_, i) => i + 1 },
                            { header: "Student Name", accessor: "name" },
                            {
                                header: "Obtained Marks",
                                accessor: (row) => (
                                    <input
                                        type="number"
                                        min={0}
                                        max={selectedTest.totalMarks}
                                        className="border-b p-1 rounded w-20"
                                        value={marks[row.id] || ""}
                                        onChange={(e) => handleMarksChange(row.id, e.target.value)}
                                    />
                                ),
                            },
                        ]}
                        data={filteredStudents}
                    />
                    {filteredStudents.length === 0 && (
                        <p>No students found for the selected filters.</p>
                    )}
                    <div className="mt-4 text-right">
                        <Button label="Send Marks" onClick={handleSend} color="blue" > Send </Button>
                    </div>
                </>
            )}

            {/* Modal for confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold">Marks Sent Successfully</h2>
                        <p className="mt-2">The marks for the selected students have been sent.</p>
                        <div className="mt-4 text-right">
                            <Button label="OK" onClick={() => setIsModalOpen(false)} color="blue" > Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarkMessage;
