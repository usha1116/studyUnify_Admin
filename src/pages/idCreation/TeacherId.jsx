import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../component/Button";
import Table from "../../component/Table";
import { addTeacher, deleteTeacher } from "../../redux/TeacherIdSlice";
import { ClockFading, SidebarClose, SunDim } from "lucide-react";

const TeacherId = () => {
  const dispatch = useDispatch();

  const teachers = useSelector((state) => state.teacherId.teachers);
  const standards = useSelector((state) => state.schools.schools);
  const batches = useSelector((state) => state.batches?.batches || []);
  const subjects = useSelector((state) => state.subjects.subjects);

  // ✅ FIXED: State declaration
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [addedSubjects, setAddedSubjects] = useState([]);

  

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      altMobile: "",
      email: "",
      address: "",
      gender: "",
      standard: "",
      batch: "",
      subject: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
      altMobile: Yup.string().matches(
        /^\d{10}$/,
        "Alt mobile must be 10 digits"
      ),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Address is required"),
      gender: Yup.string().required("Gender is required"),
      standard: Yup.string().required("Standard is required"),
      batch: Yup.string().required("Batch is required"),
      subject: Yup.string().required("Subject is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (addedSubjects.length === 0) {
        alert("Please add at least one subject");
        return;
      }

      const teacherData = {
        ...values,
        subjectList: addedSubjects,

      };

      dispatch(addTeacher(teacherData));
      resetForm();
      setAddedSubjects([]);
    },
  });
  
  const handleAddSubject = () => {
    const exists = addedSubjects.some(
      (item) =>
        item.standard === formik.values.standard &&
        item.batch === formik.values.batch &&
        item.subject === formik.values.subject
    );

    if (!exists) {
      setAddedSubjects((prev) => [
        ...prev,
        {
          standard: formik.values.standard,
          batch: formik.values.batch,
          subject: formik.values.subject,
        },
      ]);
    }
  };

  const handleStandardChange = (e) => {
    const selected = e.target.value;
    formik.setFieldValue("standard", selected);
    formik.setFieldValue("subject", "");
    formik.setFieldValue("batch", "");

    setSelectedSubjects(
      subjects.filter((sub) => sub.standard === selected) || []
    );
    
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold">Teacher ID Form</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["name", "mobile", "altMobile", "email", "address"].map(
              (field, idx) => (
                <div
                  key={idx}
                  className={field === "address" ? "col-span-2" : ""}
                >
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={
                      field === "altMobile"
                        ? "Alternative Mobile"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    className="input"
                  />
                  {formik.errors[field] && formik.touched[field] && (
                    <p className="text-red-500 text-sm">
                      {formik.errors[field]}
                    </p>
                  )}
                </div>
              )
            )}

            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.errors.gender && formik.touched.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}

            <select
              name="standard"
              value={formik.values.standard}
              onChange={handleStandardChange}
              className="input"
            >
              <option value="">Select Standard</option>
              {standards.map((std) => (
                <option key={std.id} value={std.standardName}>
                  Standard {std.standardName}
                </option>
              ))}
            </select>
            {formik.errors.standard && formik.touched.standard && (
              <p className="text-red-500 text-sm">{formik.errors.standard}</p>
            )}

            <select
              name="batch"
              value={formik.values.batch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Batch</option>
              {batches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>

            {formik.errors.batch && formik.touched.batch && (
              <p className="text-red-500 text-sm">{formik.errors.batch}</p>
            )}

            <select
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              className="input"
            >
              <option value="">Select Subject</option>
              {selectedSubjects.map((sub) => (
                <option key={sub.id} value={sub.subjectName}>
                  {sub.subjectName}
                </option>
              ))}
             
            </select>
            {formik.errors.subject && formik.touched.subject && (
              <p className="text-red-500 text-sm">{formik.errors.subject}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="button" color="blue" onClick={handleAddSubject}>
              Add +
            </Button>
            <Button type="submit" color="blue" onSubmit={formik.handleSubmit}>
              Submit
            </Button>
          </div>
        </form>

        {addedSubjects.length > 0 && (
          <div>
            <h3 className="font-semibold">Added Subjects</h3>
            <ul className="list-disc ml-4">
              {addedSubjects.map((item, idx) => (
                // <li key={idx}>
                //   Standard {item.standard}, Batch {item.batch}, Subject:{" "}
                //   {item.subject}
                // </li>
                <li key={idx}>
                  Standard {item.standard?.name || item.standard},
                  Batch {item.batch?.name || item.batch},
                  Subject: {item.subject?.name || item.subject}
                </li>

              ))}
            </ul>
          </div>
        )}
      </div>

      {teachers.length > 0 && (
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <Table
            data={teachers}
            columns={[
              "No.",
              "Name",
              "Mobile",
              "Standard",
              "Batch",
              "Subject",
              "Action",
            ]}
            renderActions={(teacher, idx) => (
              <tr key={idx}>
                <td className="p-2 text-center">{idx + 1}</td>
                <td className="p-2 text-center">{teacher.name}</td>
                <td className="p-2 text-center">{teacher.mobile}</td>
                <td className="p-2 text-center">{teacher.standard}</td>
                <td className="p-2 text-center">{teacher.batch}</td>
                <td className="p-2 text-center">
                  {/* {teacher.subjectList?.map((s) => s.subject).join(", ")} */}
                  {teacher.subjectList?.map((sub, i) => (
          <span key={i}>{sub.subject}</span> 
        ))}
                </td>
                <td className="p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Button color="yellow">Edit</Button>
                    <Button
                      color="red"
                      onClick={() => dispatch(deleteTeacher(teacher.id))}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default TeacherId;
