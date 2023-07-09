// import './App.css';
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoBtn } from "./components/CreateTodoBtn";
import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  React.useEffect(() => {
    setTimeout(() => {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;
      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      setItem(parsedItem)
    }, 2000);
  });


  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };
  return [item, saveItem];
}

function App() {
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);
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
    saveTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  React.useEffect(() => {
    console.log("use effect");
  }, [totalTodos]);

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
        {isLoading && <p>Cargando...</p>}
        {isError && <p>hubo un error</p>}
        {!isLoading && !todosFiltered.length && <p>Crea tu primer todo</p>}
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
