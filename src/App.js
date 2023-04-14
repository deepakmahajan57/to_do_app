import "./App.css";
import AddTodo from "./Components/AddTodo";
import Todos from "./Components/Todos";
import React, { useState, useEffect } from "react";
import Modal from "./Components/Modal";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      // delete code here

      setTodos(
        todos.filter((e) => {
          return e !== todo;
        })
      );
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  const addTodo = (title, desc, status, date, time) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
      status: status,
      date: date,
      time: time,
    };
    setTodos([...todos, myTodo]);
  };

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div>
        <div class="flex bg-slate-800 justify-center items-center h-screen ">
          <div class="w-1/4 bg-slate-500 h-5/6 flex justify-center  items-center">
            {" "}
            <AddTodo addTodo={addTodo} />
          </div>
          <div class="w-9/12 bg-orange-300 px-3 h-5/6 flex justify-center  items-center">
            {" "}
            <Todos todos={todos} onDelete={onDelete} onEdit={<Modal />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
