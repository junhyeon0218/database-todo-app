import React from "react";
import axios from "../api/axios";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  setTodos,
  editingTodo,
  setEditingTodo,
  newTitle,
  setNewTitle,
}) => {
  const updateTodo = async (id, completed) => {
    try {
      // put요청에 대한 /todos/:id 의 요청만 받아와서 오류가 나옴
      //   const response = await axios.put(`/todos/${id}`, { completed });
      //   console.log(response.data);
      //   setTodos(response.data);

      // 정답코드 put 요청을 보내서 업데이트 한 뒤에 /todos에 get요청으로 받아옴
      await axios.put(`http://localhost:8080/api/todos/${id}`, {
        completed: completed ? true : false,
        title: todo.title,
      });
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEdit = async (id) => {
    try {
      // 위와 동일
      //   const response = await axios.put(`/todos/${id}`, {
      //     title: newTitle,
      //     completed: todo.completed,
      //   });
      //   console.log(response.data);
      //   setTodos(response.data);
      //   setEditingTodo(null);
      //   setNewTitle("");

      // 정답코드
      await axios.put(`http://localhost:8080/api/todos/${id}`, {
        title: newTitle,
        completed: todo.completed,
      });
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
      setEditingTodo(null);
      setNewTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
    // 4.5 TodoItem 삭제
    // - axios를 사용하여 서버의 /api/todos/:id 엔드포인트에 DELETE 요청을 보냅니다.
    // - TodoItem이 성공적으로 삭제되면 서버에서 모든 TodoItem을 다시 가져와 상태를 업데이트합니다.
    // - 요청 중 오류가 발생하면 이를 콘솔에 기록합니다.
  };

  const startEditing = (todo) => {
    // startEditing 함수는 사용자가 특정 TodoItem을 편집하려고 할 때 호출됩니다.
    // 이 함수는 두 가지 상태를 업데이트합니다:
    // 1. setEditingTodo(todo.id):
    setEditingTodo(todo.id);
    //    - 현재 편집 중인 TodoItem의 ID를 상태로 설정합니다.
    //    - 이 상태는 편집 UI를 표시하는 데 사용됩니다.
    // 2. setNewTitle(todo.title || ''):
    setNewTitle(todo.title || "");
    //    - 현재 편집 중인 TodoItem의 제목을 상태로 설정합니다.
    //    - 만약 TodoItem의 제목이 존재하지 않는 경우, 초기값을 빈 문자열로 설정합니다.
    //    - 이 상태는 입력 필드에 표시될 값을 결정합니다.
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      key={todo.id}
    >
      <input
        type='checkbox'
        checked={todo.completed ? true : false}
        onChange={() => updateTodo(todo.id, !todo.completed)}
      />
      {editingTodo === todo.id ? (
        <input
          type='text'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span>{todo.title ? todo.title : `할 일 #${todo.id}`}</span>
      )}
      {editingTodo === todo.id ? (
        <button className='save-btn' onClick={() => saveEdit(todo.id)}>
          저장
        </button>
      ) : (
        <button className='edit-btn' onClick={() => startEditing(todo)}>
          수정
        </button>
      )}
      <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
