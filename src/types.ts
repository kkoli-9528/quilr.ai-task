import { fieldOptions } from "./data";

export type LogicType = "AND" | "OR";

export type ConditionType = {
  field: keyof typeof fieldOptions;
  operator: string;
  value: string;
};

export type GroupType = {
  logic: LogicType;
  conditions: Array<ConditionType | GroupType>;
};
