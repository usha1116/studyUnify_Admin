
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addMessage } from "../../redux/simplemessageSlice";

// const SimpleMessage = () => {
//   const dispatch = useDispatch();
//   const standards = useSelector((state) => state?.schools?.schools || []);
//   const batches = useSelector((state) => state?.batch?.batches || []);

//   const [step, setStep] = useState(1);
//   const [expanded, setExpanded] = useState(null);
//   const [selectedBatches, setSelectedBatches] = useState({});
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleNextStep = () => {
//     setStep(2);
//   };

//   const handleToggleBatch = (standardId, batchName) => {
//     setSelectedBatches((prev) => {
//       const stdBatches = prev[standardId] || [];
//       const isSelected = stdBatches.includes(batchName);
//       return {
//         ...prev,
//         [standardId]: isSelected
//           ? stdBatches.filter((b) => b !== batchName)
//           : [...stdBatches, batchName],
//       };
//     });
//   };

//   const handleAddMessage = () => {
//     const selectedStandards = Object.keys(selectedBatches);

//     if (selectedStandards.length === 0) {
//       alert("Please select at least one standard and batch.");
//       return;
//     }

//     selectedStandards.forEach((stdId, index) => {
//       const standard = standards.find((s) => s.id === parseInt(stdId));
//       const batchesForStandard = selectedBatches[stdId];

//       dispatch(
//         addMessage({
//           id: Date.now() + index,
//           name: standard.name,
//           batches: batchesForStandard,
//         })
//       );
//     });
//     alert("Message created successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-purple-50 p-6">
//       {step === 1 && (
//         <div className="space-y-6 max-w-md mx-auto">
//           <div>
//             <label className="text-xl font-bold text-gray-600">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full mt-2 p-4 rounded-2xl border text-lg"
//             />
//           </div>

//           <div>
//             <label className="text-xl font-bold text-gray-600">Description</label>
//             <textarea
//               rows={6}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full mt-2 p-4 rounded-2xl border text-lg"
//             />
//           </div>

//           <button
//             onClick={handleNextStep}
//             className="w-full py-4 rounded-full bg-black text-white text-lg font-semibold shadow-lg"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="max-w-md mx-auto space-y-4">
//           <h2 className="text-center text-xl font-medium mb-4">
//             Select standard and batch
//           </h2>

//           {standards.map((standard) => {
//             const relatedBatches = batches.filter(
//               (b) => b.standardId === standard.id
//             );
// console.log(standards)
//             return (
//               <div key={standard.id} className="space-y-2">
//                 <button
//                   className="w-full flex justify-between items-center px-4 py-3 bg-blue-200 font-semibold rounded-md shadow"
//                   onClick={() =>
//                     setExpanded((prev) => (prev === standard.id ? null : standard.id))
//                   }
//                 >
//                   {standard.name}
//                   <span>{expanded === standard.id ? "▲" : "▼"}</span>
//                 </button>

//                 {expanded === standard.id && (
//                   <div className="bg-blue-400 p-4 rounded-lg space-y-2 text-white">
//                     {relatedBatches.map((batch) => (
//                       <div
//                         key={batch.id}
//                         className="flex justify-between items-center"
//                       >
//                         <span>{batch.name}</span>
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4"
//                           checked={
//                             selectedBatches[standard.id]?.includes(batch.name) || false
//                           }
//                           onChange={() =>
//                             handleToggleBatch(standard.id, batch.name)
//                           }
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           <button
//             onClick={handleAddMessage}
//             className="px-4 py-2 bg-green-600 text-white rounded shadow mb-4 w-full"
//           >
//             Add Message
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SimpleMessage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/simplemessageSlice";
import { ChevronUp, ChevronDown } from "lucide-react";
import Modal from "../../component/Modal";

const SimpleMessage = () => {
  const dispatch = useDispatch();
  const standards = useSelector((state) => state?.schools?.schools || []);
  const batches = useSelector((state) => state?.batches?.batches || []);

  const [step, setStep] = useState(1);
  const [expanded, setExpanded] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validate()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleToggleBatch = (standardId, batchId) => {
    setSelectedBatches((prev) => {
      const stdBatches = prev[standardId] || [];
      const isSelected = stdBatches.includes(batchId);
      return {
        ...prev,
        [standardId]: isSelected
          ? stdBatches.filter((b) => b !== batchId)
          : [...stdBatches, batchId],
      };
    });
  };

  const handleSelectAll = (standardId, relatedBatches) => {
    setSelectedBatches((prev) => {
      const currentBatches = prev[standardId] || [];
      return {
        ...prev,
        [standardId]:
          currentBatches.length === relatedBatches.length ? [] : relatedBatches.map((b) => b.id),
      };
    });
  };

  const handleAddMessage = () => {
    const selectedStandards = Object.keys(selectedBatches);
    if (selectedStandards.length === 0) return;

    selectedStandards.forEach((stdId, index) => {
      const standard = standards.find((s) => s.id === parseInt(stdId));
      const batchIds = selectedBatches[stdId];

      const batchNames = batches
        .filter((b) => batchIds.includes(b.id))
        .map((b) => b.name);

      dispatch(
        addMessage({
          id: Date.now() + index,
          title,
          description,
          name: standard?.name || "Unknown",
          batches: batchNames,
        })
      );
    });

    setSuccessMessage("Message sent successfully!");
    setStep(2);
    setSelectedBatches({});
    setTitle("");
    setDescription("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  const handleToggleExpand = (standardId) => {
    setExpanded((prev) =>
      prev.includes(standardId)
        ? prev.filter((id) => id !== standardId)
        : [...prev, standardId]
    );
  };

  return (
    <div className="relative">
      <div
        className={`min-h-screen bg-purple-50 p-6 transition duration-300 ${
          successMessage ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Simple Message</h1>

        {step === 1 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="text-xl font-bold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl border text-lg"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="text-xl font-bold text-gray-700">Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl border text-lg"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-2 rounded-full bg-black text-white text-lg font-semibold shadow"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-center text-xl font-medium mb-4">
              Select standard and batch
            </h2>

            {standards.length === 0 ? (
              <p className="text-center text-gray-500">No standards available</p>
            ) : (
              standards.map((standard) => {
                const relatedBatches = batches.filter(
                  (b) => b.standardId === standard.id
                );
                const isExpanded = expanded.includes(standard.id);

                return (
                  <div
                    key={standard.id}
                    className="rounded-sm shadow bg-gray-100"
                  >
                    <button
                      className={`w-full flex justify-between items-center px-4 py-3 text-lg font-semibold text-gray-800 rounded-t-sm ${
                        isExpanded ? "bg-blue-200" : "bg-gray-100"
                      }`}
                      onClick={() => handleToggleExpand(standard.id)}
                    >
                      {standard.name || `Standard ${standard.id}`}
                      {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {isExpanded && (
                      <div className="bg-blue-200 rounded-b-sm p-4 space-y-2 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-800">All</span>
                          <input
                            type="checkbox"
                            className="w-4 h-4 border-black"
                            checked={
                              relatedBatches.length > 0 &&
                              relatedBatches.every((b) =>
                                selectedBatches[standard.id]?.includes(b.id)
                              )
                            }
                            onChange={() =>
                              handleSelectAll(standard.id, relatedBatches)
                            }
                          />
                        </div>

                        {relatedBatches.map((batch) => (
                          <div
                            key={batch.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-800">
                              {batch.name}
                            </span>
                            <input
                              type="checkbox"
                              className="w-4 h-4 border-black"
                              checked={
                                selectedBatches[standard.id]?.includes(batch.id) || false
                              }
                              onChange={() =>
                                handleToggleBatch(standard.id, batch.id)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            <button
              onClick={handleAddMessage}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-full text-lg font-medium shadow"
            >
              Send Message
            </button>
          </div>
        )}
      </div>

      {/* ✅ Reusable Modal */}
      <Modal show={!!successMessage}>
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <p className="text-lg font-semibold text-gray-800">{successMessage}</p>
      </Modal>
    </div>
  );
};

export default SimpleMessage;

