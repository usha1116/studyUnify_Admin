import React, { useState, useEffect } from "react";
import Button from "./Button";

const AddEditData = ({ isOpen, onClose, onSave, initialData = {}, fields }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: initialData[field.name] || "" }), {})
  );

  useEffect(() => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: initialData[field.name] || "" }), {}));
  }, [initialData, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Basic validation
    const hasEmptyFields = Object.values(formData).some((val) => val.trim() === "");
    if (hasEmptyFields) {
      alert("Please fill out all fields.");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-lg font-semibold mb-4">
          {initialData.id ? "Edit Data" : "Add New Data"}
        </h3>
        {fields.map((field) => (
          <div key={field.name} className="mb-2">
            <label className="block text-gray-700">{field.placeholder}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="p-2 border rounded-lg w-full"
            />
          </div>
        ))}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} color="gray">Cancel</Button>
          <Button onClick={handleSubmit} color="blue">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AddEditData;

