import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { setUser } from "../../store/userSlice";
import style from "./SignUp.module.scss";

const { background, checkbox, button, checkErr, errorMessage, inputErr } =
  style;

function SignUp() {
  const [check, setCheck] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: "onBlur" });

  async function registUser(username, email, password) {
    axios
      .post("https://blog.kata.academy/api/users", {
        user: {
          username: username,
          email: email,
          password: password,
        },
      })
      .then((response) => dispatch(setUser(response.data.user)));
  }

  const onSubmit = (data) => {
    const { username, email, password } = data;
    registUser(username, email, password);
    navigate("/");
  };

  return (
    <div className={background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Create new account</h3>
        <label>
          Username
          <input
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
            placeholder="Username"
            className={errors?.username && inputErr}
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
            {...register("email", {
              required: "The field must be filled in",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: "Please enter valid email",
              },
            })}
            className={errors?.email && inputErr}
          />
        </label>
        <div className={errorMessage}>
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <label>
          Password
          <input
            type="password"
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
            placeholder="Password"
            className={errors?.password && inputErr}
          />
        </label>
        <div className={errorMessage}>
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <label>
          Repeat password
          <input
            type="password"
            placeholder="Password"
            {...register("repeatPassword", {
              required: "The field must be filled in",
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
                return val;
              },
              message: "Passwords must match",
            })}
            className={errors?.repeatPassword && inputErr}
          />
        </label>
        <div className={errorMessage}>
          {errors?.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>
        <label>
          <input
            type="checkbox"
            className={checkbox}
            checked={check}
            {...register("agree", {
              onChange: () => setCheck(!check),
              required: "Please check the box ",
            })}
          />
          I agree to the processing of my personal information
        </label>
        <div className={errorMessage}>
          {errors?.agree && <p className={checkErr}>{errors.agree.message}</p>}
        </div>
        <input
          type="submit"
          value="Create"
          className={button}
          disabled={!isValid}
        />
        <p>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
