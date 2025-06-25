import type { GroupType, ConditionType } from "../types";
import { Condition } from "./Condition";

type Props = {
  group: GroupType;
  onChange: (group: GroupType) => void;
  onRemove?: () => void;
};

export function Group({ group, onChange, onRemove }: Props) {
  const updateCondition = (index: number, newCondition: ConditionType | GroupType) => {
    const updated = [...group.conditions];
    updated[index] = newCondition;
    onChange({ ...group, conditions: updated });
  };

  const removeCondition = (index: number) => {
    const updated = group.conditions.filter((_, i) => i !== index);
    onChange({ ...group, conditions: updated });
  };

  const addCondition = () => {
    onChange({
      ...group,
      conditions: [
        ...group.conditions,
        { field: "Status", operator: "equals", value: "" } satisfies ConditionType,
      ],
    });
  };

  const addGroup = () => {
    onChange({
      ...group,
      conditions: [...group.conditions, { logic: "AND", conditions: [] }],
    });
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-gray-50">
      <div className="flex gap-2 items-center mb-2">
        <label className="font-semibold text-sm">Logic:</label>
        <select
          className="border rounded px-2 py-1"
          value={group.logic}
          onChange={(e) =>
            onChange({ ...group, logic: e.target.value as GroupType["logic"] })
          }
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {onRemove && (
          <button className="text-red-600 ml-auto" onClick={onRemove}>
            Remove Group
          </button>
        )}
      </div>

      {group.conditions.map((c, i) =>
        "conditions" in c ? (
          <Group
            key={i}
            group={c}
            onChange={(newGroup) => updateCondition(i, newGroup)}
            onRemove={() => removeCondition(i)}
          />
        ) : (
          <Condition
            key={i}
            condition={c}
            onChange={(newCond) => updateCondition(i, newCond)}
            onRemove={() => removeCondition(i)}
          />
        )
      )}

      <div className="flex gap-4 mt-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={addCondition}
        >
          ➕ Add Condition
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={addGroup}
        >
          ➕ Add Group
        </button>
      </div>
    </div>
  );
}
