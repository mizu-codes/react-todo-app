import { useEffect, useState } from "react";
import type { Todo, FilterType } from "../types/todo";

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (input.trim() === "") {
      return;
    }

    const duplicate = todos.some(
      (todo) => todo.title.toLowerCase() === input.trim().toLowerCase(),
    );

    if (duplicate) {
      return;
    }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  function handleToggleComplete(id: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "active") {
      return !todo.completed;
    }

    return todo.completed;
  });

  function handleEditTodo(id: string) {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) return;

    setEditingId(id);
    setEditInput(todo.title);
  }

  function handleUpdateTodo() {
    if (editInput.trim() === "") return;

    const duplicate = todos.some(
      (todo) =>
        todo.id !== editingId &&
        todo.title.toLowerCase() === editInput.trim().toLowerCase(),
    );

    if (duplicate) return;

    setTodos(
      todos.map((todo) => {
        if (todo.id === editingId) {
          return {
            ...todo,
            title: editInput,
          };
        }

        return todo;
      }),
    );

    setEditingId(null);
    setEditInput("");
  }

  return {
    input,
    setInput,
    filter,
    setFilter,
    editingId,
    editInput,
    setEditInput,

    handleAddTodo,
    handleDeleteTodo,
    handleToggleComplete,
    handleEditTodo,
    handleUpdateTodo,

    filteredTodos,
    activeCount,
    totalTasks,
    completedTasks,
  };
}

export default useTodos;
