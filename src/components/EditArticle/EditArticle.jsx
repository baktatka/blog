import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Form from "../Form";

function EditArticle() {
  const token = useSelector((state) => state.user.token);
  const { slug, ...other } = useSelector((state) => state.articles.articlePage);

  const navigate = useNavigate();

  async function editArticle(title, description, body, tagList, token) {
    axios.put(
      `https://blog.kata.academy/api/articles/${slug}`,
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
    editArticle(title, description, body, tagList, token);
    navigate("/");
  };

  return <Form titleInfo="Edit article" onSubmit={onSubmit} other={other} />;
}

export default EditArticle;
