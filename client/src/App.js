import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardSuperAdmin from "./components/board-super-admin.component";
import BoardAdmin from "./components/board-admin.component";
import CreateMainForum from "./Pages/MainForum/CreateMainForum";
import ShowMainForum from "./Pages/MainForum/ShowMainForum";
import DetailMainForum from "./Pages/MainForum/DetailMainForum";
import CreateSubForum from "./Pages/SubForum/CreateSubForum";
import ShowSubForum from "./Pages/SubForum/ShowSubForum";
import CreateThread from "./Pages/Thread/CreateThread";
import ShowThread from "./Pages/Thread/ShowThread";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuperAdminBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showSuperAdminBoard: user.roles.includes("ROLE_SUPER_ADMIN"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  } 

  render() {
    const { currentUser, showSuperAdminBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to='/home' />} />
            <Route path="/register" element={!currentUser ? <Register /> : <Navigate to='/home' />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/super" element={<BoardSuperAdmin />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path='/main/create' element={showSuperAdminBoard? <CreateMainForum /> : <Navigate to='/login' />} />
            <Route path='/main/:id' element={<DetailMainForum />} />
            <Route path='/main' element={<ShowMainForum />} />
            <Route path='/sub/create/:mainforumId' element={showAdminBoard? <CreateSubForum /> : <Navigate to='/login' />} />
            <Route path='/sub/:id' element={<ShowSubForum />} />
            <Route path='/thread/create/:subforumId' element={currentUser? <CreateThread /> : <Navigate to='/login' />} />
            <Route path='/thread/:id' element={<ShowThread />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
