import React, { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBatch, deleteBatch, updateBatch } from "../redux/batchSlice";
import Table from "../component/Table";
import Button from "../component/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// <<<<<<< usha

// // Batch Form Component
// const BatchForm = ({ standardId, onClose }) => {
//   const [name, setName] = useState("");
//   const [startTime, setStartTime] = useState("00:00");
//   const [endTime, setEndTime] = useState("00:00");
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addBatch({ standardId, batch: { name, startTime, endTime } }));
//     setName("");
//     setStartTime("00:00");
//     setEndTime("00:00");
//     onClose(); // close the modal after adding
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <h2 className="text-xl font-bold text-gray-800">Add Batch</h2>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Batch Name"
//         className="w-full border border-gray-300 rounded px-3 py-2"
//         required
//       />
//       <input
//         type="time"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//         required
//       />
//       <input
//         type="time"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//         required
//       />
//       <div className="flex justify-end mt-4">
//         <Button color="green" type="submit">
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };


// const EditBatchModal = ({ batch, index, onClose, onSave }) => {
//   const [formData, setFormData] = useState(batch);

//   useEffect(() => {
//     setFormData(batch);
//   }, [batch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(index, formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         >
//           ✕
//         </button>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <h2 className="text-xl font-semibold">Edit Batch</h2>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="time"
//             value={formData.startTime}
//             onChange={(e) =>
//               setFormData({ ...formData, startTime: e.target.value })
//             }
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="time"
//             value={formData.endTime}
//             onChange={(e) =>
//               setFormData({ ...formData, endTime: e.target.value })
//             }
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <div className="flex justify-end mt-4">
//             <Button color="blue" type="submit">
//               Save Changes
//             </Button>
//           </div>
//         </form>
//       </div>
// =======
// Modal Wrapper
const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-xs bg-opacity-30">
    <div className="bg-white p-6 rounded-xl relative max-w-md w-full shadow-lg">
      <button
        className="absolute top-2 right-2 text-xl text-gray-500"
        onClick={onClose}
        type="button"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

// Validation Schema
const BatchSchema = Yup.object().shape({
  name: Yup.string().required("Batch name is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
});

// Form Component
const BatchForm = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={BatchSchema}
    onSubmit={onSubmit}
  >
    {() => (
      <Form className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          {initialValues.id ? "Edit Batch" : "Add Batch"}
        </h2>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Batch Name</label>
          <Field name="name" type="text" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Start Time</label>
          <Field name="startTime" type="time" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">End Time</label>
          <Field name="endTime" type="time" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm" />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" color="blue">
            {initialValues.id ? "Save Changes" : "Submit"}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

// Main Component
const Batch = () => {
  const schools = useSelector((state) => state.schools.schools);
  const batches = useSelector((state) => state.batches.batches);
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: null,
    standardId: null,
    initialValues: {},
  });

  const openAddModal = (standardId) => {
    setModalData({
      isOpen: true,
      type: "add",
      standardId,
      initialValues: { name: "", startTime: "", endTime: "" },
    });
  };

  const openEditModal = (standardId, batch) => {
    setModalData({
      isOpen: true,
      type: "edit",
      standardId,
      initialValues: { ...batch },
    });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: null, standardId: null, initialValues: {} });
  };

  const handleFormSubmit = (values) => {
    const { type, standardId } = modalData;

    if (type === "add") {
      dispatch(addBatch({ standardId, batch: values }));
    } else {
      dispatch(updateBatch({ standardId, batch: values }));
    }

    closeModal();
  };

  return (
    <>
      {schools?.map((std) => {
        const standardId = std.id;
        const filteredBatches = batches.filter((batch) => batch.standardId === standardId);

        return (
          <div key={standardId} className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Standard: {std.standardName}
              </h1>
              <Button type="button" onClick={() => openAddModal(standardId)}>
                Add Batch
              </Button>
            </div>

            <Table
              columns={["Batch Name", "Start Time", "End Time", "Actions"]}
              data={filteredBatches.map((batch) => ({
                id: batch.id,
                values: [batch.name, batch.startTime, batch.endTime],
              }))}
              renderActions={(item) => (
                <div className="flex gap-2 justify-center">
                  <Button
                    color="yellow"
                    type="button"
                    onClick={() => openEditModal(standardId, item)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    type="button"
                    onClick={() => dispatch(deleteBatch({ batchId: item.id }))}
                  >
                    Delete
                  </Button>
                </div>
              )}
            />

            {modalData.isOpen && modalData.standardId === standardId && (
              <ModalWrapper onClose={closeModal}>
                <BatchForm initialValues={modalData.initialValues} onSubmit={handleFormSubmit} />
              </ModalWrapper>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Batch;
