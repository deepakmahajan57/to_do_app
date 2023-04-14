import React, { useEffect, useState } from "react";
const defaultValue = {
  title: "",
  desc: "",
  status: "",
};

const Modal = ({ isVisible, onClose, item, index }) => {
  const [demoUser, setDemoUser] = useState(defaultValue);
  var count = 0;
  var indexvalue = -1;
  item.map((element) => {
    if (element.sno === index) {
      indexvalue = count;
    }
    count++;
  });

  useEffect(() => {
    setTimeout(() => {
      // do something here 1 sec after current has changed
      setDemoUser({
        title: item[indexvalue].title,
        desc: item[indexvalue].desc,
        status: item[indexvalue].status,
      });
    }, 500);
  }, []);

  const submit = () => {
    if (!title || !desc || !status) {
      alert("Title or desc cannot be blank");
    } else {
      var obj = JSON.parse(localStorage.getItem("todos"));
      alert((obj[indexvalue].title = title));
      alert((obj[indexvalue].desc = desc));
      alert((obj[indexvalue].status = status));

      localStorage.setItem("todos", JSON.stringify(obj));
    }
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");

  const onValueChange = (e) => {
    setTitle(e.target.value);
    setDemoUser({ title: e.target.value });
  };

  const onValueChangeDisk = (e) => {
    setDesc(e.target.value);
    setDemoUser({ desc: e.target.value });
  };
  const onValueChangeStatus = (e) => {
    setStatus(e.target.value);
    setDemoUser({ status: e.target.value });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-1/2 flex flex-col">
          <button
            className="text-white text-xl place-self-end"
            onClick={() => {
              onClose();
            }}
          >
            {" "}
            X
          </button>
          <div className="bg-white p-2 rounded">
            Model
            <form onSubmit={submit}>
              <label for="input" class="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="input"
                name="title"
                class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={demoUser.title}
                onChange={onValueChange}
              />
              <label for="task" class="block text-gray-700 font-bold mb-2">
                Task
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={demoUser.desc}
                onChange={onValueChangeDisk}
              />
              <label for="status" class="block text-gray-700 font-bold mb-2">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={demoUser.status}
                onChange={onValueChangeStatus}
              />
              <br />
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
