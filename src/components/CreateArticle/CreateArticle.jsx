import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import useAuth from "../../hooks/use-auth";

import Form from "../Form";

function CreateArticle() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/sign-in");
    }
  });

  const token = useSelector((state) => state.user.token);

  async function createArticle(title, description, body, tagList, token) {
    axios.post(
      "https://blog.kata.academy/api/articles",
      {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  const onSubmit = (data) => {
    const { title, description, body, ...tags } = data;
    const tagList = Object.values(tags);
    createArticle(title, description, body, tagList, token);
    navigate("/");
  };

  return <Form titleInfo="Create new article" onSubmit={onSubmit} />;
}

export default CreateArticle;
