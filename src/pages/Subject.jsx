import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubject, updateSubject, deleteSubject } from "../redux/subjectSlice";
import Button from "../component/Button";
import Table from "../component/Table";

const Subject = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({ standard: null, subjectName: "" });
  const [error, setError] = useState("");

  const standards = useSelector((state) => state.schools.schools);
  const subjects = useSelector((state) => state.subjects.subjects);

  const openModal = (data = { standard: null, subjectName: "" }) => {
    setCurrentData(data);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentData({ standard: null, subjectName: "" });
  };

  const saveData = () => {
    if (!currentData.subjectName.trim()) {
      setError("Subject Name is required.");
      return;
    }

    if (currentData.id) {
      dispatch(updateSubject(currentData));
    } else {
      dispatch(addSubject({ standard: currentData.standard, subjectName: currentData.subjectName }));
    }
    closeModal();
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold mb-4">Subject Management</h2>
      {standards.length > 0 ? (
        standards.map((standard) => {
          const standardSubjects = subjects.filter(
            (sub) => sub.standard === standard.standardName
          );

          return (
            <div key={standard.standardName} className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                <h3 className="text-md font-semibold">
                  Standard {standard.standardName}
                </h3>
                <Button
                  label="Add Subject"
                  variant="blue"
                  onClick={() =>
                    openModal({ standard: standard.standardName })
                  }
                >
                  Add Subject
                </Button>
              </div>

              {standardSubjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table
                    data={standardSubjects.map((subject, index) => ({
                      no: index + 1,
                      subjectName: subject.subjectName,
                      actions: (
                        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                          <Button
                            color="yellow"
                            onClick={() =>
                              openModal({
                                standard: standard.standardName,
                                ...subject,
                              })
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            color="red"
                            onClick={() =>
                              dispatch(deleteSubject({ id: subject.id }))
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      ),
                    }))}
                    columns={["No.", "Subject Name", "Action"]}
                    keys={["no", "subjectName", "actions"]}
                  />
                </div>
              ) : (
                <p className="text-gray-500 italic mt-2 text-center">
                  No subjects added yet for Standard {standard.standardName}.
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p>No standards available. Please add a standard first.</p>
      )}

      {/* Modal Popup */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-semibold mb-4">
              {currentData.id ? "Edit Subject" : "Add New Subject"}
            </h3>
            <input
              type="text"
              value={currentData.subjectName}
              onChange={(e) =>
                setCurrentData({
                  ...currentData,
                  subjectName: e.target.value,
                })
              }
              className="p-2 border rounded-lg w-full mb-2"
              placeholder="Enter Subject Name"
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end space-x-2">
              <Button label="Cancel" onClick={closeModal} variant="gray">
                Cancel
              </Button>
              <Button label="Save" onClick={saveData} variant="blue">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
