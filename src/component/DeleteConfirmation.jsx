import React from "react";
import Button from "./Button";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Warning Message</h2>
        <p className="mb-4">
          Deleting <span className="text-red-600">{itemName}</span> may cause issues in the future and cannot be undone.
          Are you sure you want to proceed?
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} color="gray">Cancel</Button>
          <Button onClick={onConfirm} color="red">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
