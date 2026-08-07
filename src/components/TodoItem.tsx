import { useEffect, useRef, useState } from "react";
import { FiCheck, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import type { Todo } from "../types/todo";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface TodoItemProps {
  todo: Todo;
  handleToggleComplete: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
  handleUpdateTodo: () => void;
  handleCancelEdit: () => void;

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
  handleCancelEdit,
  editingId,
  editInput,
  setEditInput,
}: TodoItemProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const isEditing = editingId === todo.id;

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      const el = editInputRef.current;
      el.focus();
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const trimmed = editInput.trim();
  const isUnchanged = trimmed === todo.title.trim();
  const isSaveDisabled = trimmed === "" || isUnchanged;

  function confirmDelete() {
    handleDeleteTodo(todo.id);
    setIsConfirmOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isSaveDisabled) handleUpdateTodo();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancelEdit();
    }
  }

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
        {isEditing ? (
          <div className="todo-edit">
            <input
              ref={editInputRef}
              type="text"
              className="todo-edit__field"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
            />
            <div className="todo-edit__actions">
              <button
                type="button"
                className="todo-edit__btn todo-edit__btn--cancel"
                onClick={handleCancelEdit}
              >
                <FiX className="todo-edit__btn-icon" aria-hidden="true" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                className="todo-edit__btn todo-edit__btn--save"
                onClick={handleUpdateTodo}
                disabled={isSaveDisabled}
              >
                <FiCheck className="todo-edit__btn-icon" aria-hidden="true" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="todo-item__title">{todo.title}</p>
        )}
        {!isEditing && (
          <span className="todo-item__timestamp">{todo.createdAt}</span>
        )}
      </div>

      {!isEditing && (
        <div className="todo-item__actions">
          {!todo.completed && (
            <button
              type="button"
              className="todo-item__action-btn"
              aria-label="Edit task"
              onClick={() => handleEditTodo(todo.id)}
            >
              <FiEdit2 aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            className="todo-item__action-btn todo-item__action-btn--danger"
            aria-label="Delete task"
            onClick={() => setIsConfirmOpen(true)}
          >
            <FiTrash2 aria-hidden="true" />
          </button>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        taskName={todo.title}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </li>
  );
}

export default TodoItem;
