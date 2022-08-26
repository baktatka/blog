import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Form from "../Form";

function EditArticle() {
  const { slug, ...other } = useSelector((state) => state.articles.articlePage);

  const editArticle = async (title, description, body, tagList, token) => {
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
  };

  return (
    <Form
      titleInfo="Edit article"
      articleFunction={editArticle}
      other={other}
    />
  );
}

export default EditArticle;
