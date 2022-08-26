import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useForm } from "react-hook-form";
import { setUser } from "../../store/userSlice";
import style from "./SignIn.module.scss";

const { background, button, errorMessage, inputErr } = style;

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  async function loginUser(email, password) {
    axios
      .post("https://blog.kata.academy/api/users/login", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        dispatch(setUser(response.data.user));
        navigate("/");
      })
      .catch(() => {
        setError("email", {
          type: "server",
          message: "Invalid email",
        });
        setError("password", {
          type: "server",
          message: "Invalid password",
        });
      });
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password);
  };

  return (
    <div className={background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign In</h3>
        <label>
          Email address
          <input
            className={errors?.email && inputErr}
            type="text"
            placeholder="Email address"
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
          Password
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "The field must be filled in",
            })}
            className={errors?.password && inputErr}
          />
        </label>
        <div className={errorMessage}>
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <input type="submit" value="Login" className={button} />
        <p>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
