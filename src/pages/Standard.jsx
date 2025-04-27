import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSchool, updateSchool, deleteSchool } from "../redux/standardSlice";
import Button from "../component/Button";
import Table from "../component/Table"

const Standard = () => {

  const columns = ["ID", "Standard Name", "Actions"];

  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools.schools);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentData, setCurrentData] = useState({ id: null, standardNumber: "" });
  const [error, setError] = useState("");

  const openModal = (data = { id: null, standardNumber: "" }) => {
    setCurrentData(data);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentData({ id: null, standardNumber: "" });
  };

  const saveData = () => {
    if (!/^\d+$/.test(currentData.standardNumber)) {
      setError("Only numbers are allowed.");
      return;
    }


    const existingStandard = schools.find(school => school.standardName === currentData.standardNumber);
    if (existingStandard) {
      setError("Standard already exists.");
      return;
    }
    if (currentData.id) {
      dispatch(updateSchool({ id: currentData.id, newStandard: currentData.standardNumber }));
    } else {
      dispatch(addSchool(currentData.standardNumber));
    }

    closeModal();
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-auto max-w-full sm:max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">Standard List</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto hover:bg-blue-600 transition"
        >
          Add New Standard
        </button>
      </div>
  
      {schools.length > 0 ? (
        <Table
          columns={columns}
          data={schools.map((school) => ({
            id: school.id,
            standardName: `Standard ${school.standardName}`
          }))}
          renderActions={(school) => (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <Button
                onClick={() =>
                  openModal({
                    id: school.id,
                    standardNumber: school.standardName.replace("Standard ", "")
                  })
                }
                color="yellow"
              >
                Edit
              </Button>
              <Button onClick={() => setDeleteConfirm(school.id)} color="red">
                Delete
              </Button>
            </div>
          )}
        />
      ) : (
        <p className="text-center text-gray-500 mt-4">No standards available.</p>
      )}
    </div>
  
    {/* Modal Popup for Add/Edit */}
    {modalOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-md sm:w-1/2 md:w-1/3 p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">{currentData.id ? "Edit Standard" : "Add New Standard"}</h3>
          <input
            type="text"
            value={currentData.standardNumber}
            onChange={(e) => setCurrentData({ ...currentData, standardNumber: e.target.value })}
            className="p-2 border rounded-lg w-full mb-2"
            placeholder="Enter Standard Number"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button onClick={closeModal} color="gray">Cancel</Button>
            <Button onClick={saveData} color="blue">Save</Button>
          </div>
        </div>
      </div>
    )}
  
    {/* Delete Confirmation */}
    {deleteConfirm && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-md sm:w-96 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Warning Message</h2>
          <p className="mb-4 text-sm sm:text-base">
            Deleting this data may cause issues in the future and cannot be undone. Are you sure you want to proceed?
            <br />
            <span className="text-red-600 font-semibold">
              Standard {schools.find((school) => school.id === deleteConfirm)?.standardName}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button onClick={() => setDeleteConfirm(null)} color="gray">Cancel</Button>
            <Button
              onClick={() => {
                dispatch(deleteSchool(deleteConfirm));
                setDeleteConfirm(null);
              }}
              color="red"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Standard;