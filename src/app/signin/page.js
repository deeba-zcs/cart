'use client'
import "./signin.css";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "src/app/Store/registerslice.js";
import React, { useState ,useEffect} from "react";
//import Cart from "../Cart/page";

import { useRouter } from "next/navigation";
function Signin() {
  const [username, setUsername] = useState("");
  const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = localStorage.getItem("userData");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { username, password };

    const savedUserData = localStorage.getItem("userData");
    //const cartData = localStorage.getItem("Addtocart");
    const registeredUsers = savedUserData ? JSON.parse(savedUserData) : [];
    const userExists = registeredUsers.some(
      (user) => user.username === username
    );

    if (!userExists) {
      alert("User is not registered.");
      setUsername("");
      setPassword("");
      return;
    }

    dispatch(login(userData));
  };
   if (isLoggedIn) {
     router.push("/Homepage");
   }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1>Login</h1>

          <div
            className="alert alert-danger fade out"
            role="alert"
            id="errorMsg"
          ></div>

          <form
            className="form-horizontal"
            id="loginForm"
            name="loginForm"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <div className="col-lg-8">
                <input
                  type="text"
                  className="formcontrol"
                  id="inputEmail"
                  name="inputEmail"
                  placeholder="Email"
                  required="required"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-8">
                <input
                  type="password"
                  className="formcontrol"
                  id="inputPassword"
                  name="inputPassword"
                  placeholder="Password"
                  required="required"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3">
                  <input
                    type="submit"
                    id="submitLogin"
                    className="btndefault"
                    value="SIGN IN"
                  />
                </div>
                <div className="col-lg-6">
                  <p>
                    Not a member?<Link href={"/Register"}>Register</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;