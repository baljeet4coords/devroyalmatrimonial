import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { BloodGroup, Challenged, FamilyIncome } from "../../types/enums";
import { AiOutlineHeart } from "react-icons/ai";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const EditYourLikes: FC<MyComponentProps> = ({ setEditDetails }) => {
  const formik = useFormik({
    initialValues: {
      dob: "",
      maritalstatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

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
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Interests</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Music</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Book</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Read</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Dress Style</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>TV Shows</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Favourite Movies</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Movies</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Sports</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Cuisine</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Food I Cook</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Vacation Destination</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
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
