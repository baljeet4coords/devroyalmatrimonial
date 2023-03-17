import { FC } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { AiOutlineHeart } from "react-icons/ai";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const EditYourLikes: FC<MyComponentProps> = ({ setEditDetails }) => {
  const formik = useFormik({
    initialValues: {
      hobbies: "",
      interests: "",
      favourite_music: "",
      favourite_book: "",
      favourite_read: "",
      dress_style: "",
      tv_shows: "",
      favourite_movies: "",
      sports: "",
      cuisine: "",
      food_i_cook: "",
      vacation_destination: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setEditDetails(false);
    },
  });

  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <AiOutlineHeart />
            Your Likes
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleBox}>
            <Form.Label>Hobbies</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="hobbies"
                defaultValue={formik.values.hobbies}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Interests</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="interests"
                defaultValue={formik.values.interests}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Music</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="favourite_music"
                defaultValue={formik.values.favourite_music}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Book</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="favourite_book"
                defaultValue={formik.values.favourite_book}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Read</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="favourite_read"
                defaultValue={formik.values.favourite_read}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Dress Style</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="dress_style"
                defaultValue={formik.values.dress_style}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>TV Shows</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="tv_shows"
                defaultValue={formik.values.tv_shows}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Movies</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="favourite_movies"
                defaultValue={formik.values.favourite_movies}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Sports</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="sports"
                defaultValue={formik.values.sports}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Cuisine</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="cuisine"
                defaultValue={formik.values.cuisine}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Food I Cook</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="food_i_cook"
                defaultValue={formik.values.food_i_cook}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Vacation Destination</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="vacation_destination"
                defaultValue={formik.values.vacation_destination}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setEditDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setEditDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditYourLikes;
