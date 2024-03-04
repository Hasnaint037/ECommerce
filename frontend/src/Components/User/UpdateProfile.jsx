import "./UpdateProfile.css";
import React, { Fragment, useEffect, useState } from "react";
import { Face, MailOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import profile from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import Profile from "../../images/Profile.png";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function UpdateProfile() {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(Profile);
  let [avatarPreview, setAvatarPreview] = useState(Profile);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setAvatarPreview(user.user.avatar.url);
    }

    if (error) {
      alert(error);
    }

    if (isUpdated) {
      dispatch(loadUser());

      navigate("/Account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);
  const updateHandler = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
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
  return (
    <Fragment>
      <div className="update-profile">
        <div className="update-profile-box">
          <form className="update-profile-form" onSubmit={updateHandler}>
            <div className="update-name">
              <Face></Face>
              <input
                type="text"
                value={name}
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="update-email">
              <MailOutline></MailOutline>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div id="update-image">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input type="submit" value="Update" className="update-button" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}
