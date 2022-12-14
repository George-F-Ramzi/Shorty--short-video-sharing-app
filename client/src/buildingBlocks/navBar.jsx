import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { authContext } from "../pages/homePage";
import JWTDecoder from "jwt-decoder-claims";
import {
  RiHome5Fill,
  RiHome5Line,
  RiUser3Line,
  RiUser3Fill,
  RiInboxArchiveLine,
  RiInboxArchiveFill,
  RiSearchLine,
  RiSearchFill,
  RiAddFill,
} from "react-icons/ri";

const NavBar = () => {
  const path = useLocation();
  const {
    inbox,
    profile,
    search,
    create,
    setCreate,
    setSearch,
    getProfile,
    GetInbox,
  } = useContext(authContext);

  const Payload = () => {
    const token = localStorage.getItem("token");
    const payload = JWTDecoder.payload(token);
    return payload._id;
  };

  return (
    <div className="nav-bar">
      {path.pathname.includes("/home") ? (
        <NavLink to={"/home/"} className="nav__link link_active">
          <RiHome5Fill size={"24px"} />
          Home
        </NavLink>
      ) : (
        <NavLink to={"/videos/"} className="nav__link">
          <RiHome5Line size={"24px"} />
          Home
        </NavLink>
      )}
      {profile ? (
        <div className="nav__link link_active">
          <RiUser3Fill size={"24px"} />
          Profile
        </div>
      ) : (
        <div
          onClick={() => {
            getProfile(Payload());
          }}
          className="nav__link"
        >
          <RiUser3Line size={"24px"} />
          Profile
        </div>
      )}
      {inbox ? (
        <div className="nav__link link_active">
          <RiInboxArchiveFill size={"24px"} />
          Inbox
        </div>
      ) : (
        <div
          onClick={() => {
            GetInbox();
          }}
          className="nav__link"
        >
          <RiInboxArchiveLine size={"24px"} />
          Inbox
        </div>
      )}
      {search ? (
        <div className="nav__link link_active">
          <RiSearchFill size={"24px"} />
          Search
        </div>
      ) : (
        <div
          onClick={() => {
            setSearch(true);
          }}
          className="nav__link"
        >
          <RiSearchLine size={"24px"} />
          Search
        </div>
      )}
      {create ? (
        <div className="nav__link link_active">
          <RiAddFill size={"24px"} />
          Create
        </div>
      ) : (
        <div
          onClick={() => {
            setCreate(true);
          }}
          className="nav__link"
        >
          <RiAddFill size={"24px"} />
          Create
        </div>
      )}
    </div>
  );
};

export default NavBar;
