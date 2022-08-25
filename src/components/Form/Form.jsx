import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Form.module.scss";

function Form({ titleInfo, onSubmit, other = {} }) {
  const { title, description, body, tagList } = other;

  const {
    background,
    button,
    tagStyle,
    tagLabel,
    deleteBut,
    add,
    errorMessage,
    inputErr,
  } = style;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [tagsList, setTagsList] = useState(tagList || [""]);

  const addTag = (e) => {
    e.preventDefault();
    setTagsList((tags) => {
      return ["", ...tags];
    });
  };

  const deleteTag = (e, index) => {
    e.preventDefault();
    const list = [...tagsList];
    list.splice(index, 1);
    setTagsList(list);
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
              <div className={tagLabel} key={tag}>
                <input
                  className={tagStyle}
                  type="text"
                  placeholder="Tag"
                  {...register(`tag${i}`)}
                  defaultValue={tag}
                />
                {tagsList.length !== 1 && (
                  <button
                    type="button"
                    className={deleteBut}
                    onClick={(e) => deleteTag(e, i)}
                  >
                    Delete
                  </button>
                )}
                {tagsList.length - 1 === i && (
                  <button
                    type="button"
                    className={add}
                    onClick={(e) => addTag(e)}
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
