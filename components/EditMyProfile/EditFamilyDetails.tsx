import { FC } from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
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
import { selectAuthSuccess } from "../../ducks/auth/selectors";
import CountryStateCitlyList from "../CountryStateCityList/CountryStateCityList";

interface MyComponentProps {
  setFamilyDetails: (details: boolean) => void;
}
const EditFamilyDetails: FC<MyComponentProps> = ({ setFamilyDetails }) => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep4Success);
  const id = useSelector(selectAuthSuccess)?.output;
  const jsonData = stepOneDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);

  const [selectedFathersOccupation, setSelectedFathersOccupation] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Father), val: "" });
  const [selectedMothersOccupation, setSelectedMothersOccupation] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Mother), val: "" });
  const [selectedSister, setSelectedSister] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Sister), val: "" });
  const [selectedBrother, setSelectedBrother] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Brother), val: "" });
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Family_Status), val: "" });
  const [selectedFamilyIncome, setSelectedFamilyIncome] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Family_Income), val: "" });
  const [selectedFamilyType, setSelectedFamilyType] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.Family_Type), val: "" });

  const [selectedNativeCountry, setSelectedNativeCountry] = useState<
    number | undefined
  >(jsonData?.family_native_country);
  const [selectedNativeState, setSelectedNativeState] = useState<
    number | undefined
  >(jsonData?.family_native_state);
  const [selectedNativeCity, setSelectedNativeCity] = useState<
    number | undefined
  >(jsonData?.family_native_city);
  const [selectedLivingWithParents, setSelectedLivingWithParents] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.living_with_parents), val: "" });
  const formik = useFormik({
    initialValues: {
      fathersProfession: "",
      mothersProfession: "",
      sister: "",
      brother: "",
      gothra: "",
      familyStatus: "",
      familyIncome: "",
      familyType: "",
      nativeCountry: {},
      nativeState: {},
      nativeCity: {},
      livingWithParents: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setFamilyDetails(false);
    },
  });

  useEffect(() => {
    formik.values.fathersProfession = selectedFathersOccupation.val;
    formik.values.mothersProfession = selectedMothersOccupation.val;
    formik.values.sister = selectedSister.val;
    formik.values.brother = selectedBrother.val;
    formik.values.familyStatus = selectedFamilyStatus.val;
    formik.values.familyIncome = selectedFamilyIncome.val;
    formik.values.familyType = selectedFamilyType.val;
    formik.values.nativeCountry = selectedNativeCountry || 100;
    formik.values.nativeState = selectedNativeState || 0;
    formik.values.nativeCity = selectedNativeCity || 0;
    formik.values.livingWithParents = selectedLivingWithParents.val;
  }, [
    selectedFathersOccupation.val,
    selectedMothersOccupation.val,
    selectedSister.val,
    selectedBrother.val,
    selectedFamilyStatus.val,
    selectedFamilyIncome.val,
    selectedFamilyType.val,
    selectedLivingWithParents.val,
    selectedNativeCountry,
    selectedNativeState,
    selectedNativeCity,
    formik.values,
  ]);

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
              defaultValue={String(jsonData?.Father)}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedMothersOccupation}
              title="Mother's Occupation"
              data={MothersProfession}
              nameid="mothersProfession"
              defaultValue={String(jsonData?.Mother)}
            />
          </div>

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedSister}
              title="Sister"
              data={BrotherSister}
              nameid="sister"
              defaultValue={String(jsonData?.Sister)}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedBrother}
              title="Brother"
              data={BrotherSister}
              nameid="brother"
              defaultValue={String(jsonData?.Brother)}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Gothra</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="gothra"
                defaultValue={formik.initialValues.gothra}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFamilyStatus}
              title="Family Status "
              data={FamilStatus}
              nameid="familyStatus"
              defaultValue={String(jsonData?.Family_Status)}
            />
          </div>

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFamilyIncome}
              title="Family Income"
              data={FamilyIncome}
              nameid="familyIncome"
              defaultValue={String(jsonData?.Family_Income)}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedFamilyType}
              title="Family Type"
              data={FamilyType}
              nameid="familyType"
              defaultValue={String(jsonData?.Family_Type)}
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

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedLivingWithParents}
              title="Living With Parents"
              data={LivingWithParrents}
              nameid="livingWithParents"
              defaultValue={String(jsonData?.living_with_parents)}
            />
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
