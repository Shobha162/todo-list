import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/TodoSlice";

const CreateTodo = () => {
  const [todo, setTodo] = useState({ text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTodoData = (e) => {
    setTodo({ ...todo, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.text.trim()) return;
    dispatch(createTodo(todo));
    navigate("/read");
  };

  return (
    <div className="flex flex-col items-center mt-10 animate-fade-in">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl shadow-md mb-8 tracking-wide">
        📝 Add a New Todo
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20"
      >
        <div className="mb-5">
          <label className="block text-white text-md font-semibold mb-2">
            What's on your mind?
          </label>
          <input
            type="text"
            id="text"
            value={todo.text}
            onChange={getTodoData}
            placeholder="Enter your todo..."
            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 hover:shadow-lg transition"
        >
          ➕ Submit Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
