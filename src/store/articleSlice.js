import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function articles(offset, token) {
    const log = token.getState().user.token;
    return axios
      .get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
        headers: {
          Authorization: `Token ${log}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  }
);

export const fetchArticleSlug = createAsyncThunk(
  "articles/fetchArticlesSlug",
  async function articlesSlug(slug, token) {
    const log = token.getState().user.token;
    return axios
      .get(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          Authorization: `Token ${log}`,
        },
      })
      .then((res) => res.data.article);
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    articlesCount: 0,
    articlePage: null,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.loading = false;
    },
    [fetchArticleSlug.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticleSlug.fulfilled]: (state, action) => {
      state.articlePage = action.payload;
      state.loading = false;
    },
  },
});

export default articleSlice.reducer;
