function IncomeSelector({ income, handleIncomeChange }) {
  return (
    <div className="income-section">
      <label>Monthly Income Range</label>

      <select value={income} onChange={handleIncomeChange}>
        <option value="">Select your income range</option>
        <option value="Below 20,000">Below ₹20,000</option>
        <option value="20,000 - 50,000">₹20,000 – ₹50,000</option>
        <option value="50,000 - 1,00,000">₹50,000 – ₹1,00,000</option>
        <option value="Above 1,00,000">Above ₹1,00,000</option>
      </select>

      {income && (
        <p className="income-text">
          Selected: <strong>{income}</strong>
        </p>
      )}
    </div>
  );
}

export default IncomeSelector;