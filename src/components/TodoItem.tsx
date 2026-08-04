import { FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  handleToggleComplete: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
  handleUpdateTodo: () => void;

  editingId: string | null;
  editInput: string;
  setEditInput: React.Dispatch<React.SetStateAction<string>>;
}

function TodoItem({
  todo,
  handleToggleComplete,
  handleDeleteTodo,
  handleEditTodo,
  handleUpdateTodo,
  editingId,
  editInput,
  setEditInput,
}: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? "todo-item--completed" : ""}`}>
      <button
        type="button"
        className="todo-item__check"
        onClick={() => handleToggleComplete(todo.id)}
      >
        {todo.completed && (
          <FiCheck className="todo-item__check-icon" aria-hidden="true" />
        )}
      </button>

      <div className="todo-item__content">
        {editingId === todo.id ? (
          <input
            type="text"
            className="todo-item__edit-input"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
        ) : (
          <p className="todo-item__title">{todo.title}</p>
        )}
        <span className="todo-item__timestamp">{todo.createdAt}</span>
      </div>

      <div className="todo-item__actions">
        {!todo.completed && (
          <button
            type="button"
            className="todo-item__action-btn"
            aria-label="Edit task"
            onClick={() => {
              if (editingId === todo.id) {
                handleUpdateTodo();
              } else {
                handleEditTodo(todo.id);
              }
            }}
          >
            {editingId === todo.id ? "Save" : <FiEdit2 aria-hidden="true" />}
          </button>
        )}
        <button
          type="button"
          className="todo-item__action-btn todo-item__action-btn--danger"
          aria-label="Delete task"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <FiTrash2 aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
