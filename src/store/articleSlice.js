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

export const fetchArticlesPage = createAsyncThunk(
  "articles/fetchArticlesPage",
  async function fetchData(slug, token) {
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
    favorited: false,
    favoritesCount: 0,
    tagsList: [""],
  },
  reducers: {
    addTag(state) {
      state.tagsList.push("");
    },
    deleteTag(state, action) {
      state.tagsList.splice(action.payload, 1);
    },
    changeValue(state, action) {
      state.tagsList[action.payload.index] = action.payload.event;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.loading = false;
    },
    [fetchArticlesPage.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticlesPage.fulfilled]: (state, action) => {
      state.loading = false;
      state.articlePage = action.payload;
      state.favorited = action.payload.favorited;
      state.favoritesCount = action.payload.favoritesCount;
    },
  },
});
export const { addTag, deleteTag, changeValue } = articleSlice.actions;
export default articleSlice.reducer;
