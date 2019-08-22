import React, { useState, useEffect, useReducer } from "react";
import store from "./store";
import { Provider } from "react-redux";
import reducer from "./reducer";
import ReactDOM from "react-dom";

import "./styles.css";

const initialState = [];

const App = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    todo.length && setError("");

    console.log([...state]);
  }, [todo, setError, state]);

  const handleSubmit = e => {
    e.preventDefault();

    if (todo.length) {
      dispatch({ type: "ADD", payload: todo });
      setTodo("");
    } else {
      setError("This field is required!");
    }
  };

  const handleChange = e => {
    setTodo(e.target.value);
  };

  return (
    <div className="App">
      <h1>React hooks</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="todo">Todo:&nbsp;</label>
        <input
          id="todo"
          type="text"
          name="todo"
          value={todo}
          onChange={e => handleChange(e)}
        />
        <button type="submit">Add</button>
        {error && <p>{error}</p>}
      </form>
      <ul>
        {state.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
