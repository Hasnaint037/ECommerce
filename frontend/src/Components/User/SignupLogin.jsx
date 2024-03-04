import React, { useEffect, useState } from "react";
import "./SignupLogin.css";
import { Face, LockOpen, MailOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../actions/userActions";

export default function SignupLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const signupHandler = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(signup(myForm));
  };
  let [tab, setTab] = useState("Login");
  let [loginEmail, setLoginEmail] = useState("");
  let [loginPassword, setLoginPassword] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [avatarPreview, setAvatarPreview] = useState(profile);
  let [avatar, setAvatar] = useState(profile);
  if (isAuthenticated) {
    navigate("/");
  } else {
  }
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      console.log(error);
    }
  }, [dispatch, error, isAuthenticated]);
  return (
    <div className="signup-login">
      <div className="login-signup-box">
        <div>
          <div className="signup-login-toggle">
            <p onClick={(e) => setTab("Login")}>LOGIN</p>
            <p onClick={(e) => setTab("Signup")}>SIGNUP</p>
          </div>
          <button
            className={tab == "Login" ? "border-left" : "border-right"}
          ></button>
        </div>
        {tab == "Login" ? (
          <form action="" onSubmit={loginHandler} className="loginForm">
            <div className="loginEmail">
              <MailOutline></MailOutline>
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpen></LockOpen>
              <input
                type="password"
                value={loginPassword}
                required
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        ) : (
          <form className="signup-form" onSubmit={signupHandler}>
            <div className="signup-name">
              <Face></Face>
              <input
                type="text"
                value={name}
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signup-email">
              <MailOutline></MailOutline>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-password">
              <LockOpen></LockOpen>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signup-button" />
          </form>
        )}
      </div>
    </div>
  );
}
