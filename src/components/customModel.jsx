import React from 'react'
import { useSelector } from "react-redux";
import "./customModel.css";

const CustomModal = ({ id, setShowPopup }) => {
    const alltodos = useSelector((state) => state.todo.todos);
  
    const singleTodo = alltodos.filter((ele) => ele.id === id);
    console.log("singleTodo", singleTodo);
  
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <button onClick={() => setShowPopup(false)}>Close</button>
          <h2>{singleTodo[0].name}</h2>
            <p>{singleTodo[0].text}</p>
        </div>
      </div>
    );
  };
  export default CustomModal;