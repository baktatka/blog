import React from "react";
import { Routes, Route } from "react-router-dom";
import style from "./App.module.scss";

import Header from "../Header";
import ArticleList from "../ArticleList";
import ArticlePage from "../ArticlePage";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import EditProfile from "../EditProfile/EditProfile";
import CreateArticle from "../CreateArticle";
import EditArticle from "../EditArticle/EditArticle";

const { body } = style;

function App() {
  return (
    <div className={body}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="new-article" element={<CreateArticle />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
