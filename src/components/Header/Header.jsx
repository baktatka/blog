import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { removeUser } from "../../store/userSlice";
import style from "./Header.module.scss";
import useAuth from "../../hooks/use-auth";

const {
  header,
  logo,
  signIn,
  signUp,
  avatar,
  borderSign,
  createArticle,
  link,
  logOut,
  profile,
} = style;

function Header() {
  const { isAuth, username } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const image = useSelector((state) => state.user.image);

  const notAuth = (
    <>
      <Link to="/sign-in" className={signIn}>
        Sign in
      </Link>
      <div className={borderSign}>
        <Link to="/sign-up" className={signUp}>
          Sign up
        </Link>
      </div>
    </>
  );

  const auth = (
    <>
      <div className={createArticle}>
        <Link to="/new-article" className={link}>
          Create article
        </Link>
      </div>
      <div className={profile}>
        <p>{username}</p>
        <Link to="/profile">
          <img className={avatar} src={image} alt="avatar" />
        </Link>
      </div>
      <button
        type="button"
        className={logOut}
        onClick={() => {
          dispatch(removeUser());
          navigation("/");
        }}
      >
        Log Out
      </button>
    </>
  );

  return (
    <>
      <header className={header}>
        <Link to="/" className={logo}>
          Realworld Blog
        </Link>
        {isAuth ? auth : notAuth}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
