import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Profile from "../../../images/Profile.png";
import { logout } from "../../../actions/userActions";
import {
  Dashboard,
  Person,
  ExitToAppSharp,
  ListAlt,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function UserOptions({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const options = [
    { icon: <ListAlt></ListAlt>, name: "Orders", func: orders },
    { icon: <Person></Person>, name: "Profile", func: account },
    {
      icon: <ExitToAppSharp></ExitToAppSharp>,
      name: "Logout",
      func: logoutUser,
    },
  ];
  if (user.user.role == "admin") {
    options.unshift({
      icon: <Dashboard></Dashboard>,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/profile");
  }
  function logoutUser() {
    dispatch(logout());
    alert("Logout successfully");
  }
  function dashboard() {
    navigate("/dashboard");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: 2 }}></Backdrop>
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDia"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        direction="down"
        icon={
          <img
            src={user.user.avatar.url ? user.user.avatar.url : Profile}
            alt="profile"
            className="speedDialIcon"
          ></img>
        }
      >
        {options.map((option) => {
          return (
            <SpeedDialAction
              key={option.name}
              icon={option.icon}
              tooltipTitle={option.name}
              onClick={option.func}
            ></SpeedDialAction>
          );
        })}
      </SpeedDial>
    </>
  );
}

export default UserOptions;
