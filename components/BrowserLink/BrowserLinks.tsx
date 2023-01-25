import React, {useState, } from "react";
import { navOptionsList } from '../Header/NavoptionLinks';
import classes from "./Browser.module.scss";
import { NavOptions as NavOptionsType, SubCategory } from "../Header/types";

const BrowserLink = () => {
  const [navState, setNavState] = useState<SubCategory[]>(navOptionsList[0].subCategory);
  const [activeId, setActiveId] = useState<string>("Mother Tongue");

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
            onClick={() => [getLinkValue(item.category), setActiveId(item.category)]}
            className={activeId === item.category ? classes.active : ""}>{item.category}</span>
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