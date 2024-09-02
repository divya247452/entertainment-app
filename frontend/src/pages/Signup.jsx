import React, { useState, useEffect } from "react";
import { MdMovieCreation } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Account Created Successfully");
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex justify-around items-center flex-col h-[100%]">
      <div className="flex justify-center">
        <MdMovieCreation className="text-[50px] text-custom-red" />
      </div>
      <form
        onSubmit={submitHandler}
        className="bg-gun-metal py-4 px-[25px] w-[300px] sm:w-[350px] rounded-lg"
      >
        <h1 className="text-[24px] font-semibold pb-4">Sign Up</h1>
        <div className="py-4">
        <input
            type="text"
            value={name}
            placeholder="Your full name"
            className="my-1 p-2 bg-gun-metal border-custom-light-blue w-full border-b-2 outline-none caret-custom-red"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={email}
            placeholder="Username"
            className="my-1 p-2 bg-gun-metal border-custom-light-blue w-full border-b-2 outline-none caret-custom-red"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="my-1 border-b-2 w-full bg-gun-metal border-custom-light-blue p-2 outline-none caret-custom-red"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Repeat Password"
            className="my-1 border-b-2 w-full bg-gun-metal border-custom-light-blue p-2 outline-none caret-custom-red"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
        </div>
        <button
          type="submit"
          className={`w-full ${isLoading ? "bg-custom-light-blue" : "bg-custom-red"} rounded py-2 my-3 hover:bg-white hover:text-black`}
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create an account"}
        </button>
        <div className="text-center text-[13px]">
          Already have an account?{" "}
          <Link to={"/login"} aria-label="login">
            <span className="text-custom-red hover:underline px-2">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
