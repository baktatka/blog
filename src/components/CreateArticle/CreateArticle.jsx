import axios from "axios";

import React from "react";

import Form from "../Form";

function CreateArticle() {
  const createArticle = async (title, description, body, tagList, token) => {
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
  };

  return (
    <Form titleInfo="Create new article" articleFunction={createArticle} />
  );
}

export default CreateArticle;
