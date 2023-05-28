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
import { getUserId, selectAuthSuccess } from "../../ducks/auth/selectors";
import CountryStateCitlyList from "../CountryStateCityList/CountryStateCityList";
import CitySingle from "../InputField/CountryStateSingle/CitySingle";
import StateSingle from "../InputField/CountryStateSingle/StateSingle";
import CountrySingle from "../InputField/CountryStateSingle/CountrySingle";
import { useStep4Register } from "../../hooks/useRegister/useStep4";

interface MyComponentProps {
  setFamilyDetails: (details: boolean) => void;
  step4Response: any;
  FatchAgain: () => void;
}
interface Data {
  id?: string;
  val: string;
}

const EditFamilyDetails: FC<MyComponentProps> = ({ setFamilyDetails, step4Response, FatchAgain }) => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep4Success);
  const id = useSelector(selectAuthSuccess)?.output;
  // const step4Response = stepOneDefaultValues?.jsonResponse;
  const isReduxEmpty =
    step4Response && Object.values(step4Response).every((value) => !value);
  const userId = useSelector(getUserId);
  const { mutate: registerUser, data, isLoading: step4loadingReq } = useStep4Register();

  const [selectedFathersOccupation, setSelectedFathersOccupation] =
    useState<Data>({ id: String(step4Response?.Father), val: "" });

  const [selectedMothersOccupation, setSelectedMothersOccupation] =
    useState<Data>({ id: String(step4Response?.Mother), val: "" });

  const [selectedSister, setSelectedSister] = useState<Data>({
    id: String(step4Response?.Sister),
    val: "",
  });

  const [selectedBrother, setSelectedBrother] = useState<Data>({
    id: String(step4Response?.Brother),
    val: "",
  });

  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<Data>({
    id: String(step4Response?.Family_Status),
    val: "",
  });

  const [selectedFamilyIncome, setSelectedFamilyIncome] = useState<Data>({
    id: String(step4Response?.Family_Income),
    val: "",
  });

  const [selectedFamilyType, setSelectedFamilyType] = useState<Data>({
    id: String(step4Response?.Family_Type),
    val: "",
  });

  const [selectedNativeCountry, setSelectedNativeCountry] = useState<number>(
    step4Response?.family_native_country || 100
  );

  const [selectedNativeState, setSelectedNativeState] = useState<number>(
    step4Response?.family_native_state || -1
  );
  const [selectedNativeCity, setSelectedNativeCity] = useState<number>(
    step4Response?.family_native_city || -1
  );
  const [selectedLivingWithParents, setSelectedLivingWithParents] =
    useState<Data>({ id: String(step4Response?.living_with_parents), val: "" });

  const [gothraVal, setGothraVal] = useState<string>("");



  const formik = useFormik({
    initialValues: {
      userId: userId,
      mothersProfession: String(step4Response?.Mother),
      fathersProfession: String(step4Response?.Father),
      sister: String(step4Response?.Sister),
      brother: String(step4Response?.Brother),
      gothra: step4Response?.Gothra,
      familyStatus: String(step4Response?.Family_Status),
      familyIncome: String(step4Response?.Family_Income),
      familyType: String(step4Response?.Family_Type),
      familyNativeCountry: step4Response?.family_native_country,
      familyNativeState: step4Response?.family_native_state,
      familyNativeCity: step4Response?.family_native_city,
      livingWithParents: String(step4Response?.living_with_parents),
    },
    onSubmit: async (values) => {

      registerUser({ ...values, actionType: isReduxEmpty ? "c" : "u" });
      const resolvedData = await data;
      if (resolvedData?.output && resolvedData?.output > 0) {
        FatchAgain();
        setFamilyDetails(false);
      }
    },
  });


  useEffect(() => {
    setSelectedNativeCountry(
      step4Response?.family_native_country != undefined
        ? step4Response?.family_native_country
        : 0
    );
    setSelectedNativeState(
      step4Response?.family_native_state != undefined
        ? step4Response?.family_native_state
        : -1
    );
    setSelectedNativeCity(
      step4Response?.family_native_city != undefined
        ? step4Response?.family_native_city
        : -1
    );
    setGothraVal(step4Response?.Gothra != undefined ? step4Response?.Gothra : "");
  }, [
    step4Response?.family_native_country,
    step4Response?.family_native_state,
    step4Response?.family_native_city,
    step4Response?.Gothra,
  ]);

  useEffect(() => {
    formik.values.familyNativeCountry = selectedNativeCountry;
    formik.values.familyNativeState = selectedNativeState;
    formik.values.familyNativeCity = selectedNativeCity;
    formik.values.livingWithParents = String(selectedLivingWithParents.id);
    formik.values.gothra = gothraVal;
    formik.values.mothersProfession = String(selectedMothersOccupation.id);
    formik.values.fathersProfession = String(selectedFathersOccupation.id);
    formik.values.sister = String(selectedSister.id);
    formik.values.brother = String(selectedBrother.id);
    formik.values.familyStatus = String(selectedFamilyStatus.id);
    formik.values.familyIncome = String(selectedFamilyIncome.id);
    formik.values.familyType = String(selectedFamilyType.id);

  }, [
    formik.values,
    selectedBrother.id,
    selectedFamilyIncome.id,
    selectedFamilyStatus.id,
    selectedFamilyType.id,
    selectedFathersOccupation.id,
    selectedLivingWithParents.id,
    selectedMothersOccupation.id,
    selectedNativeCity,
    selectedNativeCountry,
    selectedNativeState,
    selectedSister.id,
    gothraVal,
  ]);

  const getSelectedCountry = (id: number) => {
    setSelectedNativeCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedNativeState(id);
  };
  const getSelectedCity = (id: number) => {
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
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedFathersOccupation}
                title="Father's Occupation"
                data={FathersProfession}
                nameid="fathersProfession"
                defaultValue={String(step4Response?.Father)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedMothersOccupation}
                title="Mother's Occupation"
                data={MothersProfession}
                nameid="mothersProfession"
                defaultValue={String(step4Response?.Mother)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedSister}
                title="Sister"
                data={BrotherSister}
                nameid="sister"
                defaultValue={String(step4Response?.Sister)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedBrother}
                title="Brother"
                data={BrotherSister}
                nameid="brother"
                defaultValue={String(step4Response?.Brother)}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Gothra</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="gothra"
                defaultValue={formik.initialValues.gothra}
                placeholder="Not filled in"
                onChange={(e) => setGothraVal(e.target.value)}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedFamilyStatus}
                title="Family Status "
                data={FamilStatus}
                nameid="familyStatus"
                defaultValue={String(step4Response?.Family_Status)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedFamilyIncome}
                title="Family Income"
                data={FamilyIncome}
                nameid="familyIncome"
                defaultValue={String(step4Response?.Family_Income)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedFamilyType}
                title="Family Type"
                data={FamilyType}
                nameid="familyType"
                defaultValue={String(step4Response?.Family_Type)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <CountrySingle
                title="Family Native Country"
                setSelectedCountry={getSelectedCountry}
                defaultValueCountry={step4Response?.family_native_country}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <StateSingle
                title="Family Native State"
                setSelectedState={getSelectedState}
                defaultValueCountry={selectedNativeCountry}
                defaultValueState={step4Response?.family_native_state}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <CitySingle
                title="Family Native City"
                defaultValueCountry={selectedNativeCountry}
                defaultValueState={selectedNativeState}
                defaultValueCity={step4Response?.family_native_city}
                setSelectedCity={getSelectedCity}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedLivingWithParents}
                title="Living With Parents"
                data={LivingWithParrents}
                nameid="livingWithParents"
                defaultValue={String(step4Response?.living_with_parents)}
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
