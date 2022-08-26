import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequirePost = ({ children }) => {
  const currentUser = useSelector((state) => state.user.username);
  const pageAuthor = useSelector(
    (state) => state.articles.articlePage.author.username
  );

  if (currentUser !== pageAuthor) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequirePost;
