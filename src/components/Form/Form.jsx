import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.scss";

function Form({ titleInfo, articleFunction, other = {} }) {
  const { title, description, body, tagList } = other;
  const [tagsList, setTagsList] = useState(tagList || [""]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const {
    background,
    button,
    errorMessage,
    inputErr,
    tagStyle,
    tagLabel,
    deleteBut,
    add,
  } = style;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const addTag = () => {
    setTagsList((tags) => {
      return ["", ...tags];
    });
  };

  const deleteTag = (index) => {
    const list = [...tagsList];
    list.splice(index, 1);
    setTagsList(list);
  };

  const changeValue = (e, index) => {
    const list = [...tagsList];
    list[index] = e.target.value;
    setTagsList(list);
  };

  const onSubmit = (data) => {
    const { title, description, body } = data;
    articleFunction(title, description, body, tagsList, token);
    navigate("/");
  };

  return (
    <div className={background}>
      <h3>{titleInfo}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "The field must be filled in",
            })}
            className={errors?.title && inputErr}
            defaultValue={title}
          />
        </label>
        <div className={errorMessage}>
          {errors?.title && <p>{errors.title.message}</p>}
        </div>
        <label>
          Short description
          <input
            type="text"
            placeholder="Title"
            {...register("description", {
              required: "The field must be filled in",
            })}
            className={errors?.description && inputErr}
            defaultValue={description}
          />
        </label>
        <div className={errorMessage}>
          {errors?.description && <p>{errors.description.message}</p>}
        </div>
        <label>
          Text
          <textarea
            type="text"
            placeholder="Text"
            {...register("body", {
              required: "The field must be filled in",
            })}
            className={errors?.body && inputErr}
            defaultValue={body}
          />
        </label>
        <div className={errorMessage}>
          {errors?.body && <p>{errors.body.message}</p>}
        </div>
        <label>
          Tags
          {tagsList.map((tag, i) => {
            return (
              <div className={tagLabel} key={`tag${i + 1}`}>
                <input
                  className={tagStyle}
                  type="text"
                  placeholder="Tag"
                  onChange={(e) => changeValue(e, i)}
                  value={tag}
                />
                {tagsList.length !== 1 && (
                  <button
                    type="button"
                    className={deleteBut}
                    onClick={() => deleteTag(i)}
                  >
                    Delete
                  </button>
                )}
                {tagsList.length - 1 === i && (
                  <button
                    type="button"
                    className={add}
                    onClick={() => addTag()}
                  >
                    Add Tag
                  </button>
                )}
              </div>
            );
          })}
        </label>
        <input className={button} type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Form;
