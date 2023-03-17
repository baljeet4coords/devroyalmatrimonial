import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { HighestEducationList } from "../../constants/DesiredData";
import { FiUsers } from "react-icons/fi";
import {
  BrotherSister,
  FamilStatus,
  FamilyIncome,
  FamilyType,
  FathersProfession,
  LivingWithParrents,
  MothersProfession,
} from "../../types/enums";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectStep4Success } from "../../ducks/regiserUser/step4/selectors";
import { selectSignUpSuccess } from "../../ducks/signUp/selectors";
import CountryStateCitlyList from "../CountryStateCityList/CountryStateCityList";

interface MyComponentProps {
  setFamilyDetails: (details: boolean) => void;
}
const EditFamilyDetails: FC<MyComponentProps> = ({ setFamilyDetails }) => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep4Success);
  const userId = useSelector(selectSignUpSuccess)?.output;
  const jsonData = stepOneDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  // useEffect(() => {
  //   dispatch({
  //     type: STEP_4,
  //     payload: { actionType: "V", userId: userId },
  //   });
  // }, [dispatch, userId]);
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedFathersOccupation, setSelectedFathersOccupation] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Father), val: "" });
  const [selectedMothersOccupation, setSelectedMothersOccupation] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Mother), val: "" });
  const [selectedSister, setSelectedSister] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Sister), val: "" });
  const [selectedBrother, setSelectedBrother] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Brother), val: "" });
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Family_Status), val: "" });
  const [selectedFamilyIncome, setSelectedFamilyIncome] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Family_Income), val: "" });
  const [selectedFamilyType, setSelectedFamilyType] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Family_Type), val: "" });
  const [selectedNativeCountry, setSelectedNativeCountry] = useState<number>(
    jsonData?.family_native_country
  );
  const [selectedNativeState, setSelectedNativeState] = useState<number>(
    jsonData?.family_native_state
  );
  const [selectedNativeCity, setSelectedNativeCity] = useState<number>(
    jsonData?.family_native_city
  );
  const [selectedLivingWithParents, setSelectedLivingWithParents] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.living_with_parents), val: "" });
  const formik = useFormik({
    initialValues: {
      actionType: "",
      userId: userId,
      fathersProfession: jsonData?.Father,
      mothersProfession: jsonData?.Mother,
      sister: jsonData?.Sister,
      brother: jsonData?.Brother,
      gothra: jsonData?.Gothra,
      familyStatus: jsonData?.Family_Status,
      familyIncome: jsonData?.Family_Income,
      familyType: jsonData?.Family_Type,
      familyNativeCountry: jsonData?.family_native_country,
      familyNativeState: jsonData?.family_native_state,
      familyNativeCity: jsonData?.family_native_city,
      livingWithParents: jsonData?.living_with_parents,
    },
    // onSubmit: async (values: IRegisterStep4) => {
    //   let response;
    //   if (isReduxEmpty) {
    //     response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
    //       {
    //         ...values,
    //         actionType: "C",
    //       }
    //     );
    //   } else {
    //     response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
    //       {
    //         ...values,
    //         actionType: "U",
    //       }
    //     );
    //   }
    //   // response.data.output === 1 && nextPage(4);
    // },
  });

  const getSelectedCountry = (id: number) => {
    setSelectedNativeCountry(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedNativeState(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedNativeCity(id);
  };

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
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFathersOccupation}
              title="Father's Occupation"
              data={FathersProfession}
              nameid="fathersProfession"
              defaultValue={jsonData?.Father}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedMothersOccupation}
              title="Mother's Occupation"
              data={MothersProfession}
              nameid="mothersProfession"
              defaultValue={jsonData?.Mother}
            />
          </div>

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedSister}
              title="Sister"
              data={BrotherSister}
              nameid="sister"
              defaultValue={jsonData?.Sister}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedBrother}
              title="Brother"
              data={BrotherSister}
              nameid="brother"
              defaultValue={jsonData?.Brother}
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
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFamilyStatus}
              title="Family Status "
              data={FamilStatus}
              nameid="familyStatus"
              defaultValue={jsonData?.Family_Status}
            />
          </div>

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFamilyIncome}
              title="Family Income"
              data={FamilyIncome}
              nameid="familyIncome"
              defaultValue={jsonData?.Family_Income}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFamilyType}
              title="Family Type"
              data={FamilyType}
              nameid="familyType"
              defaultValue={jsonData?.Family_Type}
            />
          </div>
            <CountryStateCitlyList
              title="Family Native"
              setSelectedCountry={getSelectedCountry}
              setSelectedState={getSelectedState}
              setSelectedCity={getSelectedCity}
              defaultValueCountry={0}
              defaultValueState={0}
              defaultValueCity={0}
            />
          {/* <div className={classes.singleBox}>
          </div> */}

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedLivingWithParents}
              title="Living With Parents"
              data={LivingWithParrents}
              nameid="livingWithParents"
              defaultValue={jsonData?.living_with_parents}
            />
          </div>
          {/* <div className={classes.singleBox}>
            <Form.Label>Family Values</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Family based out of</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
              <p className="text-decoration-underline">Not From india </p>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Living with parents?</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div> */}

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
