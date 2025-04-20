import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showTodo, deleteTodo } from "../features/TodoSlice";
import CustomModal from "./customModel";

const ReadTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const { todos, loading } = useSelector((state) => state.todo);

  // 🧩 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    dispatch(showTodo());
  }, [dispatch]);

  // 📦 Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  // 🔁 Reset to first page on todos change
  useEffect(() => {
    setCurrentPage(1);
  }, [todos]);

  // 💬 Loader
  if (loading) {
    return <h2 className="text-white text-xl animate-pulse">Loading...</h2>;
  }

  return (
    <div className="flex flex-col items-center mt-10 animate-fade-in">
      {showPopup && (
        <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
      )}

      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl shadow-md mb-8 tracking-wide animate-bounce">
        📋 All Todos
      </h2>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20">
        {currentTodos.length === 0 ? (
          <p className="text-center text-white/80">No todos available.</p>
        ) : (
          currentTodos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => {
                setId(todo.id);
                setShowPopup(true);
              }}
              className="bg-white/80 text-black p-4 mb-4 rounded-lg shadow-lg transition hover:scale-[1.02] cursor-pointer flex justify-between items-center"
            >
              <span className="font-medium">{todo.text}</span>

              <div className="flex gap-3">
                <Link
                  to={`/edit/${todo.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded-md transition"
                >
                  Edit
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const confirmed = window.confirm("Are you sure you want to delete this todo?");
                    if (confirmed) {
                      dispatch(deleteTodo(todo.id));
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {/* 🧭 Pagination Controls */}
        {todos.length > todosPerPage && (
          <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-black font-bold"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < totalPages ? prev + 1 : prev
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* ➕ Add Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition shadow-lg hover:scale-105"
        >
          ➕ Add New Todo
        </button>
      </div>
    </div>
  );
};

export default ReadTodo;
