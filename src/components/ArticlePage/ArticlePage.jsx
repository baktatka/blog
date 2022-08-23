import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  ExclamationCircleFilled,
  HeartOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Spin, Row, Popover } from "antd";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import titleFormat from "../../helper";
import useAuth from "../../hooks/use-auth";
import style from "./ArticlePage.module.scss";
import { fetchArticleSlug } from "../../store/articleSlice";

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
  articleBody,
  deleteBut,
  add,
  buttonsWrap,
  popText,
  warning,
  buttonNo,
  buttonYes,
} = style;

function ArticlePage() {
  const article = useSelector((state) => state.articles.articlePage);
  const loading = useSelector((state) => state.articles.loading);
  const currentUser = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const {
    author,
    createdAt,
    description,
    tagList,
    title,
    body,
    favorited,
    favoritesCount,
  } = article;

  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);

  useEffect(() => {
    dispatch(fetchArticleSlug(slug, token));
    setLiked(favorited);
    setCount(favoritesCount);
  }, [dispatch, slug, token, favorited, favoritesCount]);

  async function deleteArticle() {
    axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  const { username, image } = author;

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const popContent = (
    <div className={popText}>
      <ExclamationCircleFilled className={warning} />
      <p>Are you sure to delete this article?</p>
      <div>
        <button type="button" onClick={hide} className={buttonNo}>
          No
        </button>
        <button
          type="button"
          className={buttonYes}
          onClick={() => {
            deleteArticle();
            navigate("/");
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );

  async function checkLikes() {
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
  }

  const likes = isAuth ? (
    <p className={text}>
      <HeartTwoTone
        className={liked ? "liked" : "unliked"}
        onClick={() => checkLikes()}
      />
      {count}
    </p>
  ) : (
    <p className={text}>
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
              <a href="#4" className={titles}>
                {titleFormat(title, 65)}
              </a>
              {likes}
              <div>
                {tagList !== null &&
                  tagList
                    .map((tag) => (
                      <div className={tags} key={tag}>
                        {titleFormat(tag, 30)}
                      </div>
                    ))
                    .slice(0, 10)}
              </div>
              <article className={text}>
                {titleFormat(description, 300)}
              </article>
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
              {currentUser === username && (
                <div className={buttonsWrap}>
                  <Popover
                    placement="rightTop"
                    content={popContent}
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <button type="button" className={deleteBut}>
                      Delete
                    </button>
                  </Popover>
                  <Link to={`/articles/${slug}/edit`}>
                    <button type="button" className={add}>
                      Edit
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </header>
          <div className={articleBody}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
