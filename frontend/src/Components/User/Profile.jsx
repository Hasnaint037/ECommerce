import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import Profiles from "../../images/Profile.png";
import "./Profile.css";

export default function Profile() {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/Account");
    }
  }, [isAuthenticated]);
  return (
    <>
      <MetaData title="Profile"></MetaData>
      {!loading ? (
        <Loader></Loader>
      ) : (
        <div className="profile-container">
          <div>
            <h1>My Profile</h1>
            <img src={Profiles} alt="Profile" />
            <Link to="/profile/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h3>Full Name</h3>
              <p>{user.user.name}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{user.user.email}</p>
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password </Link>
            </div>
          </div>
        </div>
      )}
      {/* <div className="profile-container">
        <div>
          <h1>My Profile</h1>
          <img src={user.user.avatar.url} alt="Profile" />
          <Link to="/profile/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.user.email}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password </Link>
          </div>
        </div>
      </div> */}
    </>
  );
}
