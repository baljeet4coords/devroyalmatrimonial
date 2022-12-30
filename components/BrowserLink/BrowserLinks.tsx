import React, {useState, } from "react";
import { navOptionsList } from '../Header/NavoptionLinks';
import classes from "./Browser.module.scss";
import { NavOptions as NavOptionsType, SubCategory } from "../Header/types";

const BrowserLink = () => {
  const [show, setShow] = useState(false);
  const [navState, setNavState] = useState<SubCategory[]>([]);

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const getLinkValue = (val: string) => {
    const newSubCategory: SubCategory[] = [];
    navOptionsList.map((linkVal: NavOptionsType) => {
      if (linkVal.category === val)
        linkVal.subCategory.map((subVal: SubCategory) => {
          newSubCategory.push(subVal);
          setNavState(newSubCategory);
        });
    });
  };
    
  return (
    <React.Fragment>
        <div className={classes.browserTopBox}>
        {navOptionsList.map((item) => {
        if (item.subCategory.length !== 0) {
            return (
                <span key={item.category} 
            // onClick={showDropdown}
            onClick={() => [getLinkValue(item.category), showDropdown()]}
            >{item.category}</span>
            );
            }
        })} 
        </div>
        <div className={classes.browserBottomBox}>
        {navState.map((item) => {
            return (
              <a href={item.uri} key={item.title}>
                {item.title}
              </a>
            );
          })}
        </div>
    </React.Fragment>
  );
}

export default BrowserLink;