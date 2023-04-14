import React from "react";
import { useState } from "react";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    console.log(`Date: ${date}, Time: ${time}`);

    if (!title || !desc) {
      alert("Title or desc cannot be blank");
    } else {
      props.addTodo(title, desc, status, date, time);
      setTitle("");
      setDesc("");
    }
    setStatus("");
    setDate(0);
    setTime(0);
  };
  // time and date

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleTimeChange(e) {
    setTime(e.target.value);
  }

  return (
    <>
      <div class="flex justify-center ">
        <form onSubmit={submit}>
          <label for="input" class="block text-gray-900 font-bold mb-2">
            Title <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            id="input"
            name="input"
            maxLength={100}
            placeholder="Enter Title"
            class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label for="task" class="block text-gray-900 font-bold mb-2">
            Task <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            maxLength={100}
            placeholder="Enter Task"
            class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />{" "}
          <br />
          <label for="status" class="block text-gray-900 font-bold mb-2">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            maxLength={100}
            placeholder="Enter Status"
            class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          {/* time and date */}
          <label htmlFor="date" className="block font-bold text-gray-900">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={handleDateChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <label htmlFor="time" className="block mt-4  font-bold text-gray-900">
            Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <br />
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTodo;
