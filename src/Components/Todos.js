import React, { useState } from "react";
import Modal from "./Modal";

const Todos = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [sno, setSno] = useState("");
  let data = props.todos;

  let propsPass = props.todos;
  const [modal, setModal] = useState(false);

  // pagination code start
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // const records = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // pagination code end

  // try for sorted title

  // State to hold sort value and sort direction for each column
  const [columnNo, setcolumnNo] = useState(0);
  const [sortValues, setSortValues] = useState({
    title: { value: "asc", direction: 1 },
    desc: { value: "asc", direction: 1 },
    timestamp: { value: "asc", direction: 1 },
    status: { value: "asc", direction: 1 },
    action: { value: "asc", direction: 1 },
  });
  console.log("column no is,", columnNo);
  // Function to handle sort value change
  const handleSortChange = (columnName) => {
    const newSortValues = { ...sortValues };
    newSortValues[columnName].value =
      newSortValues[columnName].value === "asc" ? "desc" : "asc";
    newSortValues[columnName].direction =
      newSortValues[columnName].value === "asc" ? 1 : -1;
    setSortValues(newSortValues);
    // console.log("colNumber", columnNo);
  };

  // Function to sort data based on sort values
  const sortData = (data) => {
    let sortedData = [...data];
    sortedData = data.slice(firstIndex, lastIndex);

    const columns = Object.keys(sortValues);

    return sortedData.sort((a, b) => {
      console.log("col no 1...", columnNo);
      for (let i = 0; i < columns.length; i++) {
        const column = columns[columnNo];
        const sortValue = sortValues[column].value;
        const direction = sortValues[column].direction;
        console.log("a is, ", a, " b is , ", b);
        if (sortValue !== "none") {
          if (a[column] < b[column]) {
            return -1 * direction;
          }
          if (a[column] > b[column]) {
            return 1 * direction;
          }
        }
      }
      return 0;
    });
  };

  // try for sorted end

  // try here search
  // State to hold search value
  const [searchValue, setSearchValue] = useState("");

  // Function to handle search input change

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Function to filter data based on search value
  const filterData = (data) => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.status.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.time.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.date.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  // Render table rows
  const renderRows = () => {
    const filteredData = filterData(data);
    const sortedData = sortData(filteredData);

    return sortedData.map((item) => (
      <tr key={item.id}>
        <td className="px-3">{item.title}</td>
        <td>{item.desc}</td>
        <td>
          {" "}
          Date: {item.date}
          <br />
          Time: {item.time}
        </td>
        <td>{item.status}</td>
        <td>
          {" "}
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
            onClick={() => {
              setSno(item.sno);
              setModal(!modal);
              setShowModel(true);
            }}
          >
            Edit
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              props.onDelete(item);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    ));
  };

  // try search end

  return (
    <>
      <div className="container">
        <span className=" font-bold font-serif text-xl">Todos List</span>

        {props.todos.length === 0 ? (
          "No Todo to display"
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 p-2 rounded-lg mr-2"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => {
                      handleSortChange("title");
                      setcolumnNo(0);
                    }}
                  >
                    Title
                    {sortValues.title.value === "asc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 7.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l4.707-4.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 12.707a1 1 0 0 1 0-1.414L10 6.586l4.707 4.707a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1-1.414 0l-4 4a1 1 0 0 1 0 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => {
                      handleSortChange("desc");
                      setcolumnNo(1);
                    }}
                  >
                    Descripton
                    {sortValues.desc.value === "asc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 7.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l4.707-4.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 12.707a1 1 0 0 1 0-1.414L10 6.586l4.707 4.707a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1-1.414 0l-4 4a1 1 0 0 1 0 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => {
                      handleSortChange("time");
                      setcolumnNo(2);
                    }}
                  >
                    TimeStamp
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => {
                      handleSortChange("status");
                      setcolumnNo(3);
                    }}
                  >
                    status
                    {sortValues.status.value === "asc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 7.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l4.707-4.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 12.707a1 1 0 0 1 0-1.414L10 6.586l4.707 4.707a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1-1.414 0l-4 4a1 1 0 0 1 0 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </th>{" "}
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {renderRows()}
              </tbody>
            </table>
            <div className="my-3 flex justify-center">
              <button
                className="bg-pink-600 px-3 py-1 rounded-md"
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {pageNumbers.map((num) => (
                <button
                  className="bg-pink-600 mx-3 px-3 py-1 rounded-md"
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="bg-pink-600 px-3 py-1 rounded-md"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      {modal && (
        <Modal
          isVisible={showModel}
          item={propsPass}
          index={sno}
          onClose={() => {
            setShowModel(false);
            setModal(!modal);
          }}
        />
      )}
    </>
  );
};

export default Todos;
