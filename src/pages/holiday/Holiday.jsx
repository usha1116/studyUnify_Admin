import React, { useState } from "react";
import Table from "../../component/Table";
import Button from "../../component/Button";
import DeleteConfirmation from "../../component/DeleteConfirmation";

const Holiday = () => {
  const [holidays, setHolidays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    fromDate: "",
    toDate: "",
  });

  const handleOpenModal = (holiday = null, index = null) => {
    if (holiday) {
      setFormData(holiday);
      setSelectedHoliday(index);
    } else {
      setFormData({ name: "", fromDate: "", toDate: "" });
      setSelectedHoliday(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", fromDate: "", toDate: "" });
  };

  const handleSave = () => {
    if (selectedHoliday !== null) {
      const updated = [...holidays];
      updated[selectedHoliday] = formData;
      setHolidays(updated);
    } else {
      setHolidays([...holidays, formData]);
    }
    handleCloseModal();
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    const updated = holidays.filter((_, i) => i !== deleteIndex);
    setHolidays(updated);
    setIsDeleteOpen(false);
  };

  const columns = ["No.", "Holiday Name", "Start Date", "End Date", "Actions"];

  const tableData = holidays.map((holiday, index) => ({
    values: [index + 1, holiday.name, holiday.fromDate, holiday.toDate],
    id: index,
  }));

  const renderActions = (item) => (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        label="Edit"
        onClick={() => handleOpenModal(holidays[item.id], item.id)}
        color="yellow"
      > Edit</Button>
      <Button
        label="Delete"
        onClick={() => handleDelete(item.id)}
        color="red"
      > Delete</Button>
    </div>
  );

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Holiday List</h1>
      <div className="mb-4 flex justify-center md:justify-start">
        <Button
          label="Add Holiday"
          onClick={() => handleOpenModal()}
          color="blue"
        > Add Holiday</Button>
      </div>

      {holidays.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No holidays available.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table columns={columns} data={tableData} renderActions={renderActions} />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold text-center">
              {selectedHoliday !== null ? "Edit" : "Add"} Holiday
            </h2>
            <input
              type="text"
              placeholder="Holiday Name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={formData.fromDate}
              onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={formData.toDate}
              onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
            />
            <div className="flex justify-end gap-2 pt-2 flex-wrap">
              <Button onClick={handleCloseModal} color="gray">Cancel</Button>
              <Button onClick={handleSave} color="blue">Save</Button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName="this holiday"
      />
    </div>
  );
};

export default Holiday;
