import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/BoardUser";
import BoardSuperAdmin from "./components/BoardSuperAdmin";
import BoardAdmin from "./components/BoardAdmin";
import Header from "./components/UI/Header/Header";
import CreateMainForum from "./components/Pages/MainForum/CreateMainForum";
import ShowMainForum from "./components/Pages/MainForum/ShowMainForum";
import DetailMainForum from "./components/Pages/MainForum/DetailMainForum";
import CreateSubForum from "./components/Pages/SubForum/CreateSubForum";
import ShowSubForum from "./components/Pages/SubForum/ShowSubForum";
import CreateThread from "./components/Pages/Thread/CreateThread";
import ShowThread from "./components/Pages/Thread/ShowThread";
import EditUser from "./components/Pages/SuperAdmin/EditUser";
import EditMainForum from "./components/Pages/MainForum/EditMainForum";
import EditSubForum from "./components/Pages/SubForum/EditSubForum";
import EditProfile from "./components/Profile/EditProfile";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

const App = () => {
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowSuperAdminBoard(currentUser.roles.includes("ROLE_SUPER_ADMIN"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowSuperAdminBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    theme === "" ? setTheme("light-theme") : setTheme("")
  }

  useEffect(() => {
    document.body.className = theme;
  },[theme]);



  return (
    <Router>
      <div>
      <Header theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login theme={theme}/>} />
            <Route path="/register" element={<Register theme={theme}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/edit-profile" element={currentUser? <EditProfile/> : <Navigate to='/login'/> }/>
            <Route path="/super" element={<BoardSuperAdmin />} />
            <Route path="/super/:id" element={<EditUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path='/main/create' element={showSuperAdminBoard || showAdminBoard? <CreateMainForum /> : <Navigate to='/login' />} />
            <Route path='/main/edit/:id' element={<EditMainForum/>} />
            <Route path='/main/:id' element={<DetailMainForum />} />
            <Route path='/main' element={<ShowMainForum />} />
            <Route path='/sub/create/:mainforumId' element={showSuperAdminBoard || showAdminBoard? <CreateSubForum /> : <Navigate to='/login' />} />
            <Route path='/sub/edit/:id' element={<EditSubForum />}/>
            <Route path='/sub/:id' element={<ShowSubForum />} />
            <Route path='/thread/create/:subforumId' element={currentUser? <CreateThread /> : <Navigate to='/login' />} />
            <Route path='/thread/:id' element={<ShowThread />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;