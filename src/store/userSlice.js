import { createSlice } from "@reduxjs/toolkit/dist";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    email: null,
    password: null,
    token: null,
    image: null,
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
      if (action.payload.image) {
        state.image = action.payload.image;
      }
    },
    removeUser(state) {
      state.username = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
