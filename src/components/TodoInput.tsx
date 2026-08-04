import { FiPlus } from "react-icons/fi";

interface TodoInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: () => void;
}

function TodoInput({ input, setInput, handleAddTodo }: TodoInputProps) {
  return (
    <form
      className="todo-input"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
    >
      <input
        type="text"
        className="todo-input__field"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="todo-input__button">
        <FiPlus className="todo-input__icon" aria-hidden="true" />
        <span>Add Task</span>
      </button>
    </form>
  );
}

export default TodoInput;
