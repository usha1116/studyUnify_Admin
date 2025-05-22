import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../component/Button";
import Table from "../../component/Table";

const MarkEdit = () => {
  const dispatch = useDispatch();

  const standards = useSelector(state => state.schools?.schools || []);
  const batches = useSelector(state => state.batches?.batches || []);
  const subjects = useSelector(state => state.subjects?.subjects || []);
  const upcomingTests = useSelector(state => state.upcoming?.upcomingTests || []);
  const students = useSelector(state => state.student.students || []);

  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [marks, setMarks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [studentIdInput, setStudentIdInput] = useState("");
  const [filteredStudent, setFilteredStudent] = useState(null);

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
    setMarks(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleSend = () => {
    if (!filteredStudent) {
      alert("Please search for a student first.");
      return;
    }

    if (!selectedTest) {
      alert("Please select a test.");
      return;
    }

    if (marks[filteredStudent.id] === undefined || marks[filteredStudent.id] === "") {
      alert("Please enter valid marks for the student.");
      return;
    }

    if (isNaN(marks[filteredStudent.id])) {
      alert("Marks must be a valid number.");
      return;
    }

    const updatedMark = {
      studentId: filteredStudent.id,
      studentName: filteredStudent.name,
      obtainedMarks: marks[filteredStudent.id] || 0,
      testId: selectedTest?.id,
      totalMarks: selectedTest?.totalMarks,
    };

    console.log("Sending updated mark:", updatedMark);
    // dispatch(editMarks(updatedMark)); // Uncomment when action is ready
    setIsModalOpen(true);
  };

  const handleSearchStudent = () => {
    if (!studentIdInput) {
      alert("Please enter a valid Student ID.");
      return;
    }

    const foundStudent = students.find(
      (s) =>
        s.id === studentIdInput &&
        s.standard === selectedStandard &&
        s.batch === selectedBatch
    );

    if (foundStudent) {
      setFilteredStudent(foundStudent);
      setMarks(prev => ({
        ...prev,
        [foundStudent.id]: foundStudent.obtainedMarks || 0,
      }));
    } else {
      setFilteredStudent(null);
      alert("Student not found with the given ID in the selected Standard and Batch.");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center sm:text-left">Edit Student Marks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Standard</label>
          <select
            value={selectedStandard}
            onChange={e => setSelectedStandard(e.target.value)}
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          >
            <option value="">Select Standard</option>
            {standards.map(std => (
              <option key={std.id} value={std.standardName}>{std.standardName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Batch</label>
          <select
            value={selectedBatch}
            onChange={e => setSelectedBatch(e.target.value)}
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          >
            <option value="">Select Batch</option>
            {batches.map(batch => (
              <option key={batch.id} value={batch.name}>{batch.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          >
            <option value="">Select Subject</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.subjectName}>{sub.subjectName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Test</label>
          <select
            onChange={(e) => {
              const testId = Number(e.target.value);
              const found = upcomingTests.find(test => test.id === testId);
              setSelectedTest(found);
            }}
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          >
            <option value="">Select Test</option>
            {filteredTests.map(test => (
              <option key={test.id} value={test.id}>
                {test.chapters} Chapters
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Total Marks</label>
          <input
            type="text"
            value={selectedTest?.totalMarks || ""}
            readOnly
            placeholder="Total Marks"
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Student ID</label>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentIdInput}
            onChange={(e) => setStudentIdInput(e.target.value)}
            className="w-full px-4 py-1.5 rounded bg-blue-100"
          />
        </div>
        <div className="sm:mt-6">
          <Button label="Search" onClick={handleSearchStudent} color="blue">Search</Button>
        </div>
      </div>

      {filteredStudent && selectedTest && (
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
            data={[{
              id: filteredStudent.id,
              name: filteredStudent.name,
              obtainedMarks: (
                <input
                  type="text"
                  className="border-b p-1 rounded w-20"
                  value={marks[filteredStudent.id] || ""}
                  onChange={(e) => handleMarksChange(filteredStudent.id, e.target.value)}
                />
              ),
            }]}
          />
          <div className="mt-4 text-right">
            <Button label="Update Marks" onClick={handleSend} color="blue">Update</Button>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold">Marks Updated Successfully</h2>
            <p className="mt-2">The marks for the selected student have been updated.</p>
            <div className="mt-4 text-right">
              <Button label="OK" onClick={() => setIsModalOpen(false)} color="blue">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkEdit;