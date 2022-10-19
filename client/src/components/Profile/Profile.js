// import Loading from "./Loading";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../UI/Loading/Loading";
import ImageDefault from "../../assets/img/User.png"
import Aos from "aos";
import "aos/dist/aos.css";
import './Profile.css';
import { API_USER } from "../../services/main.service";


function Profile() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Aos.init({ duration: 1000 });
    setTimeout(function () {
      document.querySelector(".lol").style.visibility = "hidden";
    }, 2000);
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get(API_USER + currentUser.id);
    setUsers(response.data);
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="m56" style={{ overflow: "hidden" }}>
      <div className="pt-4">
        <h1 className="text-center fw-bold">Profile</h1>
        <div className="container py-2">
          <div className="row my-4 justify-content-evenly">
            <div className="col-md-4 text-center mb-2">
              <div className="outer-div">
                <div className="inner-div">
                  <div className="front">
                    <div className="front__bkg-photo"></div>
                    <div className="rizky">
                      <img src={users.url === null ? ImageDefault : users.url} style={{ width: "116%", marginLeft: "-13px" }} />
                    </div>
                    <div className="front__text">
                      <h3 className="front__text-header fw-bold">
                        {currentUser.username}
                      </h3>
                      <span className="front__text-hover">{currentUser.email}</span>
                      <p className="front__text-para mt-5 px-3 fw-bold">
                        "Sleep - Eat - Code - Repeat!"
                      </p>
                    </div>
                  </div>
                  <div className="back">
                    <div className="social-media-wrapper">
                      <div className="row">
                        <div className="col-md-12">
                          <p className="text-light">My contacts</p>
                        </div>
                        <div className="col-md-12">
                          <a
                            href="https://whatsapp.com"
                            className="social-icon"
                          >
                            <i class="ri-whatsapp-line"></i>
                          </a>
                          <a
                            href="https://linkedin.com"
                            className="social-icon"
                          >
                            <i class="ri-linkedin-box-line"></i>
                          </a>
                          <a href="https://github.com" className="social-icon">
                          <i class="ri-github-line"></i>
                          </a>
                          <a href="/edit-profile" className="social-icon">
                          <i class="ri-edit-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row" data-aos="fade-right" style={{color: "white"}}>
                <h2 className="ctr fw-bold mb-3">{currentUser.username}</h2>
                <p>
                  {users.bio? users.bio : <b>I'm a software engineering student focused on front-end web
                  developers. I'm very happy in the world of design because
                  there I can describe my creative ideas. My desire to keep
                  learning and friendly personality is my strength.</b>}
                </p>
                <div className="col-6">
                  <p><b>Token: </b>{currentUser.roles &&
                          currentUser.roles.map((role, index) => <b key={index}>{role}</b>)}
                  </p>
                  <p>
                    <b>Gender: </b>{users.gender? users.gender : "-"}
                  </p>
                  <p>
                    <b>Date of Birth: </b>{users.birth? users.birth : "-"}
                  </p>
                </div>
                <div className="col-6">
                  <p>
                    <b>Address: </b>{users.address? users.address : "-"}
                  </p>
                  <p>
                    <b>Email: </b>{currentUser.email}
                  </p>
                  <p>
                    <b>Hobbies: </b>{users.hobies? users.hobies : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <center>
          <img src={ss2} alt="" style={{ width: "10%" }} />
          <h1 className="mb-3 mt-4 fw-bold">Sinar Sejahtera</h1>
          <h4 className="fw-bold">SMK Prakarya Internasional</h4>
        </center> */}
      </div>
      {/* <Loading className="lol" /> */}
      <Loading className="lol" />
    </div>
  );
}

export default Profile;

// import React from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./Profile.css";
// import { Button } from "@mui/material";

// const Profile = () => {
//   const navigate = useNavigate();
//   const { user: currentUser } = useSelector((state) => state.auth);

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="m56">
//       <div className="container pt-4">
//         <div className="row my-4">
//           <div className="col-md-4 text-center mb-5">
//             <div className="outer-div">
//               <div className="inner-div">
//                 <div className="front">
//                   {currentUser.url}
//                 </div>
//                 <div className="back">
//                   <div className="social-media-wrapper">
//                     <div className="row" style={{color: 'white'}}>
//                       <div className="col-md-12">
//                         <p className="text-light">My Profile:</p>
//                       </div>
//                         <h3>{currentUser.username}</h3>
//                         <h3>{currentUser.email}</h3>
//                         <strong>Token:</strong>{" "}
//                           {currentUser.roles &&
//                           currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
//                         <Button onClick={() => navigate('/edit-profile')}>
//                           Edit Profile
//                         </Button>
//                       </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// //<div className="container">
// //   <div style={{ padding: "2rem", marginTop: "70px" }}>
// //   <header className="jumbotron">
// //     <h3>
// //       <strong>{currentUser.username}</strong> Profile
// //     </h3>
// //   </header>
// //   <p>
// //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
// //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
// //   </p>
// //   <p>
// //     <strong>Id:</strong> {currentUser.id}
// //   </p>
// //   <p>
// //     <strong>Email:</strong> {currentUser.email}
// //   </p>
// //   <strong>Authorities:</strong>
// //   <ul>
// //     {currentUser.roles &&
// //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
// //   </ul>
// //   </div>
// // </div>
