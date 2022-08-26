import axios from "axios";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { Spin, Row } from "antd";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import style from "./Article.module.scss";

import titleFormat from "../../helper";

const {
  background,
  header,
  titles,
  tags,
  names,
  avatar,
  text,
  data,
  info,
  person,
} = style;

function Article({ article }) {
  const {
    author,
    createdAt,
    description,
    tagList,
    title,
    favoritesCount,
    slug,
    textLog,
    favorited,
  } = article;

  const { username, image } = author;
  const { isAuth } = useAuth();

  const loading = useSelector((state) => state.articles.loading);
  const token = useSelector((state) => state.user.token);
  const [liked, setLiked] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);

  useEffect(() => {
    setLiked(favorited);
    setCount(favoritesCount);
  }, [favorited, favoritesCount]);

  const checkLikes = async function checkLikes() {
    if (liked) {
      setCount(count - 1);
      axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } else {
      setCount(count + 1);
      axios.post(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    }
    setLiked(!liked);
  };

  const likes = isAuth ? (
    <p className={text}>
      <HeartTwoTone
        className={liked ? "liked" : "unliked"}
        onClick={() => checkLikes()}
      />
      {count}
    </p>
  ) : (
    <p className={textLog}>
      <HeartOutlined /> {count}
    </p>
  );

  return (
    <div className={background}>
      {loading ? (
        <Row display="flex" justify="center">
          <Spin style={{ marginTop: 40 }} />
        </Row>
      ) : (
        <>
          <header className={header}>
            <div className={info}>
              <Link to={`/articles/${slug}`} className={titles}>
                {titleFormat(title, 65)}
              </Link>
              {likes}
              <div>
                {tagList !== null &&
                  tagList
                    .map((tag) => {
                      if (!tag) return null;
                      return (
                        <div className={tags} key={`${tag}`}>
                          {titleFormat(tag, 30)}
                        </div>
                      );
                    })
                    .slice(0, 10)}
              </div>
            </div>
            <div className={person}>
              <img
                className={avatar}
                src={image}
                alt="Avatar"
                onError={(e) => {
                  e.target.src =
                    "https://static.productionready.io/images/smiley-cyrus.jpg";
                }}
              />
              <p className={names}>{username}</p>
              <p className={data}>{format(new Date(createdAt), "LLLL d, y")}</p>
            </div>
          </header>
          <article className={text}>{titleFormat(description, 300)}</article>
        </>
      )}
    </div>
  );
}

export default Article;
