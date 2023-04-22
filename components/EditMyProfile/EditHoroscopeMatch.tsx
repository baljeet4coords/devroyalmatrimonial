import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "../MyProfile/Components/RightSectionMyProfile.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { RiLockLine } from "react-icons/ri";
import CountrySingle from "../InputField/CountryStateSingle/CountrySingle";
import StateSingle from "../InputField/CountryStateSingle/StateSingle";
import CitySingle from "../InputField/CountryStateSingle/CitySingle";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
  dob: string;
  tob: string;
  step5Response: any;
}
const EditHoroscopeMatch: FC<MyComponentProps> = ({ setEditDetails, dob, tob, step5Response }) => {


  const [selectedCountry, setSelectedCountry] = useState<number>(
    step5Response?.pobCountry || 100
  );
  const [selectedState, setSelectedState] = useState<number>(
    step5Response?.pobState || -1
  );
  const [selectedCity, setSelectedCity] = useState<number>(
    step5Response?.pobCity || -1
  );


  useEffect(() => {
    setSelectedCountry(
      step5Response?.pobCountry != undefined ? step5Response?.pobCountry : selectedCountry
    );
    setSelectedState(
      step5Response?.pobState != undefined ? step5Response?.pobState : selectedState
    );
    setSelectedCity(
      step5Response?.pobCity != undefined ? step5Response?.pobCity : selectedCity
    );
  }, [step5Response?.country, step5Response?.pobState, step5Response?.pobCity]);


  const getSelectedCountry = (id: number) => {
    setSelectedCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedCity(id);
  };


  return (
    <>
      <div className={classes.contactEditSec}>
        <div className={classes.singleBox}>
          <Form.Label>Date of Bitrh</Form.Label>
          <div className={classes.EditInputSecDisable}>
            <input type="text" disabled placeholder="Fer 13,1992" value={dob} />
            <span>
              {" "}
              <RiLockLine />{" "}
            </span>
          </div>
        </div>

        <div className={classes.singleBoxWrapper}>
          <div className={classes.singleBox}>
            <CountrySingle
              title="Country"
              setSelectedCountry={getSelectedCountry}
              defaultValueCountry={step5Response?.pobCountry}
            />
          </div>
        </div>
        <div className={classes.singleBoxWrapper}>
          <div className={classes.singleBox}>
            <StateSingle
              title="State"
              setSelectedState={getSelectedState}
              defaultValueCountry={selectedCountry}
              defaultValueState={step5Response?.pobState}
            />
          </div>
        </div>
        <div className={classes.singleBoxWrapper}>
          <div className={classes.singleBox}>
            <CitySingle
              title="City"
              defaultValueCountry={selectedCountry}
              defaultValueState={selectedState}
              defaultValueCity={step5Response?.pobCity}
              setSelectedCity={getSelectedCity}
            />
          </div>
        </div>

        
        <div className={classes.singleBox}>
          <Form.Label>Time of Birth</Form.Label>
          <div className={classes.EditInputSecDisable}>
            <input type="text" disabled placeholder="00:00 AM" value={tob} />
            <span>
              {" "}
              <RiLockLine />{" "}
            </span>
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
      </div>
    </>
  );
};

export default EditHoroscopeMatch;
