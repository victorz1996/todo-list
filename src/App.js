// import './App.css';
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoBtn } from "./components/CreateTodoBtn";
import React from "react";

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1");
  let parsedTodos;
  if (!localStorageTodos) {
    localStorage.setItem("TODOS_V1", JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }
  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState("");
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;
  let todosFiltered = [];
  if (!searchValue.length) {
    todosFiltered = todos;
  } else {
    todosFiltered = todos.filter((todo) => {
      const todoText = todo.text.toUpperCase();
      const searchText = searchValue.toUpperCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const deleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const updateLocalStorage = (newTodos) => {
    localStorage.setItem("TODOS_V1", JSON.stringify(newTodos));
  };
  return (
    <React.Fragment>
      <TodoCounter
        completedTodos={completedTodos}
        totalTodos={totalTodos}
      ></TodoCounter>
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      ></TodoSearch>
      <TodoList>
        {todosFiltered.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          ></TodoItem>
        ))}
      </TodoList>
      <CreateTodoBtn></CreateTodoBtn>
    </React.Fragment>
  );
}

export default App;
