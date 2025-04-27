import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteManager } from "../../redux/managerIdSlice"; 
import Button from "../../component/Button";
import Table from "../../component/Table";
//import DeleteConfirmation from "../../component/DeleteConfirmation";

const ManagerList = () => {
  const managers = useSelector((state) => state.managerId.managers); 
  const dispatch = useDispatch();

  const [selectedManager, setSelectedManager] = useState(null);

  const handleDelete = (id) => {
    console.log("Deleting Teacher ID:", id);
    dispatch(deleteManager(id));
  };

  const handleRowClick = (manager) => {
    setSelectedManager(manager);
  };

  const handleCloseModal = () => {
    setSelectedManager(null);
  };

  const columns = ["No.", "Manager Name", "Login ID", "Action"];
  const rows = managers.map((manager, index) => ({
    id: manager.id,
    values: [
      index + 1,
      manager.name,
      manager.loginId || `MGR${manager.id}`,
      <Button onClick={() => handleDelete(manager.id)} color="red">
        Delete
      </Button>,
    ],
    onClick: () => handleRowClick(manager),
  }));

 // console.log(rows); 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manager List</h2>
      {managers.length > 0 ? (
      <Table columns={columns} data={rows} />
      ) : (
        <p className="text-center text-gray-600 mt-4"> No managers found.</p>
      )}
      {selectedManager && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Manager Details</h3>
            <div className="space-y-2">
              <p><strong>Login ID:</strong> MGR{selectedManager.id}</p>
              <p><strong>Name:</strong> {selectedManager.name}</p>
              <p><strong>Email:</strong> {selectedManager.email}</p>
              <p><strong>Mobile No-1:</strong> {selectedManager.mobile1}</p>
              <p><strong>Mobile No-2:</strong> {selectedManager.mobile2}</p>
              <p><strong>Gender:</strong> {selectedManager.gender}</p>
              <p><strong>Address:</strong> {selectedManager.address}</p>
            </div>
            <div className="text-center mt-4">
              <Button onClick={handleCloseModal} label="OK">Ok</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerList;
