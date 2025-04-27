import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFees } from '../../redux/feesinstallmentSlice';
import Table from '../../component/Table';

const Feesinstallment = () => {
  const dispatch = useDispatch();

  const standards = useSelector((state) => state.schools.schools);
  const feesList = useSelector((state) => state.fees.feesList);

  const [standardId, setStandardId] = useState('');
  const [totalFees, setTotalFees] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [installments, setInstallments] = useState([]);

  // Automatically generate EMI rows when totalFees & EMI count are entered
  useEffect(() => {
    if (totalFees && numberOfInstallments) {
      const emiAmount = (Number(totalFees) / Number(numberOfInstallments)).toFixed(2);
      const emiArray = Array.from({ length: Number(numberOfInstallments) }, () => ({
        amount: emiAmount,
        date: '',
      }));
      setInstallments(emiArray);
    } else {
      setInstallments([]);
    }
  }, [totalFees, numberOfInstallments]);

  const handleDateChange = (index, date) => {
    const updated = [...installments];
    updated[index].date = date;
    setInstallments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!standardId || !totalFees || !numberOfInstallments || installments.some((i) => !i.date)) {
      alert("Please complete all fields and set dates for all EMIs.");
      return;
    }

    dispatch(
      addFees({
        standardId,
        totalFees: Number(totalFees),
        numberOfInstallments: Number(numberOfInstallments),
        installments,
      })
    );

    // Reset
    setStandardId('');
    setTotalFees('');
    setNumberOfInstallments('');
    setInstallments([]);
  };

  const columns = ['Standard', 'Total Fees', 'No. of Installments'];
  const tableData = feesList.map((fee) => {
    const standard = standards.find((std) => String(std.id) === String(fee.standardId));
  
    return {
      id: fee.id,
      values: [
        standard ? standard.standardName : 'Unknown Standard',
        `₹${fee.totalFees}`,
        fee.numberOfInstallments,
      ],
    };
  });
console.log(standards)
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Fees Installment</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-6 rounded-lg shadow">
        {/* Standard Selector */}
        <div>
          <label className="block mb-1 font-medium">Select Standard</label>
          <select
            value={standardId}
            onChange={(e) => setStandardId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Standard</option>
            {standards.map((std) => (
              <option key={std.id} value={std.id}>
                {std.standardName}
              </option>
            ))}
          </select>
        </div>

        {/* Total Fees Input */}
        <div>
          <label className="block mb-1 font-medium">Total Fees</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
            <input
              type="number"
              value={totalFees}
              onChange={(e) => setTotalFees(e.target.value)}
              className="w-full border p-2 pl-8 rounded"
              min="0"
              required
            />
          </div>
        </div>

        {/* Number of Installments */}
        <div>
          <label className="block mb-1 font-medium">No. of EMI</label>
          <input
            type="number"
            value={numberOfInstallments}
            onChange={(e) => setNumberOfInstallments(e.target.value)}
            className="w-full border p-2 rounded"
            min="1"
            required
          />
        </div>

        {/* EMI List */}
        {installments.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-lg font-semibold">Installment Details</h4>
            {installments.map((emi, index) => (
              <div key={index} className="flex gap-4 items-center">
                <p className="flex-1">EMI {index + 1}: ₹{emi.amount}</p>
                <input
                  type="date"
                  value={emi.date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Submit
        </button>
      </form>

      {/* Fees Table */}
      <Table columns={columns} data={tableData} />
    </div>
  );
};

export default Feesinstallment;
