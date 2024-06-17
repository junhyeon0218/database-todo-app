import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import TodoItem from "./TodoItem";
import ButtonContainer from "./ButtonContainer";
import "./TodoContainer.css";

function TodoContainer({ theme, toggleTheme }) {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/todos");
        setTodos(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      const response = await axios.post("/todos", {
        title: newTitle,
        completed: false,
      });
      console.log(response.data);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='todo-app-container'>
      <ButtonContainer createTodo={createTodo} />
      <div className='todo-list'>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoContainer;
