import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTeacher } from '../../redux/teacherListSlice';
import Button from '../../component/Button';
import Table from '../../component/Table';

const TeacherList = () => {
  const teachers = useSelector((state) => state.teacher.teachers);
  const dispatch = useDispatch();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null); // for delete popup

  const handleDelete = (id) => {
    dispatch(deleteTeacher(id));
    setTeacherToDelete(null); // close popup after delete
  };

  const handleRowClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
  };

  const columns = ['No.', 'Teacher Name', 'Login ID', 'Action'];

  const rows = teachers.map((teacher, index) => ({
    id: teacher.id,
    values: [
      index + 1,
      teacher.name,
      teacher.loginId || `TCH${teacher.id}`,
      <Button
        color="red"
        onClick={(e) => {
          e.stopPropagation();
          setTeacherToDelete(teacher);
        }}
      >
        Delete
      </Button>,
    ],
    onClick: () => handleRowClick(teacher),
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher List</h2>

      {teachers.length > 0 ? (
        <Table columns={columns} data={rows} />
      ) : (
        <p className="text-center text-gray-600 mt-4">No teachers found.</p>
      )}

      {/* ✅ Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Teacher Details</h3>
            <div className="space-y-2">
              <p><strong>Login ID:</strong> TCH{selectedTeacher.id}</p>
              <p><strong>Name:</strong> {selectedTeacher.name}</p>
              <p><strong>Email:</strong> {selectedTeacher.email}</p>
              <p><strong>Mobile No-1:</strong> {selectedTeacher.mobile}</p>
              <p><strong>Mobile No-2:</strong> {selectedTeacher.altMobile}</p>
              <p><strong>Gender:</strong> {selectedTeacher.gender}</p>
              <p><strong>Address:</strong> {selectedTeacher.address}</p>
            </div>
            <div className="text-center mt-4">
              <Button onClick={handleCloseModal}>OK</Button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}

      {teacherToDelete && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold text-center mb-4">Confirm Delete</h3>
            <p className="text-center mb-6">
              Are you sure you want to delete <strong>{teacherToDelete.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
            <Button onClick={() => setTeacherToDelete(null)}>Cancel</Button>
              <Button color="red" onClick={() => handleDelete(teacherToDelete.id)}>
                 Delete
              </Button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
