import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { GiRobotHelmet } from 'react-icons/gi';
import { IoPersonSharp } from 'react-icons/io5';
import { FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../Api/User';

export const Login = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setError('');
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const response = await LoginUser(data);
    // console.log(response.data);
    if (response.status == 200) {
      localStorage.setItem('email', response.data.data.email);
      localStorage.setItem('name', response.data.data.username);
      e.target.email.value = '';
      e.target.password.value = '';
      setLoad(false);
      alert('Login Successfully');
      navigate('/');
    } else {
      setError(response.data.message);
    }
    // console.log(error);
    setLoad(false);
  };

  return (
    <>
      <div className="text-center mt-20">
        <div className="text-4xl text-rs font-bold tracking-wider flex justify-center items-center">
          <IoMdSettings className="mr-3" />
          RS Management System
        </div>
        <div className="text-2xl mt-5 tracking-wide flex justify-center items-center">
          <GiRobotHelmet className="mr-2 text-red-600" />
          Welcom To RS Engineering Work's
        </div>
      </div>
      <div className="w-[30%] mx-auto bg-white rounded-lg shadow-xl box py-5 px-5 mt-10">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl text-center font-semibold tracking-wider text-title">
            Login
          </div>
          <div className="flex items-center text-lg font-medium text-title ">
            <IoPersonSharp className="mr-3" /> Email
          </div>
          <input
            name="email"
            type="text"
            class="ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300 w-full rounded-md px-4 mt-2 py-2 outline-none"
            placeholder="Enter email"
            required
          />
          <div className="tracking-wide text-sm pl-2 text-gray-500 font-medium mt-2">
            We'll never share your email with anyone else.
          </div>
          <div className="mt-5 flex items-center text-lg font-medium text-title ">
            <FaKey className="mr-3" /> Password
          </div>
          <input
            name="password"
            type="password"
            class="ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300 w-full rounded-md px-4 mt-2 py-2 outline-none"
            placeholder="Enter password"
            required
          />
          {error && (
            <div className="font-medium text-red-600 text-sm mt-2">
              Invalid Credentials
            </div>
          )}
          <button
            type="submit"
            disabled={load}
            className={`${
              load
                ? 'py-3 items-center flex justify-center cursor-not-allowed'
                : ''
            } mt-3 border-2 border-red-400 hover:text-red-400 text-white bg-red-400 hover:bg-white text-center rounded-md py-2 tracking-wider font-medium w-full mb-3`}
          >
            {load && (
              <svg
                class="mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  // strokeWidth="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {load ? 'Loging...' : 'Login'}
          </button>
        </form>
      </div>
      <div className="w-max mx-auto mt-5 py-[0.3rem] px-3 bg-blue1 text-white font-bold rounded-[0.25rem] hover:underline hover:underline-offset-4">
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};
