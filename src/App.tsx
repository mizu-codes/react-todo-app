import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import useTodos from "./hooks/useTodos";
import "./App.css";

function App() {
  const {
    input,
    setInput,
    filter,
    setFilter,
    editingId,
    editInput,
    setEditInput,
    filteredTodos,
    activeCount,
    totalTasks,
    completedTasks,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleComplete,
    handleEditTodo,
    handleUpdateTodo,
  } = useTodos();

  return (
    <div className="app">
      <div className="app__card">
        <header className="app__header">
          <div className="app__heading-row">
            <div>
              <h1 className="app__title">TaskHub</h1>
              <p className="app__subtitle">
                Stay organized. Stay productive.
              </p>
            </div>
            <div className="app__stat" aria-label="Active tasks remaining">
              <span className="app__stat-count">{activeCount}</span>
              <span className="app__stat-label">active</span>
            </div>
          </div>
        </header>

        <main className="app__main">
          <TodoInput
            input={input}
            setInput={setInput}
            handleAddTodo={handleAddTodo}
          />
          <Filter filter={filter} setFilter={setFilter} />

          <div className="app__list-viewport">
            <TodoList
              todos={filteredTodos}
              handleToggleComplete={handleToggleComplete}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
              handleUpdateTodo={handleUpdateTodo}
              editingId={editingId}
              editInput={editInput}
              setEditInput={setEditInput}
            />
          </div>
        </main>

        <footer className="app__footer">
          <p>
            {totalTasks} tasks total · {completedTasks} completed
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
