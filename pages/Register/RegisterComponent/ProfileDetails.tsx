import { Container, Row, Col  } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import CareerDetails from "./CareerDetails";
import React, { useState, useRef, useEffect } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { maritalStatusLinks, countryList, ResidentialList, AgeFromYearList, AgeToYearList, 
  HeightFromList, HeightToList, ReligionList, MotherTongue, ManglikList, HighestEducationList } from "../../../constents/DesiredData";
import { Value } from "sass";


interface ProfileDetailsProps {
  chooseMessage: (a:number) => void
}
type acticeStateType = {
  type: string,
  visible: boolean,
}

type paramsStatus = {
  val: string,
  idd: number,
  selectedInputQuery: string,
}

const ProfileDetails:React.FC<ProfileDetailsProps> = ({chooseMessage}:any) => {
  const containerRef = useRef(null);
  let MotherTongueRef = useRef<any>();
  let ReligionRef = useRef<any>();
  let MaritalRef = useRef<any>();
  let HeightRef = useRef<any>();

  const storeInputType = ['country', 'Marital','ResidentialStatus','Fromyear','Toyear', 'FromHeight', 'Height', 'Religion', 'MotherTongue', 'Manglik', 'HighestEdu'];

  const [MotherTongueArray, updateMotherTongueArray] = useState<string>();
  const [ReligionArray, updateReligionArray] = useState<string>();
  const [MaritalArray, updateMaritalArray] = useState<string>();
  const [HeightArray, updateHeightArray] = useState<string>();


  const [searchedMotherTongue, setSearchedMotherTongue] = useState<string[]>(MotherTongue);
  const [searchedReligion, setSearchedReligion] = useState<string[]>(ReligionList);
  const [searchedMarital, setSearchedMarital] = useState<string[]>(maritalStatusLinks);
  const [searchedHeight, setSearchedHeight] = useState<string[]>(HeightFromList);

  const [activeList, setActiveList] = useState<acticeStateType>({ type: '', visible: false });
  const openList = (active: string) => {
    if (storeInputType.includes(active)) {
        setActiveList({ type: active, visible: true });
      }
  }

  const getClickedData = (data: paramsStatus) => {
    if (data.selectedInputQuery === "MotherTongue"){
      updateMotherTongueArray(data.val);
      MotherTongueRef.current.value = "";
    }
    if (data.selectedInputQuery === "Religion"){
      updateReligionArray(data.val);
      ReligionRef.current.value = "";
    }
    if (data.selectedInputQuery === "Marital"){
      updateMaritalArray(data.val);
      MaritalRef.current.value = "";
    }
    if (data.selectedInputQuery === "Height"){
      updateHeightArray(data.val);
      HeightRef.current.value = "";
    }
  }
  const searchDataFunc = (query: any, idd: string) => {
    if(idd === "MotherTongue"){
    const searchedMotherTongues = MotherTongue.filter(country => country.toLowerCase().includes(query.toLowerCase()));
    setSearchedMotherTongue(searchedMotherTongues);
    }
    if(idd === "Religion"){
    const searchedReligions = ReligionList.filter(Religion => Religion.toLowerCase().includes(query.toLowerCase()));
    setSearchedReligion(searchedReligions);
    }
    if(idd === "Marital"){
    const searchedMaritals = maritalStatusLinks.filter(Religion => Religion.toLowerCase().includes(query.toLowerCase()));
    setSearchedMarital(searchedMaritals);
    }
    if(idd === "Height"){
    const searchedHeights = HeightFromList.filter(Height => Height.toLowerCase().includes(query.toLowerCase()));
    setSearchedHeight(searchedHeights);
    }
  }
  const [checked, updateChecked] = useState<boolean>();
  const checkFunction = () => {
    updateChecked(true)
    chooseMessage(1);
  }

  const handleClickOutside = () => {
    if (containerRef.current) {     
      setActiveList({type: '', visible: false});
    };
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  },);

    return(
      <>
        {!checked && <div className={classes.profile_Container} ref={containerRef}>
        <Container>
         <Row className="justify-content-center">
                <Col sm={12} md={5}>
                <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
                  <small>mandatory</small>
                  <form className={classes.formEdit}>
                   <div className={classes.singleBox}>
                      <label>Grooms Name</label>
                      <div className={classes.inputBox}>
                        <li className={classes.blankInput}><input type="text"  placeholder="Select Some Options" /></li> 
                        </div>
                    </div>
                    <div className={classes.singleBox}>
                      <label>Mother Tongue</label>
                      <div className={classes.inputBox} onClick={() => openList('MotherTongue')}>
                        <li className={classes.blankInput}><input type="text"  placeholder={MotherTongueArray ? MotherTongueArray : "Select Some Options"} ref={MotherTongueRef} onChange={(e) => searchDataFunc(e.target.value, "MotherTongue")}/></li> 
                        <div className={`${activeList.type === "MotherTongue" ? classes.active : ''} ${classes.inputBoxVal}`}>
                          <ul>
                            {searchedMotherTongue.map((val, idd) => {
                              return (
                                <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "MotherTongue" })} className={MotherTongueArray === val ? classes.tabActive : ""}><span>{val}</span></li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={classes.singleBox}>
                      <label>Religion</label>
                      <div className={classes.inputBox} onClick={() => openList('Religion')}>
                        <li className={classes.blankInput}><input type="text"  placeholder={ReligionArray ? ReligionArray : "Select Some Options"} ref={ReligionRef} onChange={(e) => searchDataFunc(e.target.value, "Religion")}/></li> 
                          <div className={`${activeList.type === "Religion" ? classes.active : ''} ${classes.inputBoxVal}`}>
                            <ul>
                              {searchedReligion.map((val, idd) => {
                                return (
                                  <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Religion" })} className={ReligionArray === val ? classes.tabActive : ""}><span>{val}</span></li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                    </div>
                    <div className={classes.singleBox}>
                      <label>Marital status</label>
                      <div className={classes.inputBox} onClick={() => openList('Marital')}>
                        <li className={classes.blankInput}><input type="text"  placeholder={MaritalArray ? MaritalArray : "Select Some Options"} ref={MaritalRef} onChange={(e) => searchDataFunc(e.target.value, "Marital")}/></li> 
                          <div className={`${activeList.type === "Marital" ? classes.active : ''} ${classes.inputBoxVal}`}>
                            <ul>
                              {searchedMarital.map((val, idd) => {
                                return (
                                  <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Marital" })} className={MaritalArray === val ? classes.tabActive : ""}><span>{val}</span></li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                    </div>
                    <div className={classes.singleBox}>
                      <label>Height</label>
                      <div className={classes.inputBox} onClick={() => openList('Height')}>
                        <li className={classes.blankInput}><input type="text"  placeholder={HeightArray ? HeightArray : "Select Some Options"} ref={HeightRef} onChange={(e) => searchDataFunc(e.target.value, "Height")}/></li> 
                          <div className={`${activeList.type === "Height" ? classes.active : ''} ${classes.inputBoxVal}`}>
                            <ul>
                              {searchedHeight.map((val, idd) => {
                                return (
                                  <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Height" })} className={HeightArray === val ? classes.tabActive : ""}><span>{val}</span></li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                    </div>
                   
                </form>
                  <CustomButton onClick={() => checkFunction()}>
                  Continue
                  </CustomButton>
                </Col>
                <Col sm={12} md={2} className={classes.right_section}>
                    <h3>WHY REGISTER</h3>
                      <i className={classes.icon1}></i>
                      <span>Lakhs of Genuine Profiles</span>
                      <i className={classes.icon2}></i>
                      <span>Many Verified by Personal Visit</span>
                      <i className={classes.icon3}></i>
                      <span>Secure & Family Friendly</span>
                      <i className={classes.icon4}></i>
                      <span>Strict Privacy Control</span>
                </Col>
              </Row>
              </Container>
            </div>}

            {checked && <CareerDetails chooseMessage={chooseMessage}/>}
          </>
            
    )
}

export default ProfileDetails;



{/* <CustomButton onClick={() => checkFunction()}>
Continue
</CustomButton> */}