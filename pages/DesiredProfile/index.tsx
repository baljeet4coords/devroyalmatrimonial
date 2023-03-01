
import { Container, Row, Col } from "react-bootstrap";
import LoginrHeader from "../../components/LoginHeader/Loginheader";
import { Footer } from "../../components";
import React, { useState, useRef, useEffect } from 'react';
import classes from "./DesiredProfile.module.scss";
import { maritalStatusLinks, countryList, ResidentialList, AgeFromYearList, AgeToYearList, 
HeightFromList, HeightToList, ReligionList, MotherTongue, ManglikList, HighestEducationList } from "../../constents/DesiredData";
import { FaEdit } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import CustomButton from "../../components/Button/CustomButton";

// interface DesiredProfileProps {
//   handleInputChange: (a:any) => void
//   handleSubmit: (a:any) => void
// }
// interface onShow {
//   FromyHeightValue: any,
//   HeightFromList: string[],
//   getClickedData: (data: paramsStatus) => void,
//   activeList: acticeStateType,
//   openList: (active: string) => void
// }

type paramsStatus = {
  val: string,
  idd: number,
  selectedInputQuery: string,
}
type acticeStateType = {
  type: string,
  visible: boolean,
}
const DesiredProfilePage: React.FC = () => {
  const containerRef = useRef(null);
  const [myMaritalArray, updateMyMaritalArray] = useState<string[]>([]);
  const [mycountryArray, updateMycountryArray] = useState<string[]>([]);
  const [ResidentialArray, updateResidentialArray] = useState<string[]>([]);
  const [FromyearValue, updateFromyearValue] = useState<string>();
  const [ToyearValue, updateToyearValue] = useState<string>();
  const [FromyHeightValue, updateFromyHeightValue] = useState<string>();
  const [ToHeighttValue, updateToHeightValue] = useState<string>();
  const [ReligionValue, updateReligionValue] = useState<string[]>([]);
  const [MotherTongueArray, updateMotherTongueArray] = useState<string[]>([]);
  const [ManglikArray, updateManglikArray] = useState<string[]>([]);
  const [HighestEduArray, updateHighestEduArray] = useState<string[]>([]);


  const [searchedCountry, setSearchedCountry] = useState<string[]>(countryList);
  const [searchedMotherTongue, setSearchedMotherTongue] = useState<string[]>(countryList);

  const searchDataFunc = (query: string, idd: string) => {
    if(idd === "country"){
    const searchedCountries = countryList.filter(country => country.toLowerCase().includes(query.toLowerCase()));
    setSearchedCountry(searchedCountries);
    }
    if(idd === "MotherTongue"){
    const searchedMotherTongues = MotherTongue.filter(country => country.toLowerCase().includes(query.toLowerCase()));
    setSearchedMotherTongue(searchedMotherTongues);
    }
  }
  
  const getClickedData = (data: paramsStatus) => {
        if (myMaritalArray.indexOf(data.val) === -1 && data.selectedInputQuery === "Marital"){
          updateMyMaritalArray(prevArray => [...prevArray, data.val]);
        }
        if (mycountryArray.indexOf(data.val) === -1 && data.selectedInputQuery === "country"){
          updateMycountryArray(prevArray => [...prevArray, data.val]);
        }
        if (ResidentialArray.indexOf(data.val) === -1 && data.selectedInputQuery === "ResidentialStatus"){
          updateResidentialArray(prevArray => [...prevArray, data.val]);
        }
        if (ReligionValue.indexOf(data.val) === -1 && data.selectedInputQuery === "Religion"){
          updateReligionValue(prevArray => [...prevArray, data.val]);
        }
        if (MotherTongueArray.indexOf(data.val) === -1 && data.selectedInputQuery === "MotherTongue"){
          updateMotherTongueArray(prevArray => [...prevArray, data.val]);
        }
        if (ManglikArray.indexOf(data.val) === -1 && data.selectedInputQuery === "Manglik"){
          updateManglikArray(prevArray => [...prevArray, data.val]);
        }
        if (HighestEduArray.indexOf(data.val) === -1 && data.selectedInputQuery === "HighestEdu"){
          updateHighestEduArray(prevArray => [...prevArray, data.val]);
        }
        if (data.selectedInputQuery === "Fromyear"){
          updateFromyearValue(data.val);
        }
        if (data.selectedInputQuery === "Toyear"){
          updateToyearValue(data.val);
        }
        if (data.selectedInputQuery === "FromHeight"){
          updateFromyHeightValue(data.val);
        }
        if (data.selectedInputQuery === "ToHeight"){
          updateToHeightValue(data.val);
        }
    }
  // const storeDelInputType = ['country', 'Marital','ResidentialStatus', 'Religion', 'MotherTongue'];
  // const storeStateArray = [myMaritalArray, mycountryArray, ResidentialArray, ReligionValue, MotherTongueArray];

  const getClickedDeleteData = (data: paramsStatus) => {
    if (data.selectedInputQuery === "Marital") {
      myMaritalArray.splice(data.idd, 1);
    }
    if (data.selectedInputQuery === "country"){
      mycountryArray.splice(data.idd, 1);
    }
    if (data.selectedInputQuery === "ResidentialStatus"){
      ResidentialArray.splice(data.idd, 1);
    }
    if (data.selectedInputQuery === "Religion"){
      ReligionValue.splice(data.idd, 1);
    }
    if (data.selectedInputQuery === "MotherTongue"){
      MotherTongueArray.splice(data.idd, 1);
    }
    if (data.selectedInputQuery === "Manglik"){
      ManglikArray.splice(data.idd, 1);
    }
    if (data.selectedInputQuery === "HighestEdu"){
      HighestEduArray.splice(data.idd, 1);
    }
    
  }

  const storeInputType = ['country', 'Marital','ResidentialStatus','Fromyear','Toyear', 'FromHeight', 'ToHeight', 'Religion', 'MotherTongue', 'Manglik', 'HighestEdu'];

  const [activeList, setActiveList] = useState<acticeStateType>({ type: '', visible: false });
  const openList = (active: string) => {
    if (storeInputType.includes(active)) {
        setActiveList({ type: active, visible: true });
      }
  }
  const handleClickOutside = () => {
    if (containerRef.current) {     
      setActiveList({type: '', visible: false});
      console.log(activeList);
    };
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  },);

  return (
    <React.Fragment>
      <Container fluid className={classes.background_header} ref={containerRef}>
        <LoginrHeader />
      </Container>
      <div className={classes.DesiredWrapper}>
        <Container className={classes.innerWrapper}>
          <Row>
            <h1>Desired Partner Profile</h1>
            <p>The criteria you mention here determines the ‘Desired Partner Matches’ you see. So please review this information carefully. Moreover, Filters determine whose Interests/Calls you want to receive.</p>
            <div className={classes.dark_box}>No. of Mutual Matches with below criteria - 80</div>
            <div className={classes.checkBox}> <Form.Check aria-label="option 1" />I also want to receive matches based on the history of my interests and acceptances
              <small>These matches may not fully fulfil your Desired Partner Preference.</small>
            </div>
            <div className={classes.editInfo}>
              <span>Basic details</span>
              <span><FaEdit /> Edit</span>
            </div>
            <Col sm={12} className="d-flex justify-content-center">
              <form className={classes.formEdit}>
                <div className={classes.twoBox}>
                  <label>Age</label>
                  <div className={classes.inputBox} onClick={() => openList('Fromyear')}>
                    {`From  ${FromyearValue ? FromyearValue : "24"}`} year <SlArrowDown />
                    <div className={`${activeList.type === "Fromyear" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {AgeFromYearList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Fromyear" })} className={FromyearValue === val ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className={classes.inputBox} onClick={() => openList('Toyear')}>
                    {`To ${ToyearValue ? ToyearValue : "24"}`} year <SlArrowDown />
                    <div className={`${activeList.type === "Toyear" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {AgeToYearList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Toyear" })} className={ToyearValue === val ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={classes.twoBox}>
                  <label>Height</label>
                  <div className={classes.inputBox} onClick={() => openList('FromHeight')}>
                    {`From  ${FromyHeightValue ? FromyHeightValue : "6' 2''"}`} <SlArrowDown />
                    <div className={`${activeList.type === "FromHeight" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {HeightFromList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "FromHeight" })} className={FromyHeightValue === val ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className={classes.inputBox} onClick={() => openList('ToHeight')}>
                    {`To  ${ToHeighttValue ? ToHeighttValue : "6' 2''"}`} <SlArrowDown />
                    <div className={`${activeList.type === "ToHeight" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {HeightToList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "ToHeight" })} className={ToHeighttValue === val ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={classes.singleBox} >
                  <label>Marital Status</label>
                  <div className={classes.inputBox}  >
                    <ul onClick={() => openList('Marital')}>
                      {myMaritalArray.map((val: string, idd: number) => {
                        return (
                          <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "Marital" })} /></li>
                        )
                      })}
                      <li className={classes.blankInput}><input type="text" placeholder={myMaritalArray.length < 1 ? "Select Some Options" : ""} /></li>
                    </ul>
                    <div className={`${activeList.type === "Marital" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {maritalStatusLinks.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Marital" })} className={myMaritalArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                </div>
                <div className={classes.singleBox} >
                  <label>Country</label>
                  <div className={classes.inputBox}>
                    <ul onClick={() => openList('country')}>
                      {mycountryArray.map((val: string, idd: number) => {
                        return (
                          <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "country" })} /></li>
                        )
                      })}
                      <li className={classes.blankInput}><input type="text" placeholder={mycountryArray.length < 1 ? "Select Some Options" : ""} onChange={(e) => searchDataFunc(e.target.value, "country")} /></li>
                    </ul>
                    <div className={`${activeList.type === "country" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {searchedCountry.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "country" })} className={mycountryArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={classes.singleBox} >
                  <label>Residential Status</label>
                  <div className={classes.inputBox}>
                    <ul onClick={() => openList('ResidentialStatus')}>
                      {ResidentialArray.map((val: string, idd: number) => {
                        return (
                          <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "ResidentialStatus" })} /></li>
                        )
                      })}
                      <li className={classes.blankInput}><input type="text" placeholder={ResidentialArray.length < 1 ? "Select Some Options" : ""}/></li>
                    </ul>
                    <div className={`${activeList.type === "ResidentialStatus" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {ResidentialList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "ResidentialStatus" })} className={mycountryArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                </div>
                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            <hr/>
            <div className={classes.editInfo}>
              <span>Religion & Ethnicity</span>
              <span><FaEdit /> Edit</span>
            </div>
            <Col sm={12} className="d-flex justify-content-center">
              <form className={classes.formEdit}>
                <div className={classes.singleBox} >
                    <label>Religion</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('Religion')}>
                        {ReligionValue.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "Religion" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={ReligionValue.length < 1 ? "Select Some Options" : ""}/></li>
                      </ul>
                      <div className={`${activeList.type === "Religion" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {ReligionList.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Religion" })} className={ReligionValue.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={classes.singleBox} >
                    <label>Mother Tongue</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('MotherTongue')}>
                        {MotherTongueArray.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "MotherTongue" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={MotherTongueArray.length < 1 ? "Select Some Options" : ""} onChange={(e) => searchDataFunc(e.target.value, "MotherTongue")} /></li>
                      </ul>
                      <div className={`${activeList.type === "MotherTongue" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {searchedMotherTongue.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "MotherTongue" })} className={MotherTongueArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={classes.singleBox} >
                    <label>Manglik</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('Manglik')}>
                        {ManglikArray.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "Manglik" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={ManglikArray.length < 1 ? "Select Some Options" : ""}/></li>
                      </ul>
                      <div className={`${activeList.type === "Manglik" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {ManglikList.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Manglik" })} className={ManglikArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>   
                      
                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            <hr />
            <div className={classes.editInfo}>
              <span>Education & Work</span>
              <span><FaEdit /> Edit</span>
            </div>
            <Col sm={12} className="d-flex justify-content-center">
              <form className={classes.formEdit}>
                <div className={classes.singleBox} >
                  <label>Highest Education </label>
                  <div className={classes.inputBox}  >
                    <ul onClick={() => openList('HighestEdu')}>
                      {HighestEduArray.map((val: string, idd: number) => {
                        return (
                          <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "HighestEdu" })} /></li>
                        )
                      })}
                      <li className={classes.blankInput}><input type="text" placeholder={HighestEduArray.length < 1 ? "Select Some Options" : ""} /></li>
                    </ul>
                    <div className={`${activeList.type === "HighestEdu" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {HighestEducationList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "HighestEdu" })} className={HighestEduArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                </div>
                <div className={classes.singleBox} >
                  <label>Occupation</label>
                  <div className={classes.inputBox}>
                    <ul onClick={() => openList('country')}>
                      {mycountryArray.map((val: string, idd: number) => {
                        return (
                          <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "country" })} /></li>
                        )
                      })}
                      <li className={classes.blankInput}><input type="text" placeholder={mycountryArray.length < 1 ? "Select Some Options" : ""} onChange={(e) => searchDataFunc(e.target.value, "country")} /></li>
                    </ul>
                    <div className={`${activeList.type === "country" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {searchedCountry.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "country" })} className={mycountryArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={classes.singleBox} >
                  <label>Residential Status</label>
                  <div className={classes.inputBox}>
                    <ul onClick={() => openList('ResidentialStatus')}>
                      {ResidentialArray.map((val: string, idd: number) => {
                        return (
                          <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "ResidentialStatus" })} /></li>
                        )
                      })}
                      <li className={classes.blankInput}><input type="text" placeholder={ResidentialArray.length < 1 ? "Select Some Options" : ""}/></li>
                    </ul>
                    <div className={`${activeList.type === "ResidentialStatus" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {ResidentialList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "ResidentialStatus" })} className={mycountryArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                </div>
                <div className={classes.twoBox}>
                  <label>Income</label>
                  <div className={classes.inputBox} onClick={() => openList('Fromyear')}>
                    {`${FromyearValue ? FromyearValue : "Select any"}`}  <SlArrowDown />
                    <div className={`${activeList.type === "Fromyear" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {AgeFromYearList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Fromyear" })} className={FromyearValue === val ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className={classes.inputBox} onClick={() => openList('Toyear')}>
                    {` ${ToyearValue ? ToyearValue : "Select any"}`}  <SlArrowDown />
                    <div className={`${activeList.type === "Toyear" ? classes.active : ''} ${classes.inputBoxVal}`}>
                      <ul>
                        {AgeToYearList.map((val, idd) => {
                          return (
                            <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Toyear" })} className={ToyearValue === val ? classes.tabActive : ""}><span>{val}</span></li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            <hr />
            <div className={classes.editInfo}>
              <span>Lifestyle</span>
              <span><FaEdit /> Edit</span>
            </div>
            <Col sm={12} className="d-flex justify-content-center">
              <form className={classes.formEdit}>
                <div className={classes.singleBox} >
                    <label>Dietary habits</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('Religion')}>
                        {ReligionValue.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "Religion" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={ReligionValue.length < 1 ? "Select Some Options" : ""}/></li>
                      </ul>
                      <div className={`${activeList.type === "Religion" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {ReligionList.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Religion" })} className={ReligionValue.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={classes.singleBox} >
                    <label>Drinking habits</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('MotherTongue')}>
                        {MotherTongueArray.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "MotherTongue" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={MotherTongueArray.length < 1 ? "Select Some Options" : ""} onChange={(e) => searchDataFunc(e.target.value, "MotherTongue")} /></li>
                      </ul>
                      <div className={`${activeList.type === "MotherTongue" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {searchedMotherTongue.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "MotherTongue" })} className={MotherTongueArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={classes.singleBox} >
                    <label>Smoking habits</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('Manglik')}>
                        {ManglikArray.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "Manglik" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={ManglikArray.length < 1 ? "Select Some Options" : ""}/></li>
                      </ul>
                      <div className={`${activeList.type === "Manglik" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {ManglikList.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Manglik" })} className={ManglikArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>   
                  <div className={classes.singleBox} >
                    <label>Challenged</label>
                    <div className={classes.inputBox}  >
                      <ul onClick={() => openList('Manglik')}>
                        {ManglikArray.map((val: string, idd: number) => {
                          return (
                            <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData({ val: val, idd: idd, selectedInputQuery: "Manglik" })} /></li>
                          )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={ManglikArray.length < 1 ? "Select Some Options" : ""}/></li>
                      </ul>
                      <div className={`${activeList.type === "Manglik" ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                          {ManglikList.map((val, idd) => {
                            return (
                              <li key={idd} onClick={() => getClickedData({ val: val, idd: idd, selectedInputQuery: "Manglik" })} className={ManglikArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>   
                      
                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            {/* <hr /> */}
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default DesiredProfilePage;