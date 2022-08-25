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

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    articlesCount: 0,
    articlePage: {},
    loading: true,
  },
  reducers: {
    setArticlePage(state, action) {
      state.articlePage = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
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
  },
});

export const { setArticlePage, setLoading } = articleSlice.actions;

export default articleSlice.reducer;
