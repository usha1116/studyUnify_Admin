import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "lucide-react";
import { addStudent } from "../../redux/studentIdCreaterSlice";
import Button from "../../component/Button";
const StudentIdCreater = () => {
  const dispatch = useDispatch();
  const { schools } = useSelector((state) => state.schools);
  const { batches: batchMap } = useSelector((state) => state.batches);
  
  const [batches, setBatches] = useState([]);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    id: Date.now(), // Ensure each student has a unique ID
    name: " isha",
    mobile1: "",
    mobile2: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
    standardId: "",
    batchId: "",
    organization: "",
    studentId: "" // Will be generated when form is submitted
  });

  // Filter batches when standard changes
  useEffect(() => {
    if (form.standardId && Array.isArray(batchMap)) {
      const relatedBatches = batchMap.filter(
        batch => batch.standardId === parseInt(form.standardId)
      );
      setBatches(relatedBatches);
      setForm(prev => ({
        ...prev,
        batchId: relatedBatches.length > 0 ? relatedBatches[0].id : ""
      }));
    } else {
      setBatches([]);
      setForm(prev => ({ ...prev, batchId: "" }));
    }
  }, [form.standardId, batchMap]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(form.mobile1)) {
      newErrors.mobile1 = "Mobile number must be 10 digits.";
    }

    if (form.mobile2 && !mobileRegex.test(form.mobile2)) {
      newErrors.mobile2 = "Mobile number 2 must be 10 digits.";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Generate a student ID
    const studentObj = {
      ...form,
      id: Date.now(),
      studentId: `STU${Date.now().toString().slice(-6)}`
    };
    
    // Dispatch to Redux store
    dispatch(addStudent(studentObj));
    
    // Reset form
    setForm({
      id: Date.now(),
      name: "",
      mobile1: "",
      mobile2: "",
      email: "",
      address: "",
      gender: "",
      dob: "",
      standardId: "",
      batchId: "",
      organization: "",
      studentId: ""
    });
    
    setErrors({});
  };

  const handleClear = () => {
    setForm({
      id: Date.now(),
      name: "",
      mobile1: "",
      mobile2: "",
      email: "",
      address: "",
      gender: "",
      dob: "",
      standardId: "",
      batchId: "",
      organization: "",
      studentId: ""
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={40} />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 rounded bg-blue-100"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Mobile</label>
              <input
                type="tel"
                value={form.mobile1}
                onChange={(e) => handleChange("mobile1", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
                required
              />
              {errors.mobile1 && (
                <p className="text-red-500 text-sm">{errors.mobile1}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Mobile 2</label>
              <input
                type="tel"
                value={form.mobile2}
                onChange={(e) => handleChange("mobile2", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
              />
              {errors.mobile2 && (
                <p className="text-red-500 text-sm">{errors.mobile2}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Organization</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => handleChange("organization", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-4 py-2 rounded bg-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Standard</label>
              <select
                value={form.standardId}
                onChange={(e) => handleChange("standardId", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
                required
              >
                <option value="">Select Standard</option>
                {schools?.map((std) => (
                  <option key={std.standardId} value={std.standardId}>
                    {std.standardName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Batch</label>
              <select
                value={form.batchId}
                onChange={(e) => handleChange("batchId", e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-100"
                required
                disabled={!form.standardId}
              >
                <option value="">Select Batch</option>
                {form.standardId
                  ? batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="submit" color="blue">Submit</Button>
          <Button type="button" color="gray" onClick={handleClear}>Clear</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentIdCreater;
