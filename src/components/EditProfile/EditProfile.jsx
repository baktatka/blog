import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./EditProfile.module.scss";
import { setUser } from "../../store/userSlice";

const { background, button, errorMessage } = style;

function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { username, email, password, token, image } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function editUser(username, email, token, image, password) {
    axios
      .put(
        "https://blog.kata.academy/api/user",
        {
          user: {
            email: email,
            username: username,
            image: image,
            token: token,
            password: password,
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => dispatch(setUser(response.data.user)));
  }

  const onSubmit = (data) => {
    const { email, password, username, image } = data;
    editUser(username, email, token, image, password);
    navigate("/");
  };

  return (
    <div className={background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Profile</h3>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            defaultValue={username}
            {...register("username", {
              required: "The field must be filled in",
              minLength: {
                value: 4,
                message: "Your username needs to be at least 3 characters.",
              },
              maxLength: {
                value: 21,
                message: "Your username must be less than 20 characters",
              },
            })}
          />
        </label>
        <div className={errorMessage}>
          {errors?.username && <p>{errors.username.message}</p>}
        </div>
        <label>
          Email address
          <input
            type="email"
            placeholder="Email address"
            defaultValue={email}
            {...register("email", {
              required: "The field must be filled in",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: "Please enter valid email",
              },
            })}
          />
        </label>
        <div className={errorMessage}>
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <label>
          New Password
          <input
            type="password"
            placeholder="New password"
            defaultValue={password}
            {...register("password", {
              required: "The field must be filled in",
              minLength: {
                value: 7,
                message: "Your password needs to be at least 6 characters.",
              },
              maxLength: {
                value: 41,
                message: "Your password must be less than 40 characters",
              },
            })}
          />
        </label>
        <div className={errorMessage}>
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <label>
          Avatar image (url)
          <input
            type="text"
            placeholder="Avatar image (url)"
            defaultValue={image}
            {...register("image", {
              required: "The field must be filled in",
              pattern: {
                value:
                  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                message: "Please enter valid url",
              },
            })}
          />
        </label>
        <div className={errorMessage}>
          {errors?.image && <p>{errors.image.message}</p>}
        </div>
        <input type="submit" value="Save" className={button} />
      </form>
    </div>
  );
}

export default EditProfile;
