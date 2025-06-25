import { fieldOptions, operators } from "../data";
import type { ConditionType } from "../types";

type Props = {
  condition: ConditionType;
  onChange: (condition: ConditionType) => void;
  onRemove: () => void;
};

export function Condition({ condition, onChange, onRemove }: Props) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <select
        className="border rounded px-2 py-1"
        value={condition.field}
        onChange={(e) =>
          onChange({
            ...condition,
            field: e.target.value as ConditionType["field"],
            value: "",
          })
        }
      >
        <option value="">Select Field</option>
        {Object.keys(fieldOptions).map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-2 py-1"
        value={condition.operator}
        onChange={(e) => onChange({ ...condition, operator: e.target.value })}
      >
        <option value="">Select Operator</option>
        {operators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-2 py-1"
        value={condition.value}
        onChange={(e) => onChange({ ...condition, value: e.target.value })}
        disabled={!condition.field}
      >
        <option value="">Select Value</option>
        {condition.field &&
          fieldOptions[condition.field].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
      </select>

      <button className="text-red-600 font-bold px-2" onClick={onRemove}>
        ➖
      </button>
    </div>
  );
}
