import React, { useState, useEffect } from "react";
import { MdMovieCreation } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in Successfully");
      navigate(redirect);
    } catch (err) {
      toast.error(err.data?.message || err.message);
    }
  };

  return (
    <>
      <div className="flex justify-around items-center flex-col h-[100%]">
        <div className="flex justify-center">
          <MdMovieCreation className="text-[50px] text-custom-red" />
        </div>
        {isLoading && <Loader/>}
        <form
          onSubmit={handleSubmit}
          className="bg-gun-metal py-4 px-[25px] w-[300px] sm:w-[350px] rounded-lg"
        >
          <h1 className="text-[24px] font-semibold pb-4">Login</h1>
          <div className="py-4">
            <input
              type="email"
              value={email}
              placeholder="Email address"
              className="my-1 p-2 bg-gun-metal w-full border-b-2 border-custom-light-blue text-white caret-custom-red outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="my-1 border-b-2 border-custom-light-blue w-full bg-gun-metal caret-custom-red p-2 text-white outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-custom-red rounded py-2 my-3 text-white hover:bg-white hover:text-black"
          >
            Login to your account
          </button>
          <div className="text-white text-[13px] text-center">
            Don't have an account?{" "}
            <Link to={`/signup?redirect=${redirect}`} className="text-custom-red hover:underline" aria-label="Sign Up">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
