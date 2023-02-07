import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  const getLocalData = () => {
    const list = localStorage.getItem("todoItems");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toggleButton, setToggleButton] = useState(false);
  const [editedItem, setEditedItem] = useState("");

  // Add Item
  const addItems = () => {
    if(inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if(curElem.id === editedItem) {
            return {...curElem, name: inputData};
          }
          return curElem;
        })
      );
      setInputData("");
      setEditedItem("");
      setToggleButton(false);
    }
    else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);

      setInputData("");
    }
  };

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  // Remove Item
  const removeItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // Edit items
  const editItems = (index) => {
    const itemToEdit = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(itemToEdit.name);
    setToggleButton(true);
    setEditedItem(index);
  };

  return (
    <div className="todo">
      <h3>Add Items Here 👇</h3>
      <input
        type="text"
        className="form-control"
        placeholder="Write your list item here..."
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {toggleButton ? (
        <button type="button" className="btn btn-success" onClick={addItems}>
          Edit Item
        </button>
      ) : (
        <button type="button" className="btn btn-success" onClick={addItems}>
          Add Item
        </button>
      )}
      <div className="items">
        {items.map((curElem, index) => {
          return (
            <div className="card px-3" key={curElem.id}>
              <div className="card-body">{curElem.name}</div>
              <i
                className="fa-solid fa-pen-to-square fa-lg text-success"
                onClick={() => editItems(curElem.id)}
              ></i>
              <i
                className="fa-solid fa-trash fa-lg text-danger"
                onClick={() => {
                  removeItem(curElem.id);
                }}
              ></i>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => setItems([])}
      >
        Remove List
      </button>
    </div>
  );
};

export default Todo;
