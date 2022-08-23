import React, { useEffect, useState } from "react";
import { Pagination, Row } from "antd";
import { useSelector, useDispatch } from "react-redux/es/exports";
import useAuth from "../../hooks/use-auth";

import { fetchArticles } from "../../store/articleSlice";

import Article from "../Article/Article";

function ArticleList() {
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuth } = useAuth();

  useEffect(() => {
    dispatch(fetchArticles(offset, token));
  }, [dispatch, offset, token, isAuth]);

  const pageChange = (page) => {
    setOffset(page * 5 - 5);
    setCurrentPage(page);
  };
  return (
    <div>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
      <Row display="flex" justify="center">
        <Pagination
          size="small"
          total={articlesCount}
          current={currentPage}
          pageSize={5}
          showSizeChanger={false}
          onChange={(page) => pageChange(page)}
        />
      </Row>
    </div>
  );
}

export default ArticleList;
