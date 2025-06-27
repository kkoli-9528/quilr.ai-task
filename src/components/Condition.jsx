import { useState, useEffect } from "react";
import { fieldOptions, operators } from "../data";

const Condition = ({ condition, onChange, onRemove }) => {
  const [selectedField, setSelectedField] = useState(condition.field);
  const [selectedOperator, setSelectedOperator] = useState(condition.operator);
  const [selectedValue, setSelectedValue] = useState(condition.value);

  useEffect(() => {
    onChange({
      field: selectedField,
      operator: selectedOperator,
      value: selectedValue,
    });
  }, [selectedField, selectedOperator, selectedValue]);

  return (
    <div className="flex gap-2 items-center mb-2">
      <select
        value={selectedField}
        onChange={(e) => {
          setSelectedField(e.target.value);
          setSelectedValue("");
        }}
        className="border px-2 py-1"
      >
        <option value="">Select Field</option>
        {Object.keys(fieldOptions).map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      <select
        value={selectedOperator}
        onChange={(e) => setSelectedOperator(e.target.value)}
        className="border px-2 py-1"
      >
        <option value="">Select Operator</option>
        {operators.map((operator) => (
          <option key={operator} value={operator}>
            {operator}
          </option>
        ))}
      </select>

      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        disabled={!selectedField}
        className="border px-2 py-1"
      >
        <option value="">Select Value</option>
        {selectedField &&
          fieldOptions[selectedField].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>

      <button onClick={onRemove} className="border px-2 py-1 text-red-600">
        Remove
      </button>
    </div>
  );
};

export default Condition;
