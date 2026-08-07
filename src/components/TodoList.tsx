import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  handleToggleComplete: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
  handleUpdateTodo: () => void;
  handleCancelEdit: () => void;

  editingId: string | null;
  editInput: string;
  setEditInput: React.Dispatch<React.SetStateAction<string>>;
}

function TodoList({
  todos,
  handleToggleComplete,
  handleDeleteTodo,
  handleEditTodo,
  handleUpdateTodo,
  handleCancelEdit,
  editingId,
  editInput,
  setEditInput,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list__empty">
        <p>No tasks yet. Add your first task above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleComplete={handleToggleComplete}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          handleUpdateTodo={handleUpdateTodo}
          handleCancelEdit={handleCancelEdit}
          editingId={editingId}
          editInput={editInput}
          setEditInput={setEditInput}
        />
      ))}
    </ul>
  );
}

export default TodoList;
