import React, { Fragment, useState, useEffect } from "react";
import man from "../../assets/images/dashboard/user.png";
import { User, Mail, Lock, Settings, LogOut } from "react-feather";
//import app from "../../data/base";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const UserMenu = ({ history }) => {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
  }, []);


  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            src={profile}
            alt="header-user"
          />
          <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <a href="#!">
              Log out
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default withRouter(UserMenu);
