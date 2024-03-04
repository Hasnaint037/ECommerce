import "./UpdateProfile.css";
import React, { Fragment, useEffect, useState } from "react";
import { VpnKey, LockOpen, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, loadUser } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import "./UpdatePassword.css";

export default function UpdateProfile() {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (isUpdated) {
      dispatch(loadUser());

      navigate("/Account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Profile</h2>

          <form className="updatePasswordForm" onSubmit={updatePasswordHandler}>
            <div className="loginPassword">
              <VpnKey />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpen />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <Lock />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}
