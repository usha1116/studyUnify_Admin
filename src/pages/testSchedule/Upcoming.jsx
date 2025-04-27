import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUpcomingTest,
  editUpcomingTest,
  addCompletedTest,
  deleteUpcomingTest,
  addToMarkPending,
  removeFromUpcoming 
} from "../../redux/upcomingSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../component/Button";
import Table from "../../component/Table";

const initialFormValues = {
  id: "",
  standard: "",
  batch: "",
  subject: "",
  date: "",
  startTime: '',
  endTime: "",
  chapters: "",
  description: "",
  totalMarks: "" 
};


const validationSchema = Yup.object().shape({
  standard: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  batch: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  chapters: Yup.number().required("Required").positive().integer(),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  totalMarks: Yup.number().required("Required").positive().integer(),

});

const Upcoming = () => {
  const dispatch = useDispatch();
  const upcomingTests = useSelector((state) => state.upcoming?.upcomingTests || []);
  const standards = useSelector((state) => state.schools?.schools || []);
  const batches = useSelector((state) => state.batches?.batches || []);
  const subjects = useSelector((state) => state.subjects.subjects);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const nextId = upcomingTests.length + 1;

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (test) => {
    const matchedStandard = standards.find(std => std.standardName === test.standard);
    const matchedSubject = subjects.find(sub => sub.subjectName === test.subject);
    const matchedBatch = batches.find(b => b.name === test.batch);

    setEditData({
      ...test,
      standard: matchedStandard?.standardName || "",
      subject: matchedSubject?.subjectName || "",
      batch: matchedBatch?.name || ""
    });
    setShowModal(true);
  };

  const handleComplete = (test) => {
    dispatch(addCompletedTest({ ...test, status: "completed" }));
    dispatch(deleteUpcomingTest(test.id));
  };
 

const handleMarkPending = (test) => {
  console.log(" Sending to Pending:", test); 
   dispatch(addToMarkPending(test)); 
  dispatch(removeFromUpcoming(test.id)); 


};
  const handleSubmit = (values, { resetForm }) => {
    if (editData) {
      console.log(values)
      dispatch(editUpcomingTest(values));
    } else {
      // const newTest = {
      //   ...values,
      //   id: Date.now().toString(), // ✅ generates a unique ID as string
      // };
    
      console.log(values)
      dispatch(addUpcomingTest({ ...values, id: nextId }));

    }
    resetForm();
    setShowModal(false);
    setEditData(null);
    
  };


  const columns = [
    { header: "No.", accessor: (_, index) => index + 1 },
    { header: "Standard", accessor: "standard" },
    { header: "Batch", accessor: "batch" },
    { header: "Subject", accessor: "subject" },
    { header: "Date", accessor: "date" },
    { header: "Start Time", accessor: (row) => `${row.startTime}` },
    { header: "End Time", accessor: (row) => `${row.endTime}` },
    { header: "Chapters", accessor: "Chapters" },
    { header: "Description", accessor: "description" },
    { header: "Total Marks", accessor: "totalMarks" },
    { header: "Actions", accessor: "actions" },
  ];
  return (
    <div className="mb-6 overflow-x-hidden">
      <h1 className="text-xl font-bold mb-4">Upcoming Test Schedule</h1>

      <div className="mb-4"> 
        <Button
          label="Add Test"
          onClick={handleAdd}
          color="blue"
          className="gap-x-4"
        >
          Add Test
        </Button>
      </div>

      <Table
        columns={columns}
        data={upcomingTests}
        renderActions={(row) => (
          <div className="flex gap-2">
            <Button
              label="Edit"
              onClick={() => handleEdit(row)}
              color="yellow"
            >
              Edit
            </Button>
           

            <select
              onChange={(e) => {
                if (e.target.value === "complete") handleComplete(row);
                if (e.target.value === "pending") handleMarkPending(row);
              }}
              className="border p-2 rounded"
            >
              <option value=" ">Actions</option>
              <option value="complete">Complete</option>
              <option value="pending" onClick={handleMarkPending} >Mark Pending</option>
            </select>
          </div>
        )}
      />


      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[40%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">


            <h2 className="text-lg font-bold mb-4">
              {editData ? "Edit Test" : "Add Test"}
            </h2>

            <Formik
              initialValues={editData || initialFormValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
             
            >
              {() => (
                <Form className="grid gap-2 space-y-2">
                  <div>
                    <label>Standard</label>
                    <Field as="select" name="standard" className="w-full border p-2 rounded">
                      <option value="">Select Standard</option>
                      {standards.map((std) => (
                        <option key={std.id} value={std.standardName}>
                          {std.standardName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="standard" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label>Subject</label>
                    <Field as="select" name="subject" className="w-full border p-2 rounded">
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.subjectName}>
                          {sub.subjectName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="subject" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label>Batch</label>
                    <Field as="select" name="batch" className="w-full border p-2 rounded">
                      <option value="">Select Batch</option>
                      {batches.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="batch" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label>Date</label>
                    <Field type="date" name="date" className="w-full border p-2 rounded" />
                    <ErrorMessage name="date" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label>Start Time</label>
                      <Field type="time" name="startTime" className="w-full border p-2 rounded" />
                      <ErrorMessage name="startTime" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div className="flex-1">
                      <label>End Time</label>
                      <Field type="time" name="endTime" className="w-full border p-2 rounded" />
                      <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label>Chapter Count</label>
                    <Field type="text" name="chapters" className="w-full border p-2 rounded" />
                    <ErrorMessage name="chapters" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label>Total Marks</label>
                    <Field type="number" name="totalMarks" className="w-full border p-2 rounded" />
                    <ErrorMessage name="totalMarks" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label>Description</label>
                    <Field as="textarea" name="description" className="w-full border p-2 rounded" />
                    <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div className="flex justify-end gap-x-4 ">
                    <Button label="Cancel" onClick={() => setShowModal(false)} color="gray">Cancel</Button>
                    <Button type="submit" label="Submit" className="bg-blue-600 text-white">Submit</Button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upcoming;