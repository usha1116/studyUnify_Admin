import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addLectureSchedule,
  updateLectureSchedule,
  deleteLectureSchedule
} from '../redux/lectureScheduleSlice';

const LectureSchedule = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.lectureSchedule.schedules);
  const batches = useSelector((state) => state.batch?.batches || []);
  const standards = useSelector((state) => state.standard?.standards || []);
  const subjects = useSelector((state) => state.subject?.subjects || []);

  const [formData, setFormData] = useState({
    standard: '',
    batch: '',
    subject: '',
    startTime: '',
    endTime: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSchedule = () => {
    const { standard, batch, subject, startTime, endTime } = formData;
    if (standard && batch && subject && startTime && endTime) {
      dispatch(
        addLectureSchedule({
          id: new Date().toISOString(),
          ...formData
        })
      );
      setFormData({
        standard: '',
        batch: '',
        subject: '',
        startTime: '',
        endTime: ''
      });
      setShowModal(false);
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Lecture Schedule</h2>

      <div className="flex gap-4 mb-4">
        <select
          name="standard"
          value={formData.standard}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Standard</option>
          {standards.map((std) => (
            <option key={std.id} value={std.name}>
              {std.name}
            </option>
          ))}
        </select>

        <select
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Lecture
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add Lecture</h3>

            <p className="text-sm mb-2">
              <strong>Standard:</strong> {formData.standard}
            </p>
            <p className="text-sm mb-4">
              <strong>Batch:</strong> {formData.batch}
            </p>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Start Time"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              placeholder="End Time"
            />

            <div className="flex justify-between">
              <button
                onClick={handleAddSchedule}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display All Lectures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-white p-4 rounded shadow text-sm space-y-1"
          >
            <p><strong>Standard:</strong> {schedule.standard}</p>
            <p><strong>Batch:</strong> {schedule.batch}</p>
            <p><strong>Subject:</strong> {schedule.subject}</p>
            <p><strong>Start:</strong> {schedule.startTime}</p>
            <p><strong>End:</strong> {schedule.endTime}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => dispatch(deleteLectureSchedule(schedule.id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  dispatch(
                    updateLectureSchedule({
                      id: schedule.id,
                      updatedSchedule: {
                        subject: 'Updated Subject',
                        startTime: '09:00',
                        endTime: '10:00'
                      }
                    })
                  )
                }
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureSchedule;

