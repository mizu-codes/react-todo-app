import { useEffect, useState } from "react";
import { toast } from "sonner";
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
    const trimmed = input.trim();

    if (!trimmed) {
      toast.warning("Please enter a task before adding.");
      return;
    }

    const duplicate = todos.some(
      (todo) => todo.title.toLowerCase() === trimmed.toLowerCase(),
    );

    if (duplicate) {
      toast.error("That task already exists.");
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: crypto.randomUUID(),
        title: trimmed,
        completed: false,
        createdAt: new Date().toLocaleString(),
      },
    ]);

    toast.success("Task added successfully.");
    setInput("");
  }

  function handleToggleComplete(id: string) {
    const target = todos.find((todo) => todo.id === id);

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

    if (target && !target.completed) {
      toast.success("Task marked as completed.");
    }
  }

  function handleDeleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted successfully.");
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
    if (editInput.trim() === "") {
      toast.warning("Task title can't be empty.");
      return;
    }

    const duplicate = todos.some(
      (todo) =>
        todo.id !== editingId &&
        todo.title.toLowerCase() === editInput.trim().toLowerCase(),
    );

    if (duplicate) {
      toast.error("That task already exists.");
      return;
    }

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

    toast.success("Task updated successfully.");
    setEditingId(null);
    setEditInput("");
  }

  function handleCancelEdit() {
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
    handleCancelEdit,

    filteredTodos,
    activeCount,
    totalTasks,
    completedTasks,
  };
}

export default useTodos;
