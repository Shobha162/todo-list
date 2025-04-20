import { useState, useEffect } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Searchtodo } from '../features/TodoSlice';

const Navbar = () => {
  const [searchtodo, setSearchTodo] = useState('');
  const alltodos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Searchtodo(searchtodo));
  }, [searchtodo, dispatch]);

  return (
    <div className="w-full flex justify-center bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 py-6 shadow-lg animate-fade-in">
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl text-white shadow-2xl w-full max-w-6xl transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md hover:scale-105 transition-transform duration-300">
          🚀 TodoMagic
        </h1>

        <div className="flex gap-4 items-center flex-wrap justify-center">
          {/* Search Input */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchtodo}
              onChange={(e) => setSearchTodo(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white text-black shadow-inner outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
            />
            <IoSearchSharp
             value={searchtodo}
             onChange={(e) => setSearchTodo(e.target.value)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg animate-pulse" />
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/read"
                className="text-white font-semibold hover:text-yellow-300 hover:underline transition duration-300"
              >
                All Posts ({alltodos.length})
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
