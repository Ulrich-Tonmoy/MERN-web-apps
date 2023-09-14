export type Id = string | number;

export enum Priority {
  Critical = "Critical",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Clear = "Clear",
  None = "None",
}

export type List = {
  id: Id;
  title: string;
  count: number;
};

export type Task = {
  id: Id;
  listId: Id;
  priority: Priority;
  content: string;
};
