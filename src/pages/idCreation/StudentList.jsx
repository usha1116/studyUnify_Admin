import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent } from '../../redux/studentIdCreaterSlice';
import Table from '../../component/Table';
import Button from '../../component/Button';

const StudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const students = useSelector((state) => state.student.students);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  // ✅ Include "Actions" in columns to match the action cell
  const columns = ['No.', 'Name', 'Student ID', 'Actions'];

  const data = students.map((student, index) => ({
    id: student.id,
    values: [
      index + 1,
      student.name,
      student.studentId || `STU${student.id}`,
    ],
    onClick: () => setSelectedStudent(student),
  }));

  const renderActions = (item) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(item.id);
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      {students.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md p-4">
          <Table
            columns={columns}
            data={data}
            renderActions={renderActions}
            rowClassName="cursor-pointer hover:bg-gray-100"
          />
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-100 rounded-xl">
          <p>No students found. Please add students.</p>
        </div>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Student Details</h3>
            <div className="space-y-2">
              <p><strong>Student ID:</strong> {selectedStudent.studentId || `STU${selectedStudent.id}`}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Email:</strong> {selectedStudent.email || 'N/A'}</p>
              <p><strong>Mobile No-1:</strong> {selectedStudent.mobile1}</p>
              <p><strong>Mobile No-2:</strong> {selectedStudent.mobile2 || 'N/A'}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>Address:</strong> {selectedStudent.address || 'N/A'}</p>
              <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
            </div>
            <div className="text-center mt-6">
              <Button onClick={handleCloseModal} color="blue">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;


