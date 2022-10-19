import React, { useRef, useEffect, useState, useCallback } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { logout } from "../../../slices/auth";
import EventBus from "../../../common/EventBus";

const Header = ({ theme, toggleTheme }) => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header__shrink");
    } else {
      headerRef.current.classList.remove("header__shrink");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);

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
      window.removeEventListener("scroll", headerFunc);
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          <div className="logo">
            <h2>SpaceWalk</h2>
          </div>
          {/* Navigation */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu">
              <li className="menu__item">
                <a href="/home" className="menu__link">
                  Home
                </a>
              </li>
              <li className="menu__item">
                <a href="/main" className="menu__link">
                  Forum
                </a>
              </li>
              {showSuperAdminBoard && (
                <li className="menu__item">
                  <a href="/super" className="menu__link">
                    Super Admin
                  </a>
                </li>
              )}
              {currentUser ? (
                <>
                  <li className="menu__item">
                    <a href="/profile" className="menu__link">
                      Profile
                    </a>
                  </li>
                  <li className="menu__item">
                    <a className="menu__link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu__item">
                    <a href="/login" className="menu__link">
                      Login
                    </a>
                  </li>
                  <li className="menu__item">
                    <a href="/register" className="menu__link">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Model Light */}
          <div className="light__mode">
            <span onClick={toggleTheme}>
              {theme === "light-theme" ? (
                <span>
                  <i className="ri-moon-line"></i>Dark
                </span>
              ) : (
                <span>
                  <i className="ri-sun-line"></i> Light{" "}
                </span>
              )}
            </span>
          </div>

          <span className="mobile__menu" onClick={toggleMenu}>
            <i className="ri-menu-line"></i>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
