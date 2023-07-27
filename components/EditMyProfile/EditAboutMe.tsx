import { FC } from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { textAreaSchema } from "../../schemas/textAreaSchema";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import Errors from "../Errors/Errors";
import CountrySingle from "../InputField/CountryStateSingle/CountrySingle";
import StateSingle from "../InputField/CountryStateSingle/StateSingle";
import CitySingle from "../InputField/CountryStateSingle/CitySingle";
import { useStep5Register } from "../../hooks/useRegister/useStep5";

interface MyComponentProps {
  setAboutMeDetails: (details: boolean) => void;
  step5Response: any;
  FatchAgain: () => void;
}


const EditAboutMe: FC<MyComponentProps> = ({ setAboutMeDetails, step5Response, FatchAgain }) => {
  const userId = useSelector(getUserId);
  const isReduxEmpty =
    step5Response && Object.values(step5Response).every((value) => !value);
  const [error, setError] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [typeInHindi, setTypeInHindi] = useState<boolean>(false);
  const { registerUserMutation, Step5Query } = useStep5Register();



  const [aboutCareer, setAboutCareer] = useState<string>(
    step5Response && step5Response.about_career ? step5Response.about_career : ""
  );
  const [aboutFamily, setAboutFamily] = useState<string>(
    step5Response && step5Response.about_family ? step5Response.about_family : ""
  );
  const [aboutEducation, setAboutEducation] = useState<string>(
    step5Response && step5Response.about_education ? step5Response.about_education : ""
  );
  const [basicIntro, setBasicIntro] = useState<string>(
    step5Response && step5Response.basic_intro ? step5Response.basic_intro : ""
  );
  const [selectedBirthCountry, setSelectedBirthCountry] = useState<number>(
    step5Response?.pobCountry || 100
  );
  const [selectedBirthState, setSelectedBirthState] = useState<number>(
    step5Response?.pobState || -1
  );
  const [selectedBirthCity, setSelectedBirthCity] = useState<number>(
    step5Response?.pobCity || -1
  );


  const formik = useFormik({
    initialValues: {
      userId: userId,
      aboutCareer: step5Response?.about_career,
      aboutFamily: step5Response?.about_family,
      aboutEducation: step5Response?.about_education,
      basicIntro: step5Response?.basic_intro,
      birthCountry: step5Response?.pobCountry,
      birthState: step5Response?.pobState,
      birthCity: step5Response?.pobCity,
    },
    validationSchema: textAreaSchema,
    onSubmit: async (values) => {
      const mutationResult = await registerUserMutation.mutateAsync({ ...values, actionType: isReduxEmpty ? "c" : "u" });
      if (mutationResult?.output && mutationResult?.output > 0) {
        FatchAgain();
        setAboutMeDetails(false);
      }
    },
  });

  useEffect(() => {
    formik.values.birthCountry = selectedBirthCountry;
    formik.values.birthState = selectedBirthState;
    formik.values.birthCity = selectedBirthCity;
    formik.values.aboutCareer = aboutCareer;
    formik.values.aboutFamily = aboutFamily;
    formik.values.aboutEducation = aboutEducation;
    formik.values.basicIntro = basicIntro;
  }, [
    formik.values,
    formik.errors.aboutCareer,
    formik.errors.basicIntro,
    formik.errors.aboutEducation,
    formik.errors.aboutFamily,
    selectedBirthCountry,
    selectedBirthState,
    selectedBirthCity,
    aboutCareer,
    aboutFamily,
    aboutEducation,
    basicIntro,
  ]);


  useEffect(() => {
    if (mounted) {
      if (
        formik.errors.aboutCareer ||
        formik.errors.aboutEducation ||
        formik.errors.basicIntro ||
        formik.errors.aboutFamily
      ) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setMounted(true);
    }
  }, [
    formik.errors.aboutCareer,
    formik.errors.aboutEducation,
    formik.errors.aboutFamily,
    formik.errors.basicIntro,
    mounted,
  ]);


  const getSelectedCountry = (id: number) => {
    setSelectedBirthCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedBirthState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedBirthCity(id);
  };

  useEffect(() => {
    setSelectedBirthCountry(
      step5Response?.pobCountry != undefined
        ? step5Response?.pobCountry
        : selectedBirthCountry
    );
    setSelectedBirthState(
      step5Response?.pobState != undefined ? step5Response?.pobState : selectedBirthState
    );
    setSelectedBirthCity(
      step5Response?.pobCity != undefined ? step5Response?.pobCity : selectedBirthCity
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step5Response?.pobCity, step5Response?.pobCountry, step5Response?.pobState]);


  const charCounter = (char: string) => 1000 - char.length;


  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUser />
            About Me
          </div>
        </div>
        {/* <div className={classes.typeInHindiSec}>
          <Form.Check
            type="switch"
            id="login_with"
            label="हिंदी में लिखें"
            className={
              typeInHindi
                ? classes.Form_Login_check
                : classes.Form_Login_checkDis
            }
            checked={typeInHindi}
            onChange={() => setTypeInHindi(!typeInHindi)}
          />
          <p>Need help writing?</p>
        </div> */}
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.EditsingleBox}>
            <Form.Label>About Career</Form.Label>
            <div className="text-muted">
              <small>
                {charCounter(aboutCareer)}/1000 characters left
              </small>
            </div>
            <Form.Control
              as="textarea"
              name="aboutCareer"
              rows={5}
              placeholder="About your career"
              onBlur={formik.handleBlur}
              onChange={(e) => setAboutCareer(e.target.value)}
              maxLength={1000}
              defaultValue={
                step5Response?.about_career != null
                  ? String(step5Response?.about_career)
                  : ""
              }
            />
            {formik.touched.aboutCareer && formik.errors.aboutCareer ? (
              <div className="pt-1">
                <Errors error={String(formik.errors.aboutCareer)} />
              </div>
            ) : null}
          </div>

          <div className={classes.EditsingleBox}>
            <Form.Label>About Family</Form.Label>
            <div className="text-muted">
              <small>
                {charCounter(aboutFamily)}/1000 characters left
              </small>
            </div>
            <Form.Control
              as="textarea"
              name="aboutFamily"
              rows={5}
              placeholder="About your family"
              onBlur={formik.handleBlur}
              onChange={(e) => setAboutFamily(e.target.value)}
              maxLength={1000}
              defaultValue={
                step5Response?.about_family != null
                  ? String(step5Response?.about_family)
                  : ""
              }
            />
            {formik.touched.aboutFamily && formik.errors.aboutFamily ? (
              <div className="pt-1">
                <Errors error={String(formik.errors.aboutFamily)} />
              </div>
            ) : null}
          </div>
          <div className={classes.EditsingleBox}>
            <Form.Label>About Education</Form.Label>
            <div className="text-muted">
              <small>
                {charCounter(aboutEducation)}/1000 characters left
              </small>
            </div>
            <Form.Control
              as="textarea"
              name="aboutEducation"
              rows={5}
              placeholder="About your education"
              onBlur={formik.handleBlur}
              onChange={(e) => setAboutEducation(e.target.value)}
              maxLength={1000}
              defaultValue={
                step5Response?.about_education != null
                  ? String(step5Response?.about_education)
                  : ""
              }
            />
            {formik.touched.aboutEducation &&
              formik.errors.aboutEducation ? (
              console.log(formik.errors.aboutEducation),
              <div className="pt-1">
                <Errors error={String(formik.errors.aboutEducation)} />
              </div>
            ) : null}
          </div>
          <div className={classes.EditsingleBox}>
            <Form.Label>Basic Intro</Form.Label>
            <div className="text-muted">
              <small>
                {charCounter(basicIntro)}/1000 characters left
              </small>
            </div>
            <Form.Control
              as="textarea"
              name="basicIntro"
              rows={5}
              placeholder="Intro yourself"
              onBlur={formik.handleBlur}
              onChange={(e) => setBasicIntro(e.target.value)}
              maxLength={1000}
              defaultValue={
                step5Response?.basic_intro != null
                  ? String(step5Response?.basic_intro)
                  : ""
              }
            />
            {formik.touched.basicIntro && formik.errors.basicIntro ? (
              <div className="pt-1">
                <Errors error={String(formik.errors.basicIntro)} />
              </div>
            ) : null}
          </div>

          <span>
            <hr />
            <h5 className="text-center p-3">Select your birth place</h5>
          </span>
          <CountrySingle
            title="Birth Country"
            setSelectedCountry={getSelectedCountry}
            defaultValueCountry={step5Response?.pobCountry}
          />
          <StateSingle
            title="Birth State"
            setSelectedState={getSelectedState}
            defaultValueCountry={selectedBirthCountry}
            defaultValueState={step5Response?.pobState}
          />
          <CitySingle
            title="Birth City"
            defaultValueCountry={selectedBirthCountry}
            defaultValueState={selectedBirthState}
            defaultValueCity={step5Response?.pobCity}
            setSelectedCity={getSelectedCity}
          />

          {error && (
            <p className="text-muted">
              <Errors error="Please solve above raised issues first before proceeding" />
            </p>
          )}

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setAboutMeDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setAboutMeDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditAboutMe;
