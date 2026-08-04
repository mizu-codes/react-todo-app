import { FiList, FiCircle, FiCheckCircle } from "react-icons/fi";
import type { FilterType, FilterOption } from "../types/todo";

const filterOptions: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

const filterIcons = {
  all: FiList,
  active: FiCircle,
  completed: FiCheckCircle,
};

interface FilterProps {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

function Filter({ filter, setFilter }: FilterProps) {
  return (
    <div className="filter" role="group" aria-label="Filter tasks">
      {filterOptions.map((option) => {
        const Icon = filterIcons[option.value];
        const isActive = option.value === filter;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={`filter__button ${
              isActive ? "filter__button--active" : ""
            }`}
          >
            <Icon className="filter__icon" aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
