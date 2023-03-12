import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { HighestEducationList } from "../../constants/DesiredData";
import { FiUsers } from "react-icons/fi";
import { FamilyIncome } from "../../types/enums";

interface MyComponentProps {
  setFamilyDetails: (details: boolean) => void;
}
const EditFamilyDetails: FC<MyComponentProps> = ({ setFamilyDetails }) => {
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
            <FiUsers />
            Family Details
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleBox}>
            <Form.Label>Profile Handler Name</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Mother is</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Father is</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Sister(s)</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Brother(s)</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Gothra</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Gothra (maternal)</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Family Status</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Family Income</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={FamilyIncome}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Family Type</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Joint Family"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Family Values</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Family based out of</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                placeholder="Not filled in"
              />
              <p className="text-decoration-underline">
                Not From india </p>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Living with parents?</Form.Label>
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
              setEditDetails={setFamilyDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setFamilyDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditFamilyDetails;
