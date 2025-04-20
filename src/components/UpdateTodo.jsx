import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../features/TodoSlice";

const UpdateTodo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({});

  const { todos } = useSelector((state) => state.todo);

  useEffect(() => {
    if (id && todos.length > 0) {
      const singleTodo = todos.find((ele) => ele.id === id);
      if (singleTodo) setTodoData(singleTodo);
    }
  }, [id, todos]);

  const newData = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!todoData.text.trim()) return;
    dispatch(updateTodo(todoData));
    navigate("/read");
  };

  return (
    <div className="flex flex-col items-center mt-10 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-xl shadow mb-6">
        ✏️ Update Todo
      </h2>

      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20"
      >
        <label className="block text-white font-semibold mb-2">
          Edit your task
        </label>
        <input
          type="text"
          name="text"
          id="text"
          value={todoData?.text || ""}
          onChange={newData}
          placeholder="Update your todo..."
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold py-2 px-4 rounded-full hover:scale-105 hover:shadow-lg transition"
        >
          🔄 Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
