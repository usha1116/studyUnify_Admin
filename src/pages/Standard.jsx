import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSchool, updateSchool, deleteSchool } from "../../redux/standardSlice";
import Button from "../../component/Button";
import Table from "../../component/Table";
import { FaTrash,FaEdit } from 'react-icons/fa';
const Standard = () => {
  const columns = [ { header: "No.", accessor: (_, index) => index + 1 },
  { header: "StandardName", accessor: "standardName" },
  { header: "Actions", accessor: "actions" },
];
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools.schools);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentData, setCurrentData] = useState({ id: null, standardNumber: "" });
  const [error, setError] = useState("");


useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && modalOpen) {
      e.preventDefault(); // prevent default form submission
      saveData(); // call the same save function
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [modalOpen, currentData]);

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

    const existingStandard = schools.find(
      (school) => school.standardName === currentData.standardNumber
    );

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
  <div className="flex flex-row justify-between items-center gap-1 mb-6">
  <h2 className="text-lg font-bold text-gray-800 truncate max-w-[55%]">
    Standard List
  </h2>
  <Button 
    onClick={() => openModal()} 
    color="blue" 
    className="shrink-0 px-2 py-2 text-sm md:text-base md:px-4 md:py-2 whitespace-nowrap min-w-[110px]"
  >
    Add Standard
  </Button>
</div>

        {schools.length > 0 ? (
          <Table
            columns={columns}
            data={schools.map((school) => ({
              id: school.id,
              standardName: `Standard ${school.standardName}`,
            }))}
            renderActions={(school) => (
              <div className="flex justify-center items-center gap-2 sm:gap-3">
                <button
                  onClick={() =>
                    openModal({
                      id: school.id,
                      standardNumber: school.standardName.replace("Standard ", ""),
                    })
                  }
                 
                >
                 <FaEdit color="blue" size={20} />
                </button>
                <button onClick={() => setDeleteConfirm(school.id)} >
                  <FaTrash  color="red" size={20}/>
                </button>
              </div>
            )}
          />
        ) : (
          <p className="text-center text-gray-500 text-sm mt-4">No standards available.</p>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">
              {currentData.id ? "Edit Standard" : "Add New Standard"}
            </h3>
            <input
              type="text"
              value={currentData.standardNumber}
              onChange={(e) => setCurrentData({ ...currentData, standardNumber: e.target.value })}
              placeholder="Enter Standard Number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button onClick={closeModal} color="gray">
                Cancel
              </Button>
              <Button onClick={saveData} color="blue">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
            <h3 className="text-lg font-semibold mb-3">Warning Message</h3>
            <p className="text-sm mb-4 text-gray-700">
              Deleting this data may cause issues in the future and cannot be undone. Are you sure you want to proceed?
              <br />
              <span className="text-red-600 font-semibold">
                Standard {schools.find((school) => school.id === deleteConfirm)?.standardName}
              </span>
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirm(null)} color="gray">
                Cancel
              </Button>
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