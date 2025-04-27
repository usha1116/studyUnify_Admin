import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addManager, updateManager, deleteManager } from "../../redux/managerIdSlice";
import Button from "../../component/Button";
import Table from "../../component/Table";
import DeleteConfirmation from "../../component/DeleteConfirmation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ManagerId = () => {
  const dispatch = useDispatch();
  const managers = useSelector((state) => state.managerId.managers);
  const nextId = managers.length + 1;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile1: Yup.string()
      .matches(/^[0-9]{10}$/, "Primary Mobile must be 10 digits")
      .required("Primary Mobile is required"),
    mobile2: Yup.string().matches(/^[0-9]{10}$/, "Secondary Mobile must be 10 digits"),
    address: Yup.string().required("Address is required"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const openAddEditModal = (data = {}) => {
    if (data.id) {
      setCurrentData(data); // Edit
    } else {
      setCurrentData({}); // Add
    }
    setIsAddEditOpen(true);
  };

  const handleSave = (values) => {
    if (values.id) {
      dispatch(updateManager(values));
    } else {
      dispatch(addManager({ ...values, id: nextId }));
    }
    setIsAddEditOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteManager(deleteId));
    setIsDeleteOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Managers</h2>
          <Button type="button" onClick={() => openAddEditModal()} color="blue">
            Add New Manager
          </Button>
        </div>

        {managers.length > 0 && (
          <Table
            columns={[
              "ID",
              "Name",
              "Mobile 1",
              "Mobile 2",
              "email",
              "Address",
              "Start Time",
              "End Time",
              "Gender",
              "Actions",
            ]}
            data={managers}
            renderActions={(manager) => (
              <div className="flex justify-center gap-4">
                <Button onClick={() => openAddEditModal(manager)} color="yellow">
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setDeleteId(manager.id);
                    setIsDeleteOpen(true);
                  }}
                  color="red"
                >
                  Delete
                </Button>
              </div>
            )}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddEditOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">
              {currentData.id ? "Edit Manager" : "Add New Manager"}
            </h3>
            <Formik
              initialValues={{
                id: currentData.id || "",
                name: currentData.name || "",
                mobile1: currentData.mobile1 || "",
                mobile2: currentData.mobile2 || "",
                email: currentData.email || "",
                address: currentData.address || "",
                startTime: currentData.startTime || "",
                endTime: currentData.endTime || "",
                gender: currentData.gender || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              <Form className="space-y-4">
                <Field name="name" placeholder="Enter Manager Name" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="name" component="div" className="text-red-500" />

                <Field name="mobile1" placeholder="Enter Primary Mobile" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="mobile1" component="div" className="text-red-500" />

                <Field name="mobile2" placeholder="Enter Secondary Mobile" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="mobile2" component="div" className="text-red-500" />

                <Field name="email" placeholder="Enter Email" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="email" component="div" className="text-red-500" />

                <Field name="address" placeholder="Enter Address" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="address" component="div" className="text-red-500" />

                <Field type="time" name="startTime" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="startTime" component="div" className="text-red-500" />

                <Field type="time" name="endTime" className="p-2 border rounded-lg w-full" />
                <ErrorMessage name="endTime" component="div" className="text-red-500" />

                <Field as="select" name="gender" className="p-2 border rounded-lg w-full">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500" />

                <div className="flex justify-end space-x-2">
                  <Button type="button" onClick={() => setIsAddEditOpen(false)} color="gray">
                    Cancel
                  </Button>
                  <Button type="submit" color="blue">
                    Save
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={managers.find((m) => m.id === deleteId)?.name}
      />
    </div>
  );
};

export default ManagerId;