import Header from "./Components/layout/Header/Header.jsx";
import Footer from "./Components/layout/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import ProductDetails from "./Components/Product/ProductDetails.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./Components/Product/Products.jsx";
import Search from "./Components/Product/Search.jsx";
import SignupLogin from "./Components/User/SignupLogin.jsx";
import { useEffect } from "react";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import UserOptions from "./Components/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Profile from "./Components/User/Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import UpdateProfile from "./Components/User/UpdateProfile.jsx";
import UpdatePassword from "./Components/User/UpdatePassword.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header></Header>
      {isAuthenticated && <UserOptions user={user}></UserOptions>}
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route
          exact
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route exact path="/products" element={<Products></Products>}></Route>
        <Route
          exact
          path="/products/:keyword"
          element={<Products></Products>}
        ></Route>
        <Route exact path="/search" element={<Search></Search>}></Route>
        <Route
          exact
          path="/Account"
          element={<SignupLogin></SignupLogin>}
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile></Profile>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/profile/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile></UpdateProfile>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword></UpdatePassword>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
