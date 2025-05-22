import { FaTrash, FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBatch, deleteBatch, updateBatch } from "../../redux/batchSlice";
import Table from "../../component/Table";
import Button from "../../component/Button";
import AddEditData from "../../component/AddEditData";

const Batch = () => {
  const schools = useSelector((state) => state.schools.schools);
  const batches = useSelector((state) => state.batches.batches);
  // console.log(batches);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStandardId, setModalStandardId] = useState(null);
  const [initialData, setInitialData] = useState({});
  const [batchToDelete, setBatchToDelete] = useState(null);

  const fields = [
    { name: "name", placeholder: "Batch Name", type: "text" },
    { name: "startTime", placeholder: "Start Time", type: "time" },
    { name: "endTime", placeholder: "End Time", type: "time" },
  ];

  const openModal = (standardId, batch = null) => {
    setModalStandardId(standardId);
    setInitialData(batch || {});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInitialData({});
    setModalStandardId(null);
  };

  const handleSave = (data) => {
    // console.log(data)
    const payload = {
      ...data,
      standardId: modalStandardId,
    };

    if (data.id) {
      dispatch(updateBatch({ id:data.id, name: payload.name, startTime: payload.startTime, endTime: payload.endTime }));
    } else {
      dispatch(addBatch({ standardId: payload.standardId, name: payload.name, startTime: payload.startTime, endTime: payload.endTime }));
    }

    closeModal();
  };

  const handleDelete = () => {
    console.log(batchToDelete)
    if (batchToDelete) {
      dispatch(deleteBatch(batchToDelete.id));
      setBatchToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
        {" "}
        <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left mb-6">
          Batch List
        </h2>
        {schools.map((std) => {
          const standardId = std.id;
          const filteredBatches = batches.filter(
            (batch) => batch.standardId === standardId
          );

          return (
            <div key={standardId} className="mb-10">
              <div className="flex justify-between items-center mb-4 gap-2 sm:gap-3">
                <h2 className="text-lg font-bold text-left">
                  Standard: {std.standardName}
                </h2>
                <Button onClick={() => openModal(standardId)} color="blue">
                  Add Batch
                </Button>
              </div>

              {filteredBatches.length > 0 ? (
                <Table
                  columns={[
                    { header: "No.", accessor: (_, index) => index + 1 },
                    { header: "Batch Name", accessor: "name" },
                    { header: "Start Time", accessor: "startTime" },
                    { header: "End Time", accessor: "endTime" },
                    { header: "Actions", accessor: "actions" },
                  ]}
                  data={filteredBatches.map((batch) => ({
                    id: batch.id,
                    name: batch.name,
                    startTime: batch.startTime,
                    endTime: batch.endTime,
                  }))}
                  renderActions={(batch) => (
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => openModal(standardId, batch)}>
                        <FaEdit color="blue" size={20} />
                      </button>
                      <button onClick={() => setBatchToDelete(batch)}>
                        <FaTrash color="red" size={20} />
                      </button>
                    </div>
                  )}
                />
              ) : (
                <p className="text-gray-500 italic text-center mt-2">
                  No batches added for this standard yet.
                </p>
              )}

              {/* Add/Edit Modal */}
              {modalOpen && modalStandardId === standardId && (      
                  <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50 px-4">
                <AddEditData
                  isOpen={modalOpen}
                  onClose={closeModal}
                  onSave={handleSave}
                  initialData={initialData}
                  fields={fields}
                /></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal - copied style from Standard page */}
      {batchToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
            <h3 className="text-lg font-semibold mb-3">Warning Message</h3>
            <p className="text-sm mb-4 text-gray-700">
              Deleting this data may cause issues in the future and cannot be
              undone. Are you sure you want to proceed?
              <br />
              <span className="text-red-600 font-semibold">
                Batch {batchToDelete?.name}
              </span>
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setBatchToDelete(null)} color="gray">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="red">
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batch;