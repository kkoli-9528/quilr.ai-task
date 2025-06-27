import Condition from "./Condition";

const Group = ({ group, onChange, onRemove }) => {
  const updateCondition = (index, updatedCondition) => {
    const updatedConditions = [...group.conditions];
    updatedConditions[index] = updatedCondition;
    onChange({ ...group, conditions: updatedConditions });
  };

  const remove = (index) => {
    const updatedConditions = group.conditions.filter((_, i) => i !== index);
    onChange({ ...group, conditions: updatedConditions });
  };

  const addCondition = () => {
    onChange({
      ...group,
      conditions: [...group.conditions, { field: "", operator: "", value: "" }],
    });
  };

  const handleAddGroup = () => {
    onChange({
      ...group,
      conditions: [...group.conditions, { logic: "AND", conditions: [] }],
    });
  };

  return (
    <div className="border p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm">Logic:</label>
        <select
          value={group.logic}
          onChange={(e) => onChange({ ...group, logic: e.target.value })}
          className="border px-2 py-1"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {onRemove && (
          <button
            onClick={onRemove}
            className="border px-2 py-1 text-red-600 ml-auto"
          >
            Remove Group
          </button>
        )}
      </div>

      {group.conditions.map((item, index) =>
        item.conditions ? (
          <Group
            key={index}
            group={item}
            onChange={(updatedGroup) => updateCondition(index, updatedGroup)}
            onRemove={() => remove(index)}
          />
        ) : (
          <Condition
            key={index}
            condition={item}
            onChange={(updatedCondition) =>
              updateCondition(index, updatedCondition)
            }
            onRemove={() => remove(index)}
          />
        )
      )}

      <div className="flex gap-4 mt-2">
        <button onClick={addCondition} className="border px-2 py-1">
          + Condition
        </button>
        <button onClick={handleAddGroup} className="border px-2 py-1">
          + Group
        </button>
      </div>
    </div>
  );
};

export default Group;
