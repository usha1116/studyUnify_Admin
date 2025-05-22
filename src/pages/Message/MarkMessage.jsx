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
    const [validationError, setValidationError] = useState(""); // Error message state

    // Format date to 'YYYY-MM-DD'
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${year}-${month}-${day}`;
    };

    const filteredTests =
        selectedStandard && selectedBatch && selectedSubject && selectedDate
            ? upcomingTests.filter(
                (test) =>
                    test.standard === selectedStandard &&
                    test.batch === selectedBatch &&
                    test.subject === selectedSubject &&
                    test.date === formatDate(selectedDate)
            )
            : upcomingTests;

    const handleMarksChange = (studentId, value) => {
        // Allow only numeric input and prevent empty values
        if (/^\d*$/.test(value)) {
            setMarks((prev) => ({
                ...prev,
                [studentId]: value,
            }));
            setValidationError(""); // Clear validation error if input is valid
        } else {
            setValidationError("Please enter a valid number for marks.");
        }
    };

    const handleSend = () => {
        const marksToSend = students
            .filter(s => s.standardId === selectedStandard && s.batchId === selectedBatch)
            .map(s => ({
                studentId: s.id,
                studentName: s.name,
                obtainedMarks: marks[s.id] || 0, // Default to 0 if no marks are entered
                testId: selectedTest?.id,
                totalMarks: selectedTest?.totalMarks,
            }));

        // Check if all marks are valid
        const hasInvalidMarks = marksToSend.some((entry) => entry.obtainedMarks === "" || isNaN(entry.obtainedMarks));

        if (hasInvalidMarks) {
            setValidationError("All students must have valid marks entered.");
            return;
        }

        if (marksToSend.length === 0) {
            console.log("No students found for selected standard and batch");
        } else {
            console.log("Sending these marks:", marksToSend);
            dispatch(sendMarks(marksToSend));
        }

        setIsModalOpen(true);
    };

    const selectedStandardObj = standards.find(std => std.standardName === selectedStandard);
    const selectedBatchObj = batches.find(batch => batch.name === selectedBatch);
    
    const filteredStudents = students
        .filter(
            (s) =>
                s.standardId === selectedStandardObj?.id &&
                s.batchId === selectedBatchObj?.id
        )
        .map((s) => ({
            id: s.id,
            name: s.name,
            obtainedMarks: (
                <input
                    type="text"
                    className="border-b p-1 rounded w-20"
                    value={marks[s.id] || ""}
                    onChange={(e) => handleMarksChange(s.id, e.target.value)}
                />
            ),
        }));
    

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Assign Marks to Students</h1>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                <select
                    onChange={(e) => setSelectedStandard(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select Standard</option>
                    {standards.map((std) => (
                        <option key={std.id} value={std.standardName}>
                            {std.standardName}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border p-2 rounded"
                />

                <select
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                        <option key={batch.id} value={batch.name}>
                            {batch.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select Subject</option>
                    {subjects.map((sub) => (
                        <option key={sub.id} value={sub.subjectName}>
                            {sub.subjectName}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => {
                        const testId = Number(e.target.value);
                        const found = upcomingTests.find((test) => test.id === testId);
                        setSelectedTest(found);
                    }}
                    className="border p-2 rounded"
                >
                    <option value="">Select Test</option>
                    {filteredTests.map((test) => (
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
                                accessor: "obtainedMarks",
                            }
                        ]}
                        data={filteredStudents}
                    />
                    <div className="mt-4 text-right">
                        <Button label="Send Marks" onClick={handleSend} color="blue">Send</Button>
                    </div>
                </>
            )}

            {/* Validation Error */}
            {validationError && <p className="text-red-500 mt-2">{validationError}</p>}

            {/* Modal for confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold">Marks Sent Successfully</h2>
                        <p className="mt-2">The marks for the selected students have been sent.</p>
                        <div className="mt-4 text-right">
                            <Button label="OK" onClick={() => setIsModalOpen(false)} color="blue">Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarkMessage;
