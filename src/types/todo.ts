export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = "all" | "active" | "completed";

export interface FilterOption {
  label: string;
  value: FilterType;
}
